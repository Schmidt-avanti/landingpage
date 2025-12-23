import { notFound } from 'next/navigation'
import React from 'react'

import { getPayloadClient } from '@/payloadClient'
import { RenderBlocks } from '@/components/RenderBlocks'

type Props = {
  params: Promise<{ slug: string }>
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const page = result.docs?.[0] || null

  if (!page) {
    notFound()
  }

  return (
    <div className="dynamic-page w-full min-h-screen">
      <RenderBlocks layout={page.layout} />
    </div>
  )
}

// Generate static params for known pages
export async function generateStaticParams() {
  const payload = await getPayloadClient()

  const pages = await payload.find({
    collection: 'pages',
    limit: 100,
    where: {
      slug: {
        not_equals: 'home',
      },
    },
  })

  return pages.docs.map((page) => ({
    slug: page.slug,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const page = result.docs?.[0]

  return {
    title: page?.title || 'Page',
  }
}
