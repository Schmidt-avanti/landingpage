'use client'

import React, { useRef, useEffect, useLayoutEffect, useState } from 'react'
import Image from 'next/image'
import type { Media } from '@/payload-types'
import { ShieldCheck, TrendingUp } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface BentoCard {
  id?: string
  cardType: 'image' | 'screenshot' | 'stat' | 'decorative'
  cardSize: 'small' | 'medium' | 'large'
  image?: Media | string | number | null
  statValue?: string | null
  statLabel?: string | null
  statBackgroundImage?: Media | string | number | null
  cardTitle?: string | null
  cardHeadline?: string | null
  cardSubheadline?: string | null
}

interface HeroProps {
  headline: string
  subheadline?: string | null
  badgeText?: string | null
  ctaText?: string | null
  ctaLinkType?: 'page' | 'anchor' | null
  ctaLink?: string | null
  ctaAnchor?: string | null
  secondaryCtaText?: string | null
  secondaryCtaLink?: string | null
  bentoCards?: BentoCard[] | null
}

// Card positions per scroll state - optimized for landscape images
const cardPositions = [
  // State 0: Card 0 is active (main image - wider format)
  [
    { top: '0%', left: '0%', width: '65%', height: '65%', zIndex: 30, rotate: -2 },
    { top: '5%', left: '68%', width: '35%', height: '35%', zIndex: 20, rotate: 3 },
    { top: '48%', left: '62%', width: '38%', height: '50%', zIndex: 10, rotate: -1 },
  ],
  // State 1: Card 1 is active
  [
    { top: '50%', left: '0%', width: '38%', height: '48%', zIndex: 20, rotate: -3 },
    { top: '0%', left: '25%', width: '75%', height: '60%', zIndex: 30, rotate: 1 },
    { top: '55%', left: '55%', width: '43%', height: '43%', zIndex: 10, rotate: 2 },
  ],
  // State 2: Card 2 is active
  [
    { top: '0%', left: '0%', width: '45%', height: '50%', zIndex: 10, rotate: -2 },
    { top: '5%', left: '48%', width: '50%', height: '40%', zIndex: 20, rotate: 2 },
    { top: '30%', left: '20%', width: '80%', height: '70%', zIndex: 30, rotate: -1 },
  ],
]

// Floating badge positions - positioned outside cards to not cover content
const floatingBadgePositions = [
  { top: '-8%', left: '5%', rotate: -2 }, // Card 0: above and left
  { top: '30%', left: '-5%', rotate: 1 }, // Card 1: higher and more left
  { top: '15%', left: '10%', rotate: -1 }, // Card 2
]

