import { Theme, TimeOfDay, WeatherCondition } from "@/types/theme"

const createTimeBasedTheme = (timeOfDay: TimeOfDay): Theme => {
  const themes: Record<TimeOfDay, Theme> = {
    dawn: {
      name: "Dawn",
      timeOfDay: "dawn",
      properties: {
        background: "hsl(220, 20%, 97%)",
        foreground: "hsl(220, 20%, 10%)",
        primary: "hsl(220, 60%, 50%)",
        secondary: "hsl(220, 30%, 90%)",
        accent: "hsl(280, 60%, 50%)",
        muted: "hsl(220, 20%, 94%)",
        border: "hsl(220, 20%, 88%)",
        card: "hsl(220, 20%, 99%)",
        popover: "hsl(220, 20%, 99%)",
        overlay: "hsla(220, 20%, 97%, 0.8)"
      },
      effects: {
        saturation: 0.9,
        brightness: 1.1
      }
    },
    earlyMorning: {
      name: "Early Morning",
      timeOfDay: "earlyMorning",
      properties: {
        background: "hsl(40, 30%, 98%)",
        foreground: "hsl(40, 20%, 10%)",
        primary: "hsl(40, 60%, 50%)",
        secondary: "hsl(40, 30%, 90%)",
        accent: "hsl(20, 60%, 50%)",
        muted: "hsl(40, 20%, 94%)",
        border: "hsl(40, 20%, 88%)",
        card: "hsl(40, 20%, 99%)",
        popover: "hsl(40, 20%, 99%)",
        overlay: "hsla(40, 30%, 98%, 0.8)"
      },
      effects: {
        saturation: 1,
        brightness: 1.2
      }
    },
    midMorning: {
      name: "Mid Morning",
      timeOfDay: "midMorning",
      properties: {
        background: "hsl(45, 40%, 98%)",
        foreground: "hsl(45, 20%, 10%)",
        primary: "hsl(45, 70%, 50%)",
        secondary: "hsl(45, 30%, 90%)",
        accent: "hsl(25, 70%, 50%)",
        muted: "hsl(45, 20%, 94%)",
        border: "hsl(45, 20%, 88%)",
        card: "hsl(45, 20%, 99%)",
        popover: "hsl(45, 20%, 99%)",
        overlay: "hsla(45, 40%, 98%, 0.8)"
      },
      effects: {
        saturation: 1.1,
        brightness: 1.3
      }
    },
    lateMorning: {
      name: "Late Morning",
      timeOfDay: "lateMorning",
      properties: {
        background: "hsl(50, 45%, 98%)",
        foreground: "hsl(50, 20%, 10%)",
        primary: "hsl(50, 75%, 50%)",
        secondary: "hsl(50, 30%, 90%)",
        accent: "hsl(30, 75%, 50%)",
        muted: "hsl(50, 20%, 94%)",
        border: "hsl(50, 20%, 88%)",
        card: "hsl(50, 20%, 99%)",
        popover: "hsl(50, 20%, 99%)",
        overlay: "hsla(50, 45%, 98%, 0.8)"
      },
      effects: {
        saturation: 1.15,
        brightness: 1.35
      }
    },
    earlyNoon: {
      name: "Early Noon",
      timeOfDay: "earlyNoon",
      properties: {
        background: "hsl(180, 25%, 98%)",
        foreground: "hsl(180, 20%, 10%)",
        primary: "hsl(180, 70%, 45%)",
        secondary: "hsl(180, 30%, 90%)",
        accent: "hsl(140, 70%, 45%)",
        muted: "hsl(180, 20%, 94%)",
        border: "hsl(180, 20%, 88%)",
        card: "hsl(180, 20%, 99%)",
        popover: "hsl(180, 20%, 99%)",
        overlay: "hsla(180, 25%, 98%, 0.8)"
      },
      effects: {
        saturation: 1.2,
        brightness: 1.4,
        contrast: 1.05
      }
    },
    noon: {
      name: "Noon",
      timeOfDay: "noon",
      properties: {
        background: "hsl(200, 20%, 98%)",
        foreground: "hsl(200, 20%, 10%)",
        primary: "hsl(200, 80%, 50%)",
        secondary: "hsl(200, 30%, 90%)",
        accent: "hsl(160, 80%, 50%)",
        muted: "hsl(200, 20%, 94%)",
        border: "hsl(200, 20%, 88%)",
        card: "hsl(200, 20%, 99%)",
        popover: "hsl(200, 20%, 99%)",
        overlay: "hsla(200, 20%, 98%, 0.8)"
      },
      effects: {
        saturation: 1.2,
        brightness: 1.4,
        contrast: 1.1
      }
    },
    lateNoon: {
      name: "Late Noon",
      timeOfDay: "lateNoon",
      properties: {
        background: "hsl(190, 25%, 98%)",
        foreground: "hsl(190, 20%, 10%)",
        primary: "hsl(190, 75%, 45%)",
        secondary: "hsl(190, 30%, 90%)",
        accent: "hsl(150, 75%, 45%)",
        muted: "hsl(190, 20%, 94%)",
        border: "hsl(190, 20%, 88%)",
        card: "hsl(190, 20%, 99%)",
        popover: "hsl(190, 20%, 99%)",
        overlay: "hsla(190, 25%, 98%, 0.8)"
      },
      effects: {
        saturation: 1.15,
        brightness: 1.35,
        contrast: 1.05
      }
    },
    earlyAfternoon: {
      name: "Early Afternoon",
      timeOfDay: "earlyAfternoon",
      properties: {
        background: "hsl(210, 30%, 98%)",
        foreground: "hsl(210, 20%, 10%)",
        primary: "hsl(210, 70%, 50%)",
        secondary: "hsl(210, 30%, 90%)",
        accent: "hsl(170, 70%, 50%)",
        muted: "hsl(210, 20%, 94%)",
        border: "hsl(210, 20%, 88%)",
        card: "hsl(210, 20%, 99%)",
        popover: "hsl(210, 20%, 99%)",
        overlay: "hsla(210, 30%, 98%, 0.8)"
      },
      effects: {
        saturation: 1.1,
        brightness: 1.3
      }
    },
    midAfternoon: {
      name: "Mid Afternoon",
      timeOfDay: "midAfternoon",
      properties: {
        background: "hsl(220, 35%, 97%)",
        foreground: "hsl(220, 20%, 10%)",
        primary: "hsl(220, 65%, 55%)",
        secondary: "hsl(220, 30%, 90%)",
        accent: "hsl(180, 65%, 55%)",
        muted: "hsl(220, 20%, 94%)",
        border: "hsl(220, 20%, 88%)",
        card: "hsl(220, 20%, 99%)",
        popover: "hsl(220, 20%, 99%)",
        overlay: "hsla(220, 35%, 97%, 0.8)"
      },
      effects: {
        saturation: 1.05,
        brightness: 1.25
      }
    },
    lateAfternoon: {
      name: "Late Afternoon",
      timeOfDay: "lateAfternoon",
      properties: {
        background: "hsl(230, 40%, 96%)",
        foreground: "hsl(230, 20%, 10%)",
        primary: "hsl(230, 60%, 60%)",
        secondary: "hsl(230, 30%, 90%)",
        accent: "hsl(190, 60%, 60%)",
        muted: "hsl(230, 20%, 94%)",
        border: "hsl(230, 20%, 88%)",
        card: "hsl(230, 20%, 98%)",
        popover: "hsl(230, 20%, 98%)",
        overlay: "hsla(230, 40%, 96%, 0.8)"
      },
      effects: {
        saturation: 1,
        brightness: 1.2
      }
    },
    sunset: {
      name: "Sunset",
      timeOfDay: "sunset",
      properties: {
        background: "hsl(20, 45%, 95%)",
        foreground: "hsl(20, 20%, 10%)",
        primary: "hsl(20, 80%, 55%)",
        secondary: "hsl(20, 30%, 90%)",
        accent: "hsl(340, 80%, 55%)",
        muted: "hsl(20, 20%, 94%)",
        border: "hsl(20, 20%, 88%)",
        card: "hsl(20, 20%, 97%)",
        popover: "hsl(20, 20%, 97%)",
        overlay: "hsla(20, 45%, 95%, 0.8)"
      },
      effects: {
        saturation: 1.1,
        brightness: 1.15
      }
    },
    dusk: {
      name: "Dusk",
      timeOfDay: "dusk",
      properties: {
        background: "hsl(250, 30%, 20%)",
        foreground: "hsl(250, 20%, 90%)",
        primary: "hsl(250, 70%, 70%)",
        secondary: "hsl(250, 30%, 30%)",
        accent: "hsl(310, 70%, 70%)",
        muted: "hsl(250, 20%, 25%)",
        border: "hsl(250, 20%, 30%)",
        card: "hsl(250, 20%, 22%)",
        popover: "hsl(250, 20%, 22%)",
        overlay: "hsla(250, 30%, 20%, 0.8)"
      },
      effects: {
        saturation: 0.9,
        brightness: 1
      }
    },
    earlyEvening: {
      name: "Early Evening",
      timeOfDay: "earlyEvening",
      properties: {
        background: "hsl(240, 25%, 15%)",
        foreground: "hsl(240, 20%, 90%)",
        primary: "hsl(240, 65%, 65%)",
        secondary: "hsl(240, 30%, 25%)",
        accent: "hsl(300, 65%, 65%)",
        muted: "hsl(240, 20%, 20%)",
        border: "hsl(240, 20%, 25%)",
        card: "hsl(240, 20%, 17%)",
        popover: "hsl(240, 20%, 17%)",
        overlay: "hsla(240, 25%, 15%, 0.8)"
      },
      effects: {
        saturation: 0.85,
        brightness: 0.95
      }
    },
    evening: {
      name: "Evening",
      timeOfDay: "evening",
      properties: {
        background: "hsl(235, 20%, 12%)",
        foreground: "hsl(235, 20%, 90%)",
        primary: "hsl(235, 60%, 60%)",
        secondary: "hsl(235, 30%, 22%)",
        accent: "hsl(295, 60%, 60%)",
        muted: "hsl(235, 20%, 17%)",
        border: "hsl(235, 20%, 22%)",
        card: "hsl(235, 20%, 14%)",
        popover: "hsl(235, 20%, 14%)",
        overlay: "hsla(235, 20%, 12%, 0.8)"
      },
      effects: {
        saturation: 0.8,
        brightness: 0.9
      }
    },
    lateEvening: {
      name: "Late Evening",
      timeOfDay: "lateEvening",
      properties: {
        background: "hsl(230, 20%, 10%)",
        foreground: "hsl(230, 20%, 90%)",
        primary: "hsl(230, 55%, 55%)",
        secondary: "hsl(230, 30%, 20%)",
        accent: "hsl(290, 55%, 55%)",
        muted: "hsl(230, 20%, 15%)",
        border: "hsl(230, 20%, 20%)",
        card: "hsl(230, 20%, 12%)",
        popover: "hsl(230, 20%, 12%)",
        overlay: "hsla(230, 20%, 10%, 0.8)"
      },
      effects: {
        saturation: 0.75,
        brightness: 0.85
      }
    },
    night: {
      name: "Night",
      timeOfDay: "night",
      properties: {
        background: "hsl(230, 20%, 8%)",
        foreground: "hsl(230, 20%, 90%)",
        primary: "hsl(230, 50%, 50%)",
        secondary: "hsl(230, 30%, 18%)",
        accent: "hsl(290, 50%, 50%)",
        muted: "hsl(230, 20%, 13%)",
        border: "hsl(230, 20%, 18%)",
        card: "hsl(230, 20%, 10%)",
        popover: "hsl(230, 20%, 10%)",
        overlay: "hsla(230, 20%, 8%, 0.8)"
      },
      effects: {
        saturation: 0.7,
        brightness: 0.8
      }
    },
    deepNight: {
      name: "Deep Night",
      timeOfDay: "deepNight",
      properties: {
        background: "hsl(225, 20%, 5%)",
        foreground: "hsl(225, 20%, 90%)",
        primary: "hsl(225, 45%, 45%)",
        secondary: "hsl(225, 30%, 15%)",
        accent: "hsl(285, 45%, 45%)",
        muted: "hsl(225, 20%, 10%)",
        border: "hsl(225, 20%, 15%)",
        card: "hsl(225, 20%, 7%)",
        popover: "hsl(225, 20%, 7%)",
        overlay: "hsla(225, 20%, 5%, 0.8)"
      },
      effects: {
        saturation: 0.65,
        brightness: 0.75
      }
    },
    midnight: {
      name: "Midnight",
      timeOfDay: "midnight",
      properties: {
        background: "hsl(220, 20%, 3%)",
        foreground: "hsl(220, 20%, 90%)",
        primary: "hsl(220, 40%, 40%)",
        secondary: "hsl(220, 30%, 13%)",
        accent: "hsl(280, 40%, 40%)",
        muted: "hsl(220, 20%, 8%)",
        border: "hsl(220, 20%, 13%)",
        card: "hsl(220, 20%, 5%)",
        popover: "hsl(220, 20%, 5%)",
        overlay: "hsla(220, 20%, 3%, 0.8)"
      },
      effects: {
        saturation: 0.6,
        brightness: 0.7
      }
    }
  }

  return themes[timeOfDay]
}

