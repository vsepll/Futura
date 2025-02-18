"use client"

import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import debounce from 'lodash/debounce';

import { Button } from "@/components/ui/button";
import Model3DViewer from "@/components/Model3DViewer";
import { getFeaturedProject, getAllProjects } from "@/config/projects";
import { useTheme } from "@/contexts/ThemeContext";

const AnimatedLogo = ({ isHeroVisible, asteriskColor }: { isHeroVisible: boolean; asteriskColor: string }) => {
  return (
    <motion.div 
      className="fixed top-6 left-6 z-50 font-space-grotesk font-bold"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: isHeroVisible ? 0 : 1,
        scale: isHeroVisible ? 0.8 : 1,
        y: isHeroVisible ? -20 : 0
      }}
      transition={{
        duration: 0.4,
        ease: [0.23, 1, 0.32, 1]
      }}
    >
      <motion.div
        className="flex items-baseline"
        animate={{
          width: isHeroVisible ? "auto" : "1.5rem"
        }}
        transition={{
          duration: 0.4,
          ease: [0.23, 1, 0.32, 1]
        }}
      >
        <motion.span
          className="block overflow-hidden whitespace-nowrap"
          animate={{
            width: isHeroVisible ? "auto" : "0.875rem"
          }}
          transition={{
            duration: 0.4,
            ease: [0.23, 1, 0.32, 1]
          }}
        >
          Futura
        </motion.span>
        <motion.span
          className="text-lg"
          style={{ color: asteriskColor }}
          animate={{
            scale: isHeroVisible ? 0.8 : 1
          }}
          transition={{
            duration: 0.4,
            ease: [0.23, 1, 0.32, 1]
          }}
        >
          *
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

