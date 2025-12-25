import type { Block } from 'payload'

export const StatsShowcase: Block = {
  slug: 'statsShowcase',
  labels: {
    singular: 'Stats Showcase',
    plural: 'Stats Showcases',
  },
  fields: [
    {
      name: 'tagline',
      type: 'text',
      label: 'Tagline',
    },
    {
      name: 'headline',
      type: 'text',
      label: 'Headline',
      defaultValue: 'Messbare Ergebnisse',
    },
    {
      name: 'introduction',
      type: 'textarea',
      label: 'Einleitung',
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Statistiken',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'value',
          type: 'number',
          required: true,
          label: 'Wert',
          admin: {
            description: 'Der Zahlenwert (z.B. 94 für 94%)',
          },
        },
        {
          name: 'prefix',
          type: 'text',
          label: 'Prefix',
          admin: {
            description: 'Text vor der Zahl (z.B. ">" für ">94%")',
          },
        },
        {
          name: 'suffix',
          type: 'text',
          label: 'Suffix',
          admin: {
            description: 'Text nach der Zahl (z.B. "%" oder "+")',
          },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Label',
          admin: {
            description: 'Beschriftung (z.B. "Erst-Lösungsquote")',
          },
        },
        {
          name: 'description',
          type: 'text',
          label: 'Beschreibung',
          admin: {
            description: 'Optionaler Kontext (z.B. "nach 6 Monaten")',
          },
        },
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          options: [
            { label: '✅ CheckCircle', value: 'CheckCircle' },
            { label: '📈 TrendingUp', value: 'TrendingUp' },
            { label: '📞 Phone', value: 'Phone' },
            { label: '⏱️ Clock', value: 'Clock' },
            { label: '👥 Users', value: 'Users' },
            { label: '⭐ Star', value: 'Star' },
            { label: '🎯 Target', value: 'Target' },
            { label: '💬 MessageSquare', value: 'MessageSquare' },
          ],
        },
      ],
    },
    {
      name: 'settings',
      type: 'group',
      label: 'Einstellungen',
      fields: [
        {
          name: 'layout',
          type: 'select',
          label: 'Layout',
          defaultValue: 'grid',
          options: [
            { label: 'Grid (2-4 Spalten)', value: 'grid' },
            { label: 'Row (nebeneinander)', value: 'row' },
          ],
        },
        {
          name: 'animateOnScroll',
          type: 'checkbox',
          label: 'Counter animieren',
          defaultValue: true,
        },
      ],
    },
  ],
}
