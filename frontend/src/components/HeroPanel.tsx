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
    <section className="w-full py-16 md:py-24 px-4 relative">
        <div className="flex flex-col md:grid md:grid-cols-2 gap-12 md:gap-16 md:items-center md:px-20">
          <div className="space-y-8 md:space-y-10 order-1 md:order-1">
            {title && (
              <h1 className="md:text-[64px] poppins-medium text-white leading-[1.1]">
                {title}
              </h1>
            )}
            
            {subtitle && (
              <p className="md:text-[20px] text-gray-300 leading-relaxed poppins-medium">
                {subtitle}
              </p>
            )}
            
            {mainButtonLabel && (
              <button className="cursor-pointer bg-gradient-to-r from-violet-800 via-fuchsia-700 to-fuchsia-600 text-white poppins-semibold md:text-[16px] px-6 py-3 rounded-full">
                {mainButtonLabel}
              </button>
            )}

            {shopifyPartnerImage && (
              <div className="md:block md:mt-15">
                <div>
                  <Image
                    src={shopifyPartnerImage}
                    alt="Shopify Partner"
                    width={200}
                    height={60}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="order-3 md:order-2 relative -mx-4 md:mx-0 h-full">
            {heroImage && (
              <Image
                src={heroImage}
                alt={title || "Hero image"}
                fill
                className="rounded-lg object-cover h-full"
                priority
              />
            )}
          </div>
        </div>
    </section>
  )
}