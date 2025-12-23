import type { Block } from 'payload'
import { blockSettings } from '@/fields/blockSettings'

export const AdditionalServicesBlock: Block = {
  slug: 'additionalServices',
  labels: {
    singular: 'Additional Services Grid',
    plural: 'Additional Services Grids',
  },
  fields: [
    blockSettings,
    {
      name: 'headline',
      type: 'text',
      label: 'Headline',
      defaultValue: 'Weitere Serviceleistungen',
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
          equals: 'additional',
        },
      },
    },
  ],
}
