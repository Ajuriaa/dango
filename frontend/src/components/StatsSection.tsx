interface StatItem {
  number: string
  description: string
}

interface StatsSectionProps {
  title?: string
  description?: string
  stats?: StatItem[]
}

export default function StatsSection({ 
  title, 
  description, 
  stats = [] 
}: StatsSectionProps) {
  if (!title && !description && !stats.length) return null

  return (
    <section className="w-full py-16 md:py-24 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Title and Description */}
        <div className="max-w-4xl mb-16 md:mb-20">
          {title && (
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-8">
              {title}
            </h2>
          )}
          
          {description && (
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Stats Grid */}
        {stats.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 rounded-2xl p-8 md:p-10 text-white"
              >
                <div className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <p className="text-gray-200 text-lg md:text-xl leading-relaxed">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}