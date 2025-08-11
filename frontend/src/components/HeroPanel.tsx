'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

interface HeroPanelProps {
  title?: string
  subtitle?: string
  heroVideo?: string
  mainButtonLabel?: string
  shopifyPartnerImage?: any
}

export default function HeroPanel({ 
  title, 
  subtitle, 
  heroVideo, 
  mainButtonLabel,
  shopifyPartnerImage 
}: HeroPanelProps) {
  const contentVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0
    }
  }

  const imageVariants = {
    hidden: { opacity: 0, x: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1
    }
  }

  return (
    <section className="w-full pt-8 md:p-0 px-4 relative">
        <div className="flex flex-col md:grid md:grid-cols-2 md:justify-items-end gap-12 md:gap-16 md:items-center md:px-20 md:max-w-[1800px] md:mx-auto">
          <motion.div 
            className="space-y-8 md:space-y-10 order-1 md:order-1"
            initial="hidden"
            animate="visible"
            variants={contentVariants}
            transition={{
              duration: 0.8,
              ease: "easeOut"
            }}
          >
            {title && (
              <motion.h1 
                className="text-[36px] md:text-[clamp(24px,4vw,80px)] poppins-medium text-white leading-[1.1]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                {title}
              </motion.h1>
            )}
            
            {subtitle && (
              <motion.p 
                className="text-[16px] md:text-[clamp(10px,2.5vw,28px)] text-gray-300 leading-relaxed poppins-medium"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {subtitle}
              </motion.p>
            )}
            
            {mainButtonLabel && (
              <motion.button 
                className="cursor-pointer bg-gradient-to-r from-violet-800 via-fuchsia-700 to-fuchsia-600 text-white poppins-semibold text-[14px] md:text-[clamp(16px,2vw,20px)] px-6 py-3 rounded-full"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(139, 69, 19, 0.3)",
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                {mainButtonLabel}
              </motion.button>
            )}

            {shopifyPartnerImage && (
              <motion.div 
                className="flex justify-end md:block md:mt-15"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div>
                  <Image
                    src={shopifyPartnerImage}
                    alt="Shopify Partner"
                    width={200}
                    height={60}
                    className='h-[50px] w-[120px]'
                  />
                </div>
              </motion.div>
            )}
          </motion.div>
          <motion.div 
            className="order-3 md:order-2 relative -mx-4 md:mx-0 h-full md:flex md:items-center"
            initial="hidden"
            animate="visible"
            variants={imageVariants}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: "easeOut"
            }}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
          >
            {heroVideo && (
              <video
                src={heroVideo}
                autoPlay
                muted
                loop
                playsInline
                className="rounded-none md:rounded-lg object-cover w-full h-full md:object-contain md:h-auto md:max-w-[700px]"
                poster=""
              />
            )}
          </motion.div>
        </div>
    </section>
  )
}