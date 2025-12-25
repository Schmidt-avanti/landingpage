import type { Block } from 'payload'

export const FlywheelDiagram: Block = {
  slug: 'flywheelDiagram',
  labels: {
    singular: 'Flywheel Diagram',
    plural: 'Flywheel Diagrams',
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
      defaultValue: 'Das Schwungrad-Prinzip',
    },
    {
      name: 'introduction',
      type: 'textarea',
      label: 'Einleitung',
      defaultValue:
        'Mit jedem Kundenkontakt wird Ihr Service besser – automatisch und kontinuierlich.',
    },
    {
      name: 'phases',
      type: 'array',
      label: 'Phasen',
      minRows: 3,
      maxRows: 6,
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
            { label: '❓ HelpCircle', value: 'HelpCircle' },
            { label: '📋 ClipboardCheck', value: 'ClipboardCheck' },
            { label: '📧 Mail', value: 'Mail' },
            { label: '➕ PlusCircle', value: 'PlusCircle' },
            { label: '🔄 RefreshCw', value: 'RefreshCw' },
            { label: '📈 TrendingUp', value: 'TrendingUp' },
          ],
        },
      ],
    },
  ],
}
