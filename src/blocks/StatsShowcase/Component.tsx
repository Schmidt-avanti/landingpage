'use client'

import React, { useEffect, useRef, useState } from 'react'
import {
  CheckCircle,
  TrendingUp,
  Phone,
  Clock,
  Users,
  Star,
  Target,
  MessageSquare,
} from 'lucide-react'

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  CheckCircle,
  TrendingUp,
  Phone,
  Clock,
  Users,
  Star,
  Target,
  MessageSquare,
}

type Stat = {
  value: number
  prefix?: string
  suffix?: string
  label: string
  description?: string
  icon?: string
  id?: string
}

export type StatsShowcaseProps = {
  tagline?: string | null
  headline?: string
  introduction?: string | null
  stats?: Stat[]
  settings?: {
    layout?: 'grid' | 'row'
    animateOnScroll?: boolean
  }
}

// Custom hook for animated counter
function useAnimatedCounter(end: number, isVisible: boolean, duration = 2000) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isVisible) return

    let startTime: number | null = null
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, isVisible, duration])

  return count
}

// Single stat card component
function StatCard({
  stat,
  index,
  isVisible,
  animate,
}: {
  stat: Stat
  index: number
  isVisible: boolean
  animate: boolean
}) {
  const displayValue = useAnimatedCounter(stat.value, isVisible && animate)
  const IconComponent = stat.icon ? iconMap[stat.icon] : null

  return (
    <div
      className={`relative p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Icon */}
      {IconComponent && (
        <div className="w-12 h-12 rounded-xl bg-brand-turquoise/10 flex items-center justify-center mb-4">
          <IconComponent size={24} className="text-brand-turquoise" />
        </div>
      )}

      {/* Value */}
      <div className="text-4xl md:text-5xl font-bold text-brand-darkblue mb-2">
        {stat.prefix && <span className="text-brand-orange">{stat.prefix}</span>}
        {animate ? displayValue : stat.value}
        {stat.suffix && <span className="text-brand-orange">{stat.suffix}</span>}
      </div>

      {/* Label */}
      <h3 className="text-lg font-semibold text-brand-darkblue mb-1">{stat.label}</h3>

      {/* Description */}
      {stat.description && <p className="text-sm text-gray-500">{stat.description}</p>}
    </div>
  )
}

export const StatsShowcase: React.FC<StatsShowcaseProps> = ({
  tagline,
  headline = 'Messbare Ergebnisse',
  introduction,
  stats,
  settings,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const layout = settings?.layout || 'grid'
  const animate = settings?.animateOnScroll !== false

  useEffect(() => {
    if (typeof window === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )

    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  if (!stats || stats.length === 0) return null

  const gridCols =
    stats.length === 1
      ? 'grid-cols-1'
      : stats.length === 2
        ? 'grid-cols-1 md:grid-cols-2'
        : stats.length === 3
          ? 'grid-cols-1 md:grid-cols-3'
          : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'

  return (
    <section className="py-24 bg-gray-50" ref={containerRef}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          {tagline && (
            <p className="text-sm uppercase tracking-widest text-brand-orange mb-3">{tagline}</p>
          )}
          <h2 className="text-3xl md:text-5xl font-bold font-poppins text-brand-darkblue mb-4">
            {headline}
          </h2>
          {introduction && (
            <p className="max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed">
              {introduction}
            </p>
          )}
        </div>

        {/* Stats Grid/Row */}
        <div
          className={`${layout === 'row' ? 'flex flex-wrap justify-center gap-6' : `grid ${gridCols} gap-6`} max-w-5xl mx-auto`}
        >
          {stats.map((stat, index) => (
            <StatCard
              key={stat.id || index}
              stat={stat}
              index={index}
              isVisible={isVisible}
              animate={animate}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
