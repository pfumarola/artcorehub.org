// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxtjs/sitemap'
  ],

  nitro: {
    preset: 'static'
  },

  runtimeConfig: {
    public: {
      maintenanceMode: process.env.MAINTENANCE_MODE === 'true',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://artcorehub.org',
      paypalDonateUrl: process.env.NUXT_PUBLIC_PAYPAL_DONATE_URL || '',
      instagramUrl: process.env.NUXT_PUBLIC_INSTAGRAM_URL || ''
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
    detectBrowserLanguage: true
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
