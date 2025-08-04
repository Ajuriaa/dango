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
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            {title}
          </h2>
          <button className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium">
            View All Projects
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
          {works.map((work, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 hover:opacity-90 transition-opacity duration-200 cursor-pointer"
            >
              <Image
                src={urlFor(work.image).url()}
                alt={work.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 20vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}