'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { urlFor } from '@/lib/sanity'

interface Work {
  image: any
  alt: string
}

interface OurWorksSectionProps {
  title: string
  works: Work[]
}

export default function OurWorksSection({ title, works }: OurWorksSectionProps) {
  if (!title || !works?.length) return null

  return (
    <section id="our-work" className="py-16 md:py-24 bg-white">
      <div className="md:px-20 mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            {title}
          </h2>
          <button className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium">
            View All Projects
          </button>
        </div>
        
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 items-start"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
              }
            }
          }}
        >
          {works.map((work, index) => {
            const ref = work.image?.asset?._ref
            let width = 500
            let height = 500

            if (ref) {
              const dimensionsPart = ref.split('-')[2]
              if (dimensionsPart) {
                const [parsedWidth, parsedHeight] = dimensionsPart
                  .split('x')
                  .map(Number)
                if (parsedWidth && parsedHeight) {
                  width = parsedWidth
                  height = parsedHeight
                }
              }
            }

            return (
              <motion.div
                key={index}
                variants={{
                  hidden: { 
                    opacity: 0, 
                    y: 30
                  },
                  visible: { 
                    opacity: 1, 
                    y: 0
                  }
                }}
                transition={{ 
                  duration: 0.6,
                  ease: "easeOut"
                }}
              >
                <Image
                  src={urlFor(work.image).url()}
                  alt={work.alt}
                  width={width}
                  height={height}
                  className="w-full h-auto"
                />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}