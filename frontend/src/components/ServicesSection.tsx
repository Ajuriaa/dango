'use client'

import { useState } from 'react'
import Image from 'next/image'

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
          <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-12 lg:gap-16 items-center">
            
            {/* Left Column - Service Titles */}
            <div className="space-y-8">
              <div className="text-sm text-gray-400 uppercase tracking-wider">
                Services
              </div>
              
              <div className="space-y-0">
                {services.map((service, index) => (
                  <div key={index}>
                    <div className="py-6">
                      <h3 
                        className={`text-3xl md:text-[64px] poppins-medium cursor-pointer transition-colors duration-300 ${
                          activeService === index 
                            ? 'text-purple-400' 
                            : 'text-white hover:text-gray-300'
                        }`}
                        onClick={() => setActiveService(index)}
                      >
                        {service.title}
                      </h3>
                      
                      {/* Service Description - Show only for active service */}
                      {activeService === index && service.description && (
                        <div className="mt-4">
                          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                            {service.description}
                          </p>
                        </div>
                      )}
                    </div>
                    
                    {/* Divider line - Show for all except last item */}
                    {index < services.length - 1 && (
                      <div className="border-b border-gray-600/30"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Service Image */}
            <div className="relative">
              {services[activeService]?.image && (
                <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden transition-all duration-500">
                  <Image
                    src={services[activeService].image}
                    alt={services[activeService].title}
                    width={400}
                    height={800}
                    className="object-cover"
                  />
                </div>
              )}
            </div>
            
          </div>
      </div>

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
          <div className="w-full md:px-20 mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[35%_65%] gap-12 lg:gap-16">
              
              {/* Left Column - Testimonials Header */}
              <div className="space-y-8">
                <div className="text-sm text-gray-400 uppercase tracking-wider">
                  Testimonials
                </div>
                
                {testimonialsLabel && (
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                    {testimonialsLabel}
                  </h2>
                )}
              </div>

              {/* Right Column - Testimonials Carousel */}
              <div className="relative">
                <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
                  {testimonials.map((testimonial, index) => (
                    <div 
                      key={index} 
                      className="flex-shrink-0 w-80 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8"
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
                    </div>
                  ))}
                </div>
                
                {/* Scroll Arrow */}
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 -translate-x-4">
                  <button className="w-12 h-12 bg-purple-600 hover:bg-purple-700 rounded-full flex items-center justify-center transition-colors">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
              
            </div>
          </div>
      )}
    </section>
  )
}