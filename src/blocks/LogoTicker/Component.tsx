import type { Page } from '@/payload-types'
import { Media } from '@/payload-types'
import Image from 'next/image'

type LogoTickerType = Extract<Page['layout'][number], { blockType: 'logoTicker' }>

export const LogoTickerComponent: React.FC<LogoTickerType> = ({ logos, speed }) => {
  const speedClass = {
    slow: 'duration-[60s]',
    normal: 'duration-[30s]',
    fast: 'duration-[15s]',
  }[speed || 'normal']

  if (!logos || logos.length === 0) return null

  // Duplicate logos for seamless scrolling
  const duplicatedLogos = [...logos, ...logos]

  return (
    <section className="py-12 bg-white overflow-hidden border-b border-gray-100">
      <div className="container mx-auto px-4 mb-8 text-center">
         <p className="text-gray-500 font-medium text-sm uppercase tracking-widest">
            Vertrauen von führenden Unternehmen
         </p>
      </div>
      <div className="relative w-full flex overflow-hidden mask-image-linear-gradient">
        <div className={`flex gap-16 items-center animate-scroll ${speedClass ? `animate-scroll-${speed}` : ''} whitespace-nowrap`}>
          {duplicatedLogos.map((item, index) => {
             const logo = item.logo as Media
             if (!logo || typeof logo === 'string') return null
             
             return (
               <div key={index} className="flex-shrink-0 w-32 h-16 relative grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100">
                 <Image 
                    src={logo.url || ''} 
                    alt={item.name || logo.alt || 'Client Logo'} 
                    fill 
                    className="object-contain"
                 />
               </div>
             )
          })}
        </div>
      </div>

    </section>
  )
}
