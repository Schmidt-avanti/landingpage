import type { CollectionConfig } from 'payload'

export const Industries: CollectionConfig = {
  slug: 'industries',
  labels: {
    singular: 'Industry (Branche)',
    plural: 'Industries (Branchen)',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'selectedIcon', 'order'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Industry Name',
    },
    {
      name: 'selectedIcon',
      type: 'select',
      label: 'Icon (Lucide)',
      admin: {
        description: 'Select a standard icon from the list',
      },
      options: [
        { label: '🏠 Home (Immobilien)', value: 'Home' },
        { label: '🛒 ShoppingCart (E-Commerce)', value: 'ShoppingCart' },
        { label: '🚗 Car (Autohäuser)', value: 'Car' },
        { label: '🏪 Store (Handel)', value: 'Store' },
        { label: '❤️ Heart (Pflegedienste)', value: 'Heart' },
        { label: '🩺 Stethoscope (Praxen)', value: 'Stethoscope' },
        { label: '⚖️ Scale (Kanzleien)', value: 'Scale' },
        { label: '🍴 Utensils (Gastronomie)', value: 'Utensils' },
        { label: '🔨 Hammer (Handwerk)', value: 'Hammer' },
        { label: '🏛️ Building2 (Gemeinden)', value: 'Building2' },
        { label: '🛋️ Armchair (Einrichtungshäuser)', value: 'Armchair' },
        { label: '🛡️ Shield (Versicherungen)', value: 'Shield' },
        { label: '🏨 Hotel (Hotellerie)', value: 'Hotel' },
        { label: '🏢 Building (Unternehmen)', value: 'Building' },
        { label: '🏭 Factory (Industrie)', value: 'Factory' },
        { label: '📦 Package (Logistik)', value: 'Package' },
        { label: '💼 Briefcase (Beratung)', value: 'Briefcase' },
        { label: '🎓 GraduationCap (Bildung)', value: 'GraduationCap' },
      ],
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      label: 'Custom Icon (optional)',
      admin: {
        description: "Upload a custom icon image if you don't want to use a standard icon",
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description (optional)',
    },
    {
      name: 'order',
      type: 'number',
      label: 'Sort Order',
      defaultValue: 0,
      admin: {
        description: 'Lower numbers appear first',
      },
    },
  ],
}
