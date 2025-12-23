import type { Block } from 'payload'
import { blockSettings } from '@/fields/blockSettings'

export const LogoTicker: Block = {
  slug: 'logoTicker',
  fields: [
    blockSettings,
    {
      name: 'headline',
      type: 'text',
      label: 'Headline',
      defaultValue: 'Vertrauen von führenden Unternehmen',
    },
    {
      name: 'logos',
      type: 'array',
      label: 'Client Logos',
      minRows: 1,
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'name',
          type: 'text',
          label: 'Client Name (Alt Text)',
        },
      ],
    },
    {
      name: 'speed',
      type: 'select',
      label: 'Animation Speed',
      defaultValue: 'normal',
      options: [
        { label: 'Slow', value: 'slow' },
        { label: 'Normal', value: 'normal' },
        { label: 'Fast', value: 'fast' },
      ],
    },
    {
      name: 'invertLogos',
      type: 'checkbox',
      label: 'Invert Logo Colors (for white logos on light background)',
      defaultValue: false,
    },
  ],
}
