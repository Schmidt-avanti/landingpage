import React, { Suspense } from 'react'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ScrollToAnchor } from '@/components/ScrollToAnchor'
import './styles.css'

export const metadata = {
  description: 'Professioneller Kundenservice für Ihr Unternehmen',
  title: 'Avanti - Ihr Kundenservice Partner',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <>
      <Suspense fallback={null}>
        <ScrollToAnchor />
      </Suspense>
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </>
  )
}
