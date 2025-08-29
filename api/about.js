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
  const url = `${base}/api/about?populate=deep`;

  try {
    const r = await fetch(url, {
      headers: {
        ...(STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {})
      }
    });

    const text = await r.text();

    // Recursively prefix relative media URLs with absolute base
    const prefixMedia = (obj) => {
      if (!obj || typeof obj !== 'object') return;
      for (const k of Object.keys(obj)) {
        const v = obj[k];
        if (k === 'url' && typeof v === 'string' && v.startsWith('/')) {
          obj[k] = base + v;
        } else if (v && typeof v === 'object') {
          prefixMedia(v);
        }
      }
    };

    try {
      const json = JSON.parse(text);
      prefixMedia(json);
      return new Response(JSON.stringify(json), {
        status: r.status,
        headers: { 'content-type': 'application/json' }
      });
    } catch {
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
