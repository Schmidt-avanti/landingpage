import { GlobalConfig } from 'payload'
import { anchorOptions } from '@/fields/anchorOptions'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: {
    group: 'Admin',
    description: 'Manage global site settings like logo, navigation, and footer.',
  },
  access: {
    read: () => true,
  },
  fields: [
    // Logo Section
    {
      type: 'collapsible',
      label: 'Logo',
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          label: 'Logo',
          required: true,
          admin: {
            description: 'Used in header (dark) and footer (white) - styled automatically.',
          },
        },
      ],
    },

    // Award Badge Section
    {
      type: 'collapsible',
      label: 'Award Badge (Header)',
      admin: {
        description: 'Displays next to logo with hover tooltip',
      },
      fields: [
        {
          name: 'awardEnabled',
          type: 'checkbox',
          label: 'Show Award Badge',
          defaultValue: false,
        },
        {
          name: 'awardImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Badge Image',
          admin: {
            condition: (data) => data?.awardEnabled,
          },
        },
        {
          name: 'awardTitle',
          type: 'text',
          label: 'Tooltip Title',
          defaultValue: 'Business Innovator 2024',
          admin: {
            condition: (data) => data?.awardEnabled,
          },
        },
        {
          name: 'awardDescription',
          type: 'richText',
          label: 'Modal Content',
          admin: {
            condition: (data) => data?.awardEnabled,
            description: 'Supports bold, italic, lists, etc.',
          },
        },
      ],
    },

    // Navigation Section
    {
      type: 'collapsible',
      label: 'Header Navigation',
      fields: [
        {
          name: 'navigation',
          type: 'array',
          label: 'Menu Items',
          admin: {
            description: 'Drag & drop to reorder menu items.',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              label: 'Label',
            },
            {
              name: 'linkType',
              type: 'select',
              label: 'Link Type',
              defaultValue: 'page',
              options: [
                { label: 'Page (URL)', value: 'page' },
                { label: 'Anchor (In-Page)', value: 'anchor' },
              ],
            },
            {
              name: 'pageLink',
              type: 'text',
              label: 'Page URL',
              admin: {
                condition: (data, siblingData) => siblingData?.linkType === 'page',
                description: 'e.g., /about or /services',
              },
            },
            {
              name: 'anchorLink',
              type: 'select',
              label: 'Anchor',
              options: [...anchorOptions],
              admin: {
                condition: (data, siblingData) => siblingData?.linkType === 'anchor',
                description: 'Select an anchor defined on a block',
              },
            },
          ],
        },
      ],
    },

    // CTA Button Section
    {
      type: 'collapsible',
      label: 'CTA Button (Header)',
      fields: [
        {
          name: 'ctaType',
          type: 'select',
          label: 'CTA Button Type',
          defaultValue: 'link',
          options: [
            { label: 'Link', value: 'link' },
            { label: 'Phone (Click-to-Call)', value: 'phone' },
          ],
        },
        {
          name: 'ctaText',
          type: 'text',
          label: 'Button Text',
          defaultValue: 'Kontakt',
        },
        {
          name: 'ctaLink',
          type: 'text',
          label: 'Link URL',
          admin: {
            condition: (data) => data?.ctaType === 'link',
          },
        },
        {
          name: 'ctaPhone',
          type: 'text',
          label: 'Phone Number',
          admin: {
            condition: (data) => data?.ctaType === 'phone',
            description: 'Format: +49 30 123456789',
          },
        },
      ],
    },

    // Contact Info Section
    {
      type: 'collapsible',
      label: 'Contact Information',
      fields: [
        {
          name: 'phoneNumber',
          type: 'text',
          label: 'Phone Number (General)',
        },
        {
          name: 'email',
          type: 'text',
          label: 'Contact Email',
        },
      ],
    },

    // Footer Section
    {
      type: 'collapsible',
      label: 'Footer',
      fields: [
        {
          name: 'footerText',
          type: 'textarea',
          label: 'Footer Description',
        },
      ],
    },

    // Social Media Section
    {
      type: 'collapsible',
      label: 'Social Media',
      admin: {
        description: 'Links zu euren Social Media Profilen',
      },
      fields: [
        {
          name: 'socialInstagram',
          type: 'text',
          label: 'Instagram URL',
          admin: {
            description: 'z.B. https://instagram.com/avanti.cx',
          },
        },
        {
          name: 'socialLinkedin',
          type: 'text',
          label: 'LinkedIn URL',
          admin: {
            description: 'z.B. https://linkedin.com/company/avanti',
          },
        },
      ],
    },

    // Company Contact Info
    {
      type: 'collapsible',
      label: 'Firmenadresse (Footer)',
      fields: [
        {
          name: 'companyName',
          type: 'text',
          label: 'Firmenname',
          defaultValue: 'Avanti CX GmbH',
        },
        {
          name: 'companyAddress',
          type: 'textarea',
          label: 'Adresse',
          admin: {
            description: 'Mehrzeilige Adresse für den Footer',
          },
        },
      ],
    },

    // Legal Documents Section
    {
      type: 'collapsible',
      label: 'Rechtliche Dokumente (Downloads)',
      admin: {
        description: 'PDF-Dokumente wie Nutzungsbedingungen, AGB, etc.',
      },
      fields: [
        {
          name: 'legalDocuments',
          type: 'array',
          label: 'Dokumente',
          admin: {
            description: 'Füge PDF-Dokumente hinzu, die als Download verfügbar sein sollen',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Anzeigename',
              required: true,
              admin: {
                description: 'z.B. "Nutzungsbedingungen" oder "AGB"',
              },
            },
            {
              name: 'file',
              type: 'upload',
              relationTo: 'media',
              label: 'PDF-Datei',
              required: true,
            },
          ],
        },
      ],
    },

    // Legal Page Links Section
    {
      type: 'collapsible',
      label: 'Rechtliche Seiten (Links)',
      admin: {
        description: 'Links zu den Rechtsseiten im Footer',
      },
      fields: [
        {
          name: 'imprintLink',
          type: 'text',
          label: 'Impressum URL',
          defaultValue: '/impressum',
          admin: {
            description: 'Pfad zur Impressum-Seite, z.B. /impressum',
          },
        },
        {
          name: 'privacyLink',
          type: 'text',
          label: 'Datenschutz URL',
          defaultValue: '/datenschutz',
          admin: {
            description: 'Pfad zur Datenschutz-Seite, z.B. /datenschutz',
          },
        },
      ],
    },
  ],
}
