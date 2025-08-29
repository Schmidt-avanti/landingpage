export default async function handler(request) {
  const STRAPI_URL = process.env.STRAPI_URL;
  const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

  if (!STRAPI_URL) {
    return new Response(JSON.stringify({ error: 'STRAPI_URL not configured' }), {
      status: 500,
      headers: { 'content-type': 'application/json' }
    });
  }

  const base = STRAPI_URL.replace(/\/$/, '');
  const url = `${base}/api/hero?populate=image`;

  try {
    const r = await fetch(url, {
      headers: {
        ...(STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {})
      }
    });

    const text = await r.text();

    // Try to parse and normalize media URLs
    try {
      const json = JSON.parse(text);
      const attr = json?.data?.attributes;
      const imgUrl = attr?.image?.data?.attributes?.url;
      if (imgUrl && typeof imgUrl === 'string' && !imgUrl.startsWith('http')) {
        json.data.attributes.image.data.attributes.url = base + imgUrl;
      }
      return new Response(JSON.stringify(json), {
        status: r.status,
        headers: { 'content-type': 'application/json' }
      });
    } catch {
      // Fallback: return raw upstream body
      return new Response(text, {
        status: r.status,
        headers: { 'content-type': 'application/json' }
      });
    }
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Upstream fetch failed', message: String(err) }), {
      status: 502,
      headers: { 'content-type': 'application/json' }
    });
  }
}