const applyWeatherEffect = (baseTheme: Theme, weather: WeatherCondition): Theme => {
  const theme = { ...baseTheme }
  
  switch (weather.type) {
    case "cloudy":
      theme.effects = {
        ...theme.effects,
        saturation: (theme.effects?.saturation || 1) * (1 - weather.intensity * 0.3),
        brightness: (theme.effects?.brightness || 1) * (1 - weather.intensity * 0.2),
        contrast: (theme.effects?.contrast || 1) * (1 - weather.intensity * 0.1)
      }
      theme.properties.overlay = adjustOverlayForWeather(theme.properties.overlay, "cloudy", weather.intensity)
      break
      
    case "lightRain":
      theme.effects = {
        ...theme.effects,
        saturation: (theme.effects?.saturation || 1) * (1 - weather.intensity * 0.2),
        brightness: (theme.effects?.brightness || 1) * (1 - weather.intensity * 0.15),
        blur: (theme.effects?.blur || 0) + weather.intensity * 2
      }
      theme.properties.overlay = adjustOverlayForWeather(theme.properties.overlay, "rain", weather.intensity)
      break
      
    case "heavyRain":
      theme.effects = {
        ...theme.effects,
        saturation: (theme.effects?.saturation || 1) * (1 - weather.intensity * 0.4),
        brightness: (theme.effects?.brightness || 1) * (1 - weather.intensity * 0.3),
        blur: (theme.effects?.blur || 0) + weather.intensity * 4
      }
      theme.properties.overlay = adjustOverlayForWeather(theme.properties.overlay, "heavyRain", weather.intensity)
      break
      
    // Add more weather effects...
  }
  
  return theme
}

