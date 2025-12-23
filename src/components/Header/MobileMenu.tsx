'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Menu, X, Phone } from 'lucide-react'
import { createPortal } from 'react-dom'

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
  const [mounted, setMounted] = useState(false)
  const previousBodyOverflowRef = useRef<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    if (typeof document === 'undefined') return

    if (isOpen) {
      previousBodyOverflowRef.current = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return
    }

    if (previousBodyOverflowRef.current != null) {
      document.body.style.overflow = previousBodyOverflowRef.current
      previousBodyOverflowRef.current = null
    }
  }, [isOpen, mounted])

  const overlay = (
    <div className="fixed inset-0 z-[9999] md:hidden">
      <div
        className="absolute inset-0 bg-brand-darkblue/80 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      <div
        className="absolute inset-0 shadow-2xl animate-slideInRight backdrop-blur-md overflow-y-auto"
        style={{
          backgroundColor: 'rgba(255,255,255,0.98)',
          backgroundImage:
            'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(240,248,250,0.96) 100%)',
        }}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-gray-500 hover:text-brand-darkblue transition-colors"
            aria-label="Menu schließen"
          >
            <X size={28} />
          </button>
        </div>

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
  )

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

      {mounted && isOpen ? createPortal(overlay, document.body) : null}
    </>
  )
}
