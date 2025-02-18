"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Share2, Download, ChevronRight, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import Model3DViewer from "@/components/Model3DViewer"
import { FontSelector } from "@/components/FontSelector"
import { useTheme } from "@/contexts/ThemeContext"
import { useWeather } from "@/hooks/useWeather"
import { getProjectBySlug } from "@/config/projects"
import { notFound } from "next/navigation"

interface WeatherData {
  weather: string;
  temperature?: number;
  location?: string;
  error?: Error;
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug)
  const { theme } = useTheme()
  const [weatherError, setWeatherError] = useState<string | null>(null)
  const { weather, temperature, location, error } = useWeather() as WeatherData

  if (!project) {
    notFound()
  }

  useEffect(() => {
    if (error) {
      setWeatherError("Failed to fetch weather data")
      console.error("Weather fetch error:", error)
    } else {
      setWeatherError(null)
    }
  }, [error])

  return (
    <main className={`min-h-screen theme-${theme}`}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/30 backdrop-blur-sm border-b border-foreground/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Button variant="ghost" size="icon" asChild className="hover:bg-foreground/10">
            <Link href="/" className="text-foreground">
              <ArrowLeft className="h-6 w-6" />
              <span className="sr-only">Back to projects</span>
            </Link>
          </Button>
          <FontSelector />
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="hover:bg-foreground/10">
              <Share2 className="h-5 w-5" />
              <span className="sr-only">Share project</span>
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-foreground/10">
              <Download className="h-5 w-5" />
              <span className="sr-only">Download AR model</span>
            </Button>
          </div>
        </div>
      </nav>

      {/* Weather Information */}
      <div className="fixed top-20 right-4 z-50 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm">
        {weatherError ? (
          <div className="flex items-center gap-2 text-yellow-600">
            <AlertCircle className="h-5 w-5" />
            <span className="text-sm">Weather unavailable</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{weather}</span>
            {temperature !== undefined && <span className="text-sm">{temperature}°C</span>}
            {location && <span className="text-sm text-gray-500">({location})</span>}
          </div>
        )}
      </div>

      {/* Project Hero */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent font-heading">
              {project.title}
            </h1>
            <p className="text-foreground/80 text-lg md:text-xl max-w-2xl">
              {project.description}
            </p>
          </div>
        </div>
      </section>

      {/* 3D Viewer Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="bg-foreground/5 rounded-2xl overflow-hidden border border-foreground/10 shadow-2xl">
            <div className="aspect-[16/9] relative">
              {project.modelUrl && (
                <Model3DViewer modelUrl={project.modelUrl} />
              )}
            </div>
            {/* Control Bar */}
            <div className="p-6 border-t border-foreground/10 bg-foreground/5 backdrop-blur-sm">
              <div className="flex justify-between items-center">
                <div className="flex gap-4">
                  <Button className="bg-foreground text-background hover:bg-foreground/90 font-heading">
                    View in AR
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="border-foreground/20 hover:bg-foreground/10 font-heading">
                    Customize
                  </Button>
                </div>
                <div className="flex gap-3">
                  {[1, 2, 3, 4].map((i) => (
                    <button
                      key={i}
                      className="w-16 h-16 rounded-lg bg-foreground/10 border border-foreground/10 overflow-hidden hover:border-foreground/30 transition-colors focus:outline-none focus:ring-2 focus:ring-foreground/20"
                    >
                      <Image
                        src={`/placeholder.svg?height=64&width=64&text=${i}`}
                        alt={`View ${i}`}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-16 bg-foreground/5 border-t border-foreground/10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground font-heading">Project Overview</h2>
              <p className="text-foreground/80 leading-relaxed">
                {project.description}
              </p>
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground font-heading">Key Features</h3>
                <ul className="space-y-2 text-foreground/80">
                  {project.features?.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <ChevronRight className="h-4 w-4 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground font-heading">Technologies Used</h2>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              {project.outcome && (
                <>
                  <h2 className="text-2xl font-bold text-foreground font-heading">Project Outcome</h2>
                  <p className="text-foreground/80 leading-relaxed">
                    {project.outcome}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