const adjustOverlayForWeather = (baseOverlay: string, weatherType: string, intensity: number): string => {
  const baseHsla = parseHsla(baseOverlay)
  
  switch (weatherType) {
    case "cloudy":
      return `hsla(${baseHsla.h}, ${baseHsla.s}%, ${baseHsla.l}%, ${baseHsla.a + intensity * 0.2})`
    case "rain":
      return `hsla(230, ${baseHsla.s}%, ${baseHsla.l}%, ${baseHsla.a + intensity * 0.3})`
    case "heavyRain":
      return `hsla(230, ${baseHsla.s}%, ${Math.max(0, baseHsla.l - intensity * 10)}%, ${baseHsla.a + intensity * 0.4})`
    default:
      return baseOverlay
  }
}

const parseHsla = (hsla: string): { h: number; s: number; l: number; a: number } => {
  const matches = hsla.match(/hsla?\((\d+),\s*(\d+)%,\s*(\d+)%(?:,\s*(\d*\.?\d+))?\)/)
  if (!matches) return { h: 0, s: 0, l: 0, a: 1 }
  
  return {
    h: parseInt(matches[1], 10),
    s: parseInt(matches[2], 10),
    l: parseInt(matches[3], 10),
    a: matches[4] ? parseFloat(matches[4]) : 1
  }
}

