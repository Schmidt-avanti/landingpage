export default async function handler(request) {
  const STRAPI_URL = process.env.STRAPI_URL;
  const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

  const r = await fetch(`${STRAPI_URL}/api/about?populate=deep`, {
    headers: { Authorization: `Bearer ${STRAPI_TOKEN}` }
  });

  const body = await r.text();
  return new Response(body, {
    status: r.status,
    headers: { 'content-type': 'application/json' }
  });
}
