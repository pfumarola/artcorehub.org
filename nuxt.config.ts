// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  app: {
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
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://artcorehub.org',
      paypalDonateUrl: process.env.NUXT_PUBLIC_PAYPAL_DONATE_URL || 'https://paypal.me/artcorehub',
      instagramUrl: process.env.NUXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com/artcorehub',
      /** Posti coworking ancora disponibili: imposta NUXT_PUBLIC_COWORKING_SPOTS_LEFT (es. 7) e rideploya per aggiornare */
      coworkingSpotsLeft: parseInt(process.env.NUXT_PUBLIC_COWORKING_SPOTS_LEFT || '10', 10)
    }
  },

  i18n: {
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
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://artcorehub.org'
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
