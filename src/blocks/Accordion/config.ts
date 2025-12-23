import type { Block } from 'payload'
import { blockSettings } from '@/fields/blockSettings'

export const Accordion: Block = {
  slug: 'accordion',
  labels: {
    singular: 'Accordion',
    plural: 'Accordions',
  },
  fields: [
    blockSettings,
    {
      name: 'items',
      type: 'array',
      label: 'Accordion Items',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Section Title',
          required: true,
        },
        {
          name: 'content',
          type: 'richText',
          label: 'Content',
          required: true,
        },
      ],
    },
  ],
}
