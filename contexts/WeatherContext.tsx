"use client"

import type React from "react"
import { createContext, useState, useEffect, useContext } from "react"

type WeatherType = "clear" | "cloudy" | "rainy" | "snowy"

type WeatherContextType = {
  weather: WeatherType
  setWeather: React.Dispatch<React.SetStateAction<WeatherType>>
  temperature?: number
  location?: string
  error?: string
  isLoading: boolean
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined)

const DEFAULT_LOCATION = { lat: 51.5074, lon: -0.1278 } // London as fallback

export function WeatherProvider({ children }: { children: React.ReactNode }) {
  const [weather, setWeather] = useState<WeatherType>("clear")
  const [temperature, setTemperature] = useState<number | undefined>(undefined)
  const [location, setLocation] = useState<string | undefined>(undefined)
  const [error, setError] = useState<string | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const getLocation = (): Promise<{ lat: number; lon: number }> => {
      return new Promise((resolve) => {
        if (!navigator.geolocation) {
          console.warn("Geolocation is not supported")
          resolve(DEFAULT_LOCATION)
          return
        }

        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            })
          },
          (error) => {
            console.warn("Geolocation error:", error.message)
            resolve(DEFAULT_LOCATION)
          },
          { timeout: 5000, enableHighAccuracy: true },
        )
      })
    }

    const fetchWeather = async () => {
      if (!isMounted) return

      try {
        if (!process.env.NEXT_PUBLIC_WEATHERAPI_KEY) {
          throw new Error("Weather API key is not configured")
        }

        const coords = await getLocation()
        console.log("Using coordinates:", coords)

        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHERAPI_KEY}&q=${coords.lat},${coords.lon}`,
          { headers: { Accept: "application/json" } },
        )

        if (!response.ok) {
          throw new Error(`Weather API error: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()
        console.log("Weather data:", data)

        if (!data.current || !data.current.condition) {
          throw new Error("Invalid weather data format")
        }

        const condition = data.current.condition.text.toLowerCase()
        let mappedWeather: WeatherType = "clear"

        if (condition.includes("rain") || condition.includes("drizzle")) {
          mappedWeather = "rainy"
        } else if (condition.includes("snow") || condition.includes("sleet")) {
          mappedWeather = "snowy"
        } else if (condition.includes("cloud") || condition.includes("overcast")) {
          mappedWeather = "cloudy"
        }

        if (isMounted) {
          setWeather(mappedWeather)
          setTemperature(Math.round(data.current.temp_c))
          setLocation(data.location.name)
          setError(undefined)
        }
      } catch (err) {
        console.error("Weather fetch error:", err)
        if (isMounted) {
          const simulatedWeather = simulateWeather()
          setWeather(simulatedWeather.weather)
          setTemperature(simulatedWeather.temperature)
          setLocation("Local Area")
          setError(err instanceof Error ? err.message : "Failed to fetch weather data")
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchWeather()
    const interval = setInterval(fetchWeather, 5 * 60 * 1000)

    return () => {
      isMounted = false
      clearInterval(interval)
    }
  }, [])

  const contextValue: WeatherContextType = {
    weather,
    setWeather,
    temperature,
    location,
    error,
    isLoading,
  }

  return <WeatherContext.Provider value={contextValue}>{children}</WeatherContext.Provider>
}

export const useWeather = () => {
  const context = useContext(WeatherContext)
  if (context === undefined) {
    throw new Error("useWeather must be used within a WeatherProvider")
  }
  return context
}

function simulateWeather(): { weather: WeatherType; temperature: number } {
  const hour = new Date().getHours()
  let weather: WeatherType = "clear"
  let temperature: number

  if (hour >= 6 && hour < 12) {
    weather = "clear"
    temperature = 18 + Math.floor(Math.random() * 5)
  } else if (hour >= 12 && hour < 18) {
    weather = Math.random() > 0.7 ? "cloudy" : "clear"
    temperature = 22 + Math.floor(Math.random() * 7)
  } else if (hour >= 18 && hour < 22) {
    weather = Math.random() > 0.5 ? "cloudy" : "clear"
    temperature = 16 + Math.floor(Math.random() * 5)
  } else {
    weather = Math.random() > 0.8 ? "rainy" : "clear"
    temperature = 12 + Math.floor(Math.random() * 5)
  }

  return { weather, temperature }
}

