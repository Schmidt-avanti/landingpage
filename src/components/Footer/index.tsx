import Link from 'next/link'
import React from 'react'
import { Instagram, Linkedin, Download } from 'lucide-react'
import { getPayloadClient } from '@/payloadClient'
import { AwardBadgeModal } from '@/components/AwardBadgeModal'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

export const Footer: React.FC = async () => {
  const payload = await getPayloadClient()
  let settings: any = null
  try {
    settings = await payload.findGlobal({ slug: 'site-settings' })
  } catch {
    settings = null
  }

  // Logo
  const logoUrl =
    typeof settings?.logo === 'object' && settings?.logo?.url ? settings.logo.url : null

  // Footer content
  const footerText =
    settings?.footerText ||
    'Wir entlasten Sie bei Ihrem Kundenservice. Professionell, zuverlässig und menschlich.'

  // Social Media
  const socialInstagram = settings?.socialInstagram || ''
  const socialLinkedin = settings?.socialLinkedin || ''

  // Award Badge
  const awardEnabled = settings?.awardEnabled || false
  const awardImageUrl =
    typeof settings?.awardImage === 'object' && settings?.awardImage?.url
      ? settings.awardImage.url
      : null
  const awardTitle = settings?.awardTitle || ''
  const awardDescription = settings?.awardDescription as SerializedEditorState | undefined

  // Company Info
  const companyName = settings?.companyName || 'Avanti CX GmbH'
  const companyAddress = settings?.companyAddress || ''
  const phoneNumber = settings?.phoneNumber || ''
  const email = settings?.email || ''

  // Legal Documents
  const legalDocuments = settings?.legalDocuments || []

  // Legal Page Links
  const imprintLink = settings?.imprintLink || '/impressum'
  const privacyLink = settings?.privacyLink || '/datenschutz'

  return (
    <footer className="bg-brand-darkblue text-white py-16 border-t border-brand-grayblue mt-auto">
      <div className="container mx-auto px-4">
        {/* Main Grid - 4 Columns evenly distributed */}
        <div className="flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap justify-between gap-12">
          {/* Column 1: Logo, Slogan, Social Icons */}
          <div className="flex-shrink-0 md:w-[45%] lg:w-auto lg:max-w-[280px]">
            <Link href="/" className="inline-block mb-6">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt="Avanti"
                  className="h-10 w-auto object-contain brightness-0 invert"
                />
              ) : (
                <h3 className="text-2xl font-bold font-poppins">
                  avanti<span className="text-brand-turquoise">.cx</span>
                </h3>
              )}
            </Link>
            <p className="text-gray-300 leading-relaxed mb-6">{footerText}</p>

            {/* Social Icons */}
            {(socialInstagram || socialLinkedin) && (
              <div className="flex gap-4">
                {socialInstagram && (
                  <a
                    href={socialInstagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-brand-grayblue/30 flex items-center justify-center hover:bg-brand-turquoise/20 hover:text-brand-turquoise transition-all"
                    aria-label="Instagram"
                  >
                    <Instagram size={20} />
                  </a>
                )}
                {socialLinkedin && (
                  <a
                    href={socialLinkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-brand-grayblue/30 flex items-center justify-center hover:bg-brand-turquoise/20 hover:text-brand-turquoise transition-all"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={20} />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Column 2: Award Badge */}
          <div className="flex-shrink-0 md:w-[45%] lg:w-auto flex items-start justify-center md:justify-start">
            {awardEnabled && awardImageUrl && (
              <div className="flex flex-col items-center md:items-start">
                <h4 className="text-lg font-semibold mb-4 text-brand-lightgray">ausgezeichnet</h4>
                <AwardBadgeModal
                  imageUrl={awardImageUrl}
                  title={awardTitle}
                  description={awardDescription}
                  size="large"
                />
              </div>
            )}
          </div>

          {/* Column 3: Contact */}
          <div className="flex-shrink-0 md:w-[45%] lg:w-auto">
            <h4 className="text-lg font-semibold mb-6 text-brand-lightgray">Kontakt</h4>
            <div className="space-y-3 text-gray-300">
              {companyName && <p className="font-medium text-white">{companyName}</p>}
              {companyAddress && (
                <p className="whitespace-pre-line leading-relaxed">{companyAddress}</p>
              )}
              {phoneNumber && (
                <a
                  href={`tel:${phoneNumber.replace(/\s/g, '')}`}
                  className="block hover:text-brand-turquoise transition-colors"
                >
                  {phoneNumber}
                </a>
              )}
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="block hover:text-brand-turquoise transition-colors"
                >
                  {email}
                </a>
              )}
            </div>
          </div>

          {/* Column 4: Legal */}
          <div className="flex-shrink-0 md:w-[45%] lg:w-auto">
            <h4 className="text-lg font-semibold mb-6 text-brand-lightgray">Rechtliches</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href={imprintLink}
                  className="text-gray-400 hover:text-brand-turquoise transition-colors"
                >
                  Impressum
                </Link>
              </li>
              <li>
                <Link
                  href={privacyLink}
                  className="text-gray-400 hover:text-brand-turquoise transition-colors"
                >
                  Datenschutz
                </Link>
              </li>

              {/* Downloadable Documents */}
              {legalDocuments.map(
                (
                  doc: {
                    label?: string | null
                    file?: { url?: string | null } | null
                    id?: string | null
                  },
                  index: number,
                ) => {
                  const fileUrl =
                    typeof doc.file === 'object' && doc.file?.url ? doc.file.url : null
                  if (!fileUrl || !doc.label) return null

                  return (
                    <li key={doc.id || index}>
                      <a
                        href={fileUrl}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-brand-turquoise transition-colors inline-flex items-center gap-2"
                      >
                        <Download size={14} />
                        {doc.label}
                      </a>
                    </li>
                  )
                },
              )}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-brand-grayblue/30 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Avanti. Alle Rechte vorbehalten.
        </div>
      </div>
    </footer>
  )
}
