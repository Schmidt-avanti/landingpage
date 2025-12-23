import { Block } from 'payload'
import { blockSettings } from '@/fields/blockSettings'

export const TestimonialsBlock: Block = {
  slug: 'testimonials',
  labels: {
    singular: 'Testimonials Section',
    plural: 'Testimonials Sections',
  },
  fields: [
    blockSettings,
    {
      name: 'title',
      type: 'text',
      label: 'Headline',
      defaultValue: 'Ergebnisse, die für sich sprechen',
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subheadline',
      defaultValue: 'Kundenstimmen',
    },
  ],
}
