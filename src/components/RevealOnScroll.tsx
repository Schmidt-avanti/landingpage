'use client'

import React, { useEffect, useRef, useState } from 'react'

type RevealOnScrollProps = {
  children: React.ReactNode
  className?: string
}

export const RevealOnScroll: React.FC<RevealOnScrollProps> = ({ children, className }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery.matches) {
      setIsVisible(true)
      return
    }

    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) return
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        root: null,
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px',
      },
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div
      ref={ref}
      className={
        `transition-all duration-700 ease-out will-change-transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        } motion-reduce:opacity-100 motion-reduce:translate-y-0` +
        (className ? ` ${className}` : '')
      }
    >
      {children}
    </div>
  )
}
