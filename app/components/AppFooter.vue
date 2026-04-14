<script setup lang="ts">
const { t } = useI18n()
const config = useRuntimeConfig().public
const maintenanceMode = config.maintenanceMode as boolean
const instagramUrl = (config.instagramUrl as string) || ''
const staticformKey = (config.staticformKey as string) || ''
const localePath = useLocalePath()
const route = useRoute()
const year = new Date().getFullYear()

const navLinks = [
  { key: 'home', path: '/' },
  { key: 'about', path: '/about' },
  { key: 'theSpace', path: '/the-space' },
  { key: 'events', path: '/events' },
  { key: 'contact', path: '#contact' }
]

const form = ref({
  name: '',
  surname: '',
  email: '',
  message: (route.query.subject as string) || '',
  honeypot: '',
  gdprConsent: false
})
const status = ref<'idle' | 'submitting' | 'success' | 'error'>('idle')

watch(
  () => route.fullPath,
  () => {
    form.value.message = (route.query.subject as string) || ''
  },
  { immediate: true }
)

function linkTo(link: { key: string; path: string }) {
  if (link.path === '#contact') return localePath(route.path) + '#contact'
  return localePath(link.path)
}

async function submit() {
  if (status.value === 'submitting') return
  status.value = 'idle'

  if (!staticformKey) {
    status.value = 'error'
    return
  }

  status.value = 'submitting'

  const subjectQuery = (route.query.subject as string) || ''
  const contactSubject = subjectQuery.trim() || t('contact.hero.title')

  try {
    const payload = {
      accessKey: staticformKey,
      name: `${form.value.name} ${form.value.surname}`.trim(),
      surname: form.value.surname,
      email: form.value.email,
      subject: contactSubject,
      message: form.value.message,
      honeypot: form.value.honeypot,
      replyTo: form.value.email,
      gdprConsent: form.value.gdprConsent ? 'accepted' : 'not_accepted'
    }

    const response = await $fetch<{ success?: boolean; message?: string }>('https://api.staticforms.dev/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload
    })

    if (response?.success) {
      status.value = 'success'
      form.value = { name: '', surname: '', email: '', message: '', honeypot: '', gdprConsent: false }
      return
    }

    status.value = 'error'
  } catch {
    status.value = 'error'
  }
}
</script>

