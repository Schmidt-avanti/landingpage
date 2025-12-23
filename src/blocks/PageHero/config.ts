import type { Block } from 'payload'

export const PageHero: Block = {
  slug: 'pageHero',
  labels: {
    singular: 'Page Hero',
    plural: 'Page Heroes',
  },
  fields: [
    {
      name: 'headline',
      type: 'text',
      label: 'Headline',
      required: true,
    },
    {
      name: 'subheadline',
      type: 'text',
      label: 'Subheadline',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image (Optional)',
      admin: {
        description: 'Image displayed on the right side. If empty, text will be centered.',
      },
    },
  ],
}
