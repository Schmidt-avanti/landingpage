import type { Block } from 'payload'

export const ProcessSteps: Block = {
  slug: 'processSteps',
  labels: {
    singular: 'Process Steps',
    plural: 'Process Steps',
  },
  fields: [
    {
      name: 'tagline',
      type: 'text',
      label: 'Tagline',
      admin: {
        description: 'Kleiner Text über der Headline',
      },
    },
    {
      name: 'headline',
      type: 'text',
      label: 'Headline',
      defaultValue: 'So starten Sie mit Avanti',
    },
    {
      name: 'introduction',
      type: 'textarea',
      label: 'Einleitung',
      admin: {
        description: 'Optionaler Text unter der Headline',
      },
    },
    {
      name: 'steps',
      type: 'array',
      label: 'Schritte',
      minRows: 2,
      maxRows: 8,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Titel',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Beschreibung',
        },
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          options: [
            { label: '📅 Calendar', value: 'Calendar' },
            { label: '⚙️ Settings', value: 'Settings' },
            { label: '📋 ClipboardList', value: 'ClipboardList' },
            { label: '🚀 Rocket', value: 'Rocket' },
            { label: '🔄 RefreshCw', value: 'RefreshCw' },
            { label: '✅ CheckCircle', value: 'CheckCircle' },
            { label: '👥 Users', value: 'Users' },
            { label: '📞 Phone', value: 'Phone' },
            { label: '💬 MessageSquare', value: 'MessageSquare' },
            { label: '📧 Mail', value: 'Mail' },
            { label: '🎯 Target', value: 'Target' },
            { label: '📈 TrendingUp', value: 'TrendingUp' },
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
          defaultValue: 'timeline',
          options: [
            { label: 'Timeline (vertikal)', value: 'timeline' },
            { label: 'Cards (horizontal)', value: 'cards' },
          ],
        },
      ],
    },
  ],
}
