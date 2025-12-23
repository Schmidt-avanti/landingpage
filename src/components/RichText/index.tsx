import React from 'react'
import { RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

type Props = {
  className?: string
  data: SerializedEditorState
  enableGutter?: boolean
  enableProse?: boolean
}

export const RichText: React.FC<Props> = ({
  className,
  data,
  enableGutter = true,
  enableProse = true,
  ...props
}) => {
  if (!data) {
    return null
  }

  return (
    <div
      className={[
        className,
        className,
        // use global class .payload-richtext defined in styles.css
        'payload-richtext',
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      <LexicalRichText data={data} />
    </div>
  )
}

export default RichText
