'use client'

import { useState } from 'react'
import Image from 'next/image'

interface WorkCard {
  name: string
  tags: string[]
  image: any
  hoverImage: any
}

interface HighlightsSectionProps {
  title?: string
  workCards?: WorkCard[]
}

export default function HighlightsSection({ 
  title, 
  workCards = [] 
}: HighlightsSectionProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  if (!title && !workCards.length) return null

  return (
    <section className="w-full py-16 md:py-24 px-4 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        {title && (
          <div className="mb-16 md:mb-20">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              {title}
            </h2>
          </div>
        )}

        {/* Work Cards Grid */}
        {workCards.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {workCards.map((card, index) => (
              <div
                key={index}
                className="group cursor-pointer"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] mb-6 rounded-2xl overflow-hidden bg-white shadow-lg">
                  {/* Main Image */}
                  <Image
                    src={card.image}
                    alt={card.name}
                    fill
                    className={`object-cover transition-opacity duration-300 ${
                      hoveredCard === index ? 'opacity-0' : 'opacity-100'
                    }`}
                  />
                  
                  {/* Hover Image */}
                  <Image
                    src={card.hoverImage}
                    alt={`${card.name} hover`}
                    fill
                    className={`object-cover transition-opacity duration-300 ${
                      hoveredCard === index ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </div>

                {/* Card Content */}
                <div className="space-y-4">
                  {/* Project Name */}
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-200">
                    {card.name}
                  </h3>

                  {/* Tags */}
                  {card.tags && card.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {card.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 text-sm font-medium text-gray-600 bg-white rounded-full border border-gray-200 group-hover:border-purple-200 group-hover:text-purple-600 transition-colors duration-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}