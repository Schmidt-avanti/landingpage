import React from 'react'
import Image from 'next/image'
import type { Media } from '@/payload-types'

type PageHeroProps = {
  headline: string
  subheadline?: string | null
  image?: Media | string | number | null
}

export const PageHeroComponent: React.FC<PageHeroProps> = ({ headline, subheadline, image }) => {
  const imageUrl = typeof image === 'object' && image?.url ? image.url : null
  const imageAlt = typeof image === 'object' && image?.alt ? image.alt : headline

  return (
    <section className="relative bg-brand-darkblue text-white min-h-[300px] md:min-h-[400px] flex items-center overflow-hidden">
      {/* Background Image */}
      {imageUrl && (
        <>
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-darkblue via-brand-darkblue/80 to-transparent" />
        </>
      )}

      {/* Text Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-2xl space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
            {headline}
          </h1>
          {subheadline && (
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">{subheadline}</p>
          )}
        </div>
      </div>
    </section>
  )
}
