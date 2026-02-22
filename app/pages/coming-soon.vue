<script setup lang="ts">
const { t } = useI18n()
usePageSeo({
  title: `${t('common.brand')} - ${t('comingSoon.title')}`,
  description: t('comingSoon.message'),
  path: '/coming-soon'
})
</script>

<template>
  <div class="flex min-h-[80vh] flex-col items-center justify-center px-4 py-16">
    <h1 class="text-3xl font-bold tracking-tight text-stone-900 dark:text-white sm:text-4xl">
      {{ $t('common.brand') }}
    </h1>
    <p class="mt-2 text-amber-600 dark:text-amber-400">
      {{ $t('common.tagline') }}
    </p>
    <h2 class="mt-12 text-2xl font-semibold text-stone-800 dark:text-stone-200">
      {{ $t('comingSoon.title') }}
    </h2>
    <p class="mt-2 text-stone-600 dark:text-stone-400">
      {{ $t('comingSoon.subtitle') }}
    </p>
    <p class="mt-6 max-w-md text-center text-sm text-stone-500 dark:text-stone-400">
      {{ $t('comingSoon.message') }}
    </p>

    <div class="mt-12 grid w-full max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2">
      <div class="rounded-xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900">
        <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/40" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
        </div>
        <h3 class="mt-3 font-semibold text-stone-900 dark:text-white">{{ $t('comingSoon.liveMusic') }}</h3>
      </div>
      <div class="rounded-xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900">
        <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/40" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
        </div>
        <h3 class="mt-3 font-semibold text-stone-900 dark:text-white">{{ $t('comingSoon.international') }}</h3>
      </div>
      <div class="rounded-xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900">
        <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/40" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </div>
        <h3 class="mt-3 font-semibold text-stone-900 dark:text-white">{{ $t('comingSoon.coworking') }}</h3>
      </div>
      <div class="rounded-xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900">
        <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/40" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
            <line x1="16" x2="16" y1="2" y2="6" />
            <line x1="8" x2="8" y1="2" y2="6" />
            <line x1="3" x2="21" y1="10" y2="10" />
          </svg>
        </div>
        <h3 class="mt-3 font-semibold text-stone-900 dark:text-white">{{ $t('comingSoon.festivals') }}</h3>
      </div>
    </div>
  </div>
</template>
