import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
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
  ArrowRight,
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

export type FocusIndustriesGridProps = {
  tagline?: string | null
  headline?: string
  introduction?: string | null
  industries?: (string | Industry)[] | null
  settings?: {
    theme?: 'light' | 'dark'
    showLink?: boolean
  }
}

export const FocusIndustriesGrid: React.FC<FocusIndustriesGridProps> = ({
  tagline,
  headline = 'Unsere Fokus-Branchen',
  introduction,
  industries,
  settings,
}) => {
  const theme = settings?.theme || 'dark'
  const showLink = settings?.showLink !== false
  const isDark = theme === 'dark'

  const containerClasses = isDark ? 'bg-brand-darkblue' : 'bg-white'
  const headlineClasses = isDark ? 'text-white' : 'text-brand-darkblue'
  const taglineClasses = isDark ? 'text-gray-400' : 'text-gray-500'
  const introTextClasses = isDark ? 'text-gray-300' : 'text-gray-600'

  // Card Styles
  const cardClasses = isDark
    ? 'bg-white/5 hover:bg-white/10 border-white/5 hover:border-white/20'
    : 'bg-gray-50 hover:bg-white border-transparent hover:border-gray-100 hover:shadow-xl'

  const cardTitleClasses = isDark
    ? 'text-white group-hover:text-brand-orange'
    : 'text-brand-darkblue group-hover:text-brand-turquoise'
  const cardDescClasses = isDark ? 'text-gray-400' : 'text-gray-500'
  const iconContainerClasses = isDark
    ? 'bg-white/10 text-brand-orange'
    : 'bg-brand-lightgray text-brand-orange'
  const linkClasses = isDark
    ? 'text-brand-orange hover:text-brand-orange/80'
    : 'text-brand-turquoise hover:text-brand-turquoise/80'

  if (!industries || industries.length === 0) return null

  return (
    <section className={`py-24 transition-colors duration-300 ${containerClasses}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          {tagline && (
            <p className={`text-sm uppercase tracking-widest mb-3 ${taglineClasses}`}>{tagline}</p>
          )}
          <h2 className={`text-3xl md:text-5xl font-bold font-poppins mb-4 ${headlineClasses}`}>
            {headline}
          </h2>
          {introduction && (
            <p
              className={`max-w-2xl mx-auto text-lg leading-relaxed whitespace-pre-line ${introTextClasses}`}
            >
              {introduction}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.isArray(industries) &&
            industries.map((industry, index) => {
              if (!industry || typeof industry !== 'object') return null

              const iconUrl =
                typeof industry.icon === 'object' && industry.icon?.url ? industry.icon.url : null

              const IconComponent =
                industry.selectedIcon && iconMap[industry.selectedIcon]
                  ? iconMap[industry.selectedIcon]
                  : null

              const slug = industry.slug || ''

              return (
                <div
                  key={industry.id || index}
                  className={`group p-8 rounded-2xl transition-all duration-300 flex flex-col items-start border ${cardClasses}`}
                >
                  {/* Icon */}
                  {IconComponent ? (
                    <div
                      className={`w-16 h-16 mb-6 rounded-xl flex items-center justify-center p-3 group-hover:scale-110 transition-transform duration-300 ${iconContainerClasses}`}
                    >
                      <IconComponent size={32} strokeWidth={1.5} />
                    </div>
                  ) : iconUrl ? (
                    <div
                      className={`w-16 h-16 mb-6 rounded-xl flex items-center justify-center p-3 group-hover:scale-110 transition-transform duration-300 ${iconContainerClasses}`}
                    >
                      <Image
                        src={iconUrl}
                        alt={industry.title}
                        width={64}
                        height={64}
                        className="object-contain"
                      />
                    </div>
                  ) : null}

                  <h3 className={`text-xl font-bold mb-3 transition-colors ${cardTitleClasses}`}>
                    {industry.title}
                  </h3>
                  {industry.description && (
                    <p
                      className={`leading-relaxed transition-colors mb-4 flex-1 ${cardDescClasses}`}
                    >
                      {industry.description}
                    </p>
                  )}

                  {showLink && slug && (
                    <Link
                      href={`/branchenloesungen/${slug}`}
                      className={`inline-flex items-center gap-2 font-medium transition-colors ${linkClasses}`}
                    >
                      Mehr erfahren
                      <ArrowRight size={16} />
                    </Link>
                  )}
                </div>
              )
            })}

          {(!industries || industries.length === 0) && (
            <div className="col-span-full text-center text-gray-400 py-12 border-2 border-dashed border-gray-200 rounded-xl">
              Keine Focus-Branchen ausgewählt. Bitte Branchen in den Block-Einstellungen auswählen.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
