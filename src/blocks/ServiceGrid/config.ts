import { Block } from 'payload'
import { blockSettings } from '@/fields/blockSettings'

export const ServiceGridBlock: Block = {
  slug: 'serviceGrid',
  labels: {
    singular: 'Service Grid',
    plural: 'Service Grids',
  },
  fields: [
    blockSettings,
    {
      name: 'title',
      type: 'text',
      label: 'Headline',
      defaultValue: 'Unsere Leistungen',
      required: true,
    },
    {
      name: 'introduction',
      type: 'textarea',
      label: 'Introduction Text',
      defaultValue:
        'Maßgeschneiderte Lösungen für Ihren Kundenservice – skalierbar, professionell und persönlich.',
      required: true,
    },
    {
      name: 'services',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      required: true,
      label: 'Selected Services (Drag & Drop to Reorder)',
      filterOptions: {
        type: {
          equals: 'main',
        },
      },
    },
  ],
}
