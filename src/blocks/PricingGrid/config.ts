import type { Block } from 'payload'
import { blockSettings } from '@/fields/blockSettings'
import { anchorOptions } from '@/fields/anchorOptions'

export const PricingGrid: Block = {
  slug: 'pricingGrid',
  labels: {
    singular: 'Preis-Pakete',
    plural: 'Preis-Pakete',
  },
  fields: [
    blockSettings,
    {
      name: 'headline',
      type: 'text',
      label: 'Überschrift',
      defaultValue: 'Service-Pakete',
    },
    {
      name: 'subheadline',
      type: 'text',
      label: 'Unterüberschrift',
    },

    // Onboarding Fee
    {
      type: 'collapsible',
      label: 'Onboarding-Gebühr',
      fields: [
        {
          name: 'onboardingEnabled',
          type: 'checkbox',
          label: 'Onboarding-Gebühr anzeigen',
          defaultValue: true,
        },
        {
          name: 'onboardingLabel',
          type: 'text',
          label: 'Label',
          defaultValue: 'Einmalige Onboarding-Gebühr',
          admin: {
            condition: (data, siblingData) => siblingData?.onboardingEnabled,
          },
        },
        {
          name: 'onboardingPrice',
          type: 'text',
          label: 'Preis',
          defaultValue: '2.450€',
          admin: {
            condition: (data, siblingData) => siblingData?.onboardingEnabled,
          },
        },
      ],
    },

    // Packages
    {
      name: 'packages',
      type: 'array',
      label: 'Pakete',
      minRows: 1,
      maxRows: 6,
      admin: {
        description: 'Die Service-Pakete (empfohlen: 3-4 Pakete)',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Paketname',
          required: true,
        },
        {
          name: 'isRecommended',
          type: 'checkbox',
          label: 'Als "Empfohlen" hervorheben',
          defaultValue: false,
        },
        {
          name: 'openingHours',
          type: 'textarea',
          label: 'Öffnungszeiten',
          required: true,
          admin: {
            description: 'Mehrzeilige Eingabe möglich',
          },
        },
        {
          name: 'price',
          type: 'text',
          label: 'Preis',
          admin: {
            description: 'z.B. "ab 199€/Monat" oder leer lassen',
          },
        },
        {
          name: 'priceNote',
          type: 'text',
          label: 'Preishinweis',
          admin: {
            description: 'z.B. "zzgl. Minutenpreis"',
          },
        },
      ],
    },

    // Included Features
    {
      name: 'featuresHeadline',
      type: 'text',
      label: 'Features-Überschrift',
      defaultValue: 'Alle Pakete enthalten:',
    },
    {
      name: 'features',
      type: 'array',
      label: 'Enthaltene Features',
      fields: [
        {
          name: 'feature',
          type: 'text',
          label: 'Feature',
          required: true,
        },
      ],
    },

    // CTA
    {
      name: 'ctaText',
      type: 'text',
      label: 'CTA Button Text',
      defaultValue: 'Demo buchen →',
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
  ],
}
