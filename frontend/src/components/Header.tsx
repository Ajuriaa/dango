'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import logo from '@/assets/logo.webp'

interface HeaderProps {
  logoImage?: string
  navigationItems?: string[]
  ctaButtonLabel?: string
}

export default function Header({ 
  logoImage,
  navigationItems = ['Services', 'Our Work', 'Team', 'Contact'],
  ctaButtonLabel = 'GET IN TOUCH'
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  // Helper function to convert navigation label to anchor link
  const getAnchorLink = (label: string) => {
    return `#${label.toLowerCase().replace(/\s+/g, '-')}`
  }
  return (
    <header className="bg-black p-4 w-full md:px-20 relative z-10">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center" onClick={() => window.location.href = '/'}>
          <Image
            src={logoImage || logo}
            alt="Dango Logo"
            width={logoImage ? 160 : undefined}
            height={logoImage ? 40 : undefined}
            className="h-10 md:h-10 w-auto md:cursor-pointer"
          />
        </div>
        
        <div className="flex items-center space-x-8">
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item, index) => (
              <a 
                key={index}
                href={getAnchorLink(item)} 
                className="relative text-gray-300 hover:text-purple-400 transition-colors text-sm group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-800 to-fuchsia-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          <div className="hidden md:block bg-gradient-to-r from-violet-800 via-fuchsia-700 to-fuchsia-600 p-[2px] rounded-full !mr-0">
            <a href="#contact" className="w-full h-full bg-black text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-purple-500/10 transition-colors uppercase flex items-center justify-center">
              {ctaButtonLabel}
            </a>
          </div>

          
          <button 
            className="md:hidden p-2 text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <motion.svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              animate={{ rotate: isMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
              />
            </motion.svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden absolute top-full left-0 w-full bg-black border-t border-gray-800 z-50 overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <motion.nav 
              className="flex flex-col p-4 space-y-4"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              exit={{ y: -20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {navigationItems.map((item, index) => (
                <motion.a 
                  key={index}
                  href={getAnchorLink(item)} 
                  className="text-gray-300 hover:text-white transition-colors py-2"
                  onClick={(e) => {
                    e.preventDefault()
                    const target = document.querySelector(e.currentTarget.getAttribute('href')!)
                    if (target) {
                      target.scrollIntoView({ behavior: 'smooth' })
                      setTimeout(() => setIsMenuOpen(false), 800)
                    }
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + (index * 0.05) }}
                >
                  {item}
                </motion.a>
              ))}
              <motion.div 
                className="mt-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <a 
                  href="#contact" 
                  className="w-full h-full bg-gradient-to-r from-violet-800 via-fuchsia-700 to-fuchsia-600 text-white px-6 py-3 rounded-full text-sm font-medium transition-colors uppercase flex items-center justify-center"
                  onClick={(e) => {
                  e.preventDefault()
                  const target = document.querySelector(e.currentTarget.getAttribute('href')!)
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' })
                    setTimeout(() => setIsMenuOpen(false), 800)
                  }
                }}
                >
                  {ctaButtonLabel}
                </a>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}