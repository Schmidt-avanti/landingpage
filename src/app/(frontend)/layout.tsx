import React from 'react'
import './styles.css'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const metadata = {
  description: 'Professioneller Kundenservice für Ihr Unternehmen',
  title: 'Avanti - Ihr Kundenservice Partner',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="de">
      <body className="flex flex-col min-h-screen" suppressHydrationWarning>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
