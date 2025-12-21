import { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: {
    group: 'Admin',
    description: 'Manage global site settings like logo, footer, and social links.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Main Logo (Header - Dark)',
      required: true,
    },
    {
      name: 'footerLogo',
      type: 'upload',
      relationTo: 'media',
      label: 'Footer Logo (White)',
      admin: {
        description: 'Upload the white version of the logo here.',
      },
    },
    {
      name: 'phoneNumber',
      type: 'text',
      label: 'Phone Number (Header/Footer)',
    },
    {
        name: 'email',
        type: 'text',
        label: 'Contact Email',
    },
    {
      name: 'footerText',
      type: 'textarea',
      label: 'Footer Description',
    },
  ],
}
