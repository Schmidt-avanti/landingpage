import { notFound } from 'next/navigation'
import { RenderBlocks } from '@/components/RenderBlocks'
import { getPayloadClient } from '@/payloadClient'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayloadClient()
  const pages = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'branchenloesungen' } },
    limit: 1,
  })
  const page = pages.docs[0]
  return {
    title: page?.title ? `${page.title} | Avanti` : 'Branchenlösungen | Avanti',
  }
}

export default async function BranchenloesungenPage() {
  const payload = await getPayloadClient()

  // Load the "branchenloesungen" page from Pages collection
  const pages = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'branchenloesungen' } },
    limit: 1,
    depth: 3,
  })

  const page = pages.docs[0]
  if (!page) notFound()

  return <RenderBlocks layout={page.layout} />
}
