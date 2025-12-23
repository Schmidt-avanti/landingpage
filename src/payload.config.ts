import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { resendAdapter } from '@payloadcms/email-resend'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'

import { Pages } from './collections/Pages'
import { Services } from './collections/Services'
import { Testimonials } from './collections/Testimonials'
import { FormSubmissions } from './collections/FormSubmissions'
import { Industries } from './collections/Industries'
import { Authors } from './collections/Authors'
import { Posts } from './collections/Posts'

import { s3Storage } from '@payloadcms/storage-s3'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const hasSMTP = Boolean(process.env.SMTP_HOST)
const hasResend = Boolean(process.env.RESEND_API_KEY)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  email: hasSMTP
    ? nodemailerAdapter({
        defaultFromAddress: process.env.SMTP_FROM_ADDRESS || 'no-reply@example.com',
        defaultFromName: process.env.SMTP_FROM_NAME || 'Avanti',
        transportOptions: {
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
          secure: process.env.SMTP_SECURE === 'true',
          auth:
            process.env.SMTP_USER && process.env.SMTP_PASS
              ? {
                  user: process.env.SMTP_USER,
                  pass: process.env.SMTP_PASS,
                }
              : undefined,
        },
      })
    : hasResend
      ? resendAdapter({
          defaultFromAddress: process.env.EMAIL_FROM_ADDRESS || 'no-reply@example.com',
          defaultFromName: process.env.EMAIL_FROM_NAME || 'Avanti',
          apiKey: process.env.RESEND_API_KEY || '',
        })
      : undefined,
  collections: [
    Users,
    Media,
    Pages,
    Services,
    Testimonials,
    FormSubmissions,
    Industries,
    Authors,
    Posts,
  ],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
      max: Number(process.env.PG_POOL_MAX ?? (process.env.VERCEL ? 1 : 5)),
      idleTimeoutMillis: Number(process.env.PG_IDLE_TIMEOUT_MS ?? 30_000),
      connectionTimeoutMillis: Number(process.env.PG_CONN_TIMEOUT_MS ?? 30_000),
    },
    push: false,
    migrationDir: path.resolve(dirname, 'migrations'),
  }),
  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET || '',
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        region: process.env.S3_REGION || '',
        endpoint: process.env.S3_ENDPOINT || '',
        forcePathStyle: true,
      },
    }),
  ],
  sharp,
})
