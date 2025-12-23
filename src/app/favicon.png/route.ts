export function GET(req: Request) {
  const url = new URL('/icon.png', req.url)

  return Response.redirect(url, 307)
}
