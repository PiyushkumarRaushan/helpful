"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Typewriter from "typewriter-effect"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Search, Heart, Clock, Award } from "lucide-react"

// Category background images mapping
const categoryBackgrounds = {
  default: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
  education: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
  environment: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
  health: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
  animals: "https://images.unsplash.com/photo-1453227588063-bb302b62f50b?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
  community: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
  arts: "https://s.inyourpocket.com/gallery/helsinki/2019/11/natural-history-museum-4587057-1920.jpg",
}

export default function HeroSection() {
  const router = useRouter()
  const [location, setLocation] = useState("")
  const [category, setCategory] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const [backgroundImage, setBackgroundImage] = useState(categoryBackgrounds.default)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Update background when category changes
  useEffect(() => {
    if (category && categoryBackgrounds[category as keyof typeof categoryBackgrounds]) {
      setBackgroundImage(categoryBackgrounds[category as keyof typeof categoryBackgrounds])
    } else {
      setBackgroundImage(categoryBackgrounds.default)
    }
  }, [category])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (location) params.append("location", location)
    if (category) params.append("category", category)
    router.push(`/search?${params.toString()}`)
  }

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
            .then((res) => res.json())
            .then((data) => {
              setLocation(data.display_name) // Set real location name
            })
            .catch(() => {
              setLocation("Unable to fetch location")
            })
        },
        (error) => {
          console.error("Geolocation Error:", error)
          setLocation("Location access denied")
        }
      )
    } else {
      setLocation("Geolocation not supported")
    }
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <section 
      className="relative py-24 overflow-hidden transition-all duration-500"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Semi-transparent overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/10"
            style={{
              width: Math.random() * 300 + 50,
              height: Math.random() * 300 + 50,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 30 - 15],
              x: [0, Math.random() * 30 - 15],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <div className="container relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-12"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={staggerChildren}
        >
          <motion.div variants={fadeIn} className="mb-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
              Make a <span className="text-primary">Difference</span> in Your Community
            </h1>
          </motion.div>

          <motion.div variants={fadeIn} className="mb-8">
            <div className="text-xl text-white/90 h-16">
              <Typewriter
                options={{
                  strings: [
                    "Find volunteer opportunities that match your skills",
                    "Connect with causes you care about",
                    "Make an impact in your local community",
                    "Discover meaningful ways to give back",
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 40,
                  deleteSpeed: 20,
                }}
              />
            </div>
          </motion.div>

          <motion.div variants={fadeIn}>
            <div className="flex flex-wrap justify-center gap-6 mb-10">
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-3 rounded-lg shadow-sm">
                <Heart className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Change Lives</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-3 rounded-lg shadow-sm">
                <Clock className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Flexible Hours</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-3 rounded-lg shadow-sm">
                <Award className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Gain Experience</span>
              </div>
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSearch}
            className="grid sm:grid-cols-[1fr_auto_auto] gap-3 max-w-2xl mx-auto"
            variants={fadeIn}
          >
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Enter your location"
                className="pl-10 h-12 bg-white/90 backdrop-blur-sm border-primary/20 focus:border-primary"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={handleUseCurrentLocation}
              className="sm:w-auto w-full h-12 border-primary/20 hover:bg-primary"
            >
              Current Location
            </Button>
            <Button type="submit" className="sm:w-auto w-full h-12 shadow-md hover:shadow-lg transition-all">
              <Search className="h-4 w-4 mr-2" />
              Find Opportunities
            </Button>
          </motion.form>

          <motion.div variants={fadeIn} className="mt-6">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[200px] mx-auto bg-white/90 backdrop-blur-sm border-primary/20">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="environment">Environment</SelectItem>
                <SelectItem value="health">Health</SelectItem>
                <SelectItem value="animals">Animals</SelectItem>
                <SelectItem value="community">Community</SelectItem>
                <SelectItem value="arts">Arts & Culture</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}