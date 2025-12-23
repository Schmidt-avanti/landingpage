import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getPayloadClient } from '@/payloadClient'

type BlogPostsProps = {
  postsPerPage?: number | null
  columns?: '2' | '3' | '4' | null
  settings?: {
    theme?: 'light' | 'dark' | null
  } | null
}

export const BlogPostsComponent: React.FC<BlogPostsProps> = async ({
  postsPerPage = 9,
  columns = '3',
  settings,
}) => {
  const theme = settings?.theme || 'light'
  const isDark = theme === 'dark'

  const payload = await getPayloadClient()
  const posts = await payload.find({
    collection: 'posts',
    sort: '-publishedAt',
    limit: postsPerPage || 9,
    depth: 2,
  })

  const columnClasses = {
    '2': 'md:grid-cols-2',
    '3': 'md:grid-cols-2 lg:grid-cols-3',
    '4': 'md:grid-cols-2 lg:grid-cols-4',
  }

  if (posts.docs.length === 0) {
    return (
      <section className={`py-16 ${isDark ? 'bg-brand-darkblue' : 'bg-white'}`}>
        <div className="container mx-auto px-4 text-center">
          <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>
            Noch keine Beiträge vorhanden.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className={`py-16 md:py-24 ${isDark ? 'bg-brand-darkblue' : 'bg-white'}`}>
      <div className="container mx-auto px-4">
        <div className={`grid grid-cols-1 ${columnClasses[columns || '3']} gap-8`}>
          {posts.docs.map((post: any) => {
            const imageUrl =
              typeof post.featuredImage === 'object' && post.featuredImage?.url
                ? post.featuredImage.url
                : null
            const authorName =
              typeof post.author === 'object' && post.author?.name ? post.author.name : 'Unbekannt'
            const publishedDate = post.publishedAt
              ? new Date(post.publishedAt).toLocaleDateString('de-DE', {
                  day: '2-digit',
                  month: 'long',
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
                    : 'bg-white border border-gray-100 hover:border-brand-turquoise hover:shadow-xl'
                }`}
              >
                {/* Image */}
                {imageUrl && (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  {/* Meta */}
                  <div
                    className={`flex items-center gap-3 text-sm mb-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
                  >
                    {publishedDate && <span>{publishedDate}</span>}
                    {post.readingTime && (
                      <>
                        <span>•</span>
                        <span>{post.readingTime} Min.</span>
                      </>
                    )}
                  </div>

                  {/* Title */}
                  <h2
                    className={`text-xl font-bold mb-3 group-hover:text-brand-turquoise transition-colors ${
                      isDark ? 'text-white' : 'text-brand-darkblue'
                    }`}
                  >
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  {post.excerpt && (
                    <p className={`line-clamp-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {post.excerpt}
                    </p>
                  )}

                  {/* Author */}
                  <div
                    className={`mt-4 pt-4 border-t ${isDark ? 'border-white/10' : 'border-gray-100'}`}
                  >
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      von {authorName}
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
