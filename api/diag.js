export default function handler(req, res){
  res.status(200).json({
    hasUrl: !!process.env.STRAPI_URL,
    urlLooksHttps: (process.env.STRAPI_URL || '').startsWith('https://'),
    hasToken: !!process.env.STRAPI_TOKEN
  });
}
