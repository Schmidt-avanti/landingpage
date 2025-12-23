'use client'

import React, { useActionState } from 'react'
import Link from 'next/link'
import type { Page } from '@/payload-types'
import { submitContactForm } from '@/actions/submitContactForm'
import { User, Mail, Phone, Building, Briefcase, Check } from 'lucide-react'

type ContactFormType = Extract<Page['layout'][number], { blockType: 'contactForm' }>

export const ContactFormComponent: React.FC<ContactFormType> = ({
  headline,
  subheadline,
  introText,
  phoneNumber,
  cardHeadline,
  buttonText,
  privacyText,
  footerText,
  emailTo,
  settings,
}) => {
  const [state, formAction, isPending] = useActionState(submitContactForm, {
    success: false,
    message: '',
  })

  // Theme Logic:
  // Light Theme (Default/Requested): White Section, Dark Blue Card.
  // Dark Theme: Dark Blue Section, White Card.
  const theme = settings?.theme || 'light'
  const isDarkSection = theme === 'dark'

  const containerClasses = isDarkSection ? 'bg-brand-darkblue text-white' : 'bg-white text-gray-900'

  // Card is high contrast: If section is white, card is dark blue. If section is dark, card is white.
  // Screenshot shows White Section + Dark Blue Card.
  const cardBgClass = isDarkSection ? 'bg-white' : 'bg-brand-darkblue'
  const cardTextClass = isDarkSection ? 'text-gray-900' : 'text-white'
  const cardInputBg = isDarkSection
    ? 'bg-gray-100 border-gray-200 text-gray-900'
    : 'bg-white border-transparent text-gray-900'
  const cardInputPlaceholder = isDarkSection ? 'placeholder-gray-400' : 'placeholder-gray-400'
  const cardIconColor = isDarkSection ? 'text-gray-400' : 'text-gray-400'

  return (
    <section id="contact" className={`py-24 transition-colors duration-300 ${containerClasses}`}>
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Text Content */}
          <div className="lg:col-span-5 space-y-8 pt-8 lg:pt-16">
            <div>
              {subheadline && (
                <span className="text-sm font-bold tracking-wider uppercase mb-2 block opacity-80">
                  {subheadline}
                </span>
              )}
              {headline && (
                <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">{headline}</h2>
              )}
              {introText && <p className="text-lg leading-relaxed opacity-90">{introText}</p>}
            </div>

            {phoneNumber && (
              <div className="pt-4">
                <a
                  href={`tel:${phoneNumber.replace(/\s/g, '').replace(/\(0\)/, '')}`}
                  className="text-2xl font-bold hover:opacity-80 transition-opacity inline-flex items-center gap-2 border-b-2 border-brand-orange pb-1"
                >
                  {phoneNumber}
                </a>
              </div>
            )}
          </div>
          {/* Right Column: Form Card */}
          <div className="lg:col-span-1"></div> {/* Spacer */}
          <div
            className={`lg:col-span-6 rounded-3xl p-8 md:p-10 shadow-2xl ${cardBgClass} ${cardTextClass}`}
          >
            {cardHeadline && <h3 className="text-xl font-semibold mb-8">{cardHeadline}</h3>}

            {state.success ? (
              <div className="text-center py-12 animate-fadeIn">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Vielen Dank!</h3>
                <p className="opacity-80">Ihre Nachricht wurde erfolgreich gesendet.</p>
              </div>
            ) : (
              <form action={formAction} className="space-y-4">
                {state.message && !state.success && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-center text-red-200 text-sm mb-4">
                    {state.message}
                  </div>
                )}

                {/* Name */}
                <div className="relative">
                  <div className={`absolute left-4 top-1/2 -translate-y-1/2 ${cardIconColor}`}>
                    <User size={20} />
                  </div>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Vor und Nachname"
                    className={`w-full pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange transition-all ${cardInputBg} ${cardInputPlaceholder}`}
                  />
                  {/* @ts-ignore */}
                  {state.errors?.name && (
                    <p className="text-brand-orange text-xs mt-1 ml-1">{state.errors.name[0]}</p>
                  )}
                </div>

                {/* Company */}
                <div className="relative">
                  <div className={`absolute left-4 top-1/2 -translate-y-1/2 ${cardIconColor}`}>
                    <Building size={20} />
                  </div>
                  <input
                    type="text"
                    name="company"
                    placeholder="Unternehmen"
                    className={`w-full pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange transition-all ${cardInputBg} ${cardInputPlaceholder}`}
                  />
                </div>

                {/* Position (Select simulation with Input for now as requested flexibility) */}
                <div className="relative">
                  <div className={`absolute left-4 top-1/2 -translate-y-1/2 ${cardIconColor}`}>
                    <Briefcase size={20} />
                  </div>
                  <input
                    type="text"
                    name="position"
                    placeholder="Position"
                    className={`w-full pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange transition-all ${cardInputBg} ${cardInputPlaceholder}`}
                  />
                </div>

                {/* Phone */}
                <div className="relative">
                  <div className={`absolute left-4 top-1/2 -translate-y-1/2 ${cardIconColor}`}>
                    <Phone size={20} />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Telefon"
                    className={`w-full pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange transition-all ${cardInputBg} ${cardInputPlaceholder}`}
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <div className={`absolute left-4 top-1/2 -translate-y-1/2 ${cardIconColor}`}>
                    <Mail size={20} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="E-Mail"
                    className={`w-full pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange transition-all ${cardInputBg} ${cardInputPlaceholder}`}
                  />
                  {/* @ts-ignore */}
                  {state.errors?.email && (
                    <p className="text-brand-orange text-xs mt-1 ml-1">{state.errors.email[0]}</p>
                  )}
                </div>

                {/* Privacy Checkbox */}
                <div className="flex items-start gap-3 pt-2">
                  <div className="relative flex items-center h-6">
                    <input
                      id="privacy"
                      name="privacy"
                      type="checkbox"
                      required
                      className="h-5 w-5 rounded border-gray-300 text-brand-orange focus:ring-brand-orange cursor-pointer"
                    />
                  </div>
                  <label
                    htmlFor="privacy"
                    className="text-sm opacity-90 cursor-pointer select-none pt-0.5"
                  >
                    {'Ich akzeptiere die '}
                    <Link href="/datenschutz" className="underline hover:opacity-80">
                      Datenschutzerklärung
                    </Link>
                  </label>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-brand-orange hover:bg-brand-orange/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-lg shadow-lg transform active:scale-[0.98] transition-all flex items-center justify-center"
                  >
                    {isPending ? 'Wird gesendet...' : buttonText || 'Angebot anfordern'}
                  </button>
                </div>

                {/* Footer Text */}
                {footerText && <p className="text-center text-xs opacity-60 mt-4">{footerText}</p>}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
