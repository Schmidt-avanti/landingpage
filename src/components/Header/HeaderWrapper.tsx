'use client'

import React, { useState, useEffect } from 'react'

type HeaderWrapperProps = {
  children: React.ReactNode
}

export const HeaderWrapper: React.FC<HeaderWrapperProps> = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Trigger floating header style after some scrolling
      const heroThreshold = window.innerHeight * 2.5
      setIsScrolled(window.scrollY > heroThreshold)
    }

    // Check initial state
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="sticky top-0 z-50 w-full flex justify-center">
      <header
        className={`
          h-20 flex items-center
          transition-all duration-1000 ease-out
          backdrop-blur-md
          ${
            isScrolled
              ? 'shadow-2xl rounded-2xl mt-3 max-w-6xl mx-4 border border-white/40'
              : 'border-b border-white/20 shadow-sm w-full'
          }
        `}
        style={{
          width: isScrolled ? 'calc(100% - 2rem)' : '100%',
          maxWidth: isScrolled ? '1152px' : 'none',
          // Always glass effect - semi-transparent white for readability
          background: isScrolled
            ? 'linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(240,248,250,0.8) 100%)'
            : 'rgba(255,255,255,0.85)',
          boxShadow: isScrolled
            ? '0 8px 32px rgba(0,0,0,0.15), inset 0 1px 2px rgba(255,255,255,0.8)'
            : '0 1px 3px rgba(0,0,0,0.1)',
        }}
      >
        {children}
      </header>
    </div>
  )
}
