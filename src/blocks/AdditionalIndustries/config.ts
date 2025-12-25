import type { Block } from 'payload'

export const AdditionalIndustries: Block = {
  slug: 'additionalIndustries',
  labels: {
    singular: 'Additional Industries',
    plural: 'Additional Industries',
  },
  interfaceName: 'AdditionalIndustriesBlock',
  fields: [
    {
      name: 'headline',
      type: 'text',
      label: 'Headline',
      defaultValue: 'Weitere Branchen',
    },
    {
      name: 'industries',
      type: 'relationship',
      relationTo: 'industries',
      hasMany: true,
      label: 'Additional Industries',
      admin: {
        description: 'Select additional industries to display in compact icon list',
      },
      filterOptions: {
        type: { equals: 'additional' },
      },
    },
    {
      name: 'settings',
      type: 'group',
      label: 'Block Settings',
      fields: [
        {
          name: 'theme',
          type: 'select',
          label: 'Theme',
          defaultValue: 'dark',
          options: [
            { label: 'Dark', value: 'dark' },
            { label: 'Light', value: 'light' },
          ],
        },
      ],
    },
  ],
}
