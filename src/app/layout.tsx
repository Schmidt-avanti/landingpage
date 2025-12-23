import type { Metadata } from 'next'

import './(frontend)/styles.css'

export const metadata: Metadata = {
  description: 'Professioneller Kundenservice für Ihr Unternehmen',
  title: 'Avanti - Ihr Kundenservice Partner',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className="flex flex-col min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
