import Link from 'next/link'
import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'

export const Footer: React.FC = async () => {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const settings = await payload.findGlobal({ slug: 'site-settings' })
  const footerLogoUrl = typeof settings.footerLogo === 'object' && settings.footerLogo?.url ? settings.footerLogo.url : null
  const logoUrl = typeof settings.logo === 'object' && settings.logo?.url ? settings.logo.url : null
  
  // Prefer footer logo (white), fallback to main logo if it works, or text
  const displayLogo = footerLogoUrl || logoUrl

  return (
    <footer className="bg-brand-darkblue text-white py-16 border-t border-brand-grayblue mt-auto">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
                 <Link href="/" className="inline-block mb-6">
                    {displayLogo ? (
                        <img src={displayLogo} alt="Avanti" className="h-10 w-auto object-contain brightness-0 invert" />
                    ) : (
                        <h3 className="text-2xl font-bold font-poppins">avanti<span className="text-brand-turquoise">.cx</span></h3>
                    )}
                 </Link>
                 <p className="text-gray-300 max-w-md leading-relaxed">
                   {settings.footerText || "Wir entlasten Sie bei Ihrem Kundenservice. Professionell, zuverlässig und menschlich."}
                 </p>
                 {settings.email && (
                    <div className="mt-6 text-gray-300">
                        <a href={`mailto:${settings.email}`} className="hover:text-brand-turquoise transition-colors">{settings.email}</a>
                    </div>
                 )}
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-6 flex items-center text-brand-lightgray">Leistungen</h4>
              <ul className="space-y-4">
                <li><Link href="/services" className="text-gray-400 hover:text-brand-turquoise transition-colors">Alle Leistungen</Link></li>
                <li><Link href="/services" className="text-gray-400 hover:text-brand-turquoise transition-colors">Telefon & E-Mail</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6 flex items-center text-brand-lightgray">Rechtliches</h4>
               <ul className="space-y-4">
                <li><Link href="/imprint" className="text-gray-400 hover:text-brand-turquoise transition-colors">Impressum</Link></li>
                <li><Link href="/privacy" className="text-gray-400 hover:text-brand-turquoise transition-colors">Datenschutz</Link></li>
              </ul>
            </div>
        </div>
        <div className="container mx-auto px-4 mt-16 pt-8 border-t border-brand-grayblue/30 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Avanti. Alle Rechte vorbehalten.
        </div>
    </footer>
  )
}
