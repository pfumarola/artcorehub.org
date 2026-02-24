<template>
  <div class="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-amber-50/50 to-white px-4 dark:from-stone-900 dark:to-stone-950">
    <div class="mx-auto max-w-md text-center">
      <!-- 404 number with a bit of playfulness -->
      <p class="text-8xl font-bold tabular-nums tracking-tighter text-amber-500/90 dark:text-amber-400/80" aria-hidden="true">
        {{ statusCode }}
      </p>
      <h1 class="mt-4 text-2xl font-bold text-stone-900 dark:text-white">
        {{ $t('error404.title') }}
      </h1>
      <p class="mt-2 text-stone-600 dark:text-stone-400">
        {{ $t('error404.message') }}
      </p>
      <p class="mt-1 text-sm text-stone-500 dark:text-stone-500">
        {{ $t('error404.hint') }}
      </p>

      <!-- Minimal music note icon (SVG) -->
      <div class="mt-8 flex justify-center" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-amber-500/70 dark:text-amber-400/60">
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      </div>

      <NuxtLink
        :to="localePath('/')"
        class="mt-8 inline-flex items-center rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-medium text-amber-950 transition hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:focus:ring-offset-stone-950"
      >
        {{ $t('error404.backHome') }}
        <span class="ml-1.5" aria-hidden="true">→</span>
      </NuxtLink>
    </div>

    <!-- Optional: small brand at bottom -->
    <p class="mt-auto pb-8 text-sm text-stone-400 dark:text-stone-500">
      {{ $t('common.brand') }}
    </p>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const error = useError()
const statusCode = computed(() => error.value?.statusCode ?? error.value?.status ?? 404)

useHead({
  title: () => `${statusCode.value} - ${t('error404.title')}`,
  meta: [{ name: 'robots', content: 'noindex, nofollow' }]
})
</script>
