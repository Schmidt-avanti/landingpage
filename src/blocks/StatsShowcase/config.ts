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
          name: 'displayType',
          type: 'select',
          label: 'Anzeige-Typ',
          defaultValue: 'value',
          options: [
            { label: 'Einzelwert (animierter Zähler)', value: 'value' },
            { label: 'Zeitverlauf-Chart', value: 'chart' },
          ],
          admin: {
            description: 'Wie soll die Statistik dargestellt werden?',
          },
        },
        {
          name: 'value',
          type: 'number',
          required: true,
          label: 'Endwert',
          admin: {
            description: 'Der Zahlenwert (z.B. 94 für 94%)',
          },
        },
        {
          name: 'startValue',
          type: 'number',
          label: 'Startwert (nur für Chart)',
          admin: {
            description: 'Der Anfangswert für den Zeitverlauf (z.B. 65 für 65%)',
          },
        },
        {
          name: 'chartPeriods',
          type: 'number',
          label: 'Zeitperioden (nur für Chart)',
          defaultValue: 6,
          admin: {
            description: 'Anzahl der Zeitpunkte auf der X-Achse (z.B. 6 für 6 Monate)',
          },
        },
        {
          name: 'chartPeriodLabel',
          type: 'text',
          label: 'Perioden-Label (nur für Chart)',
          defaultValue: 'Monate',
          admin: {
            description: 'Beschriftung für die X-Achse (z.B. "Monate", "Wochen")',
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
