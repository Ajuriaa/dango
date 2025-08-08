'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

interface WorkCard {
  name: string
  tags: string[]
  image: any
  hoverImage: any
  link?: string
}

interface HighlightsSectionProps {
  label?: string
  title?: string
  workCards?: WorkCard[]
}

export default function HighlightsSection({ 
  label,
  title, 
  workCards = [] 
}: HighlightsSectionProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Card dimensions - responsive
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false
  const cardWidth = isMobile ? 280 : 380
  const cardGap = 32 // gap-8 = 2rem = 32px
  const cardWithGap = cardWidth + cardGap
  
  // Calculate how many cards can fit fully in the container
  const containerWidth = typeof window !== 'undefined' ? 
    (isMobile ? window.innerWidth - 32 : Math.max(800, window.innerWidth - 320 - 160)) : 1000 // fallback
  const cardsPerView = Math.floor(containerWidth / cardWithGap)
  const maxScrollIndex = Math.max(0, workCards.length - cardsPerView)

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
  }, [currentIndex, workCards.length, maxScrollIndex])

  if (!title && !workCards.length) return null

  return (
    <section id="highlights" className="w-full bg-white pb-8">
      <div className="pl-4 md:pl-20 mx-auto">
        {/* Work Cards */}
        {workCards.length > 0 && (
          <div className="relative">
            {/* Desktop Layout with Title on Left */}
            <div className="md:flex md:gap-12 items-start">
              {/* Title Section */}
              {title && (
                <div className="flex-shrink-0 md:w-[320px]">
                  {label && (
                    <p className="poppins-regular text-gray-900 md:text-[16px] inline-block md:bg-purple-300 md:px-1">
                      {label}
                    </p>
                  )}
                  <h2 className="text-3xl md:text-[48px] lg:text-6xl font-normal text-gray-900 leading-tight sticky top-8">
                    {title}
                  </h2>
                </div>
              )}
              
              {/* Carousel Section */}
              <div className="flex-1 relative overflow-hidden">
                <div 
                  ref={scrollRef}
                  className="flex gap-8 overflow-x-scroll pb-4"
                  style={{ 
                    scrollbarWidth: 'none', 
                    msOverflowStyle: 'none'                  }}
                >
                {workCards.map((card, index) => (
                  <div
                    key={index}
                    className={`pt-2 flex-shrink-0 w-[280px] md:w-[380px] group ${card.link ? 'cursor-pointer md:hover:scale-[1.02]' : 'cursor-default'} ${index === 0 ? 'md:pl-2' : ''} ${index === workCards.length - 1 ? 'pr-5' : ''} transition-transform duration-200`}
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onClick={() => {
                      if (card.link) {
                        window.open(card.link, '_blank', 'noopener,noreferrer')
                      }
                    }}
                  >
                    {/* Image Container */}
                    <div className="relative w-full h-[500px] md:h-[540px] mb-6 rounded-2xl overflow-hidden bg-white shadow-lg">
                      {/* Main Image - Always visible */}
                      <Image
                        src={card.image}
                        alt={card.name}
                        fill
                        className="object-cover"
                      />
                      
                      {/* Desktop: Centered hover */}
                      <div className="hidden md:absolute md:inset-0 md:flex md:items-center md:justify-center">
                        <div className="relative w-[320px] h-[500px] overflow-hidden rounded-lg">
                          <Image
                            src={card.hoverImage}
                            alt={`${card.name} hover`}
                            fill
                            className={`object-cover transition-opacity duration-300 ${
                              hoveredCard === index ? 'opacity-100' : 'opacity-0'
                            }`}
                          />
                        </div>
                      </div>

                      {/* Mobile: Bottom-right always visible */}
                      <div className="md:hidden absolute bottom-1 right-1">
                        <div className="relative w-[160px] h-[250px] overflow-hidden rounded-lg">
                          <Image
                            src={card.hoverImage}
                            alt={`${card.name} preview`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="space-y-4">
                      {/* Project Name */}
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 md:group-hover:text-purple-600 transition-colors duration-200">
                        {card.name}
                      </h3>

                      {/* Tags */}
                      {card.tags && card.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {card.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-3 py-1 text-sm font-medium text-gray-600 bg-gray-50 rounded-full md:group-hover:border-purple-200 md:group-hover:text-purple-600 transition-colors duration-200"
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
              
              {/* Navigation Arrows */}
              {showLeftArrow && (
                <button 
                  onClick={scrollLeft}
                  className="absolute left-0 top-2/5 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white hover:bg-purple-50 rounded-full shadow-lg flex items-center justify-center transition-colors duration-200 group z-10"
                >
                  <svg className="w-6 h-6 text-gray-600 group-hover:text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}
              
              {showRightArrow && (
                <button 
                  onClick={scrollRight}
                  className="absolute right-6 top-2/5 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white hover:bg-purple-50 rounded-full shadow-lg flex items-center justify-center transition-colors duration-200 group z-10"
                >
                  <svg className="w-6 h-6 text-gray-600 group-hover:text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}