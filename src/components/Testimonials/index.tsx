import React from 'react'
import { getPayloadClient } from '@/payloadClient'
import { Slider } from './Slider'

export type TestimonialsProps = {
  title?: string
  subtitle?: string
  settings?: { theme?: 'light' | 'dark' }
}

export const Testimonials: React.FC<TestimonialsProps> = async ({
  title = 'Ergebnisse, die für sich sprechen',
  subtitle = 'Kundenstimmen',
  settings,
}) => {
  const payload = await getPayloadClient()

  // Fetch testimonials
  const { docs: testimonials } = await payload.find({
    collection: 'testimonials',
    sort: '-updatedAt',
  })

  if (!testimonials || testimonials.length === 0) return null

  const theme = settings?.theme || 'dark'
  const isDark = theme === 'dark'

  const containerClasses = isDark ? 'bg-brand-darkblue' : 'bg-white'
  const headlineClasses = isDark ? 'text-white' : 'text-brand-darkblue'
  const subtitleClasses = isDark ? 'text-brand-turquoise' : 'text-brand-orange'

  return (
    <section className={`py-24 overflow-hidden transition-colors duration-300 ${containerClasses}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className={`text-3xl md:text-5xl font-bold font-poppins mb-6 ${headlineClasses}`}>
            {title}
          </h2>
          <p className={`font-medium tracking-wide uppercase text-sm ${subtitleClasses}`}>
            {subtitle}
          </p>
        </div>

        <Slider testimonials={testimonials} theme={theme} />
      </div>
    </section>
  )
}
