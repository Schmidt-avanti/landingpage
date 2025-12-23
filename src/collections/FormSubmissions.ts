import type { CollectionConfig } from 'payload'

export const FormSubmissions: CollectionConfig = {
  slug: 'form-submissions',
  labels: {
    singular: 'Form Submission',
    plural: 'Form Submissions',
  },
  access: {
    create: () => true, // Everyone can submit
    read: ({ req: { user } }) => {
      return Boolean(user) // Only logged-in users (admins) can read
    },
    update: () => false,
    delete: ({ req: { user } }) => {
      return Boolean(user)
    },
  },
  admin: {
    defaultColumns: ['name', 'email', 'company', 'position', 'phone', 'createdAt'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Name',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Email',
    },
    {
      name: 'message',
      type: 'textarea',
      required: false,
      label: 'Message',
    },
    {
      name: 'source',
      type: 'text',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
      label: 'Source Page',
    },
    {
      name: 'company',
      type: 'text',
      label: 'Company',
    },
    {
      name: 'position',
      type: 'text',
      label: 'Position',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone',
    },
  ],
}
