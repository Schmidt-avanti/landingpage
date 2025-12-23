import 'server-only'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Payload } from 'payload'

declare global {
  var __payloadClientPromise: Promise<Payload> | undefined
}

export const getPayloadClient = async (): Promise<Payload> => {
  if (!globalThis.__payloadClientPromise) {
    globalThis.__payloadClientPromise = getPayload({ config: configPromise })
  }

  return globalThis.__payloadClientPromise
}
