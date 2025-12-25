import { notFound } from 'next/navigation'
import React from 'react'

import { getPayloadClient } from '@/payloadClient'
import { RenderBlocks } from '@/components/RenderBlocks'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ slug: string }>
}

export default async function DynamicPage({ params }: Props) {
  try {
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
  } catch (error) {
    console.error('Error loading page:', error)
    notFound()
  }
}

// Generate static params for known pages
export async function generateStaticParams() {
  return []
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props) {
  try {
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
  } catch {
    return {
      title: 'Page',
    }
  }
}
