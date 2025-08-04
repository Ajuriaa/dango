'use client'

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
    <section className="w-full py-6 bg-black/20 border-t border-white/10 overflow-hidden">
      <div className="flex animate-scroll whitespace-nowrap">
        {/* Triple items for seamless infinite scroll */}
        {[...scrollItems, ...scrollItems, ...scrollItems].map((item, index) => (
          <div key={index} className="flex items-center flex-shrink-0">
            <span className="text-white/70 text-lg md:text-xl font-light px-8">
              {item}
            </span>
            <span className="text-purple-400 text-2xl px-4">/</span>
          </div>
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
      `}</style>
    </section>
  )
}