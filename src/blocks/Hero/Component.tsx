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
}

interface HeroProps {
  headline: string
  subheadline?: string | null
  badgeText?: string | null
  ctaText?: string | null
  ctaLinkType?: 'page' | 'anchor' | null
  ctaLink?: string | null
  ctaAnchor?: string | null
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
  bentoCards,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const hasScrolledRef = useRef(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [hasScrolled, setHasScrolled] = useState(false)
  const cardCount = Math.min(bentoCards?.length || 0, 3)

  // Build CTA href based on link type
  const ctaHref = ctaLinkType === 'anchor' && ctaAnchor ? `/#${ctaAnchor}` : ctaLink || '/'

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

  useLayoutEffect(() => {
    if (!containerRef.current || reduceMotion) return

    const ctx = gsap.context(() => {
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
  }, [reduceMotion])

  useLayoutEffect(() => {
    if (!containerRef.current) return
    if (!reduceMotion) return

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
  }, [reduceMotion])

  useEffect(() => {
    if (!containerRef.current || cardCount === 0 || reduceMotion) return

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
  }, [cardCount, reduceMotion])

  const currentPositions = cardPositions[activeIndex] || cardPositions[0]
  const currentBadgePos = floatingBadgePositions[activeIndex] || floatingBadgePositions[0]
  const activeCard = bentoCards?.[activeIndex]

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden bg-brand-darkblue"
    >
      {/* Background Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-turquoise/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-brand-orange/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 pt-32 pb-24 lg:py-32 relative z-10 h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center w-full">
          {/* LEFT: Text */}
          <div className="text-white space-y-6">
            {badgeText && (
              <div
                data-hero="badge"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 text-sm font-medium text-brand-turquoise opacity-0 translate-y-4 motion-reduce:opacity-100 motion-reduce:translate-y-0"
              >
                <ShieldCheck size={16} />
                <span>{badgeText}</span>
              </div>
            )}

            <h1
              data-hero="headline"
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight opacity-0 translate-y-4 motion-reduce:opacity-100 motion-reduce:translate-y-0"
            >
              {headline}
            </h1>

            {subheadline && (
              <p
                data-hero="subheadline"
                className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-lg opacity-0 translate-y-4 motion-reduce:opacity-100 motion-reduce:translate-y-0"
              >
                {subheadline}
              </p>
            )}

            {ctaText && ctaHref && (
              <div className="pt-4">
                <a
                  data-hero="cta"
                  href={ctaHref}
                  className="group inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-300 bg-brand-orange rounded-xl hover:bg-brand-orange/90 hover:scale-105 shadow-lg shadow-brand-orange/20 opacity-0 translate-y-4 motion-reduce:opacity-100 motion-reduce:translate-y-0"
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
              </div>
            )}

            {/* Scroll Progress Dots */}
            <div
              data-hero="dots"
              className="pt-8 opacity-0 translate-y-4 motion-reduce:opacity-100 motion-reduce:translate-y-0"
            >
              <div className="flex gap-1.5">
                {bentoCards?.slice(0, 3).map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      i === activeIndex ? 'bg-brand-turquoise w-8' : 'bg-white/30 w-2'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Cards + Floating Badge */}
          <div className="relative h-[450px] lg:h-[550px]">
            {/* Cards */}
            {bentoCards?.slice(0, 3).map((card, index) => {
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
                  className="absolute rounded-2xl overflow-hidden border-2 border-white/20 bg-white/5 backdrop-blur-sm shadow-2xl transition-all duration-700 ease-out opacity-0 motion-reduce:opacity-100"
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
            })}

            {/* FLOATING TITLE BADGE - Only visible after scrolling starts */}
            {hasScrolled && activeCard?.cardTitle && (
              <div
                key={`badge-${activeIndex}`}
                className="absolute z-50 pointer-events-none animate-slideInFade"
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
          </div>
        </div>
      </div>
    </div>
  )
}
