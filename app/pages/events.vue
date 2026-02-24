<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
usePageSeo({
  title: `${t('common.brand')} - ${t('events.hero.title')}`,
  description: t('events.hero.subtitle'),
  path: '/events',
  keywords: t('seo.keywords.events')
})
useBreadcrumbStructuredData([
  { name: t('nav.home'), path: localePath('/') },
  { name: t('events.hero.title'), path: localePath('/events') }
])

const eventTypes = [
  { key: 'liveMusic', image: '/images/event-live.jpg' },
  { key: 'festivals', image: '/images/event-festivals.jpg' },
  { key: 'cultural', image: '/images/event-cultural.jpg' }
] as const
</script>

<template>
  <div>
    <section class="relative border-b border-stone-200 overflow-hidden bg-gradient-to-b from-amber-50/50 to-white px-4 py-16 dark:border-stone-800 dark:from-stone-900/50 dark:to-stone-950">
      <div
        class="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style="background-image: url('/images/events-hero.jpg')"
        aria-hidden="true"
      />
      <div class="absolute inset-0 bg-white/70 dark:bg-stone-950/80" aria-hidden="true" />
      <div class="relative z-10 mx-auto max-w-4xl text-center">
        <h1 class="text-3xl font-bold tracking-tight text-stone-900 dark:text-white sm:text-4xl">
          {{ $t('events.hero.title') }}
        </h1>
        <p class="mt-4 text-lg text-stone-600 dark:text-stone-400">
          {{ $t('events.hero.subtitle') }}
        </p>
      </div>
    </section>

    <section class="relative overflow-hidden px-4 py-16">
      <span class="absolute -left-32 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-amber-100/50 dark:bg-amber-900/20" aria-hidden="true" />
      <div class="relative z-10 mx-auto max-w-4xl">
        <h2 class="text-2xl font-bold text-stone-900 dark:text-white">
          {{ $t('events.types.title') }}
        </h2>
        <div class="mt-8 grid gap-6 sm:grid-cols-3">
          <div
            v-for="ev in eventTypes"
            :key="ev.key"
            class="rounded-xl border border-stone-200 bg-white overflow-hidden dark:border-stone-800 dark:bg-stone-900"
          >
            <div class="relative aspect-video w-full bg-stone-200 dark:bg-stone-800">
              <img
                :src="ev.image"
                :alt="$t(`events.types.${ev.key}.title`)"
                class="h-full w-full object-cover"
                loading="lazy"
                @error="($event.target as HTMLImageElement).style.display = 'none'"
              />
            </div>
            <div class="p-6">
              <h3 class="font-semibold text-stone-900 dark:text-white">{{ $t(`events.types.${ev.key}.title`) }}</h3>
              <p class="mt-2 text-sm text-stone-600 dark:text-stone-400">{{ $t(`events.types.${ev.key}.description`) }}</p>
            </div>
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
