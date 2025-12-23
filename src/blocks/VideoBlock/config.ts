import type { Block } from 'payload'
import { blockSettings } from '@/fields/blockSettings'

export const VideoBlock: Block = {
  slug: 'videoBlock',
  fields: [
    blockSettings,
    {
      name: 'headline',
      type: 'text',
      label: 'Headline',
    },
    {
      name: 'subheadline',
      type: 'text',
      label: 'Subheadline/Link Text',
    },
    {
      name: 'videoFile',
      type: 'upload',
      relationTo: 'media',
      label: 'Video File',
      required: true,
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      label: 'Video Thumbnail',
    },
  ],
}
