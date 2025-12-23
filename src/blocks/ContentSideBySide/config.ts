import type { Block } from 'payload'
import { blockSettings } from '@/fields/blockSettings'
import { anchorOptions } from '@/fields/anchorOptions'

export const ContentSideBySide: Block = {
  slug: 'contentSideBySide',
  fields: [
    blockSettings,
    {
      name: 'headline',
      type: 'text',
      label: 'Headline',
    },
    {
      name: 'subheadline',
      type: 'text',
      label: 'Subheadline',
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
      label: 'Main Image',
      required: true,
    },
    {
      name: 'additionalImages',
      type: 'array',
      label: 'Additional Images (for Slideshow)',
      admin: {
        description:
          'Add more images here to create a slideshow. The Main Image will be the first slide.',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'imagePosition',
      type: 'select',
      label: 'Image Position',
      defaultValue: 'right',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
    },
    {
      name: 'ctaText',
      type: 'text',
      label: 'CTA Button Text',
    },
    {
      name: 'ctaLinkType',
      type: 'select',
      label: 'CTA Link Type',
      defaultValue: 'page',
      options: [
        { label: 'Page (URL)', value: 'page' },
        { label: 'Anchor (In-Page)', value: 'anchor' },
      ],
      admin: {
        condition: (data, siblingData) => siblingData?.ctaText,
      },
    },
    {
      name: 'ctaLink',
      type: 'text',
      label: 'CTA Link URL',
      admin: {
        condition: (data, siblingData) =>
          siblingData?.ctaText && siblingData?.ctaLinkType === 'page',
        description: 'e.g., /contact or /services',
      },
    },
    {
      name: 'ctaAnchor',
      type: 'select',
      label: 'CTA Anchor',
      options: [...anchorOptions],
      admin: {
        condition: (data, siblingData) =>
          siblingData?.ctaText && siblingData?.ctaLinkType === 'anchor',
      },
    },

    // Quote Section
    {
      name: 'quoteText',
      type: 'textarea',
      label: 'Quote Text',
      admin: {
        description: 'The actual quote content to display in the card.',
      },
    },
    {
      name: 'authorName',
      type: 'text',
      label: 'Author Name',
    },
    {
      name: 'authorRole',
      type: 'text',
      label: 'Author Role',
    },
  ],
}
