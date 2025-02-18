"use client"

import { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

function Model({ modelUrl, onLoad }: { modelUrl: string; onLoad: () => void }) {
  const { scene } = useGLTF(modelUrl)
  
  useEffect(() => {
    if (scene) {
      scene.traverse((child: any) => {
        if (child.isMesh) {
          child.material.roughness = 0.7
          child.material.metalness = 0.3
          child.material.needsUpdate = true
        }
      })
      // Signal that the model is ready
      onLoad()
    }
  }, [scene, onLoad])

  return (
    <primitive 
      object={scene} 
      scale={[1.5, 1.5, 1.5]} 
      position={[0, -1, 0]}
      rotation={[0, Math.PI / 4, 0]}
    />
  )
}

export default function ModelThumbnail({ 
  modelUrl,
  onCapture
}: { 
  modelUrl: string
  onCapture: (dataUrl: string) => void
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isModelLoaded, setIsModelLoaded] = useState(false)

  const captureSnapshot = () => {
    if (canvasRef.current) {
      try {
        const dataUrl = canvasRef.current.toDataURL('image/png', 1.0)
        onCapture(dataUrl)
      } catch (error) {
        console.error('Failed to capture snapshot:', error)
      }
    }
  }

  const handleModelLoad = () => {
    setIsModelLoaded(true)
    // Wait for the next frame to ensure the model is rendered
    requestAnimationFrame(() => {
      // Add a small delay to ensure proper lighting and materials are applied
      setTimeout(captureSnapshot, 1000)
    })
  }

  return (
    <div className="w-full h-full absolute inset-0" style={{ visibility: isModelLoaded ? 'hidden' : 'visible' }}>
      <Canvas
        ref={canvasRef}
        shadows="soft"
        dpr={[1, 2]}
        camera={{ position: [5, 2, 5], fov: 45 }}
        gl={{ 
          preserveDrawingBuffer: true,
          antialias: true
        }}
      >
        <color attach="background" args={['#f8f9fa']} />
        <Stage
          environment="studio"
          intensity={0.5}
          adjustCamera={false}
          shadows={{ type: 'contact', opacity: 0.2, blur: 3 }}
          preset="rembrandt"
        >
          <Model modelUrl={modelUrl} onLoad={handleModelLoad} />
        </Stage>
      </Canvas>
    </div>
  )
} 