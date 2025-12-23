import React from 'react'
import { RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

type RichTextContentProps = {
  content: SerializedEditorState
  blockSettings?: {
    theme?: 'light' | 'dark' | null
    anchorId?: string | null
  } | null
}

export const RichTextContentComponent: React.FC<RichTextContentProps> = ({
  content,
  blockSettings,
}) => {
  const theme = blockSettings?.theme || 'light'
  const isDark = theme === 'dark'

  return (
    <section
      id={blockSettings?.anchorId || undefined}
      className={`py-16 md:py-24 ${isDark ? 'bg-brand-darkblue' : 'bg-white'}`}
    >
      <div className="container mx-auto px-4">
        <div
          className={`max-w-4xl mx-auto payload-richtext prose prose-lg ${
            isDark ? 'prose-invert text-gray-300' : 'prose-gray text-gray-700'
          }`}
        >
          <LexicalRichText data={content} />
        </div>
      </div>
    </section>
  )
}
