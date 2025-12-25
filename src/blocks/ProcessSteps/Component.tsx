'use client'

import React, { useEffect, useRef, useState } from 'react'
import {
  Calendar,
  Settings,
  ClipboardList,
  Rocket,
  RefreshCw,
  CheckCircle,
  Users,
  Phone,
  MessageSquare,
  Mail,
  Target,
  TrendingUp,
} from 'lucide-react'

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Calendar,
  Settings,
  ClipboardList,
  Rocket,
  RefreshCw,
  CheckCircle,
  Users,
  Phone,
  MessageSquare,
  Mail,
  Target,
  TrendingUp,
}

type Step = {
  title: string
  description?: string
  icon?: string
  id?: string
}

export type ProcessStepsProps = {
  tagline?: string | null
  headline?: string
  introduction?: string | null
  steps?: Step[]
  settings?: {
    layout?: 'timeline' | 'cards'
  }
}

export const ProcessSteps: React.FC<ProcessStepsProps> = ({
  tagline,
  headline = 'So starten Sie mit Avanti',
  introduction,
  steps,
  settings,
}) => {
  const layout = settings?.layout || 'timeline'
  const containerRef = useRef<HTMLDivElement>(null)
  const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set())

  useEffect(() => {
    if (typeof window === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'))
            setVisibleSteps((prev) => new Set([...prev, index]))
          }
        })
      },
      { threshold: 0.3, rootMargin: '0px 0px -10% 0px' },
    )

    const stepElements = containerRef.current?.querySelectorAll('[data-index]')
    stepElements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [steps])

  if (!steps || steps.length === 0) return null

  return (
    <section className="py-24 bg-white" ref={containerRef}>
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

        {/* Timeline Layout */}
        {layout === 'timeline' && (
          <div className="max-w-3xl mx-auto">
            {steps.map((step, index) => {
              const IconComponent = step.icon ? iconMap[step.icon] : CheckCircle
              const isVisible = visibleSteps.has(index)

              return (
                <div
                  key={step.id || index}
                  data-index={index}
                  className={`relative flex gap-6 pb-12 last:pb-0 transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Timeline Line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-6 top-14 w-0.5 h-[calc(100%-3.5rem)] bg-gradient-to-b from-brand-turquoise to-brand-turquoise/20" />
                  )}

                  {/* Step Number & Icon */}
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-brand-turquoise/10 border-2 border-brand-turquoise flex items-center justify-center text-brand-turquoise font-bold">
                      {index + 1}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <div className="flex items-center gap-3 mb-2">
                      {IconComponent && <IconComponent size={20} className="text-brand-orange" />}
                      <h3 className="text-xl font-bold text-brand-darkblue">{step.title}</h3>
                    </div>
                    {step.description && (
                      <p className="text-gray-600 leading-relaxed">{step.description}</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Cards Layout */}
        {layout === 'cards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step, index) => {
              const IconComponent = step.icon ? iconMap[step.icon] : CheckCircle
              const isVisible = visibleSteps.has(index)

              return (
                <div
                  key={step.id || index}
                  data-index={index}
                  className={`relative p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-lg hover:border-brand-turquoise/30 transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Step Number Badge */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-brand-turquoise text-white flex items-center justify-center font-bold text-sm shadow-lg">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-brand-orange/10 flex items-center justify-center mb-4">
                    {IconComponent && <IconComponent size={24} className="text-brand-orange" />}
                  </div>

                  <h3 className="text-lg font-bold text-brand-darkblue mb-2">{step.title}</h3>
                  {step.description && (
                    <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
