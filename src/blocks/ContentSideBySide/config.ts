import type { Block } from 'payload'

export const ContentSideBySide: Block = {
  slug: 'contentSideBySide',
  fields: [
    {
      name: 'headline',
      type: 'text',
      label: 'Headline',
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Content',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image',
      required: true,
    },
    {
        name: 'imagePosition',
        type: 'select',
        label: 'Image Position',
        defaultValue: 'right',
        options: [
            { label: 'Left', value: 'left' },
            { label: 'Right', value: 'right' },
        ]
    },
    {
        name: 'ctaText',
        type: 'text',
        label: 'CTA Button Text',
    },
    {
        name: 'ctaLink',
        type: 'text',
        label: 'CTA Button Link',
    },
    {
        name: 'authorName',
        type: 'text',
        label: 'Author Name (if Quote)',
        admin: {
            description: 'Optional: Fill this if this block is a quote/testimonial.',
        }
    },
    {
        name: 'authorRole',
        type: 'text',
        label: 'Author Role (if Quote)',
    }
  ],
}
