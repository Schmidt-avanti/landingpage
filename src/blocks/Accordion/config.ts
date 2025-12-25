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
      name: 'tagline',
      type: 'text',
      label: 'Tagline',
      admin: {
        description: 'Kleiner Text über der Headline (z.B. "HÄUFIGE FRAGEN")',
      },
    },
    {
      name: 'headline',
      type: 'text',
      label: 'Headline',
      admin: {
        description: 'Hauptüberschrift des FAQ-Bereichs',
      },
    },
    {
      name: 'introduction',
      type: 'textarea',
      label: 'Einleitung',
      admin: {
        description: 'Optionaler Text unter der Headline',
      },
    },
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
