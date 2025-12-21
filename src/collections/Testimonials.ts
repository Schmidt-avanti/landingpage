import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'company', 'rating', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Customer Name',
    },
    {
      name: 'company',
      type: 'text',
      label: 'Company',
    },
    {
      name: 'role',
      type: 'text',
      label: 'Role',
    },
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      label: 'Quote',
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      label: 'Customer Avatar',
    },
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
      defaultValue: 5,
      label: 'Rating (1-5)',
    },
  ],
}
