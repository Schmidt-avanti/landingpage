import type { Page } from '@/payload-types'
import { Media } from '@/payload-types'
import Image from 'next/image'

type LogoTickerType = Extract<Page['layout'][number], { blockType: 'logoTicker' }>

export const LogoTickerComponent: React.FC<
  LogoTickerType & { settings?: { theme?: 'light' | 'dark' } }
> = ({ headline, logos, speed, invertLogos, settings }) => {
  const theme = settings?.theme || 'dark'
  const isDark = theme === 'dark'

  const containerClasses = isDark ? 'bg-brand-darkblue text-white' : 'bg-white text-gray-900'
  const headlineClasses = isDark ? 'text-gray-400' : 'text-gray-500'

  const speedClass = {
    slow: 'duration-[60s]',
    normal: 'duration-[30s]',
    fast: 'duration-[15s]',
  }[speed || 'normal']

  if (!logos || logos.length === 0) return null

  // Ensure we have enough logos to fill the screen width comfortably.
  // We want the 'base set' to be long enough so that 2x base set definitely overflows.
  let repeatedLogos = [...logos]
  while (repeatedLogos.length < 10) {
    repeatedLogos = [...repeatedLogos, ...logos]
  }

  // Now create the seamless loop by doubling that substantial base set
  // This creates [BaseSet] [BaseSet]. Animation moves -50% (width of BaseSet).
  // Because BaseSet is long, we won't run out of content.
  const finalLogos = [...repeatedLogos, ...repeatedLogos]

  return (
    <section className={`py-12 overflow-hidden border-b border-gray-100 ${containerClasses}`}>
      <div className="container mx-auto px-4 mb-8 text-center">
        <p className={`font-medium text-sm uppercase tracking-widest ${headlineClasses}`}>
          {headline || 'Vertrauen von führenden Unternehmen'}
        </p>
      </div>

      {/* Wrapper to mask edges */}
      <div className="relative w-full overflow-hidden mask-image-linear-gradient">
        {/* Animated Container: Moves from 0% to -50% width */}
        <div
          className={`flex w-fit animate-scroll ${speedClass ? `animate-scroll-${speed}` : ''} hover:pause-animation`}
        >
          {/* We render the single massive list which contains [Set A] [Set A] visually */}
          <div className="flex gap-16 items-center pr-16 whitespace-nowrap">
            {finalLogos.map((item, index) => {
              // Safe access to logo
              const logo = typeof item.logo === 'object' ? (item.logo as Media) : null
              const logoUrl = logo?.url

              if (!logoUrl) return null

              return (
                <div
                  key={`${index}-${logo.id}`}
                  className="flex-shrink-0 w-32 h-16 relative hover:opacity-100 transition-opacity duration-300 opacity-70"
                >
                  <Image
                    src={logoUrl}
                    alt={item.name || logo.alt || 'Client Logo'}
                    fill
                    sizes="128px"
                    className={`object-contain ${invertLogos ? 'invert' : 'grayscale hover:grayscale-0'}`}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
