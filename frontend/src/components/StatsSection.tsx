'use client'

import { motion } from 'framer-motion'

interface StatItem {
  number: string
  description: string
}

interface StatsSectionProps {
  title?: string
  description?: string
  stats?: StatItem[]
}

export default function StatsSection({ 
  title, 
  description, 
  stats = [] 
}: StatsSectionProps) {
  if (!title && !description && !stats.length) return null

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
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
      <div className="max-w-5xl mx-auto">
        {/* Title and Description */}
        <motion.div 
          className="w-full mb-16 md:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={titleVariants}
        >
          {title && (
            <h2 className="poppins-medium text-2xl md:text-[45px] text-gray-900">
              {title}
            </h2>
          )}
          
          {description && (
            <p className="md:text-[20px] md:mt-4 text-gray-600 leading-10">
              {description}
            </p>
          )}
        </motion.div>

        {/* Stats Grid */}
        {stats.length > 0 && (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                className="bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 rounded-2xl p-8 md:p-10 text-white hover:shadow-xl hover:shadow-purple-500/20 transition-shadow duration-300"
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div 
                  className="text-4xl md:text-6xl mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.2 + 0.5,
                    type: "spring",
                    stiffness: 200
                  }}
                >
                  {stat.number}
                </motion.div>
                <p className="text-gray-200 text-lg md:text-xl leading-relaxed">
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}