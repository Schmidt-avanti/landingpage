import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Service Title',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Description',
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      label: 'Custom Icon Image (Optional)',
    },
    {
      name: 'selectedIcon',
      type: 'text',
      admin: {
        components: {
            Field: '@/components/IconPickerField#IconPickerField'
        },
      },
    },

    {
      name: 'type',
      type: 'select',
      label: 'Service Typ',
      options: [
         { label: 'Hauptleistung (Grid)', value: 'main' },
         { label: 'Zusatzleistung (Icon Liste)', value: 'additional' },
      ],
      defaultValue: 'main',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
