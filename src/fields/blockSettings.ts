import type { Field } from 'payload'
import { anchorOptions } from './anchorOptions'

export const blockSettings: Field = {
  name: 'settings',
  type: 'group',
  admin: {
    description: 'Appearance settings for this block',
  },
  fields: [
    {
      name: 'theme',
      type: 'select',
      label: 'Background Theme',
      defaultValue: 'light',
      options: [
        {
          label: 'Light (White Background)',
          value: 'light',
        },
        {
          label: 'Dark (Blue Background)',
          value: 'dark',
        },
      ],
    },
    {
      name: 'anchorId',
      type: 'select',
      label: 'Anchor ID (for navigation links)',
      admin: {
        description: 'Optional. Assign an anchor so navigation can link to this block.',
      },
      options: [...anchorOptions],
    },
  ],
}
