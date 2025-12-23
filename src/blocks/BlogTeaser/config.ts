import type { Block } from 'payload'
import { blockSettings } from '@/fields/blockSettings'
import { anchorOptions } from '@/fields/anchorOptions'

export const BlogTeaser: Block = {
  slug: 'blogTeaser',
  labels: {
    singular: 'Blog-Teaser',
    plural: 'Blog-Teaser',
  },
  fields: [
    blockSettings,
    {
      name: 'headline',
      type: 'text',
      label: 'Überschrift',
      defaultValue: 'Aktuelles aus dem Blog',
    },
    {
      name: 'subheadline',
      type: 'text',
      label: 'Unterüberschrift',
    },
    {
      name: 'postsCount',
      type: 'number',
      label: 'Anzahl Beiträge',
      defaultValue: 4,
      min: 1,
      max: 6,
    },
    // CTA
    {
      name: 'ctaText',
      type: 'text',
      label: 'CTA Button Text',
      defaultValue: 'Alle Beiträge ansehen →',
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
      defaultValue: '/blog',
      admin: {
        condition: (data, siblingData) =>
          siblingData?.ctaText && siblingData?.ctaLinkType === 'page',
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
  ],
}
