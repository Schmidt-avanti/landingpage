import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-3xl font-bold">Seite nicht gefunden</h1>
        <p className="mt-3 text-gray-600">Die angeforderte Seite existiert nicht (mehr).</p>
        <div className="mt-6">
          <Link href="/" className="underline">
            Zur Startseite
          </Link>
        </div>
      </div>
    </main>
  )
}
