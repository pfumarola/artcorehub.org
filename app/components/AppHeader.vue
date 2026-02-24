<script setup lang="ts">
const config = useRuntimeConfig().public
const maintenanceMode = config.maintenanceMode as boolean
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const { locale, locales } = useI18n()
const route = useRoute()
const { isContactHashInUrl } = useContactHashInUrl()

const isMenuOpen = ref(false)

const navLinks = [
  { key: 'home', path: '/' },
  { key: 'about', path: '/about' },
  { key: 'theSpace', path: '/the-space' },
  { key: 'events', path: '/events' },
  { key: 'contact', path: '#contact' }
]

function linkTo(link: { key: string; path: string }) {
  if (link.path === '#contact') return localePath(route.path) + '#contact'
  return localePath(link.path)
}

function isActive(path: string) {
  const fullPath = route.fullPath
  const localizedPath = localePath(path)
  if (path === '/') return fullPath === '/' || fullPath === '/en'
  if (path === '#contact') return isContactHashInUrl.value
  return fullPath === localizedPath || fullPath.startsWith(localizedPath + '/')
}

/** Rimuove il focus dal link dopo la navigazione per evitare che resti il focus ring. */
function onNavClick() {
  nextTick(() => (document.activeElement as HTMLElement)?.blur())
}
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-stone-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:border-stone-800 dark:bg-stone-950/95">
    <div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
      <NuxtLink
        :to="localePath('/')"
        class="flex items-center focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
        :aria-label="`${$t('common.brand')} - Home`"
      >
        <img
          src="/images/logo.webp"
          :alt="$t('common.brand')"
          class="h-9 w-auto"
          width="120"
          height="36"
        />
      </NuxtLink>

      <nav v-if="!maintenanceMode" class="hidden items-center gap-8 md:flex" aria-label="Navigazione principale">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.key"
          :to="linkTo(link)"
          class="text-sm font-medium text-stone-600 transition hover:text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:text-stone-400 dark:hover:text-white"
          :class="{ 'text-stone-900 dark:text-white': isActive(link.path) }"
          @click="onNavClick"
        >
          {{ $t(`nav.${link.key}`) }}
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-4">
        <div class="hidden items-center gap-1 md:flex" role="group" aria-label="Selettore lingua">
          <template v-for="l in locales" :key="typeof l === 'object' && l.code ? l.code : ''">
            <NuxtLink
              v-if="typeof l === 'object' && l.code"
              :to="switchLocalePath(l.code)"
              class="rounded px-2 py-1 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
              :class="locale === l.code ? 'bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-200' : 'text-stone-600 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800'"
            >
              {{ l.code === 'it' ? $t('common.it') : $t('common.en') }}
            </NuxtLink>
          </template>
        </div>

        <button
          v-if="!maintenanceMode"
          type="button"
          class="rounded p-2 text-stone-600 hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500 md:hidden"
          aria-label="Apri menu"
          aria-expanded="false"
          :aria-expanded="isMenuOpen"
          @click="isMenuOpen = !isMenuOpen"
        >
          <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>

    <div
      v-if="!maintenanceMode"
      v-show="isMenuOpen"
      class="border-t border-stone-200 bg-white px-4 py-4 dark:border-stone-800 dark:bg-stone-950 md:hidden"
      role="dialog"
      aria-label="Menu mobile"
    >
      <nav class="flex flex-col gap-2" aria-label="Navigazione mobile">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.key"
          :to="linkTo(link)"
          class="rounded-lg px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800"
          :class="{ 'bg-amber-50 text-amber-900 dark:bg-amber-900/30 dark:text-amber-200': isActive(link.path) }"
          @click="isMenuOpen = false; onNavClick()"
        >
          {{ $t(`nav.${link.key}`) }}
        </NuxtLink>
        <div class="mt-2 flex gap-2 border-t border-stone-200 pt-2 dark:border-stone-800">
          <NuxtLink
            v-for="l in locales"
            :key="typeof l === 'object' && l.code ? l.code : ''"
            v-show="typeof l === 'object' && l.code"
            :to="switchLocalePath((l as { code: string }).code)"
            class="rounded-lg px-3 py-2 text-sm font-medium"
            :class="locale === (l as { code: string }).code ? 'bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-200' : 'text-stone-600 dark:text-stone-400'"
            @click="isMenuOpen = false"
          >
            {{ (l as { code: string }).code === 'it' ? $t('common.it') : $t('common.en') }}
          </NuxtLink>
        </div>
      </nav>
    </div>
  </header>
</template>