export default function Home() {
  const featuredProject = getFeaturedProject();
  const allProjects = getAllProjects().filter(p => !p.featured);
  const [showModel, setShowModel] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const { currentWeather, theme } = useTheme();
  const prefersReducedMotion = useReducedMotion();
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  // Debounced scroll handler for better performance
  const handleScroll = useCallback(
    debounce(() => {
      const newScrollY = window.scrollY;
      setScrollY(newScrollY);
      
      // Calculate hero visibility based on scroll position
      const heroHeight = window.innerHeight;
      const scrollProgress = newScrollY / heroHeight;
      setIsHeroVisible(scrollProgress < 0.2); // Trigger animation earlier
    }, 5), // Reduced debounce time for more responsive animation
    []
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      handleScroll.cancel();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  // Disable 3D model on mobile for better performance
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    setShowModel(!isMobile);
  }, []);

  useEffect(() => {
    // Check if the document fonts are loaded
    if (document.fonts) {
      document.fonts.ready.then(() => {
        setIsFontLoaded(true);
      });
    } else {
      // Fallback for browsers that don't support document.fonts
      setIsFontLoaded(true);
    }
  }, []);

  // Function to get dithering pattern based on weather
  const getDitheringPattern = () => {
    if (!currentWeather) return {
      color: theme.properties.primary,
      opacity: 0.2,
      size: '6px',
      background: 'rgba(0, 0, 0, 0.03)'
    };

    switch (currentWeather.type) {
      case "lightRain":
        return {
          color: theme.properties.primary,
          opacity: 0.15 + (currentWeather.intensity * 0.08),
          size: '4px',
          background: 'rgba(0, 0, 0, 0.03)'
        };
      case "heavyRain":
        return {
          color: theme.properties.primary,
          opacity: 0.2 + (currentWeather.intensity * 0.08),
          size: '3px',
          background: 'rgba(0, 0, 0, 0.04)'
        };
      case "cloudy":
        return {
          color: theme.properties.primary,
          opacity: 0.15 + (currentWeather.intensity * 0.08),
          size: '8px',
          background: 'rgba(0, 0, 0, 0.03)'
        };
      case "snow":
        return {
          color: theme.properties.primary,
          opacity: 0.2 + (currentWeather.intensity * 0.08),
          size: '6px',
          background: 'rgba(0, 0, 0, 0.02)'
        };
      case "fog":
        return {
          color: theme.properties.primary,
          opacity: 0.15 + (currentWeather.intensity * 0.08),
          size: '10px',
          background: 'rgba(0, 0, 0, 0.03)'
        };
      default:
        return {
          color: theme.properties.primary,
          opacity: 0.2,
          size: '6px',
          background: 'rgba(0, 0, 0, 0.03)'
        };
    }
  };

  const ditheringPattern = getDitheringPattern();

  // Function to get asterisk color based on weather
  const getAsteriskColor = () => {
    if (!currentWeather) return theme.properties.primary;

    switch (currentWeather.type) {
      case "lightRain":
      case "heavyRain":
      case "cloudy":
      case "snow":
      case "fog":
        return theme.properties.primary;
      default:
        return theme.properties.primary;
    }
  };

  const asteriskColor = getAsteriskColor();

  // Simplified animations for mobile
  const fadeInAnimation = prefersReducedMotion || !isFontLoaded
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8 }
      };

  const scaleAnimation = prefersReducedMotion || !isFontLoaded
    ? {}
    : {
        initial: { scale: 0.8, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        transition: { duration: 0.5, delay: 0.2 }
      };

  // Add a loading state class to control initial visibility
  const titleClasses = `text-5xl md:text-7xl font-bold mb-6 relative flex items-baseline justify-center gap-3 font-space-grotesk tracking-tight ${!isFontLoaded ? 'opacity-0' : ''}`;

  return (
    <div className="h-screen w-full overflow-hidden flex flex-col">
      <AnimatedLogo isHeroVisible={isHeroVisible} asteriskColor={asteriskColor} />
      <main className="flex-1 overflow-y-auto overflow-x-hidden snap-y snap-mandatory fancy-scrollbar">
        {/* Hero Section */}
        <section className="relative min-h-screen w-full flex items-center justify-center snap-start snap-always overflow-hidden">
          <div 
            className="absolute inset-0 bg-gradient-to-br from-background via-background to-background"
            style={{
              transform: prefersReducedMotion ? 'none' : `translateY(${scrollY * 0.5}px)`,
            }}
          >
            <div 
              className="absolute inset-0 transition-all duration-1000"
              style={{
                background: ditheringPattern.background,
                backgroundImage: `
                  repeating-radial-gradient(
                    circle at 50% 50%,
                    ${ditheringPattern.color} 0px,
                    rgba(0, 0, 0, 0.8) 1px,
                    transparent ${ditheringPattern.size}
                  )
                `,
                backgroundSize: `${ditheringPattern.size} ${ditheringPattern.size}`,
                opacity: ditheringPattern.opacity * (isHeroVisible ? 1 : 0),
                mixBlendMode: 'soft-light',
                transform: `scale(${isHeroVisible ? 1 : 1.1})`,
              }}
            />
          </div>
          <motion.div 
            {...fadeInAnimation}
            className="container mx-auto px-4 relative -mt-16"
            style={{
              opacity: isHeroVisible ? 1 : 0,
              transform: `translateY(${isHeroVisible ? '0' : '-60px'}) scale(${isHeroVisible ? 1 : 0.95})`,
              transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                {...scaleAnimation}
                className="relative"
              >
                <h1 className={titleClasses}>
                  <div className="relative">
                    <span className="absolute inset-0 text-foreground">
                      Futura
                      <span className="font-normal ml-1" style={{ color: asteriskColor, position: 'relative', zIndex: 10 }}>*</span>
                    </span>
                    <span className="relative text-transparent">
                      <motion.span 
                        className="absolute inset-0"
                        style={{
                          color: 'var(--foreground)',
                          maskImage: `
                            repeating-linear-gradient(
                              0deg,
                              black,
                              black 1px,
                              transparent 1px,
                              transparent 3px
                            )
                          `,
                          WebkitMaskImage: `
                            repeating-linear-gradient(
                              0deg,
                              black,
                              black 1px,
                              transparent 1px,
                              transparent 3px
                            )
                          `
                        }}
                        animate={{
                          maskPosition: ["0px 0px", "0px -20px"],
                          WebkitMaskPosition: ["0px 0px", "0px -20px"],
                          color: [
                            'var(--foreground)',
                            'rgb(255, 140, 0)',
                            'rgb(64, 224, 208)',
                            'rgb(238, 130, 238)',
                            'var(--foreground)'
                          ]
                        }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                          ease: "linear",
                          color: {
                            duration: 3,
                            repeat: 0,
                            ease: "easeInOut",
                            times: [0, 0.25, 0.5, 0.75, 1]
                          }
                        }}
                      >
                        Futura
                        <span className="font-normal ml-1" style={{ color: asteriskColor, position: 'relative', zIndex: 10 }}>*</span>
                      </motion.span>
                      <motion.span 
                        className="absolute inset-0"
                        style={{
                          background: `
                            repeating-radial-gradient(
                              circle at 50% 50%,
                              rgba(255, 255, 255, 0.01) 0px,
                              transparent 1px,
                              transparent 3px
                            )
                          `,
                          backgroundSize: '6px 6px',
                          mixBlendMode: 'plus-lighter'
                        }}
                        animate={{
                          backgroundPosition: ["0px 0px", "3px 3px"]
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      >
                        Futura 
                        <span className="font-normal ml-1" style={{ color: asteriskColor, position: 'relative', zIndex: 10 }}>*</span>
                      </motion.span>
                      Futura 
                      <span className="font-normal ml-1" style={{ color: asteriskColor, position: 'relative', zIndex: 10 }}>*</span>
                    </span>
                  </div>
                  <span className="text-foreground font-medium">
                    Studio
                  </span>
                </h1>
              </motion.div>
              <motion.p 
                {...fadeInAnimation}
                className="text-xl md:text-2xl text-primary/80 mb-8 font-light"
              >
                Crafting innovative digital experiences through design and technology.
              </motion.p>
              <motion.div
                {...fadeInAnimation}
              >
                <Button 
                  asChild 
                  size="lg" 
                  className="relative px-6 py-2.5 bg-background text-foreground/40 hover:text-orange-500 border border-foreground/10 hover:border-orange-500/50 rounded-full transition-all duration-300"
                >
                  <Link href="#projects" className="text-xs font-medium tracking-wide">
                    View Projects
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
          <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-background to-transparent"></div>
        </section>

        {/* Featured Project with 3D Model */}
        {featuredProject && (
          <motion.section 
            {...fadeInAnimation}
            className="relative h-screen w-full flex items-center justify-center snap-start snap-always overflow-hidden" 
            id="projects"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-background">
              <div 
                className="absolute inset-0 transition-opacity duration-1000" 
                style={{
                  backgroundImage: `
                    repeating-radial-gradient(
                      circle at 2px 2px,
                      ${ditheringPattern.color} 0px,
                      rgba(0, 0, 0, 0.8) 1px,
                      transparent ${ditheringPattern.size}
                    )
                  `,
                  backgroundSize: `${ditheringPattern.size} ${ditheringPattern.size}`,
                  opacity: ditheringPattern.opacity * 0.5,
                  mixBlendMode: 'soft-light'
                }}
              />
            </div>

            <div className="container mx-auto px-4 relative">
              <motion.div
                {...fadeInAnimation}
                className="mb-8"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-center">
                  <span className="text-primary">Featured</span> Project
                </h2>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-8 items-center">
                {/* Only show 3D model on desktop */}
                {showModel && featuredProject.modelUrl && (
                  <motion.div
                    {...fadeInAnimation}
                    className="relative aspect-[4/3] bg-card rounded-2xl shadow-xl overflow-hidden border border-gray-100"
                  >
                    <Model3DViewer modelUrl={featuredProject.modelUrl} />
                  </motion.div>
                )}
                {/* Show static image on mobile */}
                {!showModel && featuredProject.modelUrl && (
                  <motion.div
                    {...fadeInAnimation}
                    className="relative aspect-[4/3] bg-card rounded-2xl shadow-xl overflow-hidden border border-gray-100"
                  >
                    <Image
                      src="/model-static.jpg"
                      alt={`${featuredProject.title} 3D Model Preview`}
                      fill
                      className="object-cover"
                      priority
                    />
                  </motion.div>
                )}

                {/* Project Info */}
                <motion.div {...fadeInAnimation} className="space-y-6">
                  <h3 className="text-3xl font-bold text-foreground">
                    {featuredProject.title}
                  </h3>
                  <p className="text-lg text-foreground leading-relaxed">
                    {featuredProject.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {featuredProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-1.5 bg-primary text-primary-foreground rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="pt-4">
                    <Button
                      asChild
                      className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                    >
                      <Link href={`/projects/${featuredProject.id}`}>
                        View Project Details
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Project Grid */}
        <section className="h-screen w-full bg-background snap-start snap-always overflow-y-auto">
          <div className="container h-full mx-auto px-4 py-8">
            <motion.h2 
              {...fadeInAnimation}
              className="text-3xl md:text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent"
            >
              Recent Projects
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  {...fadeInAnimation}
                  className="group bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <Link href={`/projects/${project.id}`} className="block">
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <Image
                        src={project.thumbnail || `/placeholder.svg?height=600&width=800&text=${project.title}`}
                        alt={project.title}
                        fill
                        loading="lazy"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-6">
                        <span className="text-foreground text-lg font-medium">
                          View Project Details
                        </span>
                      </div>
                    </div>
                  </Link>
                  <div className="p-8">
                    <h3 className="text-2xl font-semibold mb-4">{project.title}</h3>
                    <p className="text-foreground mb-6 line-clamp-2">{project.description}</p>
                    <div className="flex gap-2 mb-6 flex-wrap">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-sm bg-gray-100 text-foreground px-3 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      asChild
                      className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
                    >
                      <Link href={`/projects/${project.id}`}>Learn More</Link>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="h-screen w-full relative bg-gradient-to-br from-primary via-primary to-accent text-primary-foreground snap-start snap-always overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
          <motion.div 
            {...fadeInAnimation}
            className="container mx-auto px-4 relative"
          >
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6">Let's Create Something Amazing</h2>
              <p className="text-xl mb-10 text-primary-foreground/80">Have a project in mind or want to collaborate? I'd love to hear from you.</p>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="bg-background text-foreground hover:bg-background/90 hover:-translate-y-1 transition-all duration-300"
              >
                <Link href="mailto:contact@example.com">Get in Touch</Link>
              </Button>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
