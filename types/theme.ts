export type TimeOfDay = 
  | "dawn" | "earlyMorning" | "midMorning" | "lateMorning" 
  | "earlyNoon" | "noon" | "lateNoon" 
  | "earlyAfternoon" | "midAfternoon" | "lateAfternoon" 
  | "sunset" | "dusk" | "earlyEvening" | "evening" 
  | "lateEvening" | "night" | "deepNight" | "midnight"

export type WeatherCondition = {
  type: "clear" | "partlyCloudy" | "cloudy" | "lightRain" | "heavyRain" | "storm" | "snow" | "fog"
  intensity: number // 0-1
}

export type ThemeProperties = {
  background: string
  foreground: string
  primary: string
  secondary: string
  accent: string
  muted: string
  border: string
  card: string
  popover: string
  overlay: string
}

export type Theme = {
  name: string
  timeOfDay: TimeOfDay
  weather?: WeatherCondition
  properties: ThemeProperties
  effects?: {
    blur?: number
    saturation?: number
    brightness?: number
    contrast?: number
  }
} 