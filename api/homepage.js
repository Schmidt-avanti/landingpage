export default async function handler(request) {
  const STRAPI_URL = process.env.STRAPI_URL;      // e.g. https://<your-app>.strapiapp.com
  const STRAPI_TOKEN = process.env.STRAPI_TOKEN;  // read-only token from Strapi (Settings → API Tokens)

  const r = await fetch(`${STRAPI_URL}/api/homepage?populate=deep`, {
    headers: { Authorization: `Bearer ${STRAPI_TOKEN}` }
  });

  const body = await r.text();
  return new Response(body, {
    status: r.status,
    headers: { 'content-type': 'application/json' }
  });
}
