"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Book, Leaf, Heart, PawPrintIcon as Paw, Users, Palette, Baby, Globe } from "lucide-react"

const categories = [
  { name: "Education", icon: Book, slug: "education", color: "bg-blue-50 text-blue-600 hover:bg-blue-100" },
  { name: "Environment", icon: Leaf, slug: "environment", color: "bg-green-50 text-green-600 hover:bg-green-100" },
  { name: "Health", icon: Heart, slug: "health", color: "bg-red-50 text-red-600 hover:bg-red-100" },
  { name: "Animals", icon: Paw, slug: "animals", color: "bg-amber-50 text-amber-600 hover:bg-amber-100" },
  { name: "Community", icon: Users, slug: "community", color: "bg-purple-50 text-purple-600 hover:bg-purple-100" },
  { name: "Arts & Culture", icon: Palette, slug: "arts", color: "bg-pink-50 text-pink-600 hover:bg-pink-100" },
  { name: "Children & Youth", icon: Baby, slug: "children", color: "bg-cyan-50 text-cyan-600 hover:bg-cyan-100" },
  {
    name: "International",
    icon: Globe,
    slug: "international",
    color: "bg-indigo-50 text-indigo-600 hover:bg-indigo-100",
  },
]

export default function CategoryFilter() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300 } },
  }

  return (
    <motion.div
      className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4"
      variants={container}
      initial="hidden"
      animate={isVisible ? "show" : "hidden"}
    >
      {categories.map((category) => (
        <motion.div key={category.slug} variants={item} whileHover={{ scale: 1.03 }} className="h-full">
          <Link
            href={`/search?category=${category.slug}`}
            className={`flex flex-col items-center p-4 rounded-xl border border-transparent ${category.color} transition-all duration-300 hover:shadow-md`}
            prefetch={false}
          >
            <motion.div
              className="w-14 h-14 rounded-full bg-white flex items-center justify-center mb-3 shadow-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <category.icon className="h-7 w-7" />
            </motion.div>
            <span className="text-sm font-medium text-center">{category.name}</span>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  )
}

