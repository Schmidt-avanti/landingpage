import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import { getPayloadClient } from '@/payloadClient'
import { RenderBlocks } from '@/components/RenderBlocks'
import './styles.css'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayloadClient()
  const { user } = await payload.auth({ headers })

  const result = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'home',
      },
    },
  })
  const page = result.docs?.[0] || null

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
    <div className="home p-0 m-0 w-full min-h-screen">
      {page ? (
        <RenderBlocks layout={page.layout} />
      ) : (
        <div className="container mx-auto py-20 text-center">
            <h1 className="text-4xl font-bold mb-8">Welcome to Avanti</h1>
            <p className="mb-8">Please create a page with slug "home" in the admin panel.</p>
            <div className="links flex gap-4 justify-center">
                <a
                    className="admin px-6 py-3 bg-brand-darkblue text-white rounded-lg hover:bg-opacity-90"
                    href={payloadConfig.routes.admin}
                    target="_blank"
                >
                    Go to Admin Panel
                </a>
            </div>
        </div>
      )}
    </div>
  )
}
