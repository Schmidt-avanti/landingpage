import React from 'react'
import Link from 'next/link'
import { Check } from 'lucide-react'

type Package = {
  id?: string | null
  name: string
  isRecommended?: boolean | null
  openingHours: string
  price?: string | null
  priceNote?: string | null
}

type Feature = {
  id?: string | null
  feature: string
}

type PricingGridProps = {
  headline?: string | null
  subheadline?: string | null
  onboardingEnabled?: boolean | null
  onboardingLabel?: string | null
  onboardingPrice?: string | null
  packages?: Package[] | null
  featuresHeadline?: string | null
  features?: Feature[] | null
  ctaText?: string | null
  ctaLinkType?: 'page' | 'anchor' | null
  ctaLink?: string | null
  ctaAnchor?: string | null
  settings?: {
    theme?: 'light' | 'dark' | null
  } | null
}

export const PricingGridComponent: React.FC<PricingGridProps> = ({
  headline,
  subheadline,
  onboardingEnabled,
  onboardingLabel,
  onboardingPrice,
  packages,
  featuresHeadline,
  features,
  ctaText,
  ctaLinkType,
  ctaLink,
  ctaAnchor,
  settings,
}) => {
  const theme = settings?.theme || 'dark'
  const isDark = theme === 'dark'

  // Build CTA href based on link type
  const ctaHref = ctaLinkType === 'anchor' && ctaAnchor ? `/#${ctaAnchor}` : ctaLink || '/'

  return (
    <section className={`py-16 md:py-24 ${isDark ? 'bg-brand-darkblue' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          {headline && (
            <h2
              className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-brand-darkblue'}`}
            >
              {headline}
            </h2>
          )}
          {subheadline && (
            <p
              className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
            >
              {subheadline}
            </p>
          )}
        </div>

        {/* Packages Grid */}
        {packages && packages.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {packages.map((pkg, index) => (
              <div
                key={pkg.id || index}
                className={`relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 ${
                  pkg.isRecommended
                    ? 'border-2 border-brand-orange shadow-lg shadow-brand-orange/20'
                    : isDark
                      ? 'border border-white/10 hover:border-brand-turquoise/50'
                      : 'border border-gray-200 hover:border-brand-turquoise'
                } ${isDark ? 'bg-white/5 backdrop-blur-sm' : 'bg-white'}`}
              >
                {/* Recommended Badge */}
                {pkg.isRecommended && (
                  <div className="absolute top-0 left-0 right-0 bg-brand-orange text-white text-center py-1.5 text-sm font-semibold">
                    Empfohlen
                  </div>
                )}

                {/* Card Content - Fixed height sections for consistency */}
                <div
                  className={`flex flex-col h-full ${pkg.isRecommended ? 'pt-10' : 'pt-6'} px-6 pb-6`}
                >
                  {/* Package Name - Fixed height */}
                  <div className="min-h-[60px] flex items-center justify-center">
                    <h3
                      className={`text-2xl font-bold text-center ${isDark ? 'text-white' : 'text-brand-darkblue'}`}
                    >
                      {pkg.name}
                    </h3>
                  </div>

                  {/* Divider */}
                  <div
                    className={`w-12 h-0.5 mx-auto mb-6 ${pkg.isRecommended ? 'bg-brand-orange' : 'bg-brand-turquoise/50'}`}
                  />

                  {/* Opening Hours - Fixed height for consistency */}
                  <div className="min-h-[140px] flex items-start justify-center">
                    <p
                      className={`text-center whitespace-pre-line leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
                    >
                      {pkg.openingHours}
                    </p>
                  </div>

                  {/* Price Section - Fixed height */}
                  <div className="min-h-[80px] flex flex-col items-center justify-center mt-auto">
                    {pkg.price && (
                      <p
                        className={`text-2xl font-bold ${pkg.isRecommended ? 'text-brand-orange' : isDark ? 'text-white' : 'text-brand-darkblue'}`}
                      >
                        {pkg.price}
                      </p>
                    )}
                    {pkg.priceNote && (
                      <p
                        className={`text-sm text-center mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
                      >
                        {pkg.priceNote}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Onboarding Fee - Below packages */}
        {onboardingEnabled && onboardingPrice && (
          <div className="flex justify-center mb-16">
            <div
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg ${
                isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200'
              }`}
            >
              <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                {onboardingLabel || 'Einmalige Onboarding-Gebühr'}:
              </span>
              <span className={`font-bold ${isDark ? 'text-white' : 'text-brand-darkblue'}`}>
                {onboardingPrice}
              </span>
            </div>
          </div>
        )}

        {/* Included Features - Better layout */}
        {features && features.length > 0 && (
          <div className="max-w-5xl mx-auto mb-16">
            {featuresHeadline && (
              <h3
                className={`text-xl md:text-2xl font-semibold mb-8 ${isDark ? 'text-white' : 'text-brand-darkblue'}`}
              >
                {featuresHeadline}
              </h3>
            )}
            <div className="space-y-4">
              {features.map((item, index) => (
                <div
                  key={item.id || index}
                  className={`flex items-start gap-4 p-4 rounded-xl ${
                    isDark ? 'bg-white/5 border border-white/5' : 'bg-white border border-gray-100'
                  }`}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-turquoise/20 flex items-center justify-center mt-0.5">
                    <Check className="w-5 h-5 text-brand-turquoise" />
                  </div>
                  <span
                    className={`text-base leading-relaxed ${isDark ? 'text-gray-200' : 'text-gray-700'}`}
                  >
                    {item.feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        {ctaText && ctaHref && (
          <div className="text-center">
            <Link
              href={ctaHref}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-300 bg-brand-orange rounded-xl hover:bg-brand-orange/90 hover:scale-105 shadow-lg shadow-brand-orange/20"
            >
              {ctaText}
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
