import type { Block } from 'payload'
import { blockSettings } from '@/fields/blockSettings'

export const IndustriesGridBlock: Block = {
  slug: 'industriesGrid',
  labels: {
    singular: 'Industries Grid (Branchen)',
    plural: 'Industries Grids',
  },
  fields: [
    blockSettings,
    {
      name: 'tagline',
      type: 'text',
      label: 'Tagline (small text above headline)',
      defaultValue: 'Unsere Branchen',
    },
    {
      name: 'headline',
      type: 'text',
      label: 'Headline',
      required: true,
      defaultValue: 'avanti unterstützt kleinere und mittlere Unternehmen',
    },
    {
      name: 'industries',
      type: 'relationship',
      relationTo: 'industries',
      hasMany: true,
      required: true,
      label: 'Selected Industries (Drag & Drop to Reorder)',
    },
  ],
}
