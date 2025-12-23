import type { CollectionConfig } from 'payload'

export const Authors: CollectionConfig = {
  slug: 'authors',
  labels: {
    singular: 'Autor',
    plural: 'Autoren',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'image'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Bild',
    },
  ],
}
