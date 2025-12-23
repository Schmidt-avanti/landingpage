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
import Image from 'next/image'

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

export type ServiceGridProps = {
  title?: string
  introduction?: string
  services?: any[] // Type should be imported from Payload types properly ideally
  settings?: { theme?: 'light' | 'dark' }
}

export const ServiceGrid: React.FC<ServiceGridProps> = ({
  title = 'Unsere Leistungen',
  introduction = 'Maßgeschneiderte Lösungen für Ihren Kundenservice – skalierbar, professionell und persönlich.',
  services,
  settings,
}) => {
  const theme = settings?.theme || 'dark' // Default to dark per request/consistency with other blocks? User wants theming. Default was white before. Let's default to dark if user wants consistent default, or light if that was original. Original was bg-white. Let's use user's choice. If undefined, maybe 'light' to preserve old look, or 'dark' to standardize. "blockSettings" default is 'dark'.
  const isDark = theme === 'dark'

  const containerClasses = isDark ? 'bg-brand-darkblue' : 'bg-white'
  const headlineClasses = isDark ? 'text-white' : 'text-brand-darkblue'
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

  return (
    <section className={`py-24 transition-colors duration-300 ${containerClasses}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-5xl font-bold font-poppins mb-4 ${headlineClasses}`}>
            {title}
          </h2>
          <p
            className={`max-w-2xl mx-auto text-lg leading-relaxed whitespace-pre-line ${introTextClasses}`}
          >
            {introduction}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Ensure services is an array and filter out non-object items if population fails */}
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
                  className={`group p-8 rounded-2xl transition-all duration-300 flex flex-col items-start cursor-default border ${cardClasses}`}
                >
                  {/* Render Standard Icon or Custom Image or Fallback */}
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
                        alt={service.title}
                        width={64}
                        height={64}
                        className="object-contain"
                      />
                    </div>
                  ) : null}

                  <h3 className={`text-xl font-bold mb-3 transition-colors ${cardTitleClasses}`}>
                    {service.title}
                  </h3>
                  <p className={`leading-relaxed transition-colors ${cardDescClasses}`}>
                    {service.description}
                  </p>
                </div>
              )
            })}

          {(!services || services.length === 0) && (
            <div className="col-span-full text-center text-gray-400 py-12 border-2 border-dashed border-gray-200 rounded-xl">
              No services selected. Please select services in the Block settings.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
