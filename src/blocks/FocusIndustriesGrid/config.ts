import type { Block } from 'payload'

export const FocusIndustriesGrid: Block = {
  slug: 'focusIndustriesGrid',
  labels: {
    singular: 'Focus Industries Grid',
    plural: 'Focus Industries Grids',
  },
  interfaceName: 'FocusIndustriesGridBlock',
  fields: [
    {
      name: 'tagline',
      type: 'text',
      label: 'Tagline',
      admin: {
        description: 'Small text above the headline (optional)',
      },
    },
    {
      name: 'headline',
      type: 'text',
      label: 'Headline',
      defaultValue: 'Unsere Fokus-Branchen',
    },
    {
      name: 'introduction',
      type: 'textarea',
      label: 'Introduction Text',
    },
    {
      name: 'industries',
      type: 'relationship',
      relationTo: 'industries',
      hasMany: true,
      label: 'Focus Industries',
      admin: {
        description:
          'Select focus industries to display (only industries with type "focus" will be shown properly)',
      },
      filterOptions: {
        type: { equals: 'focus' },
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
        {
          name: 'showLink',
          type: 'checkbox',
          label: 'Show link to detail page',
          defaultValue: true,
        },
      ],
    },
  ],
}
