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
  // Neue Icons
  PhoneCall,
  Wrench,
  UserCheck,
  TrendingUp,
  RefreshCw,
  CreditCard,
  Users,
  Gauge,
  Filter,
  ClipboardList,
  MessageSquare,
  Database,
  PhoneForwarded,
  Smile,
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
  // Neue Icons
  PhoneCall,
  Wrench,
  UserCheck,
  TrendingUp,
  RefreshCw,
  CreditCard,
  Users,
  Gauge,
  Filter,
  ClipboardList,
  MessageSquare,
  Database,
  PhoneForwarded,
  Smile,
}

export type AdditionalIndustriesProps = {
  headline?: string
  industries?: (string | Industry)[] | null
  settings?: { theme?: 'light' | 'dark' }
}

export const AdditionalIndustries: React.FC<AdditionalIndustriesProps> = ({
  headline,
  industries,
  settings,
}) => {
  const title = headline || 'Weitere Branchen'

  const theme = settings?.theme || 'dark'
  const isDark = theme === 'dark'

  const containerClasses = isDark ? 'bg-brand-darkblue text-white' : 'bg-white text-gray-900'
  const underlineClass = 'bg-brand-orange'
  const textClasses = isDark
    ? 'text-gray-300 group-hover:text-white'
    : 'text-gray-600 group-hover:text-brand-darkblue'
  const iconBgClasses = isDark ? 'bg-white/10' : 'bg-brand-darkblue/5 text-brand-darkblue'
  const iconFallbackTextClasses = isDark ? 'text-white' : 'text-brand-darkblue'

  if (!industries || industries.length === 0) return null

  return (
    <section
      className={`py-24 overflow-hidden text-center transition-colors duration-300 ${containerClasses}`}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-bold font-poppins mb-4 relative inline-block">
          {title}
          <span
            className={`absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-12 h-1 rounded-full ${underlineClass}`}
          ></span>
        </h2>

        <div className="mt-16 flex flex-wrap justify-center gap-x-12 gap-y-16 md:gap-x-20 max-w-5xl mx-auto">
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
                  className="flex flex-col items-center group cursor-default w-32 md:w-40"
                >
                  {/* Render Standard Icon or Custom Image or Fallback */}
                  {IconComponent ? (
                    <div className="w-16 h-16 md:w-20 md:h-20 mb-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 text-brand-orange">
                      <IconComponent size={40} strokeWidth={1.5} />
                    </div>
                  ) : iconUrl ? (
                    <div className="w-16 h-16 md:w-20 md:h-20 mb-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <Image
                        src={iconUrl}
                        alt={industry.title}
                        width={80}
                        height={80}
                        className="object-contain filter brightness-0 invert opacity-80 group-hover:opacity-100"
                      />
                    </div>
                  ) : (
                    <div
                      className={`w-16 h-16 md:w-20 md:h-20 mb-4 rounded-full flex items-center justify-center text-2xl font-bold ${iconBgClasses} ${iconFallbackTextClasses}`}
                    >
                      {industry.title.charAt(0)}
                    </div>
                  )}
                  <h3
                    className={`text-sm md:text-base font-medium transition-colors ${textClasses}`}
                  >
                    {industry.title}
                  </h3>
                </div>
              )
            })}
        </div>
      </div>
    </section>
  )
}
