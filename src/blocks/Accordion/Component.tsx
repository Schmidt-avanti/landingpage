'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

type AccordionItem = {
  id?: string | null
  title: string
  content: SerializedEditorState
}

type AccordionProps = {
  items: AccordionItem[]
  blockSettings?: {
    theme?: 'light' | 'dark' | null
    anchorId?: string | null
  } | null
}

export const AccordionComponent: React.FC<AccordionProps> = ({ items, blockSettings }) => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set())
  const theme = blockSettings?.theme || 'light'
  const isDark = theme === 'dark'

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      newOpenItems.add(index)
    }
    setOpenItems(newOpenItems)
  }

  return (
    <section
      id={blockSettings?.anchorId || undefined}
      className={`py-16 md:py-24 ${isDark ? 'bg-brand-darkblue' : 'bg-white'}`}
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="space-y-4">
          {items.map((item, index) => {
            const isOpen = openItems.has(index)

            return (
              <div
                key={item.id || index}
                className={`rounded-xl border overflow-hidden transition-all ${
                  isDark ? 'border-white/20 bg-white/5' : 'border-gray-200 bg-gray-50'
                }`}
              >
                {/* Header / Title */}
                <button
                  onClick={() => toggleItem(index)}
                  className={`w-full flex items-center justify-between px-6 py-5 text-left transition-colors ${
                    isDark
                      ? 'text-white hover:bg-white/10'
                      : 'text-brand-darkblue hover:bg-gray-100'
                  }`}
                >
                  <span className="text-lg font-semibold pr-4">{item.title}</span>
                  <ChevronDown
                    className={`flex-shrink-0 w-5 h-5 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    } ${isDark ? 'text-brand-turquoise' : 'text-brand-orange'}`}
                  />
                </button>

                {/* Content */}
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div
                      className={`px-6 pb-6 pt-2 payload-richtext ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      <LexicalRichText data={item.content} />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
