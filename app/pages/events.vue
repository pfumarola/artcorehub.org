<script setup lang="ts">
import { upcomingEvents } from '~/utils/upcomingEvents'

const { t, locale } = useI18n()
const localePath = useLocalePath()
usePageSeo({
  title: `${t('common.brand')} - ${t('events.hero.title')}`,
  description: t('events.hero.subtitle'),
  path: '/events',
  keywords: t('seo.keywords.events'),
  image: '/images/og-default.webp'
})
useBreadcrumbStructuredData([
  { name: t('nav.home'), path: localePath('/') },
  { name: t('events.hero.title'), path: localePath('/events') }
])

const eventTypes = [
  { key: 'liveMusic', image: '/images/event-live.webp' },
  { key: 'festivals', image: '/images/event-festivals.webp' },
  { key: 'cultural', image: '/images/event-cultural.webp' }
] as const

function formatEventDate(iso: string) {
  const date = new Date(iso)
  return new Intl.DateTimeFormat(locale.value === 'en' ? 'en-GB' : 'it-IT', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}
</script>

<template>
  <div>
    <section class="relative border-b border-stone-200 overflow-hidden bg-gradient-to-b from-amber-50/50 to-white px-4 py-16 dark:border-stone-800 dark:from-stone-900/50 dark:to-stone-950">
      <div
        class="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style="background-image: url('/images/events-hero.webp')"
        aria-hidden="true"
      />
      <div class="absolute inset-0 bg-white/70 dark:bg-stone-950/80" aria-hidden="true" />
      <div class="relative z-10 mx-auto max-w-6xl text-center">
        <h1 class="text-3xl font-bold tracking-tight text-stone-900 dark:text-white sm:text-4xl">
          {{ $t('events.hero.title') }}
        </h1>
        <p class="mt-4 text-lg text-stone-600 dark:text-stone-400">
          {{ $t('events.hero.subtitle') }}
        </p>
      </div>
    </section>

    <section class="bg-stone-50 px-4 py-16 dark:bg-stone-900/30">
      <div class="mx-auto max-w-4xl">
        <h2 class="text-center text-2xl font-bold text-stone-900 dark:text-white">
          {{ $t('events.upcoming.title') }}
        </h2>

        <p
          v-if="upcomingEvents.length === 0"
          class="mt-4 text-center text-stone-600 dark:text-stone-400"
        >
          {{ $t('events.upcoming.empty') }}
        </p>

        <ul v-else class="mt-10 space-y-8">
          <li
            v-for="event in upcomingEvents"
            :key="event.id"
            class="overflow-hidden rounded-xl border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900"
          >
            <article class="grid gap-0 md:grid-cols-[minmax(0,16rem)_1fr]">
              <div class="relative aspect-[4/3] w-full bg-stone-200 dark:bg-stone-800 md:aspect-auto md:min-h-full">
                <img
                  :src="event.image"
                  :alt="$t(`events.upcoming.items.${event.id}.title`)"
                  class="h-full w-full object-cover"
                  loading="lazy"
                  @error="($event.target as HTMLImageElement).style.display = 'none'"
                />
              </div>
              <div class="flex flex-col p-6 sm:p-8">
                <p class="text-sm font-medium uppercase tracking-wide text-amber-800 dark:text-amber-300">
                  {{ $t(`events.types.${event.type}.title`) }}
                </p>
                <h3 class="mt-2 text-xl font-bold text-stone-900 dark:text-white sm:text-2xl">
                  {{ $t(`events.upcoming.items.${event.id}.title`) }}
                </h3>
                <time
                  class="mt-2 block text-sm font-medium text-stone-700 dark:text-stone-300"
                  :datetime="event.startsAt"
                >
                  {{ formatEventDate(event.startsAt) }}
                </time>
                <p class="mt-4 whitespace-pre-line text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                  {{ $t(`events.upcoming.items.${event.id}.description`) }}
                </p>
                <dl class="mt-4 space-y-2 text-sm text-stone-600 dark:text-stone-400">
                  <div>
                    <dt class="inline font-medium text-stone-800 dark:text-stone-200">
                      {{ $t('events.upcoming.venueLabel') }}:
                    </dt>
                    {{ ' ' }}
                    <dd class="inline">
                      {{ $t(`events.upcoming.items.${event.id}.venue`) }}
                    </dd>
                  </div>
                  <div>
                    <dt class="inline font-medium text-stone-800 dark:text-stone-200">
                      {{ $t('events.upcoming.admissionLabel') }}:
                    </dt>
                    {{ ' ' }}
                    <dd class="inline">
                      {{ $t(`events.upcoming.items.${event.id}.admission`) }}
                    </dd>
                  </div>
                </dl>
                <div class="mt-6 flex flex-wrap gap-3">
                  <a
                    v-if="event.link"
                    :href="event.link"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center justify-center rounded-lg bg-amber-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-amber-800 dark:bg-amber-600 dark:hover:bg-amber-500"
                    :aria-label="`${$t('events.upcoming.listenCta')} (${$t('a11y.opensNewTab')})`"
                  >
                    {{ $t('events.upcoming.listenCta') }}
                  </a>
                  <a
                    v-if="event.phone"
                    :href="`tel:${event.phone}`"
                    class="inline-flex items-center justify-center rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium text-stone-800 transition hover:bg-stone-100 dark:border-stone-600 dark:text-stone-200 dark:hover:bg-stone-800"
                  >
                    {{ $t('events.upcoming.callCta') }}
                  </a>
                </div>
              </div>
            </article>
          </li>
        </ul>
      </div>
    </section>

    <section class="relative overflow-hidden border-t border-stone-200 px-4 py-16 dark:border-stone-800">
      <span class="absolute -left-32 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-amber-100/50 dark:bg-amber-900/20" aria-hidden="true" />
      <div class="relative z-10 mx-auto max-w-6xl">
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
  </div>
</template>
