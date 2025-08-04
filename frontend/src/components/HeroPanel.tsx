import Image from 'next/image'

interface HeroPanelProps {
  title?: string
  subtitle?: string
  heroImage?: any
  mainButtonLabel?: string
  shopifyPartnerImage?: any
}

export default function HeroPanel({ 
  title, 
  subtitle, 
  heroImage, 
  mainButtonLabel,
  shopifyPartnerImage 
}: HeroPanelProps) {
  return (
    <section className="w-full py-16 md:py-24 px-4 md:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          
          <div className="space-y-8 md:space-y-10 order-2 md:order-1">
            {title && (
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1]">
                {title}
              </h1>
            )}
            
            {subtitle && (
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-lg">
                {subtitle}
              </p>
            )}
            
            {mainButtonLabel && (
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 md:px-10 md:py-4 rounded-full text-lg font-semibold transition-colors duration-200 w-full md:w-auto">
                {mainButtonLabel}
              </button>
            )}
          </div>

          <div className="order-1 md:order-2 relative">
            {heroImage ? (
              <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden">
                <Image
                  src={heroImage}
                  alt={title || "Hero image"}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            ) : (
              <div className="relative w-full h-[400px] md:h-[500px] bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl overflow-hidden">
                {/* JRU Text Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl md:text-8xl font-bold text-teal-200/30 tracking-wider">
                    JRU
                  </div>
                </div>
                
                {/* Phone Mockups */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-64 h-80 md:w-72 md:h-96">
                    {/* Center phone */}
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-80 bg-white rounded-3xl shadow-2xl border-8 border-gray-800">
                      <div className="w-full h-full bg-gray-100 rounded-2xl p-2">
                        <div className="w-full h-full bg-white rounded-xl shadow-sm">
                          {/* Mock phone content */}
                          <div className="p-4 space-y-2">
                            <div className="h-2 bg-gray-200 rounded"></div>
                            <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-32 bg-gray-200 rounded mt-4"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Left phone (partially visible) */}
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-40 h-72 bg-white rounded-3xl shadow-xl border-6 border-gray-800 opacity-80">
                      <div className="w-full h-full bg-gray-100 rounded-2xl p-2">
                        <div className="w-full h-full bg-white rounded-xl"></div>
                      </div>
                    </div>
                    
                    {/* Right phone (partially visible) */}
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-40 h-72 bg-white rounded-3xl shadow-xl border-6 border-gray-800 opacity-80">
                      <div className="w-full h-full bg-gray-100 rounded-2xl p-2">
                        <div className="w-full h-full bg-white rounded-xl"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
        </div>
        
        {/* Shopify Partner Badge */}
        {shopifyPartnerImage && (
          <div className="absolute bottom-8 left-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Image
                src={shopifyPartnerImage}
                alt="Shopify Partner"
                width={160}
                height={60}
                className="h-12 w-auto"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}