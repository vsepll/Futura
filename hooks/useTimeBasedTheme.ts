"use client"

import { useState, useEffect } from "react"

type Theme = "morning" | "midday" | "afternoon" | "night"

export function useTimeBasedTheme() {
  const [theme, setTheme] = useState<Theme>("morning")

  useEffect(() => {
    const updateTheme = () => {
      const hour = new Date().getHours()
      if (hour >= 5 && hour < 12) {
        setTheme("morning")
      } else if (hour >= 12 && hour < 17) {
        setTheme("midday")
      } else if (hour >= 17 && hour < 20) {
        setTheme("afternoon")
      } else {
        setTheme("night")
      }
    }

    updateTheme()
    const interval = setInterval(updateTheme, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [])

  return theme
}

