<script setup lang="ts">
const { t } = useI18n()
usePageSeo({
  title: `${t('common.brand')} - ${t('events.hero.title')}`,
  description: t('events.hero.subtitle'),
  path: '/events',
  keywords: 'events, live music, festivals, cultural exchange, ARTCORE HUB'
})
</script>

<template>
  <div>
    <section class="border-b border-stone-200 bg-gradient-to-b from-amber-50/50 to-white px-4 py-16 dark:border-stone-800 dark:from-stone-900/50 dark:to-stone-950">
      <div class="mx-auto max-w-4xl text-center">
        <h1 class="text-3xl font-bold tracking-tight text-stone-900 dark:text-white sm:text-4xl">
          {{ $t('events.hero.title') }}
        </h1>
        <p class="mt-4 text-lg text-stone-600 dark:text-stone-400">
          {{ $t('events.hero.subtitle') }}
        </p>
      </div>
    </section>

    <section class="px-4 py-16">
      <div class="mx-auto max-w-4xl">
        <h2 class="text-2xl font-bold text-stone-900 dark:text-white">
          {{ $t('events.types.title') }}
        </h2>
        <div class="mt-8 grid gap-6 sm:grid-cols-3">
          <div class="rounded-xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
            <h3 class="font-semibold text-stone-900 dark:text-white">{{ $t('events.types.liveMusic.title') }}</h3>
            <p class="mt-2 text-sm text-stone-600 dark:text-stone-400">{{ $t('events.types.liveMusic.description') }}</p>
          </div>
          <div class="rounded-xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
            <h3 class="font-semibold text-stone-900 dark:text-white">{{ $t('events.types.festivals.title') }}</h3>
            <p class="mt-2 text-sm text-stone-600 dark:text-stone-400">{{ $t('events.types.festivals.description') }}</p>
          </div>
          <div class="rounded-xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
            <h3 class="font-semibold text-stone-900 dark:text-white">{{ $t('events.types.cultural.title') }}</h3>
            <p class="mt-2 text-sm text-stone-600 dark:text-stone-400">{{ $t('events.types.cultural.description') }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="border-t border-stone-200 bg-stone-50 px-4 py-16 dark:border-stone-800 dark:bg-stone-900/30">
      <div class="mx-auto max-w-4xl text-center">
        <h2 class="text-2xl font-bold text-stone-900 dark:text-white">
          {{ $t('events.upcoming.title') }}
        </h2>
        <p class="mt-4 text-stone-600 dark:text-stone-400">
          {{ $t('events.upcoming.empty') }}
        </p>
      </div>
    </section>
  </div>
</template>
