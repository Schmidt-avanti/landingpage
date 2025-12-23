import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { getPayloadClient } from '@/payloadClient'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayloadClient()

  const posts = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })

  const post = posts.docs[0]
  if (!post) return { title: 'Artikel nicht gefunden' }

  return {
    title: post.metaTitle || `${post.title} | Avanti Blog`,
    description: post.metaDescription || post.excerpt || '',
  }
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()

  const posts = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })

  const post = posts.docs[0]
  if (!post) notFound()

  const imageUrl =
    typeof post.featuredImage === 'object' && post.featuredImage?.url
      ? post.featuredImage.url
      : null
  const authorName =
    typeof post.author === 'object' && post.author?.name ? post.author.name : 'Unbekannt'
  const authorImageUrl =
    typeof post.author === 'object' &&
    typeof post.author?.image === 'object' &&
    post.author?.image?.url
      ? post.author.image.url
      : null
  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('de-DE', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    : null

  return (
    <article className="bg-white min-h-screen">
      {/* Hero Image */}
      {imageUrl && (
        <div className="relative h-[40vh] md:h-[50vh] w-full">
          <Image src={imageUrl} alt={post.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-darkblue/80 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className={`${imageUrl ? '-mt-32 relative z-10' : 'pt-16'} mb-12`}>
            <div className={`${imageUrl ? 'bg-white rounded-2xl p-8 shadow-xl' : ''}`}>
              {/* Meta */}
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                {publishedDate && <span>{publishedDate}</span>}
                {post.readingTime && (
                  <>
                    <span>•</span>
                    <span>{post.readingTime} Min. Lesezeit</span>
                  </>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-darkblue mb-6">
                {post.title}
              </h1>

              {/* Author */}
              <div className="flex items-center gap-3">
                {authorImageUrl && (
                  <Image
                    src={authorImageUrl}
                    alt={authorName}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                )}
                <div>
                  <span className="block font-medium text-brand-darkblue">{authorName}</span>
                  <span className="text-sm text-gray-500">Autor</span>
                </div>
              </div>
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-16">
            {post.content && <RichText data={post.content} />}
          </div>

          {/* CTA */}
          <div className="bg-brand-darkblue rounded-2xl p-8 md:p-12 text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Interesse geweckt?</h2>
            <p className="text-gray-300 mb-6 max-w-xl mx-auto">
              Erfahren Sie, wie wir auch Ihren Kundenservice auf das nächste Level heben können.
            </p>
            <Link
              href="/#contact-form"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-brand-orange rounded-xl hover:bg-brand-orange/90 transition-colors"
            >
              Kontakt aufnehmen
            </Link>
          </div>

          {/* Back Link */}
          <div className="text-center pb-16">
            <Link
              href="/blog"
              className="text-brand-turquoise hover:text-brand-turquoise/80 font-medium transition-colors"
            >
              ← Zurück zur Blog-Übersicht
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
