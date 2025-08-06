'use client'

import { motion } from 'framer-motion'

interface HorizontalScrollProps {
  items?: string[]
}

export default function HorizontalScroll({ items = [] }: HorizontalScrollProps) {
  const defaultItems = [
    "Strategy First",
    "Built for Growth", 
    "Shopify Experts",
    "Conversion Driven",
    "Strategy First",
    "Built for Growth"
  ]
  
  const scrollItems = items.length > 0 ? items : defaultItems

  return (
    <motion.section 
      className="w-full py-6 bg-black md:bg-black/20 border-t border-white/10 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="flex animate-scroll whitespace-nowrap">
        {/* Triple items for seamless infinite scroll */}
        {[...scrollItems, ...scrollItems, ...scrollItems].map((item, index) => (
          <motion.div 
            key={index} 
            className="flex items-center flex-shrink-0"
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
          >
            <span className="text-white/70 text-lg md:text-xl font-light px-8 hover:text-white transition-colors duration-300">
              {item}
            </span>
            <motion.span 
              className="text-white md:text-purple-400 text-2xl px-4"
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              /
            </motion.span>
          </motion.div>
        ))}
      </div>
      
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </motion.section>
  )
}