export const Hero: React.FC<HeroProps> = ({
  headline,
  subheadline,
  badgeText,
  ctaText,
  ctaLinkType,
  ctaLink,
  ctaAnchor,
  secondaryCtaText,
  secondaryCtaLink,
  bentoCards,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const hasScrolledRef = useRef(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [breakpointReady, setBreakpointReady] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [currentHeadline, setCurrentHeadline] = useState(headline)
  const [currentSubheadline, setCurrentSubheadline] = useState(subheadline)
  const autoAdvanceIdRef = useRef<number | null>(null)
  const pointerIdRef = useRef<number | null>(null)
  const swipeStartXRef = useRef<number | null>(null)
  const swipeLastXRef = useRef<number | null>(null)
  const gridElementRef = useRef<HTMLDivElement>(null)
  const cardCount = Math.min(bentoCards?.length || 0, 3)

  // Build CTA href based on link type
  const ctaHref = ctaLinkType === 'anchor' && ctaAnchor ? `/#${ctaAnchor}` : ctaLink || '/'

  // Update dynamic text content when activeIndex changes
  useEffect(() => {
    const activeCard = bentoCards?.[activeIndex]
    const newHeadline = activeCard?.cardHeadline || headline
    const newSubheadline = activeCard?.cardSubheadline || subheadline

    setCurrentHeadline(newHeadline)
    setCurrentSubheadline(newSubheadline)
  }, [activeIndex, bentoCards, headline, subheadline])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const update = () => {
      setReduceMotion(Boolean(mediaQuery.matches))
    }

    update()

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', update)
      return () => mediaQuery.removeEventListener('change', update)
    }

    mediaQuery.addListener(update)
    return () => mediaQuery.removeListener(update)
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mediaQuery = window.matchMedia('(min-width: 1024px)')

    const update = () => {
      setIsDesktop(Boolean(mediaQuery.matches))
    }

    update()
    setBreakpointReady(true)

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', update)
      return () => mediaQuery.removeEventListener('change', update)
    }

    mediaQuery.addListener(update)
    return () => mediaQuery.removeListener(update)
  }, [])

  // GSAP Text Animation when activeIndex changes
  useLayoutEffect(() => {
    if (!mounted || !breakpointReady || !containerRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } })

      // Fade out current text
      tl.to(['[data-hero="headline"]', '[data-hero="subheadline"]'], {
        opacity: 0,
        duration: 0.3,
      })

      // Update text content (happens instantly during fade)
      tl.call(() => {
        // Text is already updated by the useEffect above
      })

      // Fade in new text
      tl.to(['[data-hero="headline"]', '[data-hero="subheadline"]'], {
        opacity: 1,
        duration: 0.3,
      })
    }, containerRef)

    return () => ctx.revert()
  }, [activeIndex, mounted, breakpointReady])

  // Parallax Mouse Effect
  useLayoutEffect(() => {
    if (!mounted || !breakpointReady || !containerRef.current || !isDesktop || reduceMotion) return

    const container = containerRef.current
    const ctx = gsap.context(() => {
      // Use the container itself (has hero-platform-bg class)
      const gridElement = container as HTMLElement
      if (!gridElement) return

      const handleMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        // Calculate mouse position relative to center (-1 to 1)
        const mouseX = (e.clientX - centerX) / (rect.width / 2)
        const mouseY = (e.clientY - centerY) / (rect.height / 2)

        // Parallax effect for grid (subtle, opposite direction)
        const gridX = mouseX * -40 // Max 40px offset
        const gridY = mouseY * -40 // Max 40px offset

        // 3D tilt effect (rotation based on mouse position)
        const rotateX = mouseY * -5 // Max 5 degrees rotation
        const rotateY = mouseX * 5 // Max 5 degrees rotation

        // Apply transform to the pseudo-element via CSS custom properties
        gridElement.style.setProperty('--grid-x', `${gridX}px`)
        gridElement.style.setProperty('--grid-y', `${gridY}px`)
        gridElement.style.setProperty('--rotate-x', `${rotateX}deg`)
        gridElement.style.setProperty('--rotate-y', `${rotateY}deg`)

        // Mouse glow effect (follows mouse)
        const glowX = ((e.clientX - rect.left) / rect.width) * 100
        const glowY = ((e.clientY - rect.top) / rect.height) * 100
        gridElement.style.setProperty('--mouse-x', `${glowX}%`)
        gridElement.style.setProperty('--mouse-y', `${glowY}%`)
      }

      const handleMouseLeave = () => {
        // Reset positions when mouse leaves
        gridElement.style.setProperty('--grid-x', '0px')
        gridElement.style.setProperty('--grid-y', '0px')
        gridElement.style.setProperty('--rotate-x', '0deg')
        gridElement.style.setProperty('--rotate-y', '0deg')
        gridElement.style.setProperty('--mouse-x', '50%')
        gridElement.style.setProperty('--mouse-y', '50%')
      }

      // Add event listeners
      container.addEventListener('mousemove', handleMouseMove)
      container.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        container.removeEventListener('mousemove', handleMouseMove)
        container.removeEventListener('mouseleave', handleMouseLeave)
      }
    }, container)

    return () => ctx.revert()
  }, [mounted, breakpointReady, isDesktop, reduceMotion])

  useLayoutEffect(() => {
    if (!mounted) return
    if (!breakpointReady) return
    if (!containerRef.current || reduceMotion || !isDesktop) return

    const ctx = gsap.context(() => {
      gsap.set(
        [
          '[data-hero="badge"]',
          '[data-hero="headline"]',
          '[data-hero="subheadline"]',
          '[data-hero="cta"]',
          '[data-hero="dots"]',
        ],
        { opacity: 0, y: 20 },
      )
      gsap.set('[data-hero-card]', { opacity: 0 })

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.to(
        [
          '[data-hero="badge"]',
          '[data-hero="headline"]',
          '[data-hero="subheadline"]',
          '[data-hero="cta"]',
          '[data-hero="dots"]',
        ],
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
        },
        0,
      )

      tl.to(
        '[data-hero-card]',
        {
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
        },
        0.1,
      )
    }, containerRef)

    return () => ctx.revert()
  }, [reduceMotion, isDesktop, mounted, breakpointReady])

  useLayoutEffect(() => {
    if (!mounted) return
    if (!breakpointReady) return
    if (!containerRef.current) return
    if (!reduceMotion) return
    if (!isDesktop) return

    const ctx = gsap.context(() => {
      gsap.set(
        [
          '[data-hero="badge"]',
          '[data-hero="headline"]',
          '[data-hero="subheadline"]',
          '[data-hero="cta"]',
          '[data-hero="dots"]',
        ],
        { opacity: 1, y: 0 },
      )

      gsap.set('[data-hero-card]', { opacity: 1 })
    }, containerRef)

    return () => ctx.revert()
  }, [reduceMotion, isDesktop, mounted, breakpointReady])

  useEffect(() => {
    if (!mounted) return
    if (!breakpointReady) return
    if (!containerRef.current || cardCount === 0 || reduceMotion || !isDesktop) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 80px',
        end: `+=${cardCount * 100}%`,
        pin: true,
        pinSpacing: true,
        scrub: 0.3,
        onUpdate: (self) => {
          const progress = self.progress

          if (progress > 0.01 && !hasScrolledRef.current) {
            hasScrolledRef.current = true
            setHasScrolled(true)
          }

          const newIndex = Math.min(Math.floor(progress * cardCount), cardCount - 1)
          setActiveIndex(newIndex)
        },
        onLeaveBack: () => {
          hasScrolledRef.current = false
          setHasScrolled(false)
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [cardCount, reduceMotion, isDesktop, mounted, breakpointReady])

  useEffect(() => {
    if (!mounted) return
    if (isDesktop) return
    if (cardCount <= 1) return

    if (autoAdvanceIdRef.current) window.clearInterval(autoAdvanceIdRef.current)
    autoAdvanceIdRef.current = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % cardCount)
    }, 6000)

    return () => {
      if (autoAdvanceIdRef.current) window.clearInterval(autoAdvanceIdRef.current)
      autoAdvanceIdRef.current = null
    }
  }, [cardCount, isDesktop, mounted])

  useEffect(() => {
    if (!mounted) return
    if (isDesktop) return
    hasScrolledRef.current = false
    setHasScrolled(false)
    setActiveIndex(0)
  }, [isDesktop, mounted])

  const stopAutoAdvance = () => {
    if (autoAdvanceIdRef.current) window.clearInterval(autoAdvanceIdRef.current)
    autoAdvanceIdRef.current = null
  }

  const startAutoAdvance = () => {
    if (isDesktop) return
    if (cardCount <= 1) return

    stopAutoAdvance()
    autoAdvanceIdRef.current = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % cardCount)
    }, 6000)
  }

  const goToIndex = (nextIndex: number) => {
    if (cardCount <= 0) return
    const normalized = ((nextIndex % cardCount) + cardCount) % cardCount
    setActiveIndex(normalized)

    if (!isDesktop && cardCount > 1) startAutoAdvance()
  }

  const currentPositions = cardPositions[activeIndex] || cardPositions[0]
  const currentBadgePos = floatingBadgePositions[activeIndex] || floatingBadgePositions[0]
  const activeCard = bentoCards?.[activeIndex]

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden hero-platform-bg"
    >
      {/* Background Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-turquoise/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 pt-16 pb-12 md:pt-28 md:pb-20 lg:py-32 relative z-10 min-h-[100svh] flex items-start lg:h-screen lg:items-center">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 w-full">
          {/* LEFT: Text */}
          <div className="text-white relative h-[420px] sm:h-[480px] lg:h-[600px]">
            {/* Badge - Fixed at top */}
            {badgeText && (
              <div className="absolute top-0 left-0">
                <div
                  data-hero="badge"
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 text-sm font-medium text-brand-turquoise"
                >
                  <ShieldCheck size={16} />
                  <span>{badgeText}</span>
                </div>
              </div>
            )}

            {/* Headline + Subheadline - Centered in middle area */}
            <div className="absolute top-[50px] sm:top-[70px] lg:top-[80px] left-0 w-full bottom-[110px] sm:bottom-[150px] lg:bottom-[200px] flex flex-col justify-center">
              <div className="space-y-4 sm:space-y-6">
                <h1
                  data-hero="headline"
                  className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight"
                >
                  {currentHeadline}
                </h1>

                {currentSubheadline && (
                  <p
                    data-hero="subheadline"
                    className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-lg"
                  >
                    {currentSubheadline}
                  </p>
                )}
              </div>
            </div>

            {/* CTA + Dots - Fixed at bottom */}
            <div className="absolute bottom-0 left-0 w-full space-y-4 sm:space-y-6">
              {ctaText && ctaHref && (
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    data-hero="cta"
                    href={ctaHref}
                    className="group inline-flex items-center justify-center px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg font-bold text-white transition-all duration-300 bg-brand-orange rounded-xl hover:bg-brand-orange/90 hover:scale-105 shadow-lg shadow-brand-orange/20"
                  >
                    {ctaText}
                    <svg
                      className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>

                  {secondaryCtaText && secondaryCtaLink && (
                    <a
                      data-hero="cta"
                      href={secondaryCtaLink}
                      className="group hidden sm:inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-brand-orange transition-all duration-300 border-2 border-brand-orange rounded-xl hover:bg-brand-orange/10 hover:scale-105"
                    >
                      {secondaryCtaText}
                      <svg
                        className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  )}
                </div>
              )}

              <div data-hero="dots">
                <div className="flex gap-1.5">
                  {bentoCards?.slice(0, 3).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => goToIndex(i)}
                      aria-label={`Hero Story ${i + 1}`}
                      className={`h-2 rounded-full transition-all duration-500 ${
                        i === activeIndex ? 'bg-brand-turquoise w-8' : 'bg-white/30 w-2'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Cards + Floating Badge */}
          <div
            className="relative h-[400px] sm:h-[420px] md:h-[480px] lg:h-[550px] lg:self-center"
            style={{ touchAction: 'pan-y' }}
            onPointerDown={(e) => {
              if (isDesktop || cardCount <= 1) return
              if (e.pointerType && e.pointerType !== 'touch' && e.pointerType !== 'mouse') return
              if (typeof (e.currentTarget as any).setPointerCapture === 'function') {
                try {
                  ;(e.currentTarget as any).setPointerCapture(e.pointerId)
                } catch {
                  // ignore
                }
              }

              pointerIdRef.current = e.pointerId
              swipeStartXRef.current = e.clientX
              swipeLastXRef.current = e.clientX

              stopAutoAdvance()
            }}
            onPointerMove={(e) => {
              if (isDesktop || cardCount <= 1) return
              if (swipeStartXRef.current == null) return
              if (pointerIdRef.current != null && e.pointerId !== pointerIdRef.current) return
              swipeLastXRef.current = e.clientX
            }}
            onPointerUp={() => {
              if (isDesktop || cardCount <= 1) return
              const startX = swipeStartXRef.current
              const endX = swipeLastXRef.current
              swipeStartXRef.current = null
              swipeLastXRef.current = null
              pointerIdRef.current = null

              if (startX == null || endX == null) return
              const delta = endX - startX
              const threshold = 30

              if (Math.abs(delta) < threshold) return
              if (delta < 0) {
                goToIndex(activeIndex + 1)
              } else {
                goToIndex(activeIndex - 1)
              }

              startAutoAdvance()
            }}
            onPointerCancel={() => {
              swipeStartXRef.current = null
              swipeLastXRef.current = null
              pointerIdRef.current = null
              startAutoAdvance()
            }}
            onTouchStart={(e) => {
              if (isDesktop || cardCount <= 1) return
              const x = e.touches[0]?.clientX
              if (typeof x !== 'number') return
              swipeStartXRef.current = x
              swipeLastXRef.current = x
              stopAutoAdvance()
            }}
            onTouchMove={(e) => {
              if (isDesktop || cardCount <= 1) return
              if (swipeStartXRef.current == null) return
              const x = e.touches[0]?.clientX
              if (typeof x !== 'number') return
              swipeLastXRef.current = x
            }}
            onTouchEnd={() => {
              if (isDesktop || cardCount <= 1) return
              const startX = swipeStartXRef.current
              const endX = swipeLastXRef.current
              swipeStartXRef.current = null
              swipeLastXRef.current = null

              if (startX == null || endX == null) return
              const delta = endX - startX
              const threshold = 30

              if (Math.abs(delta) < threshold) {
                startAutoAdvance()
                return
              }

              if (delta < 0) {
                goToIndex(activeIndex + 1)
              } else {
                goToIndex(activeIndex - 1)
              }

              startAutoAdvance()
            }}
          >
            {/* Cards */}
            {isDesktop
              ? bentoCards?.slice(0, 3).map((card, index) => {
                  const pos = currentPositions[index]
                  if (!pos) return null

                  const imageUrl =
                    typeof card.image === 'object' && card.image?.url ? card.image.url : null
                  const imageAlt =
                    typeof card.image === 'object' && card.image?.alt ? card.image.alt : 'Card'
                  const statBgUrl =
                    typeof card.statBackgroundImage === 'object' && card.statBackgroundImage?.url
                      ? card.statBackgroundImage.url
                      : null

                  return (
                    <div
                      data-hero-card
                      key={card.id || index}
                      className="absolute rounded-2xl overflow-hidden border-2 border-white/20 bg-white/5 backdrop-blur-sm shadow-2xl transition-all duration-700 ease-out"
                      style={{
                        top: pos.top,
                        left: pos.left,
                        width: pos.width,
                        height: pos.height,
                        zIndex: pos.zIndex,
                        transform: `rotate(${pos.rotate}deg)`,
                      }}
                    >
                      {/* Image */}
                      {imageUrl && card.cardType !== 'stat' && (
                        <Image
                          src={imageUrl}
                          alt={imageAlt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 40vw"
                          priority={index === 0}
                        />
                      )}

                      {/* Stat Card */}
                      {card.cardType === 'stat' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          {statBgUrl && (
                            <Image
                              src={statBgUrl}
                              alt="Background"
                              fill
                              className="object-cover opacity-40"
                              sizes="(max-width: 768px) 100vw, 40vw"
                            />
                          )}
                          <div className="absolute inset-0 bg-brand-darkblue/70" />
                          <div className="relative z-10 text-center">
                            <TrendingUp className="h-10 w-10 text-brand-orange mb-3 mx-auto" />
                            <div className="text-4xl md:text-5xl font-extrabold text-white">
                              {card.statValue}
                            </div>
                            <div className="text-base text-gray-300 mt-1">{card.statLabel}</div>
                          </div>
                        </div>
                      )}

                      {/* Gradient */}
                      {card.cardType !== 'stat' && (
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-darkblue/40 via-transparent to-transparent pointer-events-none" />
                      )}
                    </div>
                  )
                })
              : (() => {
                  const card = bentoCards?.slice(0, 3)[activeIndex]
                  if (!card) return null

                  const imageUrl =
                    typeof card.image === 'object' && card.image?.url ? card.image.url : null
                  const imageAlt =
                    typeof card.image === 'object' && card.image?.alt ? card.image.alt : 'Card'
                  const statBgUrl =
                    typeof card.statBackgroundImage === 'object' && card.statBackgroundImage?.url
                      ? card.statBackgroundImage.url
                      : null

                  return (
                    <div
                      data-hero-card
                      key={card.id || activeIndex}
                      className="absolute inset-0 rounded-2xl overflow-hidden border-2 border-white/20 bg-white/5 backdrop-blur-sm shadow-2xl"
                      style={{ zIndex: 30 }}
                    >
                      {imageUrl && card.cardType !== 'stat' && (
                        <Image
                          src={imageUrl}
                          alt={imageAlt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 40vw"
                          priority
                        />
                      )}

                      {card.cardType === 'stat' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          {statBgUrl && (
                            <Image
                              src={statBgUrl}
                              alt="Background"
                              fill
                              className="object-cover opacity-40"
                              sizes="(max-width: 768px) 100vw, 40vw"
                            />
                          )}
                          <div className="absolute inset-0 bg-brand-darkblue/70" />
                          <div className="relative z-10 text-center">
                            <TrendingUp className="h-10 w-10 text-brand-orange mb-3 mx-auto" />
                            <div className="text-4xl font-extrabold text-white">
                              {card.statValue}
                            </div>
                            <div className="text-base text-gray-300 mt-1">{card.statLabel}</div>
                          </div>
                        </div>
                      )}

                      {card.cardType !== 'stat' && (
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-darkblue/40 via-transparent to-transparent pointer-events-none" />
                      )}
                    </div>
                  )
                })()}

            {/* Desktop floating title badge */}
            {isDesktop && hasScrolled && activeCard?.cardTitle && (
              <div
                key={`badge-${activeIndex}`}
                className="absolute z-50 pointer-events-none"
                style={{
                  top: currentBadgePos.top,
                  left: currentBadgePos.left,
                  transform: `rotate(${currentBadgePos.rotate}deg)`,
                }}
              >
                <div className="bg-brand-darkblue/95 backdrop-blur-md border-2 border-brand-orange rounded-xl px-4 py-2 md:px-6 md:py-3 shadow-2xl shadow-brand-orange/30 max-w-[250px] md:max-w-[350px]">
                  <span className="text-sm md:text-lg lg:text-xl font-bold text-white">
                    {activeCard.cardTitle}
                  </span>
                </div>
              </div>
            )}

            {/* Mobile story caption */}
            {!isDesktop && activeCard?.cardTitle && (
              <div className="absolute z-40 left-3 right-3 bottom-3">
                <div className="bg-brand-darkblue/95 backdrop-blur-md border-2 border-brand-orange rounded-xl px-4 py-3 shadow-2xl shadow-brand-orange/30">
                  <span className="text-sm font-bold text-white">{activeCard.cardTitle}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
