'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface Service {
  title: string
  description: string
  image: any
}

interface Testimonial {
  name: string
  position: string
  image: any
  comment: string
}

interface ServicesSectionProps {
  services?: Service[]
  testimonialsSectionLabel?: string
  testimonialsLabel?: string
  testimonials?: Testimonial[]
}

export default function ServicesSection({ 
  services = [], 
  testimonialsSectionLabel,
  testimonialsLabel,
  testimonials = [] 
}: ServicesSectionProps) {
  const [activeService, setActiveService] = useState(0)
  
  // Testimonials scroll functionality
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Testimonial scroll calculations
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false
  const cardWidth = isMobile ? 288 : 400 // w-72 = 288px, w-[400px] = 400px
  const cardGap = 24 // space-x-6 = 1.5rem = 24px
  const cardWithGap = cardWidth + cardGap
  
  // Calculate how many cards can fit in the container (75% of lg grid)
  const containerWidth = typeof window !== 'undefined' ? 
    (isMobile ? window.innerWidth - 32 : Math.max(600, (window.innerWidth * 0.75) - 160)) : 800 // fallback
  const cardsPerView = Math.floor(containerWidth / cardWithGap)
  const maxScrollIndex = Math.max(0, testimonials.length - cardsPerView)

  const scrollToCard = (index: number) => {
    if (scrollRef.current && index >= 0 && index <= maxScrollIndex) {
      const scrollPosition = index * cardWithGap
      scrollRef.current.scrollTo({ left: scrollPosition, behavior: 'smooth' })
      setCurrentIndex(index)
    }
  }

  const scrollLeft = () => {
    scrollToCard(currentIndex - 1)
  }

  const scrollRight = () => {
    scrollToCard(currentIndex + 1)
  }

  // Update arrow visibility based on current position
  const updateArrowVisibility = () => {
    setShowLeftArrow(currentIndex > 0)
    setShowRightArrow(currentIndex < maxScrollIndex)
  }

  // Initialize and update arrow visibility
  useEffect(() => {
    updateArrowVisibility()
  }, [currentIndex, testimonials.length, maxScrollIndex])

  if (!services.length) return null

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const serviceVariants = {
    hidden: { 
      opacity: 0, 
      x: -30 
    },
    visible: { 
      opacity: 1, 
      x: 0
    }
  }

  const imageVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      x: 50 
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      x: 0
    }
  }

  return (
    <section id="services"       
      style={{
        backgroundImage: 'radial-gradient(ellipse at right, hsla(271, 100%, 53%, 1) 0%, hsla(0, 0%, 0%, 1) 40%)',
        backgroundSize: '100% 250%',
        backgroundPosition: 'center'
      }} 
      className="w-full">
      {/* Services Section */}
      <div className="py-16 md:py-24 px-4 md:px-20">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-12 lg:gap-16 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            
            {/* Left Column - Service Titles */}
            <motion.div className="space-y-8" variants={serviceVariants}>
              <motion.div 
                className="text-sm text-gray-400 uppercase tracking-wider"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Services
              </motion.div>
              
              <div className="space-y-0">
                {services.map((service, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.1,
                      ease: "easeOut"
                    }}
                  >
                    <div className="py-6">
                      <motion.h3 
                        className={`text-3xl md:text-[64px] poppins-medium cursor-pointer transition-colors duration-300 ${
                          activeService === index 
                            ? 'text-purple-400' 
                            : 'text-white hover:text-gray-300'
                        }`}
                        onClick={() => setActiveService(index)}
                        whileHover={{ 
                          scale: 1.02,
                          transition: { duration: 0.2 }
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {service.title}
                      </motion.h3>
                      
                      {/* Service Description - Show only for active service */}
                      <AnimatePresence mode="wait">
                        {activeService === index && service.description && (
                          <motion.div 
                            className="mt-4 overflow-hidden"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                          >
                            <motion.p 
                              className="text-lg md:text-xl text-gray-300 leading-relaxed"
                              initial={{ y: -10 }}
                              animate={{ y: 0 }}
                              exit={{ y: -10 }}
                              transition={{ duration: 0.3, delay: 0.1 }}
                            >
                              {service.description}
                            </motion.p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    
                    {/* Divider line - Show for all except last item */}
                    {index < services.length - 1 && (
                      <motion.div 
                        className="border-b border-gray-600/30"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ 
                          duration: 0.8, 
                          delay: index * 0.1 + 0.3 
                        }}
                        style={{ originX: 0 }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Column - Service Image */}
            <motion.div className="relative" variants={imageVariants}>
              <AnimatePresence mode="wait">
                {services[activeService]?.image && (
                  <motion.div 
                    key={activeService}
                    className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden"
                    initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.9, rotateY: 15 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <Image
                      src={services[activeService].image}
                      alt={services[activeService].title}
                      width={400}
                      height={800}
                      className="object-cover"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            
          </motion.div>
      </div>

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
          <motion.div 
            className="w-full px-4 md:px-20 mx-auto overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-[25%_75%] gap-12 lg:gap-16">

              {/* Left Column - Testimonials Header */}
              <motion.div 
                className="space-y-8"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {testimonialsSectionLabel && (
                  <div className="poppins-regular md:text-[16px] text-white tracking-wider mb-4">
                    {testimonialsSectionLabel}
                  </div>
                )}
                
                {testimonialsLabel && (
                  <h2 className="md:max-w-md poppins-medium md:text-[48px] font-semibold text-white leading-tight">
                    {testimonialsLabel}
                  </h2>
                )}
              </motion.div>

              {/* Right Column - Testimonials Carousel */}
              <motion.div 
                className="relative overflow-hidden"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="relative overflow-hidden py-6">
                  <div 
                    ref={scrollRef}
                    className="flex space-x-6 overflow-x-scroll pb-6 px-4 md:px-6 pt-6"
                    style={{ 
                      scrollbarWidth: 'none', 
                      msOverflowStyle: 'none'
                    }}
                  >
                    {testimonials.map((testimonial, index) => (
                    <motion.div 
                      key={index} 
                      className="flex-shrink-0 w-72 md:w-[400px] md:h-[360px] bg-black rounded-2xl p-6 md:p-8 flex flex-col justify-center"
                      initial={{ opacity: 0, scale: 0.95, y: 20 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.3, 
                        delay: index * 0.05 + 0.2,
                        ease: "easeOut"
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        y: -10,
                        transition: { duration: 0.15, ease: "easeOut" }
                      }}
                      animate={{ 
                        scale: 1,
                        y: 0,
                        transition: { duration: 0.15, ease: "easeOut" }
                      }}
                    >
                      {/* Testimonial Quote */}
                      <p className="poppins-regular text-white leading-relaxed mb-8 md:text-[16px]">
                        "{testimonial.comment}"
                      </p>
                      
                      {/* Person Info */}
                      <div className="flex items-center space-x-4">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-white font-semibold">{testimonial.name}</h4>
                          <p className="text-gray-400 text-sm">{testimonial.position}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  </div>
                  
                  {/* Navigation Arrows */}
                  {showLeftArrow && (
                    <button 
                      onClick={scrollLeft}
                      className="absolute left-4 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white hover:bg-purple-50 rounded-full shadow-lg flex items-center justify-center transition-colors duration-200 group z-10"
                    >
                      <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                  )}
                  
                  {showRightArrow && (
                    <button 
                      onClick={scrollRight}
                      className="absolute right-4 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white hover:bg-purple-50 rounded-full shadow-lg flex items-center justify-center transition-colors duration-200 group z-10"
                    >
                      <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  )}
                </div>
              </motion.div>
              
            </div>
          </motion.div>
      )}
    </section>
  )
}