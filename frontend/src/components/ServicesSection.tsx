'use client'

import { useState } from 'react'
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
  testimonialsLabel?: string
  testimonials?: Testimonial[]
}

export default function ServicesSection({ 
  services = [], 
  testimonialsLabel,
  testimonials = [] 
}: ServicesSectionProps) {
  const [activeService, setActiveService] = useState(0)

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
            className="w-full md:px-20 mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-[35%_65%] gap-12 lg:gap-16">
              
              {/* Left Column - Testimonials Header */}
              <motion.div 
                className="space-y-8"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="text-sm text-gray-400 uppercase tracking-wider">
                  Testimonials
                </div>
                
                {testimonialsLabel && (
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                    {testimonialsLabel}
                  </h2>
                )}
              </motion.div>

              {/* Right Column - Testimonials Carousel */}
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
                  {testimonials.map((testimonial, index) => (
                    <motion.div 
                      key={index} 
                      className="flex-shrink-0 w-80 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8"
                      initial={{ opacity: 0, scale: 0.9, y: 30 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.5, 
                        delay: index * 0.1 + 0.6,
                        ease: "easeOut"
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        y: -10,
                        transition: { duration: 0.2 }
                      }}
                    >
                      {/* Testimonial Quote */}
                      <p className="text-gray-200 leading-relaxed mb-8 text-lg">
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
                
                {/* Scroll Arrow */}
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 -translate-x-4">
                  <motion.button 
                    className="w-12 h-12 bg-purple-600 hover:bg-purple-700 rounded-full flex items-center justify-center transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.8 }}
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                </div>
              </motion.div>
              
            </div>
          </motion.div>
      )}
    </section>
  )
}