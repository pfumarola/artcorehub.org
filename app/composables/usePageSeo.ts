const DEFAULT_OG_IMAGE = '/images/og-default.webp'
const DEFAULT_OG_IMAGE_WIDTH = 1200
const DEFAULT_OG_IMAGE_HEIGHT = 630

const LOCALE_TO_OG: Record<string, string> = {
  it: 'it_IT',
  en: 'en_US'
}

export function usePageSeo(options: {
  title: string
  description: string
  path: string
  keywords?: string
  image?: string
  imageWidth?: number
  imageHeight?: number
}) {
  const {
    title,
    description,
    path,
    keywords,
    image = DEFAULT_OG_IMAGE,
    imageWidth = DEFAULT_OG_IMAGE_WIDTH,
    imageHeight = DEFAULT_OG_IMAGE_HEIGHT
  } = options
  const { locale, locales } = useI18n()
  const config = useRuntimeConfig().public
  const siteUrl = (config.siteUrl as string) || 'https://artcorehub.org'
  const baseUrl = siteUrl.replace(/\/$/, '')

  const currentLocale = locale.value || 'it'
  const canonicalPath =
    path === '/' ? (currentLocale === 'it' ? '' : '/en') : currentLocale === 'it' ? path : `/en${path}`
  const canonical = `${baseUrl}${canonicalPath || '/'}`

  const imagePath = image.startsWith('http') ? image : `${baseUrl}${image.startsWith('/') ? image : `/${image}`}`

  const rawLocales = unref(locales) as unknown
  const localeList = Array.isArray(rawLocales)
    ? (rawLocales as { code: string; iso?: string }[])
    : []
  const defaultLocalePath = path === '/' ? '' : path
  const defaultLocaleUrl = `${baseUrl}${defaultLocalePath || '/'}`

  const link = [
    { rel: 'canonical' as const, href: canonical },
    { rel: 'alternate' as const, hreflang: 'x-default', href: defaultLocaleUrl },
    ...localeList.map((loc) => {
      const segment =
        loc.code === 'it' ? (path === '/' ? '' : path) : `/en${path === '/' ? '' : path}`
      return {
        rel: 'alternate' as const,
        hreflang: loc.iso || loc.code,
        href: `${baseUrl}${segment || (loc.code === 'it' ? '/' : '/en')}`
      }
    })
  ]

  const ogLocale = LOCALE_TO_OG[currentLocale] || 'it_IT'
  const ogLocaleAlternate = currentLocale === 'it' ? 'en_US' : 'it_IT'

  useHead({
    title,
    meta: [
      { name: 'description', content: description },
      ...(keywords ? [{ name: 'keywords', content: keywords }] : []),
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: canonical },
      { property: 'og:image', content: imagePath },
      { property: 'og:image:width', content: String(imageWidth) },
      { property: 'og:image:height', content: String(imageHeight) },
      { property: 'og:locale', content: ogLocale },
      { property: 'og:locale:alternate', content: ogLocaleAlternate },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: imagePath }
    ],
    link
  })
}
