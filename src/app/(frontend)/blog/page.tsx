import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { RenderBlocks } from '@/components/RenderBlocks'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'blog' } },
    limit: 1,
  })
  const page = pages.docs[0]
  return {
    title: page?.title ? `${page.title} | Avanti` : 'Blog | Avanti',
  }
}

export default async function BlogPage() {
  const payload = await getPayload({ config: configPromise })

  // Load the "blog" page from Pages collection
  const pages = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'blog' } },
    limit: 1,
    depth: 3,
  })

  const page = pages.docs[0]
  if (!page) notFound()

  return <RenderBlocks layout={page.layout} />
}
