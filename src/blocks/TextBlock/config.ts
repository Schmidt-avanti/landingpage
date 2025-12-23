import type { Block } from 'payload'
import { blockSettings } from '@/fields/blockSettings'

export const TextBlock: Block = {
  slug: 'textBlock',
  labels: {
    singular: 'Text',
    plural: 'Texte',
  },
  fields: [
    blockSettings,
    {
      name: 'variant',
      type: 'select',
      label: 'Variante',
      defaultValue: 'standard',
      admin: {
        description: 'Wähle die passende Darstellungsform für den Text.',
      },
      options: [
        {
          label: 'Hinweis / Fußnote',
          value: 'hint',
        },
        {
          label: 'Standard',
          value: 'standard',
        },
        {
          label: 'Seite (z.B. Impressum, AGB)',
          value: 'page',
        },
      ],
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Text',
      required: true,
    },
  ],
}
