import type { Block } from 'payload'
import { blockSettings } from '@/fields/blockSettings'

export const PricingAddons: Block = {
  slug: 'pricingAddons',
  labels: {
    singular: 'Zusatz-Optionen',
    plural: 'Zusatz-Optionen',
  },
  fields: [
    blockSettings,
    {
      name: 'headline',
      type: 'text',
      label: 'Überschrift',
      defaultValue: 'Zusatz-Optionen',
    },
    {
      name: 'subheadline',
      type: 'text',
      label: 'Unterüberschrift',
    },

    // Addons
    {
      name: 'addons',
      type: 'array',
      label: 'Optionen',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Name',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
          label: 'Beschreibung',
        },
        {
          type: 'row',
          fields: [
            {
              name: 'onetimePrice',
              type: 'text',
              label: 'Einmaliger Preis',
              admin: {
                width: '50%',
                description: 'z.B. "500€" – leer lassen wenn nicht zutreffend',
              },
            },
            {
              name: 'monthlyPrice',
              type: 'text',
              label: 'Monatlicher Preis',
              admin: {
                width: '50%',
                description: 'z.B. "99€" – leer lassen wenn nicht zutreffend',
              },
            },
          ],
        },
        {
          name: 'note',
          type: 'text',
          label: 'Anmerkung',
          admin: {
            description: 'z.B. "*in Verbindung mit Super 365"',
          },
        },
      ],
    },

    // Footnotes
    {
      name: 'footnotes',
      type: 'array',
      label: 'Fußnoten',
      admin: {
        description: 'z.B. "Alle Preise zzgl. gesetzlicher Mehrwertsteuer"',
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Fußnote',
          required: true,
        },
      ],
    },
  ],
}
