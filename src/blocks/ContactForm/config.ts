import type { Block } from 'payload'

export const ContactForm: Block = {
  slug: 'contactForm',
  fields: [
    {
      name: 'headline',
      type: 'text',
      label: 'Headline',
      defaultValue: 'Kontakt',
    },
    {
        name: 'introText',
        type: 'textarea',
        label: 'Intro Text',
    },
    {
      name: 'emailTo',
      type: 'text',
      label: 'Send Emails To',
      defaultValue: 'info@avanti.cx',
      admin: {
          description: 'Where should contact form submissions be sent?',
      }
    },
  ],
}
