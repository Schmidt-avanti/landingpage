import React from 'react'
import { Hero } from '@/blocks/Hero/Component'
import { ServiceGrid } from '@/components/ServiceGrid'
import { Testimonials } from '@/components/Testimonials'
import { LogoTickerComponent } from '@/blocks/LogoTicker/Component'
import { ContentSideBySideComponent } from '@/blocks/ContentSideBySide/Component'
import { VideoBlockComponent } from '@/blocks/VideoBlock/Component'
import { ContactFormComponent } from '@/blocks/ContactForm/Component'
import type { Page } from '@/payload-types'

const blockComponents: any = {
  hero: Hero,
  serviceGrid: ServiceGrid,
  testimonials: Testimonials,
  logoTicker: LogoTickerComponent,
  contentSideBySide: ContentSideBySideComponent,
  videoBlock: VideoBlockComponent,
  contactForm: ContactFormComponent,
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
              return (
                <section key={index} className="block-section">
                  <Block {...block} />
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
