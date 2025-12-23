import Link from 'next/link'
import React from 'react'
import { Phone } from 'lucide-react'
import { AwardBadgeModal } from '@/components/AwardBadgeModal'
import { getPayloadClient } from '@/payloadClient'
import { HeaderWrapper } from './HeaderWrapper'
import { MobileMenu } from './MobileMenu'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

export const Header: React.FC = async () => {
  const payload = await getPayloadClient()
  let settings: any = null
  try {
    settings = await payload.findGlobal({ slug: 'site-settings' })
  } catch {
    settings = null
  }

  const logoUrl = typeof settings?.logo === 'object' && settings?.logo?.url ? settings.logo.url : null
  const navigation = settings?.navigation || []
  const ctaType = settings?.ctaType || 'link'
  const ctaText = settings?.ctaText || 'Kontakt'
  const ctaLink = settings?.ctaLink || '/contact'
  const ctaPhone = settings?.ctaPhone || ''

  // Award badge
  const awardEnabled = settings?.awardEnabled || false
  const awardImageUrl =
    typeof settings?.awardImage === 'object' && settings?.awardImage?.url
      ? settings.awardImage.url
      : null
  const awardTitle = settings?.awardTitle || ''
  const awardDescription = settings?.awardDescription as SerializedEditorState | undefined

  // Build CTA href
  const ctaHref = ctaType === 'phone' ? `tel:${ctaPhone.replace(/\s/g, '')}` : ctaLink

  return (
    <HeaderWrapper>
      <div className="container mx-auto px-4 flex justify-between items-center h-full">
        {/* Logo + Award Badge */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-bold text-brand-darkblue font-poppins tracking-tight"
          >
            {logoUrl ? (
              <div
                className="h-8 md:h-10 w-[100px] md:w-[140px] bg-brand-darkblue"
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
              <>
                avanti<span className="text-brand-turquoise">.cx</span>
              </>
            )}
          </Link>

          {/* Award Badge Modal - visible on all screens */}
          {awardEnabled && awardImageUrl && (
            <AwardBadgeModal
              imageUrl={awardImageUrl}
              title={awardTitle}
              description={awardDescription}
            />
          )}
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 items-center">
          {navigation.map(
            (
              item: {
                label?: string | null
                linkType?: 'page' | 'anchor' | null
                pageLink?: string | null
                anchorLink?: string | null
                id?: string | null
              },
              index: number,
            ) => {
              const href =
                item.linkType === 'anchor' && item.anchorLink
                  ? `/#${item.anchorLink}`
                  : item.pageLink || '/'

              return (
                <Link
                  key={item.id || index}
                  href={href}
                  className="text-gray-600 hover:text-brand-turquoise font-medium transition-colors"
                >
                  {item.label}
                </Link>
              )
            },
          )}

          {/* CTA Button - Desktop */}
          {ctaText && (
            <Link
              href={ctaHref}
              className="flex items-center gap-2 px-5 py-2.5 bg-brand-orange text-white rounded-lg font-medium hover:bg-opacity-90 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              {ctaType === 'phone' && <Phone size={18} />}
              {ctaText}
            </Link>
          )}
        </nav>

        {/* Mobile Menu */}
        <MobileMenu
          navigation={navigation as any}
          ctaText={ctaText}
          ctaHref={ctaHref}
          ctaType={ctaType as 'link' | 'phone'}
        />
      </div>
    </HeaderWrapper>
  )
}
