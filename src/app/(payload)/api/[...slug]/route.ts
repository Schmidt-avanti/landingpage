/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import config from '@payload-config'
import '@payloadcms/next/css'
import {
  REST_DELETE,
  REST_GET,
  REST_OPTIONS,
  REST_PATCH,
  REST_POST,
  REST_PUT,
} from '@payloadcms/next/routes'

const getHandler = REST_GET(config)
const postHandler = REST_POST(config)
const deleteHandler = REST_DELETE(config)
const patchHandler = REST_PATCH(config)
const putHandler = REST_PUT(config)
const optionsHandler = REST_OPTIONS(config)

export const GET = getHandler
export const POST = postHandler
export const DELETE = deleteHandler
export const PUT = putHandler
export const OPTIONS = optionsHandler

export const PATCH: typeof patchHandler = async (...args) => {
  try {
    const req = args[0] as unknown as Request
    const reqUrl = typeof (req as any)?.url === 'string' ? (req as any).url : undefined
    const reqContentType = typeof (req as any)?.headers?.get === 'function' ? (req as any).headers.get('content-type') : undefined
    let reqBodyPreview: string | undefined
    try {
      if (req && typeof (req as any).clone === 'function') {
        const bodyText = await (req as any).clone().text()
        reqBodyPreview = bodyText.length > 2000 ? `${bodyText.slice(0, 2000)}…` : bodyText
      }
    } catch {
      // ignore
    }

    const res = await patchHandler(...args)

    if (res && typeof res.clone === 'function' && res.status >= 500) {
      try {
        const text = await res.clone().text()
        console.error('Payload REST PATCH returned 500', {
          status: res.status,
          url: reqUrl,
          contentType: reqContentType,
          requestBodyPreview: reqBodyPreview,
          body: text,
        })
      } catch {
        console.error('Payload REST PATCH returned 500 (failed to read body)', {
          status: res.status,
          url: reqUrl,
        })
      }
    }

    return res
  } catch (err) {
    console.error('Payload REST PATCH failed', err)
    throw err
  }
}
