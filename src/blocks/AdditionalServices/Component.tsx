import React from 'react'
import Image from 'next/image'
import type { Service } from '@/payload-types'
// Map string names to Lucide components
import {
  Phone,
  Mail,
  MessageSquare,
  Calendar,
  Clock,
  User,
  Users,
  Headset,
  Briefcase,
  FileText,
  Check,
  Star,
  Globe,
  ArrowRight,
  Zap,
  Shield,
  Smartphone,
  Monitor,
} from 'lucide-react'

const iconMap: any = {
  Phone,
  Mail,
  MessageSquare,
  Calendar,
  Clock,
  User,
  Users,
  Headset,
  Briefcase,
  FileText,
  Check,
  Star,
  Globe,
  ArrowRight,
  Zap,
  Shield,
  Smartphone,
  Monitor,
}

export type AdditionalServicesProps = {
  headline?: string
  services?: (string | Service)[] | null
  settings?: { theme?: 'light' | 'dark' }
}

export const AdditionalServices: React.FC<AdditionalServicesProps> = ({
  headline,
  services,
  settings,
}) => {
  const title = headline || 'Weitere Serviceleistungen'

  const theme = settings?.theme || 'dark'
  const isDark = theme === 'dark'

  const containerClasses = isDark ? 'bg-brand-darkblue text-white' : 'bg-white text-gray-900'
  const underlineClass = isDark ? 'bg-brand-orange' : 'bg-brand-orange' // Keep orange for now, or match accent
  const textClasses = isDark
    ? 'text-gray-300 group-hover:text-white'
    : 'text-gray-600 group-hover:text-brand-darkblue'
  const iconBgClasses = isDark ? 'bg-white/10' : 'bg-brand-darkblue/5 text-brand-darkblue'
  const iconFallbackTextClasses = isDark ? 'text-white' : 'text-brand-darkblue'

  // If no additional services, render nothing
  if (!services || services.length === 0) return null

  return (
    <section
      className={`py-24 overflow-hidden text-center transition-colors duration-300 ${containerClasses}`}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-bold font-poppins mb-4 relative inline-block">
          {title}
          {/* Underline decoration */}
          <span
            className={`absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-12 h-1 rounded-full ${underlineClass}`}
          ></span>
        </h2>

        <div className="mt-16 flex flex-wrap justify-center gap-x-12 gap-y-16 md:gap-x-20 max-w-5xl mx-auto">
          {Array.isArray(services) &&
            services.map((service, index) => {
              // Handle case where service might be just an ID or null
              if (!service || typeof service !== 'object') return null

              const iconUrl =
                typeof service.icon === 'object' && service.icon?.url ? service.icon.url : null

              // Check for selected standard icon
              // @ts-ignore
              const IconComponent =
                service.selectedIcon && iconMap[service.selectedIcon]
                  ? iconMap[service.selectedIcon]
                  : null

              return (
                <div
                  key={service.id || index}
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
                        alt={service.title}
                        width={80}
                        height={80}
                        className="object-contain filter brightness-0 invert opacity-80 group-hover:opacity-100"
                      />
                    </div>
                  ) : (
                    // Fallback icon if none provided
                    <div
                      className={`w-16 h-16 md:w-20 md:h-20 mb-4 rounded-full flex items-center justify-center text-2xl font-bold ${iconBgClasses} ${iconFallbackTextClasses}`}
                    >
                      {service.title.charAt(0)}
                    </div>
                  )}
                  <h3
                    className={`text-sm md:text-base font-medium transition-colors ${textClasses}`}
                  >
                    {service.title}
                  </h3>
                </div>
              )
            })}
        </div>
      </div>
    </section>
  )
}
