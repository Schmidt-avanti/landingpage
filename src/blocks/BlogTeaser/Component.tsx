import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

type BlogTeaserProps = {
  headline?: string | null
  subheadline?: string | null
  postsCount?: number | null
  ctaText?: string | null
  ctaLinkType?: 'page' | 'anchor' | null
  ctaLink?: string | null
  ctaAnchor?: string | null
  settings?: {
    theme?: 'light' | 'dark' | null
  } | null
}

export const BlogTeaserComponent: React.FC<BlogTeaserProps> = async ({
  headline,
  subheadline,
  postsCount = 4,
  ctaText,
  ctaLinkType,
  ctaLink,
  ctaAnchor,
  settings,
}) => {
  const theme = settings?.theme || 'dark'
  const isDark = theme === 'dark'

  // Fetch latest posts
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    sort: '-publishedAt',
    limit: postsCount || 4,
    depth: 2,
  })

  // Build CTA href
  const ctaHref = ctaLinkType === 'anchor' && ctaAnchor ? `/#${ctaAnchor}` : ctaLink || '/blog'

  if (posts.docs.length === 0) {
    return null // Don't render if no posts
  }

  return (
    <section className={`py-16 md:py-24 ${isDark ? 'bg-brand-darkblue' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          {headline && (
            <h2
              className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-brand-darkblue'}`}
            >
              {headline}
            </h2>
          )}
          {subheadline && (
            <p
              className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
            >
              {subheadline}
            </p>
          )}
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {posts.docs.map((post: any) => {
            const imageUrl =
              typeof post.featuredImage === 'object' && post.featuredImage?.url
                ? post.featuredImage.url
                : null
            const publishedDate = post.publishedAt
              ? new Date(post.publishedAt).toLocaleDateString('de-DE', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })
              : null

            return (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className={`group block rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 ${
                  isDark
                    ? 'bg-white/5 border border-white/10 hover:border-brand-turquoise/50'
                    : 'bg-white border border-gray-200 hover:border-brand-turquoise'
                }`}
              >
                {/* Image */}
                {imageUrl && (
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="p-5">
                  {/* Date */}
                  {publishedDate && (
                    <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {publishedDate}
                    </span>
                  )}

                  {/* Title */}
                  <h3
                    className={`font-bold mt-2 line-clamp-2 group-hover:text-brand-turquoise transition-colors ${
                      isDark ? 'text-white' : 'text-brand-darkblue'
                    }`}
                  >
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  {post.excerpt && (
                    <p
                      className={`text-sm mt-2 line-clamp-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                    >
                      {post.excerpt}
                    </p>
                  )}
                </div>
              </Link>
            )
          })}
        </div>

        {/* CTA */}
        {ctaText && (
          <div className="text-center">
            <Link
              href={ctaHref}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-300 bg-brand-orange rounded-xl hover:bg-brand-orange/90 hover:scale-105 shadow-lg shadow-brand-orange/20"
            >
              {ctaText}
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
