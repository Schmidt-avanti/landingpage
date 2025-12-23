'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

/**
 * Handles scroll-to-anchor on page load and navigation.
 * Place this in the layout to ensure anchors work across page loads.
 */
export function ScrollToAnchor() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Check for hash in URL
    const hash = window.location.hash
    if (hash) {
      // Remove the # symbol
      const id = hash.replace('#', '')

      // Small delay to ensure DOM is ready after navigation
      const timer = setTimeout(() => {
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [pathname, searchParams])

  return null
}
