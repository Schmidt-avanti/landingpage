import React from 'react'
import { Hero } from '@/blocks/Hero/Component'
import { ServiceGrid } from '@/components/ServiceGrid'
import { Testimonials } from '@/components/Testimonials'
import { LogoTickerComponent } from '@/blocks/LogoTicker/Component'
import { ContentSideBySideComponent } from '@/blocks/ContentSideBySide/Component'
import { VideoBlockComponent } from '@/blocks/VideoBlock/Component'
import { ContactFormComponent } from '@/blocks/ContactForm/Component'
import { PageHeroComponent } from '@/blocks/PageHero/Component'
import { AccordionComponent } from '@/blocks/Accordion/Component'
import { RichTextContentComponent } from '@/blocks/RichTextContent/Component'
import { TextBlockComponent } from '@/blocks/TextBlock/Component'
import { PricingGridComponent } from '@/blocks/PricingGrid/Component'
import { PricingAddonsComponent } from '@/blocks/PricingAddons/Component'
import { BlogTeaserComponent } from '@/blocks/BlogTeaser/Component'
import { BlogPostsComponent } from '@/blocks/BlogPosts/Component'
import type { Page } from '@/payload-types'
import { RevealOnScroll } from '@/components/RevealOnScroll'

import { AdditionalServices } from '@/blocks/AdditionalServices/Component'
import { IndustriesGrid } from '@/blocks/IndustriesGrid/Component'
import { FocusIndustriesGrid } from '@/blocks/FocusIndustriesGrid/Component'
import { AdditionalIndustries } from '@/blocks/AdditionalIndustries/Component'

const blockComponents: any = {
  hero: Hero,
  pageHero: PageHeroComponent,
  serviceGrid: ServiceGrid,
  additionalServices: AdditionalServices,
  industriesGrid: IndustriesGrid,
  focusIndustriesGrid: FocusIndustriesGrid,
  additionalIndustries: AdditionalIndustries,
  testimonials: Testimonials,
  logoTicker: LogoTickerComponent,
  contentSideBySide: ContentSideBySideComponent,
  videoBlock: VideoBlockComponent,
  contactForm: ContactFormComponent,
  accordion: AccordionComponent,
  richTextContent: RichTextContentComponent,
  textBlock: TextBlockComponent,
  pricingGrid: PricingGridComponent,
  pricingAddons: PricingAddonsComponent,
  blogTeaser: BlogTeaserComponent,
  blogPosts: BlogPostsComponent,
}

export const RenderBlocks: React.FC<{ layout: Page['layout'] }> = ({ layout }) => {
  const hasBlocks = layout && Array.isArray(layout) && layout.length > 0

  if (hasBlocks) {
    return (
      <>
        {layout.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]
            if (Block) {
              // Get anchorId from block settings for in-page navigation
              const anchorId = (block as any).settings?.anchorId || undefined
              return (
                <section key={index} id={anchorId} className="block-section">
                  {index === 0 ? (
                    <Block {...block} />
                  ) : (
                    <RevealOnScroll>
                      <Block {...block} />
                    </RevealOnScroll>
                  )}
                </section>
              )
            }
          }
          return null
        })}
      </>
    )
  }

  return null
}
