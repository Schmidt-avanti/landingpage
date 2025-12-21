import type { Block } from 'payload'

export const VideoBlock: Block = {
  slug: 'videoBlock',
  fields: [
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
      name: 'videoUrl',
      type: 'text',
      label: 'Video URL (YouTube/Vimeo/mp4)',
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
