export function usePageSeo(options: {
  title: string
  description: string
  path: string
  keywords?: string
}) {
  const { title, description, path, keywords } = options
  const { locale, locales } = useI18n()
  const config = useRuntimeConfig().public
  const siteUrl = (config.siteUrl as string) || 'https://artcorehub.org'
  const baseUrl = siteUrl.replace(/\/$/, '')

  const currentLocale = locale.value || 'it'
  const canonicalPath = path === '/' ? (currentLocale === 'it' ? '' : '/en') : (currentLocale === 'it' ? path : `/en${path}`)
  const canonical = `${baseUrl}${canonicalPath || '/'}`

  const localeList = (locales.value || locales) as { code: string; iso?: string }[]
  const link = [
    { rel: 'canonical' as const, href: canonical },
    ...localeList.map((loc) => {
      const segment = loc.code === 'it' ? (path === '/' ? '' : path) : `/en${path === '/' ? '' : path}`
      return {
        rel: 'alternate' as const,
        hreflang: loc.iso || loc.code,
        href: `${baseUrl}${segment || (loc.code === 'it' ? '/' : '/en')}`
      }
    })
  ]

  useHead({
    title,
    meta: [
      { name: 'description', content: description },
      ...(keywords ? [{ name: 'keywords', content: keywords }] : []),
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: canonical },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description }
    ],
    link
  })
}
