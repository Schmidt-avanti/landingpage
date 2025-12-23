import React from 'react'
import { RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

type TextBlockProps = {
  content: SerializedEditorState
  variant?: 'hint' | 'standard' | 'page' | null
  settings?: {
    theme?: 'light' | 'dark' | null
    anchorId?: string | null
  } | null
}

export const TextBlockComponent: React.FC<TextBlockProps> = ({ content, variant, settings }) => {
  const theme = settings?.theme || 'light'
  const isDark = theme === 'dark'
  const blockVariant = variant || 'standard'

  // Variant-specific styling
  const variantStyles = {
    hint: {
      section: 'py-4 md:py-6',
      container: 'max-w-6xl',
      prose: 'prose-sm',
      background: isDark ? 'bg-brand-darkblue/80' : 'bg-gray-50',
      border: isDark ? 'border-l-4 border-brand-primary/40' : 'border-l-4 border-gray-300',
      centered: true,
    },
    standard: {
      section: 'py-12 md:py-16',
      container: 'max-w-screen-2xl',
      prose: 'prose-lg',
      background: isDark ? 'bg-brand-darkblue' : 'bg-white',
      border: '',
      centered: true,
    },
    page: {
      section: 'py-16 md:py-24',
      container: 'max-w-4xl',
      prose: 'prose-lg',
      background: isDark ? 'bg-brand-darkblue' : 'bg-white',
      border: '',
      centered: true,
    },
  }

  const styles = variantStyles[blockVariant]

  return (
    <section className={`${styles.section} ${styles.background}`}>
      <div
        className={`${styles.centered ? 'mx-auto' : ''} w-full ${styles.container} px-4 md:px-8 lg:px-12`}
      >
        <div
          className={`w-full payload-richtext prose ${styles.prose} max-w-none text-left leading-relaxed ${styles.border} ${
            styles.border ? 'pl-4' : ''
          } ${isDark ? 'prose-invert text-gray-300' : 'prose-gray text-gray-700'}`}
        >
          <LexicalRichText data={content} />
        </div>
      </div>
    </section>
  )
}