export const getTheme = (timeOfDay: TimeOfDay, weather?: WeatherCondition): Theme => {
  const baseTheme = createTimeBasedTheme(timeOfDay)
  return weather ? applyWeatherEffect(baseTheme, weather) : baseTheme
}

export const getTimeOfDay = (): TimeOfDay => {
  const hour = new Date().getHours()
  
  // Early morning and dawn
  if (hour >= 5 && hour < 7) return "dawn"
  if (hour >= 7 && hour < 9) return "earlyMorning"
  
  // Morning progression
  if (hour >= 9 && hour < 10) return "midMorning"
  if (hour >= 10 && hour < 11) return "lateMorning"
  
  // Noon progression
  if (hour >= 11 && hour < 12) return "earlyNoon"
  if (hour === 12) return "noon"
  if (hour === 13) return "lateNoon"
  
  // Afternoon progression
  if (hour === 14) return "earlyAfternoon"
  if (hour === 15) return "midAfternoon"
  if (hour >= 16 && hour < 17) return "lateAfternoon"
  
  // Evening transition
  if (hour >= 17 && hour < 18) return "sunset"
  if (hour >= 18 && hour < 19) return "dusk"
  if (hour >= 19 && hour < 20) return "earlyEvening"
  if (hour >= 20 && hour < 21) return "evening"
  if (hour >= 21 && hour < 22) return "lateEvening"
  
  // Night progression
  if (hour >= 22 && hour < 23) return "night"
  if (hour === 23) return "deepNight"
  return "midnight" // 0-4 hours
} 