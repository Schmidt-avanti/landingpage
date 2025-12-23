import type { Block } from 'payload'
import { blockSettings } from '@/fields/blockSettings'

export const BlogPosts: Block = {
  slug: 'blogPosts',
  labels: {
    singular: 'Blog-Beiträge Liste',
    plural: 'Blog-Beiträge Listen',
  },
  fields: [
    blockSettings,
    {
      name: 'postsPerPage',
      type: 'number',
      label: 'Beiträge pro Seite',
      defaultValue: 9,
      min: 3,
      max: 24,
    },
    {
      name: 'columns',
      type: 'select',
      label: 'Spalten',
      defaultValue: '3',
      options: [
        { label: '2 Spalten', value: '2' },
        { label: '3 Spalten', value: '3' },
        { label: '4 Spalten', value: '4' },
      ],
    },
  ],
}
