import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@/payload.config'

export const Header: React.FC = async () => {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const settings = await payload.findGlobal({ slug: 'site-settings' })
  const logoUrl = typeof settings.logo === 'object' && settings.logo?.url ? settings.logo.url : null

  return (
    <header className="w-full h-20 bg-white border-b border-gray-100 flex items-center shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-brand-darkblue font-poppins tracking-tight">
                {logoUrl ? (
                   <div 
                      className="h-10 w-[140px] bg-brand-darkblue"
                      style={{
                        maskImage: `url(${logoUrl})`,
                        maskRepeat: 'no-repeat',
                        maskSize: 'contain',
                        maskPosition: 'left center',
                        WebkitMaskImage: `url(${logoUrl})`,
                        WebkitMaskRepeat: 'no-repeat',
                        WebkitMaskSize: 'contain',
                        WebkitMaskPosition: 'left center',
                      }}
                      role="img"
                      aria-label="Avanti Logo"
                   />
                ) : (
                   <>avanti<span className="text-brand-turquoise">.cx</span></>
                )}
            </Link>
            
            <nav className="flex gap-8 items-center">
                <Link href="/services" className="hidden md:block text-gray-600 hover:text-brand-turquoise font-medium transition-colors">Leistungen</Link>
                <Link href="/testimonials" className="hidden md:block text-gray-600 hover:text-brand-turquoise font-medium transition-colors">Kundenstimmen</Link>
                <Link href="/contact" className="px-5 py-2.5 bg-brand-orange text-white rounded-lg font-medium hover:bg-opacity-90 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">Kontakt</Link>
            </nav>
        </div>
    </header>
  )
}
