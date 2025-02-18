"use client"

import { useTheme } from "@/contexts/ThemeContext"
import { WeatherCondition } from "@/types/theme"
import { Cloud, CloudRain, CloudSnow, Sun, AlertCircle, Loader2 } from "lucide-react"
import { motion } from "framer-motion"

const RainEffect = ({ intensity }: { intensity: number }) => {
  const dropCount = Math.floor(20 * intensity)
  
  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-blue-500/10" />
      <div className="rain-container">
        {Array.from({ length: dropCount }).map((_, i) => (
          <motion.div
            key={i}
            className="rain-drop"
            initial={{ y: -20, x: Math.random() * 100 + "%" }}
            animate={{ 
              y: "120vh",
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 0.8 + Math.random() * 0.5,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "linear"
            }}
            style={{
              width: 1 + Math.random() * intensity,
              height: 20 + Math.random() * 20 * intensity,
              background: `linear-gradient(180deg, 
                transparent 0%, 
                hsla(220, 60%, 50%, ${0.3 + intensity * 0.4}) 40%, 
                hsla(220, 60%, 50%, ${0.1 + intensity * 0.2}) 100%
              )`
            }}
          />
        ))}
      </div>
    </div>
  )
}

const SnowEffect = ({ intensity }: { intensity: number }) => {
  const flakeCount = Math.floor(30 * intensity)
  
  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/5" />
      <div className="snow-container">
        {Array.from({ length: flakeCount }).map((_, i) => (
          <motion.div
            key={i}
            className="snow-flake"
            initial={{ 
              y: -20, 
              x: Math.random() * 100 + "%",
              rotate: Math.random() * 360 
            }}
            animate={{ 
              y: "120vh",
              x: [
                Math.random() * 100 + "%",
                Math.random() * 100 + "%",
                Math.random() * 100 + "%"
              ],
              rotate: Math.random() * 360 * (Math.random() > 0.5 ? 1 : -1)
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "linear"
            }}
            style={{
              width: 4 + Math.random() * 4 * intensity,
              height: 4 + Math.random() * 4 * intensity,
              background: "white",
              borderRadius: "50%",
              opacity: 0.4 + Math.random() * 0.4
            }}
          />
        ))}
      </div>
    </div>
  )
}

const CloudyEffect = ({ intensity }: { intensity: number }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      <div 
        className="absolute inset-0 bg-gradient-to-b from-transparent"
        style={{
          background: `linear-gradient(180deg, 
            transparent 0%, 
            hsla(220, 20%, 90%, ${0.1 * intensity}) 20%, 
            hsla(220, 20%, 90%, ${0.2 * intensity}) 100%
          )`
        }}
      />
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-full h-32 opacity-50"
          style={{
            top: `${20 + i * 15}%`,
            background: `linear-gradient(180deg, 
              transparent 0%, 
              hsla(220, 20%, 90%, ${0.1 * intensity}) 40%, 
              hsla(220, 20%, 90%, ${0.2 * intensity}) 60%,
              transparent 100%
            )`
          }}
          animate={{
            x: ["-100%", "100%"]
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: "linear",
            delay: i * 2
          }}
        />
      ))}
    </div>
  )
}

const FogEffect = ({ intensity }: { intensity: number }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      <div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, 
            transparent 0%, 
            hsla(220, 20%, 90%, ${0.2 * intensity}) 20%, 
            hsla(220, 20%, 90%, ${0.3 * intensity}) 50%,
            hsla(220, 20%, 90%, ${0.2 * intensity}) 80%,
            transparent 100%
          )`
        }}
      />
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-full h-40"
          style={{
            top: `${15 + i * 20}%`,
            background: `linear-gradient(180deg, 
              transparent 0%, 
              hsla(220, 20%, 90%, ${0.15 * intensity}) 40%, 
              hsla(220, 20%, 90%, ${0.25 * intensity}) 60%,
              transparent 100%
            )`
          }}
          animate={{
            x: ["-100%", "100%"]
          }}
          transition={{
            duration: 25 + i * 7,
            repeat: Infinity,
            ease: "linear",
            delay: i * 3
          }}
        />
      ))}
    </div>
  )
}

const WeatherIcon = ({ weather }: { weather: WeatherCondition }) => {
  switch (weather.type) {
    case "lightRain":
    case "heavyRain":
      return <CloudRain className="h-5 w-5 text-blue-500" />
    case "snow":
      return <CloudSnow className="h-5 w-5 text-blue-200" />
    case "cloudy":
    case "partlyCloudy":
      return <Cloud className="h-5 w-5 text-gray-400" />
    case "fog":
      return <Cloud className="h-5 w-5 text-gray-300" />
    default:
      return <Sun className="h-5 w-5 text-yellow-400" />
  }
}

export const WeatherEffects = () => {
  const { theme } = useTheme()
  const { currentWeather: weather, currentTime, error, isLoading } = useTheme()

  if (!weather) return null

  return (
    <>
      <div
        className={`fixed top-4 right-4 z-50 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2 shadow-sm theme-${theme.timeOfDay}`}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
            <span className="text-sm font-medium text-gray-600">Loading weather...</span>
          </>
        ) : error ? (
          <>
            <AlertCircle className="h-5 w-5 text-yellow-500" />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-600">Weather unavailable</span>
              <span className="text-xs text-gray-500">{error}</span>
            </div>
          </>
        ) : (
          <>
            <WeatherIcon weather={weather} />
            <div className="flex flex-col">
              <span className="text-sm font-medium capitalize">{weather.type}</span>
              <span className="text-xs text-gray-500">
                Intensity: {Math.round(weather.intensity * 100)}%
              </span>
            </div>
          </>
        )}
      </div>
      {!isLoading && !error && (
        <>
          {weather.type === "lightRain" && <RainEffect intensity={weather.intensity} />}
          {weather.type === "heavyRain" && <RainEffect intensity={weather.intensity} />}
          {weather.type === "snow" && <SnowEffect intensity={weather.intensity} />}
          {weather.type === "cloudy" && <CloudyEffect intensity={weather.intensity} />}
          {weather.type === "fog" && <FogEffect intensity={weather.intensity} />}
        </>
      )}
    </>
  )
}

