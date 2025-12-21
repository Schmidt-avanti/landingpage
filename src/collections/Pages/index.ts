import type { CollectionConfig } from 'payload'
import { Hero } from '../../blocks/Hero/config'
import { ServiceGridBlock } from '../../blocks/ServiceGrid/config'
import { TestimonialsBlock } from '../../blocks/Testimonials/config'
import { LogoTicker } from '../../blocks/LogoTicker/config'
import { ContentSideBySide } from '../../blocks/ContentSideBySide/config'
import { VideoBlock } from '../../blocks/VideoBlock/config'
import { ContactForm } from '../../blocks/ContactForm/config'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      index: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        Hero,
        ServiceGridBlock,
        TestimonialsBlock,
        LogoTicker,
        ContentSideBySide,
        VideoBlock,
        ContactForm,
      ],
      required: true,
    },
  ],
}
