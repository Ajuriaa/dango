import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

interface TeamCard {
  name: string
  image: any
}

interface OurTeamSectionProps {
  label: string
  description: string
  teamCards: TeamCard[]
}

export default function OurTeamSection({ label, description, teamCards }: OurTeamSectionProps) {
  if (!label || !teamCards?.length) return null

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-16">
          <div className="md:w-1/3">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {label}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {description}
            </p>
          </div>
          
          <div className="md:w-2/3">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {teamCards.map((member, index) => (
                <div key={index} className="text-center">
                  <div className="relative aspect-square rounded-full overflow-hidden bg-gray-100 mb-3">
                    <Image
                      src={urlFor(member.image).url()}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw"
                    />
                  </div>
                  <p className="text-sm text-gray-700 font-medium">
                    {member.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}