import React from 'react'
import Image from 'next/image'
import type { Media } from '@/payload-types' 

interface HeroProps {
  headline: string
  subheadline?: string | null
  ctaText?: string | null
  ctaLink?: string | null
  backgroundImage?: Media | string | number | null
}

export const Hero: React.FC<HeroProps> = ({ headline, subheadline, ctaText, ctaLink, backgroundImage }) => {
  const bgUrl = typeof backgroundImage === 'object' && backgroundImage?.url ? backgroundImage.url : null
  const bgAlt = typeof backgroundImage === 'object' && backgroundImage?.alt ? backgroundImage.alt : 'Background'

  return (
    <div className="relative w-full min-h-[80vh] flex items-center justify-center bg-brand-darkblue text-white overflow-hidden">
      {bgUrl && (
        <div className="absolute inset-0 z-0">
          <Image
            src={bgUrl}
            alt={bgAlt}
            fill
            className="object-cover opacity-30"
            priority
          />
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-darkblue/50 to-brand-darkblue/90" />
        </div>
      )}
      
      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 font-poppins text-white leading-tight tracking-tight drop-shadow-lg">
          {headline}
        </h1>
        {subheadline && (
          <p className="text-xl md:text-2xl mb-10 max-w-3xl text-gray-100 leading-relaxed drop-shadow-md">
            {subheadline}
          </p>
        )}
        {ctaText && ctaLink && (
          <a
            href={ctaLink} 
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-brand-turquoise rounded-full hover:bg-opacity-90 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-turquoise shadow-lg hover:shadow-brand-turquoise/50"
          >
            {ctaText}
            <svg className="w-5 h-5 ml-2 -mr-1 transition-transform duration-200 group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        )}
      </div>
    </div>
  )
}
