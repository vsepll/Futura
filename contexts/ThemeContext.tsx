"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { Theme, WeatherCondition } from "@/types/theme"
import { getTheme, getTimeOfDay } from "@/config/themes"

type ThemeContextType = {
  theme: Theme
  currentTime: string
  currentWeather?: WeatherCondition
  error?: string
  isLoading: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getTheme(getTimeOfDay()))
  const [currentTime, setCurrentTime] = useState<string>("")
  const [currentWeather, setCurrentWeather] = useState<WeatherCondition>()
  const [error, setError] = useState<string>()
  const [isLoading, setIsLoading] = useState(true)

  // Update time only on client side
  useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString())
    
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString())
      
      // Update theme if hour changes
      const timeOfDay = getTimeOfDay()
      setTheme(getTheme(timeOfDay, currentWeather))
    }

    // Update every second for smooth time display
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [currentWeather])

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setIsLoading(true)
        // Get user's location
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject)
        })

        // Fetch weather data
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHERAPI_KEY}&q=${position.coords.latitude},${position.coords.longitude}`
        )

        if (!response.ok) throw new Error('Weather API error')

        const data = await response.json()
        const condition = data.current.condition.text.toLowerCase()
        const isDay = data.current.is_day === 1

        // Map API weather to our weather types
        let weatherType: WeatherCondition["type"] = "clear"
        let intensity = 0.5

        if (condition.includes("rain") || condition.includes("drizzle")) {
          weatherType = condition.includes("heavy") ? "heavyRain" : "lightRain"
          intensity = condition.includes("heavy") ? 0.8 : 0.4
        } else if (condition.includes("cloud") || condition.includes("overcast")) {
          weatherType = "cloudy"
          intensity = condition.includes("heavy") ? 0.7 : 0.4
        } else if (condition.includes("snow") || condition.includes("sleet")) {
          weatherType = "snow"
          intensity = condition.includes("heavy") ? 0.8 : 0.5
        } else if (condition.includes("fog") || condition.includes("mist")) {
          weatherType = "fog"
          intensity = 0.6
        }

        setCurrentWeather({ type: weatherType, intensity })
        setError(undefined)
      } catch (error) {
        console.error('Failed to fetch weather:', error)
        // Fallback to clear weather
        setCurrentWeather({ type: "clear", intensity: 0.5 })
        setError(error instanceof Error ? error.message : 'Failed to fetch weather data')
      } finally {
        setIsLoading(false)
      }
    }

    // Fetch weather initially and every 30 minutes
    fetchWeather()
    const interval = setInterval(fetchWeather, 30 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, currentTime, currentWeather, error, isLoading }}>
      <div 
        className="min-h-screen transition-all duration-1000"
        style={{
          background: theme.properties.background,
          color: theme.properties.foreground,
          filter: `
            brightness(${theme.effects?.brightness || 1})
            contrast(${theme.effects?.contrast || 1})
            saturate(${theme.effects?.saturation || 1})
            blur(${theme.effects?.blur || 0}px)
          `,
          '--background': theme.properties.background,
          '--foreground': theme.properties.foreground,
          '--card': theme.properties.card,
          '--card-foreground': theme.properties.foreground,
          '--popover': theme.properties.popover,
          '--popover-foreground': theme.properties.foreground,
          '--primary': theme.properties.primary,
          '--primary-foreground': theme.properties.background,
          '--secondary': theme.properties.secondary,
          '--secondary-foreground': theme.properties.foreground,
          '--muted': theme.properties.muted,
          '--muted-foreground': theme.properties.foreground,
          '--accent': theme.properties.accent,
          '--accent-foreground': theme.properties.background,
          '--border': theme.properties.border,
        } as React.CSSProperties}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

