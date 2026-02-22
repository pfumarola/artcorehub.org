<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

usePageSeo({
  title: `${t('common.brand')} - ${t('home.hero.subtitle')}`,
  description: t('home.about.description'),
  path: '/',
  keywords: 'coworking, live music, festival, cultural exchange, ARTCORE HUB'
})

// Project milestones: 'done' | 'current' | 'next' (edit to reflect real progress)
const milestoneKeys = ['idea', 'space', 'setup', 'opening'] as const
const milestoneStatus: Record<(typeof milestoneKeys)[number], 'done' | 'current' | 'next'> = {
  idea: 'done',
  space: 'current',
  setup: 'next',
  opening: 'next'
}

const config = useRuntimeConfig().public
const instagramUrl = (config.instagramUrl as string) || ''

const faqItems = computed(() => [
  { question: t('home.faq.q1.question'), answer: t('home.faq.q1.answer') },
  { question: t('home.faq.q2.question'), answer: t('home.faq.q2.answer') },
  { question: t('home.faq.q3.question'), answer: t('home.faq.q3.answer') },
  { question: t('home.faq.q4.question'), answer: t('home.faq.q4.answer') }
])

function contactUrl(subjectKey: 'interested' | 'help') {
  const subject = t(`home.project.contactSubject.${subjectKey}`)
  return `${localePath('/')}?subject=${encodeURIComponent(subject)}#contact`
}
</script>

