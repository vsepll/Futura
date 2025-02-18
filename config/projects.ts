export interface Project {
  id: string
  title: string
  description: string
  modelUrl?: string
  tags: string[]
  thumbnail?: string
  featured?: boolean
  features?: string[]
  outcome?: string
}

export const projects: Project[] = [
  {
    id: "neon-horizon",
    title: "Neon Horizon",
    description: "A groundbreaking approach to UI design, merging holographic interfaces with tactile feedback systems. This project showcases the future of human-computer interaction, pushing the boundaries of what's possible in digital interfaces.",
    modelUrl: "/assets/3d/duck.glb",
    tags: ["Holographic Display", "Haptic Engines", "Machine Learning", "3D Modeling", "Unity"],
    features: [
      "Holographic user interface",
      "Haptic feedback integration",
      "Gesture-based controls",
      "Adaptive AI-driven user experience",
      "Cross-device compatibility"
    ],
    outcome: "Neon Horizon has been well-received in the tech community, garnering attention from leading companies and UX design forums. It's currently being developed into a prototype for further refinement.",
    featured: true
  },
  // Add more projects here
  {
    id: "project-2",
    title: "Smart Living",
    description: "Innovative home automation solutions that blend seamlessly with modern living spaces.",
    tags: ["IoT", "Home Automation", "UX Design"]
  },
  // Add more projects as needed
]

export function getFeaturedProject(): Project | undefined {
  return projects.find(project => project.featured)
}

export function getProjectById(id: string): Project | undefined {
  return projects.find(project => project.id === id)
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(project => project.id === slug)
}

export function getAllProjects(): Project[] {
  return projects
} 