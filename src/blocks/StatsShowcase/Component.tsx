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
  displayType?: 'value' | 'chart'
  value: number
  startValue?: number
  chartPeriods?: number
  chartPeriodLabel?: string
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

// Generate marketing-friendly curve: steep at start, flat at end (no dips)
function generateChartData(startValue: number, endValue: number, periods: number): number[] {
  const data: number[] = []
  const range = endValue - startValue

  for (let i = 0; i <= periods; i++) {
    const t = i / periods
    // Use easeOutQuart for marketing-friendly growth (steep start, flat end)
    const progress = 1 - Math.pow(1 - t, 3)
    const value = startValue + progress * range
    data.push(value)
  }

  // Ensure exact values at start and end
  data[0] = startValue
  data[periods] = endValue
  return data
}

// Animated Line Chart Component
function AnimatedLineChart({
  startValue,
  endValue,
  periods,
  periodLabel,
  suffix,
  isVisible,
}: {
  startValue: number
  endValue: number
  periods: number
  periodLabel: string
  suffix?: string
  isVisible: boolean
}) {
  const [animationProgress, setAnimationProgress] = useState(0)
  const chartData = generateChartData(startValue, endValue, periods)

  useEffect(() => {
    if (!isVisible) return

    let startTime: number | null = null
    let animationFrame: number
    const duration = 5000 // Much slower animation

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setAnimationProgress(easeOutQuart)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [isVisible])

  // SVG dimensions - more top padding for tooltip
  const width = 280
  const height = 120
  const padding = { top: 30, right: 25, bottom: 35, left: 30 }
  const chartWidth = width - padding.left - padding.right
  const chartHeight = height - padding.top - padding.bottom

  // Calculate scales
  const minValue = Math.floor(startValue * 0.95)
  const maxValue = Math.ceil(endValue * 1.05)
  const valueRange = maxValue - minValue

  // Generate path
  const points = chartData.map((value, i) => {
    const x = padding.left + (i / periods) * chartWidth
    const y = padding.top + chartHeight - ((value - minValue) / valueRange) * chartHeight
    return { x, y, value }
  })

  // Create smooth curve path
  const pathD = points.reduce((path, point, i) => {
    if (i === 0) return `M ${point.x} ${point.y}`

    const prev = points[i - 1]
    const cpx1 = prev.x + (point.x - prev.x) / 3
    const cpy1 = prev.y
    const cpx2 = prev.x + (2 * (point.x - prev.x)) / 3
    const cpy2 = point.y

    return `${path} C ${cpx1} ${cpy1}, ${cpx2} ${cpy2}, ${point.x} ${point.y}`
  }, '')

  // Animated path length
  const pathLength = 1000
  const animatedDashOffset = pathLength * (1 - animationProgress)

  // Current animated value
  const currentIndex = Math.floor(animationProgress * periods)
  const currentValue = chartData[Math.min(currentIndex, periods)]

  // Current dot position
  const currentX = padding.left + animationProgress * chartWidth
  const currentY = points[Math.min(currentIndex, periods)]?.y || points[0].y

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" suppressHydrationWarning>
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((t, i) => (
          <line
            key={i}
            x1={padding.left}
            y1={padding.top + chartHeight * (1 - t)}
            x2={width - padding.right}
            y2={padding.top + chartHeight * (1 - t)}
            stroke="#e5e7eb"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
        ))}

        {/* Y-axis labels */}
        {[0, 0.5, 1].map((t, i) => {
          const value = Math.round(minValue + valueRange * t)
          return (
            <text
              key={i}
              x={padding.left - 4}
              y={padding.top + chartHeight * (1 - t) + 3}
              textAnchor="end"
              className="fill-gray-400 text-[8px]"
            >
              {value}
              {suffix}
            </text>
          )
        })}

        {/* X-axis labels - two lines */}
        {[0, Math.floor(periods / 2), periods].map((period, i) => (
          <g key={i}>
            <text
              x={padding.left + (period / periods) * chartWidth}
              y={height - 18}
              textAnchor="middle"
              className="fill-gray-400 text-[8px] font-medium"
            >
              {period === 0 ? 'Start' : period}
            </text>
            {period > 0 && (
              <text
                x={padding.left + (period / periods) * chartWidth}
                y={height - 8}
                textAnchor="middle"
                className="fill-gray-400 text-[7px]"
              >
                {periodLabel}
              </text>
            )}
          </g>
        ))}

        {/* Gradient area under curve */}
        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#43bede" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#43bede" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Area fill */}
        <path
          d={`${pathD} L ${points[points.length - 1].x} ${padding.top + chartHeight} L ${padding.left} ${padding.top + chartHeight} Z`}
          fill="url(#chartGradient)"
          opacity={animationProgress}
          suppressHydrationWarning
        />

        {/* Main animated line */}
        <path
          d={pathD}
          fill="none"
          stroke="#43bede"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={pathLength}
          strokeDashoffset={animatedDashOffset}
          suppressHydrationWarning
        />

        {/* Animated dot with value label */}
        {animationProgress > 0 && (
          <g>
            {/* Value label above dot */}
            <rect
              x={currentX - 20}
              y={currentY - 28}
              width="40"
              height="18"
              rx="4"
              fill="#fd8d3d"
            />
            <text
              x={currentX}
              y={currentY - 15}
              textAnchor="middle"
              className="fill-white text-[10px] font-bold"
            >
              {Math.round(currentValue)}
              {suffix}
            </text>
            {/* Pointer triangle */}
            <path
              d={`M ${currentX - 4} ${currentY - 10} L ${currentX + 4} ${currentY - 10} L ${currentX} ${currentY - 4} Z`}
              fill="#fd8d3d"
            />
            {/* Dot */}
            <circle
              cx={currentX}
              cy={currentY}
              r="5"
              fill="#fd8d3d"
              stroke="white"
              strokeWidth="2"
            />
          </g>
        )}
      </svg>
    </div>
  )
}

