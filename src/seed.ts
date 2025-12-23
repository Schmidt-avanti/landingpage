import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const envPath = path.resolve(dirname, '../.env')

console.log('Loading .env from:', envPath)
const result = dotenv.config({ path: envPath })

if (result.error) {
  console.error('Error loading .env:', result.error)
}

console.log('PAYLOAD_SECRET:', process.env.PAYLOAD_SECRET ? '***loaded***' : 'MISSING')
console.log('DATABASE_URL:', process.env.DATABASE_URL ? '***loaded***' : 'MISSING')

import { getPayload } from 'payload'

const seed = async () => {
  // Dynamically import config after dotenv to ensure env vars are loaded
  const { default: config } = await import('./payload.config')
  const payload = await getPayload({ config })

  console.log('🌱 Seeding database...')

  // --- 1. Services ---
  console.log('Creating Services...')
  const services = [
    {
      title: 'Beantworten von Anfragen',
      description:
        'Wir bei avanti übernehmen Anrufe und E-Mails für Sie: exakt nach Ihren Vorgaben, professionell und kostengünstig. Von Sekretariatsservice bis Leadqualifizierung.',
      type: 'main',
    },
    {
      title: 'Weiterleiten von Wichtigem',
      description:
        'Wir leiten dringende oder geschäftskritische Anfragen sofort an Sie weiter. So bleiben Sie informiert, ohne ständig erreichbar sein zu müssen.',
      type: 'main',
    },
    {
      title: 'Bestellannahme',
      description:
        'Wir erfassen Bestellungen auch in Ihrem Buchungssystem. Auf Wunsch erstellen wir Gesprächsleitfäden, die die Conversion erhöhen.',
      type: 'main',
    },
    {
      title: 'Rückrufe und Nachfasskontakte',
      description:
        'Wir setzen da an, wo andere aufhören. avanti übernimmt Rückrufe und Nachfasskontakte, um zu gewährleisten, dass kein Anliegen unberücksichtigt bleibt.',
      type: 'main',
    },
    {
      title: 'Termine vereinbaren',
      description:
        'Wir übernehmen die Terminvereinbarung und koordinieren Ihre Gesprächsanfragen. So können Sie sich voll und ganz auf Ihr Business konzentrieren.',
      type: 'main',
    },
    {
      title: 'Outbound (Leadqualifizierung)',
      description:
        'Wir qualifizieren Leads und machen Follow-ups. Für die Neukundenakquise unterbreiten wir Ihnen ein separates Angebot.',
      type: 'main',
    },
    {
      title: 'Schriftbearbeitung',
      description:
        'Neben der Telefonannahme beantworten und bearbeiten wir auch E-Mails, Chats und Anfragen über weitere schriftliche Kommunikationskanäle.',
      type: 'additional',
    },
    {
      title: 'Backoffice-Tätigkeiten',
      description:
        'Datenbanken bereinigen, Nachforschungen anstellen, E-Mail-Eingänge sortieren, Systeme bedienen – wir nehmen Ihnen eine Menge Arbeit ab.',
      type: 'additional',
    },
  ]

  for (const service of services) {
    // Check if exists to avoid duplicates
    const existing = await payload.find({
      collection: 'services',
      where: { title: { equals: service.title } },
    })

    if (existing.totalDocs === 0) {
      await payload.create({
        collection: 'services',
        data: service as any,
      })
    }
  }

  // --- 2. Testimonials ---
  console.log('Creating Testimonials...')
  const testimonials = [
    {
      name: 'Jan Pucko',
      company: 'JANtronic GmbH',
      quote: 'Mit avanti gewinnen wir zuverlässig qualifizierte Leads.',
      rating: 5,
    },
    {
      name: 'Heiko Nürnberg',
      company: 'Nürnberg Immobilien GmbH',
      quote:
        'avanti hat es uns ermöglicht, dass wir jetzt viel mehr Mieteranfragen direkt am Telefon lösen.',
      rating: 5,
    },
    {
      name: 'Eberhard Zeidler',
      company: 'ZEIDLER GLAS + FENSTER GmbH',
      quote:
        'Dank avanti haben wir mehr Zeit für unsere Kunden und bieten dabei konstant erstklassigen Service.',
      rating: 5,
    },
  ]

  for (const testimonial of testimonials) {
    const existing = await payload.find({
      collection: 'testimonials',
      where: { name: { equals: testimonial.name } },
    })
    if (existing.totalDocs === 0) {
      await payload.create({
        collection: 'testimonials',
        data: testimonial as any,
      })
    }
  }

  // --- 3. Assets ---
  console.log('Creating Placeholder Assets...')
  let placeholderImageID: number | undefined
  try {
    // Use one of the uploaded artifact images as placeholder
    const placeholderPath =
      '/Users/matthiasgawlich/.gemini/antigravity/brain/dc41c41c-cf3c-4d1e-a953-156ee2fa926b/uploaded_image_0_1766333264502.png'
    const media = await payload.create({
      collection: 'media',
      data: {
        alt: 'Placeholder Asset',
      },
      filePath: placeholderPath,
    })
    placeholderImageID = media.id as number
    console.log('Created placeholder media:', media.id)
  } catch (e) {
    console.warn(
      'Could not create placeholder media (file might be missing), continuing without images.',
      e,
    )
  }

  // --- 4. Home Page ---
  console.log('Creating Home Page...')
  try {
    const homePage = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'home' } },
    })

    const mainServices = await payload.find({
      collection: 'services',
      where: {
        type: {
          equals: 'main',
        },
      },
      depth: 0,
      limit: 12,
    })
    const mainServiceIDs = mainServices.docs.map((s) => s.id)

    const richTextPlaceholder = {
      root: {
        children: [
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Wir kümmern uns mit Herz und Verstand um Ihre Kunden: Sie sollen sich genauso gut wie von Ihnen betreut fühlen.',
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'paragraph',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'root',
        version: 1,
      },
    } as any

    const richTextSuite = {
      root: {
        children: [
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Die avanti-Kundenservice-Plattform unterstützt durch eine integrierte Wissensdatenbank, die Ihre Vorgaben enthält. Über Schnittstellen lassen sich Ihre Systeme anbinden.',
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'paragraph',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'root',
        version: 1,
      },
    } as any

    const homeLayout = [
      {
        blockType: 'hero' as const,
        headline: 'Wir entlasten Sie bei Ihrem Kundenservice',
        badgeText: '100% menschlicher Kundenservice',
        subheadline:
          'avanti übernimmt alle Routineaufgaben bei Ihrer telefonischen und schriftlichen Kundenbetreuung. Menschlich, effizient, professionell. So können Sie sich auf das Wesentliche konzentrieren: die Entwicklung Ihres Geschäfts.',
        ctaText: 'Erstgespräch anfragen',
        ctaLinkType: 'anchor' as const,
        ctaAnchor: 'contact-form' as const,
        bentoCards: [
          {
            cardType: 'image' as const,
            cardSize: 'large' as const,
            image: placeholderImageID,
            cardTitle: 'Team avanti',
          },
          {
            cardType: 'stat' as const,
            cardSize: 'medium' as const,
            statValue: '4.500+',
            statLabel: 'Anfragen bearbeitet',
          },
          {
            cardType: 'screenshot' as const,
            cardSize: 'medium' as const,
            image: placeholderImageID,
            cardTitle: 'Suite',
          },
        ],
      },
      {
        blockType: 'logoTicker' as const,
        logos: placeholderImageID
          ? Array(6).fill({ logo: placeholderImageID, name: 'Client Logo' })
          : [],
        speed: 'normal' as const,
      },
      {
        blockType: 'serviceGrid' as const,
        settings: {
          anchorId: 'services' as const,
        },
        title: 'Unsere Leistungen',
        introduction:
          'Maßgeschneiderte Lösungen für Ihren Kundenservice – skalierbar, professionell und persönlich.',
        services: mainServiceIDs,
      },
      {
        blockType: 'contentSideBySide' as const,
        headline: 'Unsere Geschäftsführerin',
        content: richTextPlaceholder,
        image: placeholderImageID as number,
        imagePosition: 'right' as const,
        authorName: 'Maribel Pietzner',
        authorRole: 'Geschäftsführerin avanti',
      },
      {
        blockType: 'videoBlock' as const,
        headline: 'Wie funktioniert avanti?',
        subheadline: 'Für mehr Information Video ansehen',
        videoFile: placeholderImageID as number,
        thumbnail: placeholderImageID as number,
      },
      {
        blockType: 'contentSideBySide' as const,
        headline: 'Die avanti-Kundenservice-Plattform',
        content: richTextSuite,
        image: placeholderImageID as number,
        imagePosition: 'left' as const,
        ctaText: 'Mehr erfahren',
        ctaLinkType: 'anchor' as const,
        ctaAnchor: 'suite' as const,
        ctaLink: '/suite',
      },
      {
        blockType: 'testimonials' as const,
        settings: {
          anchorId: 'testimonials' as const,
        },
        title: 'Ergebnisse, die für sich sprechen',
        subtitle: 'Kundenstimmen',
      },
      {
        blockType: 'contactForm' as const,
        settings: {
          anchorId: 'contact-form' as const,
        },
        headline: 'Kontaktieren Sie uns',
        emailTo: 'info@avanti.cx',
      },
    ]

    if (homePage.totalDocs > 0) {
      // Update existing
      await payload.update({
        collection: 'pages',
        id: homePage.docs[0].id,
        data: {
          layout: homeLayout,
        },
      })
      console.log('Updated existing Home page.')
    } else {
      // Create new
      await payload.create({
        collection: 'pages',
        data: {
          title: 'Home',
          slug: 'home',
          layout: homeLayout,
        },
      })
      console.log('Created new Home page.')
    }
  } catch (e) {
    console.error('Error creating Home page:', e)
  }

  console.log('✅ Seeding complete!')
  process.exit(0)
}

seed()
