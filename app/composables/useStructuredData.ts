export function useOrganizationAndWebSite() {
  const config = useRuntimeConfig().public
  const siteUrl = (config.siteUrl as string) || 'https://artcorehub.org'
  const baseUrl = siteUrl.replace(/\/$/, '')
  const instagramUrl = (config.instagramUrl as string) || ''

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ARTCORE HUB',
    url: baseUrl,
    logo: `${baseUrl}/images/logo.webp`,
    ...(instagramUrl ? { sameAs: [instagramUrl] } : {})
  }

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ARTCORE HUB',
    url: baseUrl,
    inLanguage: ['it', 'en']
  }

  useHead({
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(organization)
      },
      {
        type: 'application/ld+json',
        children: JSON.stringify(website)
      }
    ]
  })
}

export function useBreadcrumbStructuredData(items: { name: string; path: string }[]) {
  const config = useRuntimeConfig().public
  const siteUrl = (config.siteUrl as string) || 'https://artcorehub.org'
  const baseUrl = siteUrl.replace(/\/$/, '')

  const list = items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `${baseUrl}${item.path.startsWith('/') ? item.path : `/${item.path}`}`
  }))

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: list
  }

  useHead({
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(breadcrumb)
      }
    ]
  })
}