// Format number with thousand separators
function formatNumber(num: number): string {
  return num.toLocaleString('de-DE')
}

// Single stat card component - for value type only
function ValueStatCard({
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
      className={`relative p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center gap-4">
        {/* Icon */}
        {IconComponent && (
          <div className="w-10 h-10 rounded-lg bg-brand-turquoise/10 flex items-center justify-center flex-shrink-0">
            <IconComponent size={20} className="text-brand-turquoise" />
          </div>
        )}

        <div className="flex-1 min-w-0">
          {/* Value */}
          <div className="text-2xl font-bold text-brand-darkblue">
            {stat.prefix && <span className="text-brand-orange">{stat.prefix} </span>}
            {formatNumber(animate ? displayValue : stat.value)}
            {stat.suffix && <span className="text-brand-orange"> {stat.suffix}</span>}
          </div>

          {/* Label */}
          <h3 className="text-sm font-medium text-gray-600 truncate">{stat.label}</h3>
        </div>
      </div>

      {/* Description */}
      {stat.description && <p className="text-xs text-gray-500 mt-2">{stat.description}</p>}
    </div>
  )
}

// Chart card component
function ChartStatCard({
  stat,
  isVisible,
  animate,
}: {
  stat: Stat
  isVisible: boolean
  animate: boolean
}) {
  const IconComponent = stat.icon ? iconMap[stat.icon] : null

  return (
    <div
      className={`relative p-6 bg-white rounded-2xl border border-gray-100 shadow-sm transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Icon */}
      {IconComponent && (
        <div className="w-10 h-10 rounded-lg bg-brand-turquoise/10 flex items-center justify-center mb-3">
          <IconComponent size={20} className="text-brand-turquoise" />
        </div>
      )}

      {/* Label */}
      <h3 className="text-lg font-semibold text-brand-darkblue mb-4">{stat.label}</h3>

      {/* Chart - full width */}
      <div className="w-full">
        <AnimatedLineChart
          startValue={stat.startValue || stat.value * 0.7}
          endValue={stat.value}
          periods={stat.chartPeriods || 6}
          periodLabel={stat.chartPeriodLabel || 'Monate'}
          suffix={stat.suffix}
          isVisible={isVisible && animate}
        />
      </div>

      {/* Description */}
      {stat.description && <p className="text-sm text-gray-500 mt-4">{stat.description}</p>}
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
  const animate = settings?.animateOnScroll !== false

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Dynamic threshold: 20% on mobile (so it triggers even if tall), 80% on desktop (user preference)
    const threshold = window.innerWidth < 1024 ? 0.2 : 0.8

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold },
    )

    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  if (!stats || stats.length === 0) return null

  // Separate chart and value stats
  const chartStats = stats.filter((s) => s.displayType === 'chart')
  const valueStats = stats.filter((s) => s.displayType !== 'chart')
  const hasHybridLayout = chartStats.length > 0 && valueStats.length > 0

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

        {/* Hybrid Layout: Chart 2/3 left, KPIs 1/3 right */}
        {hasHybridLayout ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
            {/* Chart - 2/3 width */}
            <div className="lg:col-span-2">
              {chartStats.map((stat, index) => (
                <ChartStatCard
                  key={stat.id || `chart-${index}`}
                  stat={stat}
                  isVisible={isVisible}
                  animate={animate}
                />
              ))}
            </div>

            {/* Value KPIs - 1/3 width, stacked, same height as chart */}
            <div className="flex flex-col justify-between gap-2">
              {valueStats.map((stat, index) => (
                <ValueStatCard
                  key={stat.id || index}
                  stat={stat}
                  index={index}
                  isVisible={isVisible}
                  animate={animate}
                />
              ))}
            </div>
          </div>
        ) : (
          /* Standard grid for all-value or all-chart layouts */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {stats.map((stat, index) =>
              stat.displayType === 'chart' ? (
                <ChartStatCard
                  key={stat.id || `chart-${index}`}
                  stat={stat}
                  isVisible={isVisible}
                  animate={animate}
                />
              ) : (
                <ValueStatCard
                  key={stat.id || index}
                  stat={stat}
                  index={index}
                  isVisible={isVisible}
                  animate={animate}
                />
              ),
            )}
          </div>
        )}
      </div>
    </section>
  )
}
