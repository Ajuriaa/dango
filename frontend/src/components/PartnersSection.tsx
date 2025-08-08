'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

interface Partner {
  image: any
  link?: string
  name?: string
}

interface PartnersSectionProps {
  title?: string
  label?: string
  partners?: Partner[]
}

export default function PartnersSection({ 
  title,
  label, 
  partners = [] 
}: PartnersSectionProps) {
  if (!title && !label && !partners.length) return null

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

  const logoVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1
    }
  }

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0
    }
  }

  return (
    <section className="w-full py-16 md:py-24 px-4 md:px-8 bg-white">
      <div className="md:max-w-6xl mx-auto text-center flex flex-col items-center">
        {/* Section Title */}
        {title && (
          <motion.h1 
            className="poppins-regular text-[14px] md:text-[16px] text-gray-900 leading-tight text-left w-full md:max-w-3xl mb-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={titleVariants}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {title}
          </motion.h1>
        )}
        
        {/* Section Label */}
        {label && (
          <motion.h2 
            className="text-[26px] md:text-[36px] poppins-medium text-gray-900 leading-lazy mb-8 md:mb-20 md:max-w-3xl mx-auto text-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={titleVariants}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          >
            {label}
          </motion.h2>
        )}

        {/* Partner Logos */}
        {partners.length > 0 && (
          <motion.div 
            className="flex flex-wrap justify-start md:justify-around items-center gap-8 md:gap-12 lg:gap-16 md:max-w-3xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {partners.map((partner, index) => {
              const PartnerContent = (
                <motion.div 
                  className="relative h-12 md:h-16 w-32 md:w-40"
                  whileHover={{ 
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                >
                  <Image
                    src={partner.image}
                    alt={partner.name || `Partner ${index + 1}`}
                    fill
                    className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </motion.div>
              )

              return (
                <motion.div 
                  key={index} 
                  className={`flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-300 ${partner.link ? 'cursor-pointer' : 'cursor-default'}`}
                  variants={logoVariants}
                  transition={{ 
                    duration: 0.6,
                    ease: "easeOut",
                    delay: index * 0.1
                  }}
                  whileHover={{ 
                    scale: 1.15,
                    opacity: 1,
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (partner.link) {
                      window.open(partner.link, '_blank', 'noopener,noreferrer')
                    }
                  }}
                >
                  {PartnerContent}
                </motion.div>
              )
            })}
          </motion.div>
        )}
        
      </div>
    </section>
  )
}