import type { Metadata } from 'next'

import './(frontend)/styles.css'

export const metadata: Metadata = {
  description: 'avanti | Professioneller Kundenservice auch für Ihr Unternehmen',
  title: 'Mach doch mal avanti',
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
