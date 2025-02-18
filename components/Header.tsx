"use client"

import Link from "next/link"
import { Menu } from "lucide-react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { useTheme } from "@/contexts/ThemeContext"

export default function Header() {
  const [scrollY, setScrollY] = useState(0)
  const { currentWeather } = useTheme()

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100]">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="relative group">
          <motion.div 
            className="relative overflow-hidden"
            animate={{
              width: scrollY > 100 ? "1.5rem" : "auto",
            }}
            transition={{
              duration: 0.6,
              ease: [0.4, 0.0, 0.2, 1]
            }}
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-primary/30 rounded-md -m-2 p-2"
                animate={{
                  width: scrollY > 100 ? "2.5rem" : "100%",
                  height: "2rem",
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.4, 0.0, 0.2, 1]
                }}
              />
              <motion.span 
                className="text-xl font-bold font-space-grotesk inline-flex relative z-10"
                animate={{
                  scale: scrollY > 100 ? 0.9 : 1,
                }}
                transition={{ 
                  duration: 0.4,
                  ease: [0.4, 0.0, 0.2, 1]
                }}
              >
                F
                <motion.span
                  animate={{
                    opacity: scrollY > 100 ? 0 : 1,
                    width: scrollY > 100 ? 0 : "auto",
                    marginLeft: scrollY > 100 ? 0 : "0.1em",
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut"
                  }}
                >
                  utura
                </motion.span>
                <span className="font-normal">*</span>
              </motion.span>
            </div>
          </motion.div>
        </Link>
        <div className="hidden md:flex gap-8 text-sm">
          {["Home", "Projects", "About", "Contact"].map((item) => (
            <Link 
              key={item} 
              href={`/${item === "Home" ? "" : item.toLowerCase()}`} 
              className="relative hover:text-primary transition-colors group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </div>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </Button>
      </div>
    </nav>
  )
} 