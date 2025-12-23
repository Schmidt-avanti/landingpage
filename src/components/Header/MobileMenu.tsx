'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Phone } from 'lucide-react'

type NavigationItem = {
  label?: string | null
  linkType?: 'page' | 'anchor' | null
  pageLink?: string | null
  anchorLink?: string | null
  id?: string | null
}

type MobileMenuProps = {
  navigation: NavigationItem[]
  ctaText: string
  ctaHref: string
  ctaType: 'link' | 'phone'
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  navigation,
  ctaText,
  ctaHref,
  ctaType,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Hamburger Button - Only on mobile */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden p-2 text-brand-darkblue hover:text-brand-turquoise transition-colors"
        aria-label="Menu öffnen"
      >
        <Menu size={28} />
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[9999] md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-brand-darkblue/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu Panel */}
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85%] bg-white shadow-2xl animate-slideInRight">
            {/* Close Button */}
            <div className="flex justify-end p-4">
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-500 hover:text-brand-darkblue transition-colors"
                aria-label="Menu schließen"
              >
                <X size={28} />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col px-6 py-4 space-y-4">
              {navigation.map((item, index) => {
                const href =
                  item.linkType === 'anchor' && item.anchorLink
                    ? `/#${item.anchorLink}`
                    : item.pageLink || '/'

                return (
                  <Link
                    key={item.id || index}
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-gray-700 hover:text-brand-turquoise transition-colors py-2 border-b border-gray-100"
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>

            {/* CTA Button */}
            {ctaText && (
              <div className="px-6 py-4">
                <Link
                  href={ctaHref}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-brand-orange text-white rounded-lg font-medium text-base hover:bg-opacity-90 transition-all shadow-md"
                >
                  {ctaType === 'phone' && <Phone size={18} />}
                  {ctaText}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
