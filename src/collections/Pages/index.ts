import type { CollectionConfig } from 'payload'
import { Hero } from '../../blocks/Hero/config'
import { ServiceGridBlock } from '../../blocks/ServiceGrid/config'
import { TestimonialsBlock } from '../../blocks/Testimonials/config'
import { LogoTicker } from '../../blocks/LogoTicker/config'
import { ContentSideBySide } from '../../blocks/ContentSideBySide/config'
import { VideoBlock } from '../../blocks/VideoBlock/config'
import { ContactForm } from '../../blocks/ContactForm/config'
import { AdditionalServicesBlock } from '../../blocks/AdditionalServices/config'
import { IndustriesGridBlock } from '../../blocks/IndustriesGrid/config'
import { FocusIndustriesGrid } from '../../blocks/FocusIndustriesGrid/config'
import { AdditionalIndustries } from '../../blocks/AdditionalIndustries/config'
import { PageHero } from '../../blocks/PageHero/config'
import { Accordion } from '../../blocks/Accordion/config'
import { RichTextContent } from '../../blocks/RichTextContent/config'
import { TextBlock } from '../../blocks/TextBlock/config'
import { PricingGrid } from '../../blocks/PricingGrid/config'
import { PricingAddons } from '../../blocks/PricingAddons/config'
import { BlogTeaser } from '../../blocks/BlogTeaser/config'
import { BlogPosts } from '../../blocks/BlogPosts/config'
import { ProcessSteps } from '../../blocks/ProcessSteps/config'
import { FlywheelDiagram } from '../../blocks/FlywheelDiagram/config'
import { StatsShowcase } from '../../blocks/StatsShowcase/config'

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
        PageHero,
        ServiceGridBlock,
        AdditionalServicesBlock,
        IndustriesGridBlock,
        FocusIndustriesGrid,
        AdditionalIndustries,
        TestimonialsBlock,
        LogoTicker,
        ContentSideBySide,
        VideoBlock,
        ContactForm,
        Accordion,
        RichTextContent,
        TextBlock,
        PricingGrid,
        PricingAddons,
        BlogTeaser,
        BlogPosts,
        ProcessSteps,
        FlywheelDiagram,
        StatsShowcase,
      ],
      required: true,
    },
  ],
}
