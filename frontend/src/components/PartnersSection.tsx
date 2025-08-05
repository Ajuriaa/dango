import Image from 'next/image'

interface Partner {
  image: any
}

interface PartnersSectionProps {
  label?: string
  partners?: Partner[]
}

export default function PartnersSection({ 
  label, 
  partners = [] 
}: PartnersSectionProps) {
  if (!label && !partners.length) return null

  return (
    <section className="w-full py-16 md:py-24 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        
        {/* Section Label */}
        {label && (
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-16 md:mb-20 max-w-4xl mx-auto">
            {label}
          </h2>
        )}

        {/* Partner Logos */}
        {partners.length > 0 && (
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16">
            {partners.map((partner, index) => (
              <div 
                key={index} 
                className="flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-200"
              >
                <div className="relative h-12 md:h-16 w-32 md:w-40">
                  <Image
                    src={partner.image}
                    alt={`Partner ${index + 1}`}
                    fill
                    className="object-contain filter grayscale hover:grayscale-0 transition-all duration-200"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
        
      </div>
    </section>
  )
}