<template>
  <div>
    <section class="border-b border-stone-200 bg-gradient-to-b from-amber-50/50 to-white px-4 py-16 dark:border-stone-800 dark:from-stone-900/50 dark:to-stone-950">
      <div class="mx-auto max-w-4xl text-center">
        <h1 class="text-3xl font-bold tracking-tight text-stone-900 dark:text-white sm:text-4xl md:text-5xl">
          {{ $t('home.hero.title') }}
        </h1>
        <p class="mt-4 text-lg text-stone-600 dark:text-stone-400">
          {{ $t('home.hero.subtitle') }}
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-4">
          <NuxtLink
            :to="localePath('/the-space')"
            class="inline-flex items-center rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-medium text-amber-950 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
          >
            {{ $t('home.hero.ctaCoworking') }}
          </NuxtLink>
          <NuxtLink
            :to="localePath('/events')"
            class="inline-flex items-center rounded-lg border border-stone-300 bg-white px-5 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:border-stone-600 dark:bg-stone-900 dark:text-stone-200 dark:hover:bg-stone-800"
          >
            {{ $t('home.hero.ctaEvents') }}
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Project status: FAQ + Get involved affiancati, poi journey e step -->
    <section class="border-t border-stone-200 bg-stone-50 px-4 py-16 dark:border-stone-800 dark:bg-stone-900/30">

            <!-- The coworking journey: riga full-width -->
      <div class="mx-auto mt-10 max-w-4xl lg:mt-12">
        <h2 class="text-center text-2xl font-bold text-stone-900 dark:text-white">
          {{ $t('home.project.title') }}
        </h2>
        <div class="mt-10 space-y-8">
          <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
            <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
            </span>
            <p class="text-base leading-relaxed text-stone-600 dark:text-stone-400 sm:flex-1 sm:text-left">
              {{ $t('home.project.paragraph1') }}
            </p>
          </div>
          <div class="flex flex-col gap-4 sm:flex-row-reverse sm:items-start sm:gap-6">
            <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
              </svg>
            </span>
            <p class="text-base leading-relaxed text-stone-600 dark:text-stone-400 sm:flex-1 sm:text-right">
              {{ $t('home.project.paragraph2') }}
            </p>
          </div>
          <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
            <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </span>
            <p class="text-base leading-relaxed text-stone-600 dark:text-stone-400 sm:flex-1 sm:text-left">
              {{ $t('home.project.paragraph3') }}
            </p>
          </div>
        </div>
      </div>

      <div class="mx-auto mt-14 max-w-6xl grid grid-cols-1 gap-8 lg:mt-20 lg:grid-cols-2 lg:gap-10 lg:items-start">
        <!-- Left column: FAQ -->
        <div>
          <h2 class="text-center text-2xl font-bold text-stone-900 dark:text-white lg:text-left">
            {{ $t('home.faq.title') }}
          </h2>
          <div class="mt-8">
            <AppFaq :items="faqItems" />
          </div>
        </div>

        <!-- Right column: Get involved (titolo + widget) -->
        <div class="min-w-0">
          <h2 class="text-center text-2xl font-bold text-stone-900 dark:text-white lg:text-left">
            {{ $t('home.project.getInvolved') }}
          </h2>
          <div class="mt-8">
            <AppFundraisingWidget />
          </div>
        </div>
      </div>

      <!-- Timeline step: riga full-width per leggibilità -->
      <div class="mx-auto mt-14 max-w-6xl lg:mt-20" role="list" aria-label="Stato del progetto">
        <div class="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 lg:gap-6">
          <template v-for="key in milestoneKeys" :key="key">
            <div
              role="listitem"
              class="relative flex min-w-0 flex-col rounded-xl border-2 p-3 transition-all sm:p-4"
              :class="{
                'border-amber-500 bg-amber-50/80 dark:bg-amber-900/20 dark:border-amber-400': milestoneStatus[key] === 'current',
                'border-stone-300 bg-white dark:border-stone-700 dark:bg-stone-900': milestoneStatus[key] === 'done',
                'border-stone-200 bg-stone-100/50 dark:border-stone-800 dark:bg-stone-900/50': milestoneStatus[key] === 'next'
              }"
            >
              <span
                v-if="milestoneStatus[key] === 'done'"
                class="absolute right-2 top-2 text-amber-600 dark:text-amber-400"
                aria-hidden="true"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sm:w-[18px] sm:h-[18px]">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span
                v-else-if="milestoneStatus[key] === 'current'"
                class="absolute right-2 top-2 h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500 sm:h-2 sm:w-2"
                aria-hidden="true"
              />
              <p class="pr-6 text-xs font-semibold text-stone-900 dark:text-white sm:pr-0 sm:text-sm">
                {{ $t(`home.project.milestones.${key}.label`) }}
              </p>
              <p class="mt-1 text-[11px] leading-tight text-stone-500 dark:text-stone-400 sm:text-xs">
                {{ $t(`home.project.milestones.${key}.desc`) }}
              </p>
              <p class="mt-2 text-[11px] font-medium sm:text-xs" :class="milestoneStatus[key] === 'current' ? 'text-amber-700 dark:text-amber-300' : 'text-stone-500 dark:text-stone-400'">
                {{ $t(`home.project.status.${milestoneStatus[key]}`) }}
              </p>
              <a
                v-if="milestoneStatus[key] === 'current' && instagramUrl"
                :href="instagramUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="mt-3 inline-flex w-fit items-center gap-1.5 text-xs font-medium text-amber-700 hover:text-amber-800 dark:text-amber-300 dark:hover:text-amber-200 sm:mt-3"
                :aria-label="`${$t('home.project.followProgress')} (Instagram)`"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="shrink-0 sm:w-4 sm:h-4">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                {{ $t('home.project.followProgress') }}
              </a>
              <NuxtLink
                v-if="key === 'opening'"
                :to="localePath('/the-space')"
                class="mt-3 inline-flex w-fit text-xs font-medium text-amber-700 underline hover:text-amber-800 dark:text-amber-300 dark:hover:text-amber-200 sm:mt-3"
              >
                {{ $t('home.project.imagineLikeThis') }}
              </NuxtLink>
            </div>
          </template>
        </div>
      </div>

      <!-- Riga sotto: I can help e I'm interested affiancate -->
      <div class="mx-auto mt-14 max-w-6xl grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-20">
        <!-- Card: I can lend a hand -->
        <div class="flex flex-col rounded-2xl border-2 border-stone-200 bg-white p-5 shadow-sm dark:border-stone-700 dark:bg-stone-900">
          <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/40" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-amber-600 dark:text-amber-400">
              <path d="M18 11V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2v0" />
              <path d="M14 10V4a2 2 0 0 0-2-2 2 2 0 0 0-2 2v6" />
              <path d="M10 10.5V14a2 2 0 0 0 2 2v0a2 2 0 0 0 2-2v-3.5" />
              <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
            </svg>
          </span>
          <h4 class="mt-3 font-semibold text-stone-900 dark:text-white">
            {{ $t('home.project.canHelp') }}
          </h4>
          <p class="mt-2 text-sm text-stone-600 dark:text-stone-400">
            {{ $t('home.project.canHelpDesc') }}
          </p>
          <NuxtLink
            :to="contactUrl('help')"
            class="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-medium text-amber-950 transition hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:focus:ring-offset-stone-900"
          >
            {{ $t('home.project.contactCta') }}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </NuxtLink>
        </div>

        <!-- Card: I'm interested -->
        <div class="flex flex-col rounded-2xl border-2 border-stone-200 bg-white p-5 shadow-sm dark:border-stone-700 dark:bg-stone-900">
          <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/40" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-amber-600 dark:text-amber-400">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </span>
          <h4 class="mt-3 font-semibold text-stone-900 dark:text-white">
            {{ $t('home.project.interested') }}
          </h4>
          <p class="mt-2 text-sm text-stone-600 dark:text-stone-400">
            {{ $t('home.project.interestedDesc') }}
          </p>
          <NuxtLink
            :to="contactUrl('interested')"
            class="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-medium text-amber-950 transition hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:focus:ring-offset-stone-900"
          >
            {{ $t('home.project.contactCta') }}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="px-4 py-16">
      <div class="mx-auto max-w-6xl">
        <h2 class="text-center text-2xl font-bold text-stone-900 dark:text-white">
          {{ $t('home.features.title') }}
        </h2>
        <div class="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div class="rounded-xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900">
            <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/40" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 18V5l12-2v13" />
                <circle cx="6" cy="18" r="3" />
                <circle cx="18" cy="16" r="3" />
              </svg>
            </div>
            <h3 class="mt-4 font-semibold text-stone-900 dark:text-white">{{ $t('home.features.liveMusic.title') }}</h3>
            <p class="mt-2 text-sm text-stone-600 dark:text-stone-400">{{ $t('home.features.liveMusic.description') }}</p>
          </div>
          <div class="rounded-xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900">
            <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/40" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </div>
            <h3 class="mt-4 font-semibold text-stone-900 dark:text-white">{{ $t('home.features.international.title') }}</h3>
            <p class="mt-2 text-sm text-stone-600 dark:text-stone-400">{{ $t('home.features.international.description') }}</p>
          </div>
          <div class="rounded-xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900">
            <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/40" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <h3 class="mt-4 font-semibold text-stone-900 dark:text-white">{{ $t('home.features.coworking.title') }}</h3>
            <p class="mt-2 text-sm text-stone-600 dark:text-stone-400">{{ $t('home.features.coworking.description') }}</p>
          </div>
          <div class="rounded-xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900">
            <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/40" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                <line x1="16" x2="16" y1="2" y2="6" />
                <line x1="8" x2="8" y1="2" y2="6" />
                <line x1="3" x2="21" y1="10" y2="10" />
              </svg>
            </div>
            <h3 class="mt-4 font-semibold text-stone-900 dark:text-white">{{ $t('home.features.festivals.title') }}</h3>
            <p class="mt-2 text-sm text-stone-600 dark:text-stone-400">{{ $t('home.features.festivals.description') }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="border-t border-stone-200 bg-stone-50 px-4 py-16 dark:border-stone-800 dark:bg-stone-900/30">
      <div class="mx-auto max-w-4xl text-center">
        <h2 class="text-2xl font-bold text-stone-900 dark:text-white">
          {{ $t('home.about.title') }}
        </h2>
        <p class="mt-4 text-stone-600 dark:text-stone-400">
          {{ $t('home.about.description') }}
        </p>
        <NuxtLink
          :to="localePath('/about')"
          class="mt-6 inline-flex items-center font-medium text-amber-600 hover:underline focus:outline-none focus:ring-2 focus:ring-amber-500 dark:text-amber-400"
        >
          {{ $t('home.about.link') }}
          <span aria-hidden="true">→</span>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
