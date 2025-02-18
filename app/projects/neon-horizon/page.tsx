"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import Model3DViewer from "@/components/Model3DViewer"

export default function NeonHorizonProject() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <div className="container mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold mb-6">Neon Horizon</h1>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <div className="aspect-[4/3] relative overflow-hidden rounded-lg shadow-lg">
              <Model3DViewer modelUrl="/assets/3d/duck.glb" />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Project Overview</h2>
              <p className="text-gray-600">
                Neon Horizon is a groundbreaking approach to UI design, merging holographic interfaces with tactile
                feedback systems. This project showcases the future of human-computer interaction, pushing the
                boundaries of what's possible in digital interfaces.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">Key Features</h2>
              <ul className="list-disc list-inside text-gray-600">
                <li>Holographic user interface</li>
                <li>Haptic feedback integration</li>
                <li>Gesture-based controls</li>
                <li>Adaptive AI-driven user experience</li>
                <li>Cross-device compatibility</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">Technologies Used</h2>
              <div className="flex flex-wrap gap-2">
                <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">Holographic Display</span>
                <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">Haptic Engines</span>
                <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">Machine Learning</span>
                <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">3D Modeling</span>
                <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">Unity3D</span>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">Project Outcome</h2>
              <p className="text-gray-600">
                Neon Horizon has been well-received in the tech community, garnering attention from major tech companies
                and UX design forums. It's currently being developed into a prototype for further testing and
                refinement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

