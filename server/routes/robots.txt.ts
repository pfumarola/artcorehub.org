export default defineEventHandler((event) => {
  const config = useRuntimeConfig()
  const siteUrl = (config.public.siteUrl as string) || 'https://artcorehub.org'
  const baseUrl = siteUrl.replace(/\/$/, '')

  const lines = [
    'User-agent: *',
    'Disallow: /coming-soon',
    'Disallow: /en/coming-soon',
    '',
    `Sitemap: ${baseUrl}/sitemap.xml`
  ]

  setHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  return lines.join('\n')
})
