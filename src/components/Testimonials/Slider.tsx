'use client'

import React, { useState, useRef } from 'react'
import Image from 'next/image'
import type { Testimonial } from '@/payload-types'

type Props = {
  testimonials: Testimonial[]
  theme?: 'light' | 'dark'
}

export const Slider: React.FC<Props> = ({ testimonials, theme = 'dark' }) => {
  const isDark = theme === 'dark' // Block theme (Section)
  // Inverse card theme: If section is dark, cards are white. If section is light, cards are dark (blue).
  const cardBgClass = isDark ? 'bg-white' : 'bg-brand-darkblue'
  const cardTextClass = isDark ? 'text-brand-darkblue' : 'text-white'
  const cardSubTextClass = isDark ? 'text-gray-500' : 'text-gray-300'
  const quoteMarkClass = isDark
    ? 'text-brand-lightgray opacity-50'
    : 'text-brand-turquoise opacity-20'
  const navButtonClass = isDark
    ? 'bg-white/10 hover:bg-white/20 border-white/20 text-white'
    : 'bg-brand-darkblue/10 hover:bg-brand-darkblue/20 border-brand-darkblue/10 text-brand-darkblue'

  const [currentIndex, setCurrentIndex] = useState(0)

  // Swipe State
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [currentTranslate, setCurrentTranslate] = useState(0)
  const draggingRef = useRef(false)

  // Navigate
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  // Pointer Events (Mouse + Touch)
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true)
    draggingRef.current = true
    setStartX(e.clientX)
    // Prevent default drag behavior for images
    e.preventDefault()
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return
    const currentX = e.clientX
    const diff = currentX - startX
    setCurrentTranslate(diff)
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!draggingRef.current) return
    setIsDragging(false)
    draggingRef.current = false

    // Threshold for swipe
    const threshold = 100
    if (currentTranslate > threshold) {
      prevSlide()
    } else if (currentTranslate < -threshold) {
      nextSlide()
    }

    setCurrentTranslate(0)
  }

  const handlePointerLeave = () => {
    if (draggingRef.current) {
      setIsDragging(false)
      draggingRef.current = false
      setCurrentTranslate(0)
    }
  }

  // Visual Styling for Stack
  // We explicitly show 3 cards: Current, +1, +2
  const getCardStyle = (index: number) => {
    // Normalizing index logic for circular array
    let diff = (index - currentIndex + testimonials.length) % testimonials.length

    // Base styles
    const baseTransition = isDragging ? 'none' : 'all 0.5s ease-out'

    // Active Card
    if (diff === 0) {
      return {
        zIndex: 30,
        transform: `scale(1) translateX(${currentTranslate}px)`, // Move with drag
        opacity: 1,
        pointerEvents: 'auto' as const,
        transition: baseTransition,
        cursor: isDragging ? 'grabbing' : 'grab',
      }
    }

    // First card behind
    if (diff === 1) {
      return {
        zIndex: 20,
        transform: 'scale(0.96) translateY(-1.5rem)',
        opacity: 1,
        pointerEvents: 'none' as const,
        transition: baseTransition,
      }
    }

    // Second card behind
    if (diff === 2) {
      return {
        zIndex: 10,
        transform: 'scale(0.92) translateY(-3rem)',
        opacity: 0.5,
        pointerEvents: 'none' as const,
        transition: baseTransition,
      }
    }

    // Hidden pile
    return {
      zIndex: 0,
      transform: 'scale(0.9) translateY(-3rem)',
      opacity: 0,
      pointerEvents: 'none' as const,
      transition: baseTransition,
    }
  }

  if (!testimonials.length) return null

  return (
    <div className="w-full max-w-5xl mx-auto px-4 flex flex-col items-center">
      {/* 
        Stack Container 
        Using touch-action-pan-y to allow vertical scroll but capture horizontal gestures 
      */}
      <div
        className="relative w-full aspect-[4/5] md:aspect-[21/9] h-[550px] md:h-[450px] select-none"
        style={{ touchAction: 'pan-y' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
      >
        {testimonials.map((t, i) => {
          const avatarUrl = typeof t.avatar === 'object' && t.avatar?.url ? t.avatar.url : null
          const style = getCardStyle(i)

          return (
            <div
              key={t.id}
              className="absolute inset-0 w-full h-full origin-top"
              style={{
                zIndex: style.zIndex,
                transform: style.transform,
                opacity: style.opacity,
                visibility: style.opacity === 0 ? 'hidden' : 'visible',
                transition: style.transition,
                pointerEvents: style.pointerEvents,
                cursor: style.cursor,
              }}
            >
              <div
                className={`w-full h-full rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-white/10 transition-colors duration-300 ${cardBgClass}`}
              >
                {/* Content */}
                <div
                  className={`w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center relative border-r border-gray-50/10 ${cardBgClass}`}
                >
                  {/* Decorative Top Bar */}
                  <div className="absolute top-0 left-0 w-full h-2 bg-brand-turquoise" />

                  <div
                    className={`absolute top-10 left-10 text-8xl font-serif leading-none select-none transition-colors duration-300 ${quoteMarkClass}`}
                  >
                    “
                  </div>

                  <blockquote
                    className={`relative z-10 text-lg md:text-2xl font-medium leading-relaxed italic mb-8 pt-6 select-none transition-colors duration-300 ${cardTextClass}`}
                  >
                    {t.quote}
                  </blockquote>

                  <div className="mt-auto relative z-10 pt-6">
                    <div
                      className={`font-bold text-xl transition-colors duration-300 ${cardTextClass}`}
                    >
                      {t.name}
                    </div>
                    {t.company && (
                      <div
                        className={`font-medium mt-1 transition-colors duration-300 ${cardSubTextClass}`}
                      >
                        {t.company}
                      </div>
                    )}
                  </div>
                </div>

                {/* Image */}
                <div className="w-full md:w-1/2 relative bg-gray-100 min-h-[250px] md:min-h-full">
                  {avatarUrl ? (
                    <Image
                      src={avatarUrl}
                      alt={t.name}
                      fill
                      className="object-cover pointer-events-none" // Important for drag
                      sizes="(max-width: 768px) 100vw, 600px"
                      draggable={false}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-brand-turquoise text-white text-9xl font-black opacity-30 select-none">
                      {t.name.charAt(0)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6 mt-12 md:mt-16 z-40">
        <button
          onClick={prevSlide}
          className={`w-14 h-14 rounded-full backdrop-blur-sm border flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer ${navButtonClass}`}
          aria-label="Previous"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className={`w-14 h-14 rounded-full backdrop-blur-sm border flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer ${navButtonClass}`}
          aria-label="Next"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  )
}
