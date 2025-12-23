import type { Block } from 'payload'
import { anchorOptions } from '@/fields/anchorOptions'

export const Hero: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero Section (Bento Grid)',
    plural: 'Hero Sections',
  },
  fields: [
    // Main Text Content
    {
      type: 'row',
      fields: [
        {
          name: 'headline',
          type: 'text',
          required: true,
          label: 'Headline',
          admin: { width: '50%' },
        },
        {
          name: 'badgeText',
          type: 'text',
          label: 'Trust Badge Text',
          admin: {
            width: '50%',
            description: 'z.B. "100% Bot-Free Guarantee"',
          },
        },
      ],
    },
    {
      name: 'subheadline',
      type: 'textarea',
      label: 'Subheadline / Description',
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
      defaultValue: 'anchor',
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
        description: 'z.B. /kontakt oder /services',
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

    // Bento Grid Cards
    {
      name: 'bentoCards',
      type: 'array',
      label: 'Bento Grid Cards',
      minRows: 1,
      maxRows: 6,
      admin: {
        description: 'Configure the cards that appear in the hero grid.',
      },
      fields: [
        {
          name: 'cardType',
          type: 'select',
          required: true,
          label: 'Card Type',
          options: [
            { label: 'Image (Agent/Photo)', value: 'image' },
            { label: 'Screenshot (Suite)', value: 'screenshot' },
            { label: 'Statistic Counter', value: 'stat' },
            { label: 'Decorative Background', value: 'decorative' },
          ],
          defaultValue: 'image',
        },
        {
          name: 'cardSize',
          type: 'select',
          label: 'Card Size',
          options: [
            { label: 'Small (1x1)', value: 'small' },
            { label: 'Medium (2x1)', value: 'medium' },
            { label: 'Large (2x2)', value: 'large' },
          ],
          defaultValue: 'small',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Image',
          admin: {
            condition: (data, siblingData) =>
              ['image', 'screenshot', 'decorative'].includes(siblingData?.cardType),
          },
        },
        {
          name: 'statValue',
          type: 'text',
          label: 'Stat Value (e.g. "4.500+")',
          admin: {
            condition: (data, siblingData) => siblingData?.cardType === 'stat',
          },
        },
        {
          name: 'statLabel',
          type: 'text',
          label: 'Stat Label (e.g. "Anfragen bearbeitet")',
          admin: {
            condition: (data, siblingData) => siblingData?.cardType === 'stat',
          },
        },
        {
          name: 'statBackgroundImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Stat Background Image',
          admin: {
            condition: (data, siblingData) => siblingData?.cardType === 'stat',
            description: 'Optional decorative background for the stat card',
          },
        },
        {
          name: 'cardTitle',
          type: 'text',
          label: 'Optional Card Title',
          admin: {
            description: 'Small label shown above the content',
          },
        },
      ],
    },
  ],
}
