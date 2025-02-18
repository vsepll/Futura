"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF, Stage, SpotLight } from "@react-three/drei"
import { useState } from "react"

function Model({ modelUrl }: { modelUrl: string }) {
  const { scene } = useGLTF(modelUrl)
  return <primitive object={scene} />
}

export default function Model3DViewer({ modelUrl }: { modelUrl: string }) {
  const [autoRotate, setAutoRotate] = useState(true)

  return (
    <div 
      onMouseEnter={() => setAutoRotate(false)}
      onMouseLeave={() => setAutoRotate(true)}
      style={{ width: "100%", height: "100%" }}
    >
      <Canvas
        camera={{ position: [5, 5, 5], fov: 45 }}
        style={{ width: "100%", height: "100%" }}
      >
        <Stage environment="studio" intensity={0.8}>
          <Model modelUrl={modelUrl} />
        </Stage>
        <ambientLight intensity={2} />
        <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={0.8} />
        <spotLight position={[-10, -10, -10]} angle={0.5} penumbra={1} intensity={0.5} />
        <spotLight position={[0, 15, 0]} angle={0.8} penumbra={1} intensity={0.8} />
        <OrbitControls autoRotate={autoRotate} autoRotateSpeed={2} />
      </Canvas>
    </div>
  )
}

