import Image from 'next/image'
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
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 items-start">
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
              <Image
                key={index}
                src={urlFor(work.image).url()}
                alt={work.alt}
                width={width}
                height={height}
                className="w-full h-auto"
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}