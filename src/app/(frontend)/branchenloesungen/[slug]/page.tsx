import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { getPayloadClient } from '@/payloadClient'
import type { Metadata } from 'next'
import {
  Check,
  Star,
  Zap,
  Shield,
  Phone,
  MessageSquare,
  Calendar,
  Clock,
  Users,
  Headset,
  // Neue Icons
  PhoneCall,
  Wrench,
  UserCheck,
  TrendingUp,
  RefreshCw,
  CreditCard,
  Gauge,
  Filter,
  ClipboardList,
  Database,
  PhoneForwarded,
  Smile,
} from 'lucide-react'

const benefitIconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Check,
  Star,
  Zap,
  Shield,
  Phone,
  MessageSquare,
  Calendar,
  Clock,
  Users,
  Headset,
  // Neue Icons
  PhoneCall,
  Wrench,
  UserCheck,
  TrendingUp,
  RefreshCw,
  CreditCard,
  Gauge,
  Filter,
  ClipboardList,
  Database,
  PhoneForwarded,
  Smile,
}

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayloadClient()

  const industries = await payload.find({
    collection: 'industries',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })

  const industry = industries.docs[0]
  if (!industry) return { title: 'Branche nicht gefunden' }

  return {
    title: industry.metaTitle || `${industry.title} | Branchenlösungen | Avanti`,
    description: industry.metaDescription || industry.description || '',
  }
}

export default async function IndustryDetailPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()

  const industries = await payload.find({
    collection: 'industries',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })

  const industry = industries.docs[0]
  if (!industry) notFound()

  const imageUrl =
    typeof industry.featuredImage === 'object' && industry.featuredImage?.url
      ? industry.featuredImage.url
      : null

  const benefits = industry.benefits || []

  return (
    <article className="bg-white min-h-screen">
      {/* Hero Image */}
      {imageUrl && (
        <div className="relative h-[40vh] md:h-[50vh] w-full">
          <Image src={imageUrl} alt={industry.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-darkblue/80 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className={`${imageUrl ? '-mt-32 relative z-10' : 'pt-16'} mb-12`}>
            <div className={`${imageUrl ? 'bg-white rounded-2xl p-8 shadow-xl' : ''}`}>
              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-darkblue mb-4">
                {industry.title}
              </h1>

              {/* Short Description */}
              {industry.description && (
                <p className="text-lg text-gray-600 leading-relaxed">{industry.description}</p>
              )}
            </div>
          </header>

          {/* Benefits Grid */}
          {benefits.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-brand-darkblue mb-8">
                Ihre Vorteile
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => {
                  const IconComponent = benefit.icon ? benefitIconMap[benefit.icon] : Check
                  return (
                    <div
                      key={index}
                      className="flex gap-4 p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300"
                    >
                      <div className="w-12 h-12 flex-shrink-0 bg-brand-orange/10 rounded-xl flex items-center justify-center">
                        {IconComponent && <IconComponent size={24} className="text-brand-orange" />}
                      </div>
                      <div>
                        <h3 className="font-bold text-brand-darkblue mb-1">{benefit.title}</h3>
                        {benefit.description && (
                          <p className="text-gray-600 text-sm">{benefit.description}</p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          )}

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-16">
            {industry.content && <RichText data={industry.content} />}
          </div>

          {/* CTA */}
          <div className="bg-brand-darkblue rounded-2xl p-8 md:p-12 text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Interesse geweckt?</h2>
            <p className="text-gray-300 mb-6 max-w-xl mx-auto">
              Erfahren Sie, wie wir auch Ihren Kundenservice in der Branche {industry.title} auf das
              nächste Level heben können.
            </p>
            <Link
              href="/#contact-form"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-brand-orange rounded-xl hover:bg-brand-orange/90 transition-colors"
            >
              Kontakt aufnehmen
            </Link>
          </div>

          {/* Back Link */}
          <div className="text-center pb-16">
            <Link
              href="/branchenloesungen"
              className="text-brand-turquoise hover:text-brand-turquoise/80 font-medium transition-colors"
            >
              ← Zurück zur Branchenübersicht
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
