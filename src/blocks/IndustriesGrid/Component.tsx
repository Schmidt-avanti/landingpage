import React from 'react'
import Image from 'next/image'
import type { Industry } from '@/payload-types'
import {
  Home,
  ShoppingCart,
  Car,
  Store,
  Heart,
  Stethoscope,
  Scale,
  Utensils,
  Hammer,
  Building2,
  Armchair,
  Shield,
  Hotel,
  Building,
  Factory,
  Package,
  Briefcase,
  GraduationCap,
} from 'lucide-react'

const iconMap: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  Home,
  ShoppingCart,
  Car,
  Store,
  Heart,
  Stethoscope,
  Scale,
  Utensils,
  Hammer,
  Building2,
  Armchair,
  Shield,
  Hotel,
  Building,
  Factory,
  Package,
  Briefcase,
  GraduationCap,
}

export type IndustriesGridProps = {
  tagline?: string | null
  headline?: string
  industries?: (string | Industry)[] | null
  settings?: { theme?: 'light' | 'dark' }
}

export const IndustriesGrid: React.FC<IndustriesGridProps> = ({
  tagline,
  headline,
  industries,
  settings,
}) => {
  const theme = settings?.theme || 'dark'
  const isDark = theme === 'dark'

  const containerClasses = isDark ? 'bg-brand-darkblue text-white' : 'bg-white text-gray-900'
  const taglineClasses = isDark ? 'text-gray-400' : 'text-gray-500'
  const textClasses = isDark
    ? 'text-gray-300 group-hover:text-white'
    : 'text-gray-600 group-hover:text-brand-darkblue'

  if (!industries || industries.length === 0) return null

  return (
    <section
      className={`py-24 overflow-hidden text-center transition-colors duration-300 ${containerClasses}`}
    >
      <div className="container mx-auto px-4">
        {/* Tagline */}
        {tagline && (
          <p className={`text-sm uppercase tracking-widest mb-4 ${taglineClasses}`}>{tagline}</p>
        )}

        {/* Headline */}
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold font-poppins mb-16 max-w-3xl mx-auto leading-tight">
          {headline}
        </h2>

        {/* Industries Grid - 3 columns on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-10 max-w-4xl mx-auto">
          {Array.isArray(industries) &&
            industries.map((industry, index) => {
              if (!industry || typeof industry !== 'object') return null

              const iconUrl =
                typeof industry.icon === 'object' && industry.icon?.url ? industry.icon.url : null

              const IconComponent =
                industry.selectedIcon && iconMap[industry.selectedIcon]
                  ? iconMap[industry.selectedIcon]
                  : null

              return (
                <div
                  key={industry.id || index}
                  className="flex items-center gap-3 group cursor-default text-left"
                >
                  {/* Icon */}
                  {IconComponent ? (
                    <div className="w-8 h-8 flex items-center justify-center text-brand-orange flex-shrink-0">
                      <IconComponent size={24} strokeWidth={1.5} />
                    </div>
                  ) : iconUrl ? (
                    <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                      <Image
                        src={iconUrl}
                        alt={industry.title}
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-8 h-8 flex items-center justify-center bg-brand-orange/20 rounded text-brand-orange text-sm font-bold flex-shrink-0">
                      {industry.title.charAt(0)}
                    </div>
                  )}

                  {/* Title */}
                  <span className={`text-sm md:text-base transition-colors ${textClasses}`}>
                    {industry.title}
                  </span>
                </div>
              )
            })}
        </div>
      </div>
    </section>
  )
}
