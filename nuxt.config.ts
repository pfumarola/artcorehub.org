// https://nuxt.com/docs/api/configuration/nuxt-config

/** Base path con slash iniziale e finale (es. `/artcorehub.org/` per GitHub Pages progetto). */
function appBaseURLFromEnv(): string {
  const raw = process.env.NUXT_APP_BASE_URL?.trim()
  if (!raw || raw === '/') return '/'
  const withLead = raw.startsWith('/') ? raw : `/${raw}`
  return withLead.endsWith('/') ? withLead : `${withLead}/`
}

/** URL pubblico deploy (senza slash finale): canonical, sitemap, runtimeConfig. */
const publicSiteUrl = (process.env.NUXT_PUBLIC_SITE_URL || 'https://artcorehub.org').replace(/\/$/, '')

/** Solo origin (senza path): richiesto da @nuxtjs/i18n + Site Config quando il sito ha app.baseURL su sottopath. */
const i18nSeoOrigin = (() => {
  try {
    return new URL(publicSiteUrl).origin
  } catch {
    return publicSiteUrl
  }
})()

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  app: {
    // GitHub Pages (progetto): NUXT_APP_BASE_URL in CI — vedi workflow.
    baseURL: appBaseURLFromEnv(),
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
      titleTemplate: '%s'
    }
  },

  css: ['~/assets/css/reduced-motion.css'],

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxtjs/sitemap'
  ],

  nitro: {
    preset: 'static',
    prerender: {
      routes: ['/robots.txt']
    }
  },

  runtimeConfig: {
    public: {
      maintenanceMode: process.env.MAINTENANCE_MODE === 'true',
      siteUrl: publicSiteUrl,
      paypalDonateUrl: process.env.NUXT_PUBLIC_PAYPAL_DONATE_URL || 'https://paypal.me/artcorehub',
      instagramUrl: process.env.NUXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com/artcorehub',
      staticformKey: process.env.STATICFORM_KEY || '',
      /** Posti coworking ancora disponibili: imposta NUXT_PUBLIC_COWORKING_SPOTS_LEFT (es. 7) e rideploya per aggiornare */
      coworkingSpotsLeft: parseInt(process.env.NUXT_PUBLIC_COWORKING_SPOTS_LEFT || '10', 10)
    }
  },

  i18n: {
    // Solo host (es. https://pfumarola.github.io): con sottopath GitHub Pages il path sta in app.baseURL.
    baseUrl: i18nSeoOrigin,
    locales: [
      { code: 'it', iso: 'it-IT', file: 'it.json' },
      { code: 'en', iso: 'en-US', file: 'en.json' }
    ],
    strategy: 'prefix_except_default',
    defaultLocale: 'it',
    lazy: true,
    langDir: 'locales',
    // SSG: la rilevazione lingua durante il prerender può far fallire `/` in CI; disattivata in build statico.
    detectBrowserLanguage: false
  },

  site: {
    url: publicSiteUrl
  },

  sitemap: {
    strictNuxtContentPaths: true
  },

  router: {
    options: {
      scrollBehaviorType: 'smooth'
    }
  },

  routeRules: {
    '/coworking': { redirect: '/the-space' },
    '/en/coworking': { redirect: '/en/the-space' }
  }
})
