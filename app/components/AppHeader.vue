<script setup lang="ts">
const config = useRuntimeConfig().public
const maintenanceMode = config.maintenanceMode as boolean
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const { locale, locales } = useI18n()
const route = useRoute()
const { isContactHashInUrl } = useContactHashInUrl()

const isMenuOpen = ref(false)
const menuButtonRef = ref<HTMLButtonElement | null>(null)
const mobileNavRef = ref<HTMLElement | null>(null)

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
  if (path === '#contact') return isContactHashInUrl.value

  // Se c'è #contact attivo, nessuna pagina è "attiva"
  if (isContactHashInUrl.value) return false

  const fullPath = route.fullPath.split('#')[0] // ignora hash residui
  const localizedPath = localePath(path)
  if (path === '/') return fullPath === '/' || fullPath === '/en' || fullPath === localePath('/')
  return fullPath === localizedPath || fullPath.startsWith(localizedPath + '/')
}

/** Rimuove il focus dal link dopo la navigazione per evitare che resti il focus ring. */
function onNavClick() {
  nextTick(() => (document.activeElement as HTMLElement)?.blur())
}

const router = useRouter()

function getScrollBehavior(): ScrollBehavior {
  if (typeof window === 'undefined') return 'smooth'
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
}

function onNavLinkClick(link: { key: string; path: string }) {
  if (link.path === '#contact') {
    const targetPath = localePath(route.path) + '#contact'
    history.replaceState(history.state, '', targetPath)
    isContactHashInUrl.value = true
    nextTick(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: getScrollBehavior() })
    })
  }
  onNavClick()
}

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
  if (isMenuOpen.value) {
    nextTick(() => mobileNavRef.value?.querySelector<HTMLElement>('[href], button')?.focus())
  } else {
    nextTick(() => menuButtonRef.value?.focus())
  }
}

function closeMenuAndRestoreFocus() {
  isMenuOpen.value = false
  nextTick(() => menuButtonRef.value?.focus())
}
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-stone-200 bg-white/95 pt-[env(safe-area-inset-top)] backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:border-stone-800 dark:bg-stone-950/95">
    <div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
      <NuxtLink
        :to="localePath('/')"
        class="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
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
          class="text-sm font-medium text-stone-600 transition hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 dark:text-stone-400 dark:hover:text-white"
          :class="{ 'text-stone-900 dark:text-white': isActive(link.path) }"
          @click="onNavLinkClick(link)"
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
              class="rounded px-2 py-1 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
              :class="locale === l.code ? 'bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-200' : 'text-stone-600 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800'"
              :aria-current="locale === l.code ? 'true' : undefined"
            >
              {{ l.code === 'it' ? $t('common.it') : $t('common.en') }}
            </NuxtLink>
          </template>
        </div>

        <button
          v-if="!maintenanceMode"
          ref="menuButtonRef"
          type="button"
          class="flex min-h-11 min-w-11 items-center justify-center rounded-lg text-stone-600 hover:bg-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 md:hidden"
          :aria-label="isMenuOpen ? $t('a11y.closeMenu') : $t('a11y.openMenu')"
          :aria-expanded="isMenuOpen"
          @click="toggleMenu()"
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
      class="border-t border-stone-200 bg-white px-4 pb-[env(safe-area-inset-bottom)] pt-4 dark:border-stone-800 dark:bg-stone-950 md:hidden"
      role="dialog"
      aria-label="Menu mobile"
    >
      <nav ref="mobileNavRef" class="flex flex-col gap-1" aria-label="Navigazione mobile">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.key"
          :to="linkTo(link)"
          class="flex min-h-11 items-center rounded-lg px-4 py-3 text-sm font-medium text-stone-700 hover:bg-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:text-stone-300 dark:hover:bg-stone-800"
          :class="{ 'bg-amber-50 text-amber-900 dark:bg-amber-900/30 dark:text-amber-200': isActive(link.path) }"
          @click="closeMenuAndRestoreFocus(); onNavLinkClick(link)"
        >
          {{ $t(`nav.${link.key}`) }}
        </NuxtLink>
        <div class="mt-2 flex gap-2 border-t border-stone-200 pt-2 dark:border-stone-800">
          <NuxtLink
            v-for="l in locales"
            :key="typeof l === 'object' && l.code ? l.code : ''"
            v-show="typeof l === 'object' && l.code"
            :to="switchLocalePath((l as { code: string }).code)"
            class="flex min-h-11 flex-1 items-center justify-center rounded-lg px-3 py-2.5 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            :class="locale === (l as { code: string }).code ? 'bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-200' : 'text-stone-600 dark:text-stone-400'"
            :aria-current="locale === (l as { code: string }).code ? 'true' : undefined"
            @click="closeMenuAndRestoreFocus()"
          >
            {{ (l as { code: string }).code === 'it' ? $t('common.it') : $t('common.en') }}
          </NuxtLink>
        </div>
      </nav>
    </div>
  </header>
</template>