<template>
  <footer class="border-t border-stone-200 bg-stone-50 dark:border-stone-800 dark:bg-stone-900/50">
    <!-- Contact section: full width, integrated -->
    <section
      v-if="!maintenanceMode"
      id="contact"
      class="scroll-mt-8 border-b border-stone-200/80 px-4 py-6 dark:border-stone-700/80 sm:px-6"
    >
      <div class="mx-auto mt-8 max-w-4xl">
        <form class="space-y-4" @submit.prevent="submit">
          <input
            v-model="form.honeypot"
            type="text"
            name="honeypot"
            tabindex="-1"
            autocomplete="off"
            class="hidden"
            aria-hidden="true"
          >
          <div class="grid gap-4 sm:grid-cols-2">
            <div>
              <label for="footer-contact-name" class="block text-sm font-medium text-stone-700 dark:text-stone-300">
                {{ $t('contact.form.name') }} <span class="text-red-500" aria-hidden="true">*</span>
              </label>
              <input
                id="footer-contact-name"
                v-model="form.name"
                type="text"
                required
                aria-required="true"
                class="mt-1 w-full rounded-lg border border-stone-200 bg-white/90 px-3 py-2.5 text-base text-stone-900 focus-visible:border-amber-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500 dark:border-stone-600 dark:bg-stone-800/90 dark:text-white"
              />
            </div>
            <div>
              <label for="footer-contact-surname" class="block text-sm font-medium text-stone-700 dark:text-stone-300">
                {{ $t('contact.form.surname') }} <span class="text-red-500" aria-hidden="true">*</span>
              </label>
              <input
                id="footer-contact-surname"
                v-model="form.surname"
                type="text"
                required
                aria-required="true"
                class="mt-1 w-full rounded-lg border border-stone-200 bg-white/90 px-3 py-2.5 text-base text-stone-900 focus-visible:border-amber-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500 dark:border-stone-600 dark:bg-stone-800/90 dark:text-white"
              />
            </div>
          </div>
          <div>
            <label for="footer-contact-email" class="block text-sm font-medium text-stone-700 dark:text-stone-300">
              {{ $t('contact.form.email') }} <span class="text-red-500" aria-hidden="true">*</span>
            </label>
            <input
              id="footer-contact-email"
              v-model="form.email"
              type="email"
              required
              aria-required="true"
              class="mt-1 w-full rounded-lg border border-stone-200 bg-white/90 px-3 py-2.5 text-base text-stone-900 focus-visible:border-amber-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500 dark:border-stone-600 dark:bg-stone-800/90 dark:text-white"
            />
          </div>
          <div>
            <label for="footer-contact-message" class="block text-sm font-medium text-stone-700 dark:text-stone-300">
              {{ $t('contact.form.message') }} <span class="text-red-500" aria-hidden="true">*</span>
            </label>
            <textarea
              id="footer-contact-message"
              v-model="form.message"
              rows="3"
              required
              aria-required="true"
              class="mt-1 w-full resize-none rounded-lg border border-stone-200 bg-white/90 px-3 py-2.5 text-base text-stone-900 focus-visible:border-amber-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500 dark:border-stone-600 dark:bg-stone-800/90 dark:text-white"
            />
          </div>
          <div>
            <label for="footer-contact-gdpr" class="flex items-start gap-2 text-sm text-stone-700 dark:text-stone-300">
              <input
                id="footer-contact-gdpr"
                v-model="form.gdprConsent"
                type="checkbox"
                required
                aria-required="true"
                class="mt-0.5 h-4 w-4 rounded border-stone-300 text-amber-600 focus:ring-amber-500 dark:border-stone-600 dark:bg-stone-800"
              >
              <span>
                {{ $t('contact.form.gdprConsentPrefix') }}
                <NuxtLink
                  :to="localePath('/gdpr')"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="font-medium text-amber-700 underline underline-offset-2 hover:text-amber-800 dark:text-amber-300 dark:hover:text-amber-200"
                >
                  {{ $t('contact.form.gdprConsentLink') }}
                </NuxtLink>
              </span>
            </label>
          </div>
          <button
            type="submit"
            :disabled="status === 'submitting'"
            class="min-h-11 rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-medium text-amber-950 hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-stone-900"
          >
            {{ status === 'submitting' ? $t('contact.form.submitting') : $t('contact.form.submit') }}
          </button>
          <p v-if="status === 'success'" class="text-sm text-green-600 dark:text-green-400" role="status">
            {{ $t('contact.form.success') }}
          </p>
          <p v-if="status === 'error'" class="text-sm text-red-600 dark:text-red-400" role="alert">
            {{ $t('contact.form.error') }}
          </p>
        </form>
      </div>
    </section>

    <div class="mx-auto max-w-6xl px-4 py-8 sm:px-6" :class="{ 'pt-8': maintenanceMode }">
      <div class="grid gap-8 md:grid-cols-3" :class="{ 'pt-0': maintenanceMode }">
        <div :class="maintenanceMode ? 'md:col-span-3 text-center' : ''">
          <NuxtLink
            :to="localePath('/')"
            class="text-lg font-bold text-stone-900 dark:text-white"
          >
            {{ $t('common.brand') }}
          </NuxtLink>
          <p class="mt-2 text-sm text-stone-600 dark:text-stone-400">
            {{ $t('footer.description') }}
          </p>
          <address class="mt-3 not-italic text-sm text-stone-600 dark:text-stone-400">
            <span class="font-medium text-stone-700 dark:text-stone-300">{{ $t('footer.legalName') }}</span><br>
            {{ $t('footer.address') }}<br>
            {{ $t('contact.info.email') }}: <a href="mailto:segreteria@artcorehub.org" class="text-stone-600 underline hover:text-stone-900 dark:text-stone-400 dark:hover:text-white">{{ $t('footer.email') }}</a>
            – PEC: <a href="mailto:artcore@pec.it" class="text-stone-600 underline hover:text-stone-900 dark:text-stone-400 dark:hover:text-white">{{ $t('footer.pec') }}</a><br>
            {{ $t('footer.taxCode') }}
          </address>
          <p class="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-stone-500 dark:text-stone-400">
            <a
              v-if="instagramUrl"
              :href="instagramUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1 text-stone-500 transition hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200"
              :aria-label="`Instagram (${$t('a11y.opensNewTab')})`"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </p>
        </div>
        <div v-if="!maintenanceMode">
          <h3 class="text-sm font-semibold uppercase tracking-wider text-stone-900 dark:text-white">
            {{ $t('footer.quickLinks') }}
          </h3>
          <ul class="mt-3 space-y-1">
            <li v-for="link in navLinks" :key="link.key">
              <NuxtLink
                :to="linkTo(link)"
                class="inline-flex min-h-11 items-center py-2 text-sm text-stone-600 hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:text-stone-400 dark:hover:text-white"
              >
                {{ $t(`nav.${link.key}`) }}
              </NuxtLink>
            </li>
          </ul>
        </div>
        <div v-if="!maintenanceMode">
          <h3 class="text-sm font-semibold uppercase tracking-wider text-stone-900 dark:text-white">
            {{ $t('footer.legal') }}
          </h3>
          <ul class="mt-3 space-y-1">
            <li>
              <NuxtLink
                :to="localePath('/gdpr')"
                class="inline-flex min-h-11 items-center py-2 text-sm text-stone-600 hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:text-stone-400 dark:hover:text-white"
              >
                {{ $t('footer.gdpr') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                :to="localePath('/cookie-policy')"
                class="inline-flex min-h-11 items-center py-2 text-sm text-stone-600 hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:text-stone-400 dark:hover:text-white"
              >
                {{ $t('footer.cookiePolicy') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                :to="localePath('/transparency')"
                class="inline-flex min-h-11 items-center py-2 text-sm text-stone-600 hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:text-stone-400 dark:hover:text-white"
              >
                {{ $t('footer.transparency') }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
      <div class="mt-8 border-t border-stone-200 pt-8 dark:border-stone-800">
        <p class="text-center text-sm text-stone-500 dark:text-stone-400">
          {{ $t('footer.copyright', { year }) }}
        </p>
      </div>
    </div>
  </footer>
</template>
