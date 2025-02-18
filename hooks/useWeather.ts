"use client"

import { useContext } from "react"
import { WeatherContext } from "@/contexts/WeatherContext"

export function useWeather() {
  const context = useContext(WeatherContext)
  if (context === undefined) {
    throw new Error("useWeather must be used within a WeatherProvider")
  }
  return context
}

