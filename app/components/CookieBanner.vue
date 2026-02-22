<script setup lang="ts">
const { showBanner, acceptAll, rejectAll } = useCookieConsent()
const localePath = useLocalePath()
const isPreferencesOpen = useState<boolean>('cookie-preferences-open', () => false)

function openPreferences() {
  isPreferencesOpen.value = true
}
</script>

<template>
  <div
    v-if="showBanner"
    class="fixed bottom-0 left-0 right-0 z-[100] border-t border-stone-200 bg-white p-4 shadow-lg dark:border-stone-800 dark:bg-stone-900"
    role="dialog"
    aria-label="Cookie consent"
  >
    <div class="mx-auto max-w-3xl">
      <p class="mb-4 text-sm text-stone-600 dark:text-stone-400">
        {{ $t('cookie.banner.message') }}
      </p>
      <div class="flex flex-wrap items-center gap-3">
        <NuxtLink
          :to="localePath('/cookie-policy')"
          class="text-sm font-medium text-amber-600 hover:underline focus:outline-none focus:ring-2 focus:ring-amber-500 dark:text-amber-400"
        >
          Cookie Policy
        </NuxtLink>
        <NuxtLink
          :to="localePath('/gdpr')"
          class="text-sm font-medium text-amber-600 hover:underline focus:outline-none focus:ring-2 focus:ring-amber-500 dark:text-amber-400"
        >
          Privacy
        </NuxtLink>
        <div class="ml-auto flex gap-2">
          <button
            type="button"
            class="rounded bg-stone-200 px-3 py-1.5 text-sm font-medium text-stone-700 hover:bg-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-stone-700 dark:text-stone-200 dark:hover:bg-stone-600"
            @click="rejectAll()"
          >
            {{ $t('cookie.banner.rejectAll') }}
          </button>
          <button
            type="button"
            class="rounded px-3 py-1.5 text-sm font-medium text-stone-600 hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:text-stone-400 dark:hover:bg-stone-800"
            @click="openPreferences"
          >
            {{ $t('cookie.banner.preferences') }}
          </button>
          <button
            type="button"
            class="rounded bg-amber-500 px-3 py-1.5 text-sm font-medium text-amber-950 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            @click="acceptAll()"
          >
            {{ $t('cookie.banner.acceptAll') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
