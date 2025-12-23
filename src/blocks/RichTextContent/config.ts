import type { Block } from 'payload'
import { blockSettings } from '@/fields/blockSettings'

export const RichTextContent: Block = {
  slug: 'richTextContent',
  labels: {
    singular: 'Rich Text Content',
    plural: 'Rich Text Contents',
  },
  fields: [
    blockSettings,
    {
      name: 'content',
      type: 'richText',
      label: 'Content',
      required: true,
    },
  ],
}
