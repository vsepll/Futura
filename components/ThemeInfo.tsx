"use client"

import { useTheme } from "@/contexts/ThemeContext"
import { Cloud, CloudRain, CloudSnow, Sun, CloudFog, Moon, Sunrise, Sunset } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

const WeatherIcon = ({ type, className = "h-4 w-4" }: { type: string; className?: string }) => {
  switch (type) {
    case "cloudy":
      return <Cloud className={className} />
    case "lightRain":
    case "heavyRain":
      return <CloudRain className={className} />
    case "snow":
      return <CloudSnow className={className} />
    case "fog":
      return <CloudFog className={className} />
    default:
      return <Sun className={className} />
  }
}

const TimeIcon = ({ hour, className = "h-4 w-4" }: { hour: number; className?: string }) => {
  switch (true) {
    case hour >= 5 && hour < 12:
      return <Sunrise className={className} />
    case hour >= 12 && hour < 17:
      return <Sun className={className} />
    case hour >= 17 && hour < 20:
      return <Sunset className={className} />
    default:
      return <Moon className={className} />
  }
}

export function ThemeInfo() {
  const { theme, currentTime, currentWeather } = useTheme()
  const hour = new Date().getHours()
  const [isLastSection, setIsLastSection] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsLastSection(entry.isIntersecting)
      },
      { threshold: 0.5 }
    )

    const contactSection = document.querySelector('section:last-of-type')
    if (contactSection) {
      observer.observe(contactSection)
    }

    return () => observer.disconnect()
  }, [])

  if (!isLastSection) return null

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="fixed right-6 md:bottom-[150px] bottom-6 backdrop-blur-md rounded-full p-2 md:p-3 shadow-lg border border-border/10 flex items-center gap-2 md:gap-3 hover:gap-3 md:hover:gap-4 transition-all duration-300 group z-50"
      style={{
        background: `linear-gradient(135deg, ${theme.properties.background}80 0%, ${theme.properties.background}90 100%)`,
      }}
    >
      {/* Time and Theme Info */}
      <div className="flex items-center gap-2">
        <motion.div 
          className="p-1 md:p-1.5 rounded-full bg-primary/10 text-primary/80"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <TimeIcon hour={hour} className="h-3 w-3 md:h-4 md:w-4" />
        </motion.div>
        <div className="text-[10px] md:text-xs font-medium tracking-wide text-foreground/80">
          {currentTime}
        </div>
      </div>

      <div className="h-3 w-px bg-border/10 group-hover:h-4 transition-all duration-300" />
      
      {/* Weather Info */}
      {currentWeather && (
        <div className="flex items-center gap-2">
          <motion.div 
            className="p-1 md:p-1.5 rounded-full bg-primary/10 text-primary/80"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <WeatherIcon type={currentWeather.type} className="h-3 w-3 md:h-4 md:w-4" />
          </motion.div>
          <div className="text-[10px] md:text-xs font-medium tracking-wide text-foreground/80 capitalize">
            {theme.name}
          </div>
        </div>
      )}
    </motion.div>
  )
} 