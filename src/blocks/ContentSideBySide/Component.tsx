import type { Page } from '@/payload-types'
import { Media } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { RichText } from '@payloadcms/richtext-lexical/react'

type ContentSideBySideType = Extract<Page['layout'][number], { blockType: 'contentSideBySide' }>

export const ContentSideBySideComponent: React.FC<ContentSideBySideType> = ({
  headline,
  content,
  image,
  imagePosition,
  ctaText,
  ctaLink,
  authorName,
  authorRole,
}) => {
  const isImageRight = imagePosition === 'right'
  const img = image as Media

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className={`flex flex-col lg:flex-row items-center gap-16 ${isImageRight ? '' : 'lg:flex-row-reverse'}`}>
          
          {/* Text Content */}
          <div className="flex-1 space-y-6">
            {headline && <h2 className="text-3xl md:text-4xl font-bold text-brand-darkblue leading-tight">{headline}</h2>}
            
            <div className="prose prose-lg text-gray-600">
               <RichText data={content} />
            </div>

            {/* Quote details if present */}
            {(authorName || authorRole) && (
               <div className="border-l-4 border-brand-turquoise pl-4 mt-6">
                  {authorName && <div className="font-bold text-brand-darkblue">{authorName}</div>}
                  {authorRole && <div className="text-sm text-gray-500">{authorRole}</div>}
               </div>
            )}

            {ctaText && ctaLink && (
              <div className="pt-4">
                <Link href={ctaLink} className="inline-flex items-center justify-center px-8 py-3 bg-brand-turquoise text-white font-semibold rounded-full hover:bg-opacity-90 transition-all shadow-md hover:shadow-lg">
                  {ctaText}
                </Link>
              </div>
            )}
          </div>

          {/* Image */}
          <div className="flex-1 w-full relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            {img?.url && (
                <Image
                    src={img.url}
                    alt={img.alt || headline || 'Image'}
                    fill
                    className="object-cover"
                />
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
