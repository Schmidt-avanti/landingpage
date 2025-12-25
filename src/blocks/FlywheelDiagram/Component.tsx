'use client'

import React, { useEffect, useRef, useState } from 'react'
import {
  HelpCircle,
  ClipboardCheck,
  Mail,
  PlusCircle,
  RefreshCw,
  TrendingUp,
  Check,
} from 'lucide-react'

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  HelpCircle,
  ClipboardCheck,
  Mail,
  PlusCircle,
  RefreshCw,
  TrendingUp,
}

type Phase = {
  title: string
  description?: string
  icon?: string
  id?: string
}

export type FlywheelDiagramProps = {
  tagline?: string | null
  headline?: string
  introduction?: string | null
  phases?: Phase[]
}

export const FlywheelDiagram: React.FC<FlywheelDiagramProps> = ({
  tagline,
  headline = 'Das Schwungrad-Prinzip',
  introduction,
  phases,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [activePhase, setActivePhase] = useState(0)
  const [isResetting, setIsResetting] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )

    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  // Auto-rotate through phases
  useEffect(() => {
    if (!isVisible || !phases || phases.length === 0 || isCompleted) return

    const interval = setInterval(() => {
      setActivePhase((prev) => {
        const next = (prev + 1) % phases.length
        // When completing the cycle (moving past last phase)
        if (next === 0) {
          // Show success state first
          setIsCompleted(true)
          return prev // Stay on last phase during success animation
        }
        return next
      })
    }, 4000)

    return () => clearInterval(interval)
  }, [isVisible, phases, isCompleted])

  // Handle reset after success state
  useEffect(() => {
    if (!isCompleted) return
    const timeout = setTimeout(() => {
      setIsResetting(true)
      setActivePhase(0)
      setIsCompleted(false)
      setTimeout(() => setIsResetting(false), 50)
    }, 1500)
    return () => clearTimeout(timeout)
  }, [isCompleted])

  if (!phases || phases.length === 0) return null

  const displayPhases = phases
  const phaseCount = displayPhases.length

  // Calculate positions for nodes on the wheel (in percentages)
  const getNodePosition = (index: number) => {
    const angle = (index * 360) / phaseCount - 90 // Start from top
    const radius = 42 // percentage from center
    const x = 50 + radius * Math.cos((angle * Math.PI) / 180)
    const y = 50 + radius * Math.sin((angle * Math.PI) / 180)
    return { x, y }
  }

  return (
    <section className="py-24 bg-gray-50 overflow-hidden" ref={containerRef}>
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

        {/* Flywheel - Circular Visualization */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-16 max-w-5xl mx-auto">
          {/* The Wheel Container */}
          <div
            className={`relative flex-shrink-0 transition-all duration-1000 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
            }`}
            style={{ width: '340px', height: '340px' }}
          >
            {/* Outer decorative ring */}
            <div className="absolute inset-0 rounded-full border-2 border-gray-200" />

            {/* Animated circular arrow */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="3" />
              {/* Animated progress arc */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke={isCompleted ? '#10b981' : '#fd8d3d'}
                strokeWidth="3"
                strokeDasharray={
                  isCompleted ? '251.2 0' : `${activePhase * (251.2 / phaseCount)} 251.2`
                }
                strokeLinecap="round"
                className={isResetting ? '' : 'transition-all duration-1000 ease-out'}
                style={{ transformOrigin: 'center', transform: 'rotate(-90deg)' }}
              />
            </svg>

            {/* Success checkmark overlay */}
            {isCompleted && (
              <div className="absolute inset-0 flex items-center justify-center z-20 animate-fade-in-up">
                <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center shadow-xl">
                  <Check size={48} className="text-white" strokeWidth={3} />
                </div>
              </div>
            )}

            {/* Phase nodes positioned around the wheel */}
            {displayPhases.map((phase, index) => {
              const { x, y } = getNodePosition(index)
              const IconComponent = phase.icon ? iconMap[phase.icon] : HelpCircle
              const isActive = activePhase === index

              return (
                <button
                  key={phase.id || index}
                  onClick={() => setActivePhase(index)}
                  className={`absolute flex items-center justify-center transition-all duration-300 rounded-full shadow-lg ${
                    isActive
                      ? 'w-20 h-20 bg-brand-darkblue text-white ring-4 ring-brand-orange ring-offset-2 z-10'
                      : 'w-16 h-16 bg-white text-brand-darkblue hover:scale-110 hover:shadow-xl'
                  }`}
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  aria-label={phase.title}
                >
                  {IconComponent && (
                    <IconComponent
                      size={isActive ? 32 : 24}
                      className={isActive ? 'text-white' : 'text-brand-orange'}
                    />
                  )}
                  {/* Phase number badge */}
                  <span
                    className={`absolute -top-1 -right-1 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shadow ${
                      isActive ? 'bg-brand-orange text-white' : 'bg-brand-turquoise text-white'
                    }`}
                  >
                    {index + 1}
                  </span>
                </button>
              )
            })}

            {/* Center hub */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-20 h-20 rounded-full bg-white shadow-xl flex items-center justify-center border-4 border-gray-100">
                <RefreshCw
                  size={32}
                  className="text-brand-turquoise animate-spin"
                  style={{ animationDuration: '8s' }}
                />
              </div>
            </div>
          </div>

          {/* Active phase details panel */}
          <div
            className={`flex-1 max-w-md transition-all duration-500 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            {displayPhases.map((phase, index) => {
              const IconComponent = phase.icon ? iconMap[phase.icon] : HelpCircle
              const isActive = activePhase === index

              if (!isActive) return null

              return (
                <div key={phase.id || index} className="animate-fade-in">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-brand-orange/10 flex items-center justify-center">
                      {IconComponent && <IconComponent size={28} className="text-brand-orange" />}
                    </div>
                    <div>
                      <span className="text-brand-turquoise font-semibold text-sm">
                        Schritt {index + 1} von {phaseCount}
                      </span>
                      <h3 className="text-2xl font-bold text-brand-darkblue">{phase.title}</h3>
                    </div>
                  </div>
                  {phase.description && (
                    <p className="text-gray-600 text-lg leading-relaxed pl-[4.5rem]">
                      {phase.description}
                    </p>
                  )}
                </div>
              )
            })}

            {/* Navigation dots */}
            <div className="flex gap-2 mt-8 pl-[4.5rem]">
              {displayPhases.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActivePhase(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activePhase === index
                      ? 'bg-brand-orange w-8'
                      : 'bg-gray-300 hover:bg-gray-400 w-2'
                  }`}
                  aria-label={`Phase ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
