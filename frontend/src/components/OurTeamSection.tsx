'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { urlFor } from '@/lib/sanity'

interface TeamCard {
  name: string
  image: any
}

interface OurTeamSectionProps {
  label: string
  description: string
  teamCards: TeamCard[]
}

export default function OurTeamSection({ label, description, teamCards }: OurTeamSectionProps) {
  if (!label || !teamCards?.length) return null

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

  const memberVariants = {
    hidden: { 
      opacity: 0, 
      y: 30
    },
    visible: { 
      opacity: 1, 
      y: 0
    }
  }

  return (
    <section id="team" className="py-16 md:py-24 bg-white">
        <div className="px-4 md:px-20 flex flex-col md:flex-row md:items-start gap-8 md:gap-16">
          <div className="md:w-1/3">
            <h2 className="text-3xl md:text-4xl text-gray-900 mb-4">
              {label}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {description}
            </p>
          </div>
          
          <div className="md:w-2/3">
            <motion.div 
              className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
            >
              {teamCards.map((member, index) => (
                <motion.div 
                  key={index} 
                  className="text-center md:cursor-pointer"
                  variants={memberVariants}
                  transition={{ 
                    duration: 0.6,
                    ease: "easeOut"
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -8,
                    transition: { duration: 0.2, ease: "easeOut" }
                  }}
                >
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 mb-3 group">
                    <Image
                      src={urlFor(member.image).url()}
                      alt={member.name}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300 md:shadow-lg md:hover:shadow-xl"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw"
                    />
                  </div>
                  <p className="text-sm text-gray-700 font-medium">
                    {member.name}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
    </section>
  )
}