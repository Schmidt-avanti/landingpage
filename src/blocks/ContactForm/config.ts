import type { Block } from 'payload'
import { blockSettings } from '@/fields/blockSettings'

export const ContactForm: Block = {
  slug: 'contactForm',
  fields: [
    {
      name: 'headline',
      type: 'text',
      label: 'Main Headline', // "Jetzt kostenloses Angebot anfordern"
      defaultValue: 'Jetzt kostenloses Angebot anfordern',
    },
    {
      name: 'subheadline',
      type: 'text',
      label: 'Subheadline (Small)', // "avanti kennenlernen"
      defaultValue: 'avanti kennenlernen',
    },
    {
      name: 'introText',
      type: 'textarea',
      label: 'Description Text',
    },
    {
      name: 'phoneNumber',
      type: 'text',
      label: 'Phone Number',
      defaultValue: '+49 (0)30 / 814 892-121',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'cardHeadline',
          type: 'text',
          label: 'Card Headline',
          defaultValue: 'Ja, ich interessiere mich für ein kostenloses Angebot.',
          admin: { width: '50%' },
        },
        {
          name: 'buttonText',
          type: 'text',
          label: 'Button Label',
          defaultValue: 'Angebot anfordern',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'privacyText',
      type: 'text',
      label: 'Privacy Checkbox Text',
      defaultValue: 'Ich akzeptiere die Datenschutzerklärung',
    },
    {
      name: 'footerText',
      type: 'text',
      label: 'Card Footer Text',
      defaultValue: 'Wir behandeln Ihre Daten vertraulich.',
    },
    {
      name: 'emailTo',
      type: 'text',
      label: 'Send Emails To',
      defaultValue: 'info@avanti.cx',
      admin: {
        description: 'Where should contact form submissions be sent?',
      },
    },
    blockSettings,
  ],
}
