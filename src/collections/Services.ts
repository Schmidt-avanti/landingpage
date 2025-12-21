import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'updatedAt'],
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
      label: 'Icon/Image',
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Communication', value: 'communication' },
        { label: 'Backoffice', value: 'backoffice' },
        { label: 'Sales', value: 'sales' },
      ],
      defaultValue: 'communication',
    },
  ],
}
