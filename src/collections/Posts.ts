import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: {
    singular: 'Blog-Beitrag',
    plural: 'Blog-Beiträge',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'publishedAt', 'status'],
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Titel',
          required: true,
          admin: { width: '70%' },
        },
        {
          name: 'slug',
          type: 'text',
          label: 'Slug',
          required: true,
          unique: true,
          admin: {
            width: '30%',
            description: 'URL-freundlicher Name (z.B. "mein-erster-beitrag")',
          },
        },
      ],
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Kurzbeschreibung',
      admin: {
        description: 'Wird in Übersichten und Teasern angezeigt',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Titelbild',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Inhalt',
      required: true,
    },

    // Autor & Datum
    {
      type: 'row',
      fields: [
        {
          name: 'author',
          type: 'relationship',
          relationTo: 'authors',
          label: 'Autor',
          required: true,
          admin: { width: '50%' },
        },
        {
          name: 'publishedAt',
          type: 'date',
          label: 'Veröffentlichungsdatum',
          required: true,
          admin: {
            width: '25%',
            date: {
              pickerAppearance: 'dayOnly',
              displayFormat: 'dd.MM.yyyy',
            },
          },
        },
        {
          name: 'readingTime',
          type: 'number',
          label: 'Lesezeit (Min.)',
          admin: {
            width: '25%',
            description: 'Geschätzte Lesezeit in Minuten',
          },
        },
      ],
    },

    // SEO
    {
      type: 'collapsible',
      label: 'SEO',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          label: 'Meta Title',
          admin: {
            description: 'Für Suchmaschinen (leer = Titel wird verwendet)',
          },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          label: 'Meta Description',
          admin: {
            description:
              '1-2 vollständige Sätze für Suchmaschinen, z.B. "Erfahren Sie, wie KI Ihren Kundenservice verbessert." (leer = Kurzbeschreibung wird verwendet)',
          },
        },
      ],
    },
  ],
}
