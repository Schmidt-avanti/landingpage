'use client'

import { useEffect, useState } from 'react'

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Wait for all images and fonts to load
    const handleLoad = () => {
      // Add small delay for smoother transition
      setTimeout(() => {
        setIsLoading(false)
        // Fade out animation takes 500ms
        setTimeout(() => setIsVisible(false), 500)
      }, 100)
    }

    // Check if document is already loaded
    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
      return () => window.removeEventListener('load', handleLoad)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-brand-darkblue transition-opacity duration-500 ${
        isLoading ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Animated Logo */}
        <div className="relative">
          <div className="text-4xl font-bold text-white tracking-wide animate-pulse">avanti</div>
          {/* Animated underline */}
          <div className="absolute -bottom-2 left-0 h-1 bg-brand-orange rounded-full animate-loading-bar" />
        </div>

        {/* Loading dots */}
        <div className="flex gap-2">
          <div
            className="w-2 h-2 rounded-full bg-brand-turquoise animate-bounce"
            style={{ animationDelay: '0ms' }}
          />
          <div
            className="w-2 h-2 rounded-full bg-brand-turquoise animate-bounce"
            style={{ animationDelay: '150ms' }}
          />
          <div
            className="w-2 h-2 rounded-full bg-brand-turquoise animate-bounce"
            style={{ animationDelay: '300ms' }}
          />
        </div>
      </div>
    </div>
  )
}
