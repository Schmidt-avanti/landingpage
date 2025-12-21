import type { Block } from 'payload'

export const LogoTicker: Block = {
  slug: 'logoTicker',
  fields: [
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
        }
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
  ],
}
