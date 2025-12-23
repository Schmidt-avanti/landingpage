'use client'

import React, { useState, useEffect, useRef } from 'react'
import type { Page } from '@/payload-types'
import { Media } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import RichText from '@/components/RichText'
import { createPortal } from 'react-dom'

type ContentSideBySideType = Extract<Page['layout'][number], { blockType: 'contentSideBySide' }>

export const ContentSideBySideComponent: React.FC<
  ContentSideBySideType & { settings?: { theme?: 'light' | 'dark' } }
> = ({
  headline,
  subheadline,
  content,
  image,
  additionalImages,
  imagePosition,
  ctaText,
  ctaLinkType,
  ctaLink,
  ctaAnchor,
  quoteText,
  authorName,
  authorRole,
  settings,
}) => {
  const isImageRight = imagePosition === 'right'

  const theme = settings?.theme || 'dark'
  const isDark = theme === 'dark'

  const containerClasses = isDark ? 'bg-brand-darkblue text-white' : 'bg-white text-gray-900'
  const accentTextClasses = isDark ? 'text-brand-turquoise' : 'text-brand-darkblue'
  const headlineClasses = isDark ? 'text-white' : 'text-brand-darkblue'
  const ctaClasses = isDark
    ? 'bg-white text-brand-darkblue hover:bg-brand-turquoise hover:text-white'
    : 'bg-brand-darkblue text-white hover:bg-brand-turquoise'

  // Combine main image and additional images
  const mainImage = image as Media
  const slides = [
    mainImage,
    ...(additionalImages?.map((item) => item.image as Media) || []),
  ].filter(Boolean)

  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const previousBodyOverflowRef = useRef<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    if (typeof document === 'undefined') return

    if (isLightboxOpen) {
      previousBodyOverflowRef.current = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return
    }

    if (previousBodyOverflowRef.current != null) {
      document.body.style.overflow = previousBodyOverflowRef.current
      previousBodyOverflowRef.current = null
    }
  }, [isLightboxOpen, mounted])

  // Auto-advance slides if more than one
  useEffect(() => {
    if (slides.length <= 1 || isLightboxOpen) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [slides.length, isLightboxOpen])

  return (
    <>
      <section
        className={`py-24 lg:pb-32 overflow-visible transition-colors duration-300 ${containerClasses}`}
      >
        <div className="container mx-auto px-4">
          <div
            className={`flex flex-col lg:flex-row items-center gap-16 xl:gap-32 ${isImageRight ? '' : 'lg:flex-row-reverse'}`}
          >
            {/* Text Content */}
            <div
              className={`flex-1 space-y-8 self-center ${isImageRight ? 'lg:text-right' : 'lg:text-left'}`}
            >
              <div className="space-y-4">
                {headline && (
                  <h2 className={`text-sm font-bold tracking-wider uppercase ${accentTextClasses}`}>
                    {headline}
                  </h2>
                )}
                {subheadline && (
                  <h3 className={`text-3xl md:text-5xl font-bold leading-tight ${headlineClasses}`}>
                    {subheadline}
                  </h3>
                )}
              </div>

              <div className="rich-text">
                <RichText
                  data={content}
                  className={`${isDark ? 'text-gray-300' : 'text-gray-600'} ${isImageRight ? 'lg:ml-auto' : ''}`}
                />
              </div>

              {ctaText && (ctaLink || ctaAnchor) && (
                <div className="pt-4">
                  <Link
                    href={ctaLinkType === 'anchor' ? `#${ctaAnchor}` : ctaLink || '#'}
                    className={`inline-flex items-center justify-center px-8 py-4 font-semibold rounded-full transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${ctaClasses}`}
                  >
                    {ctaText}
                    <svg
                      className="w-5 h-5 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </Link>
                </div>
              )}
            </div>

            {/* Image & Slideshow Column */}
            <div className="flex-1 w-full relative flex flex-col items-center lg:block">
              {/* Browser Frame / Image Container */}
              <div
                className={`relative z-10 mx-auto lg:mx-0 w-full shadow-2xl transition-all duration-500 ${slides.length > 1 ? 'rounded-xl bg-gray-900 pt-6 px-1 pb-1 max-w-2xl lg:w-[720px] cursor-zoom-in' : 'rounded-3xl overflow-hidden max-w-lg lg:w-[400px]'}`}
                onClick={() => slides.length > 1 && setIsLightboxOpen(true)}
              >
                {/* Browser Dots (only if multiple slides/screenshot mode implied) */}
                {slides.length > 1 && (
                  <div className="absolute top-2 left-4 flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                  </div>
                )}

                <div
                  className={`relative overflow-hidden w-full ${slides.length > 1 ? 'rounded-lg bg-gray-100 aspect-video' : 'aspect-[4/5]'}`}
                >
                  {slides.map((slide, index) => (
                    <div
                      key={slide.id || index}
                      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                    >
                      {slide.url && (
                        <Image
                          src={slide.url}
                          alt={slide.alt || 'Slide'}
                          fill
                          sizes="(max-width: 1024px) 100vw, 720px"
                          className="object-cover"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Slider Dots */}
              {slides.length > 1 && (
                <div className="flex justify-center gap-2 mt-6 lg:justify-start lg:ml-8">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === currentSlide
                          ? `w-8 ${isDark ? 'bg-white' : 'bg-brand-darkblue'}`
                          : `w-2 ${isDark ? 'bg-white/20 hover:bg-brand-turquoise' : 'bg-brand-lightgray hover:bg-brand-turquoise'}`
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              )}

              {/* Floating Quote Card */}
              {/* @ts-ignore */}
              {(quoteText || authorName) && (
                <div
                  className={`relative mt-[-30px] w-[90%] max-w-md z-20 bg-white p-6 md:p-8 rounded-xl shadow-xl border-l-4 border-brand-orange mx-auto lg:mx-0 lg:absolute lg:w-[360px] ${slides.length > 1 ? 'lg:-bottom-8 lg:-right-12' : 'lg:-bottom-12 lg:-left-12'}`}
                >
                  {/* @ts-ignore */}
                  {quoteText && (
                    <blockquote className="text-base md:text-lg font-medium text-brand-darkblue mb-4 leading-relaxed">
                      {/* @ts-ignore */}"{quoteText}"
                    </blockquote>
                  )}

                  <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                      {authorName && (
                        <div className="font-bold text-brand-turquoise text-base">{authorName}</div>
                      )}
                      {authorRole && (
                        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                          {authorRole}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {mounted && isLightboxOpen && slides.length > 1
        ? createPortal(
            <div
              className="fixed inset-0 z-[9999] bg-black/95 h-[100svh] flex items-center justify-center p-4 cursor-zoom-out animate-fadeIn"
              onClick={() => setIsLightboxOpen(false)}
            >
              {/* Navigation Buttons */}
              <button
                className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-50 p-4 text-white hover:text-brand-turquoise transition-colors cursor-pointer bg-white/10 rounded-full hover:bg-white/20 backdrop-blur-sm"
                onClick={(e) => {
                  e.stopPropagation()
                  setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
                }}
              >
                <svg
                  className="w-8 h-8 lg:w-12 lg:h-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-50 p-4 text-white hover:text-brand-turquoise transition-colors cursor-pointer bg-white/10 rounded-full hover:bg-white/20 backdrop-blur-sm"
                onClick={(e) => {
                  e.stopPropagation()
                  setCurrentSlide((prev) => (prev + 1) % slides.length)
                }}
              >
                <svg
                  className="w-8 h-8 lg:w-12 lg:h-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              <div className="relative w-full max-w-7xl h-[80svh] md:h-[90svh] max-h-[90svh]">
                <Image
                  src={slides[currentSlide]?.url || ''}
                  alt="Fullscreen view"
                  fill
                  sizes="90vw"
                  className="object-contain"
                />
              </div>

              <div className="absolute top-8 right-8 z-50">
                <button
                  className="text-white hover:text-brand-orange transition-colors cursor-pointer bg-white/10 p-2 rounded-full hover:bg-white/20 backdrop-blur-sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsLightboxOpen(false)
                  }}
                  aria-label="Close"
                  type="button"
                >
                  <svg
                    className="w-8 h-8 lg:w-10 lg:h-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  )
}
