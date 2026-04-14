<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

usePageSeo({
  title: `${t('common.brand')} - ${t('home.hero.subtitle')}`,
  description: t('home.about.description'),
  path: '/',
  keywords: t('seo.keywords.home')
})

// Project milestones: 'done' | 'current' | 'next' (edit to reflect real progress)
const milestoneKeys = ['idea', 'space', 'setup', 'opening'] as const
const milestoneStatus: Record<(typeof milestoneKeys)[number], 'done' | 'current' | 'next'> = {
  idea: 'done',
  space: 'done',
  setup: 'current',
  opening: 'next'
}

const config = useRuntimeConfig().public
const instagramUrl = (config.instagramUrl as string) || ''
const coworkingSpotsLeft = (config.coworkingSpotsLeft as number) ?? 10

const faqItems = computed(() => [
  { question: t('home.faq.q1.question'), answer: t('home.faq.q1.answer') },
  { question: t('home.faq.q2.question'), answer: t('home.faq.q2.answer') },
  { question: t('home.faq.q3.question'), answer: t('home.faq.q3.answer') },
  { question: t('home.faq.q4.question'), answer: t('home.faq.q4.answer') },
  { question: t('home.faq.q5.question'), answer: t('home.faq.q5.answer') },
  { question: t('home.faq.q6.question'), answer: t('home.faq.q6.answer') }
])

function contactUrl(subjectKey: 'interested' | 'help' | 'membershipApplication') {
  const subject = t(`home.project.contactSubject.${subjectKey}`)
  return `${localePath('/')}?subject=${encodeURIComponent(subject)}#contact`
}

const featureCards = [
  { key: 'liveMusic', image: '/images/feature-live.jpg' },
  { key: 'international', image: '/images/feature-international.jpg' },
  { key: 'coworking', image: '/images/feature-coworking.jpg' },
  { key: 'festivals', image: '/images/feature-festivals.jpg' }
] as const

type CoworkingPlan = {
  key: 'daily' | 'monthly' | 'quarterly' | 'semiannual'
  amount: string
  periodKey: 'day' | 'month'
  oldAmount?: string
  savingPerMonth?: string
}

const coworkingPlans: CoworkingPlan[] = [
  { key: 'daily', amount: '40€', periodKey: 'day' },
  { key: 'monthly', amount: '180€', periodKey: 'month' },
  { key: 'quarterly', amount: '150€', periodKey: 'month', oldAmount: '180€', savingPerMonth: '30€' },
  { key: 'semiannual', amount: '120€', periodKey: 'month', oldAmount: '180€', savingPerMonth: '60€' }
]

</script>

<template>
  <div>
    <section class="relative border-b border-stone-200 overflow-hidden px-4 py-16 dark:border-stone-800">
      <div
        class="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style="background-image: url('/images/wall.png')"
        aria-hidden="true"
      />
      <div class="absolute inset-0 bg-white/70 dark:bg-stone-950/80" aria-hidden="true" />
      <div class="relative z-10 mx-auto max-w-4xl text-center">
        <h1 class="text-3xl font-bold tracking-tight text-stone-900 dark:text-white sm:text-4xl md:text-5xl">
          {{ $t('home.hero.title') }}
        </h1>
        <p class="mt-4 text-lg text-stone-600 dark:text-stone-400">
          {{ $t('home.hero.subtitle') }}
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-4">
          <NuxtLink
            :to="localePath('/the-space')"
            class="inline-flex items-center rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-medium text-amber-950 hover:bg-amber-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
          >
            {{ $t('home.hero.ctaCoworking') }}
          </NuxtLink>
          <NuxtLink
            :to="localePath('/events')"
            class="inline-flex items-center rounded-lg border border-stone-300 bg-white px-5 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:border-stone-600 dark:bg-stone-900 dark:text-stone-200 dark:hover:bg-stone-800"
          >
            {{ $t('home.hero.ctaEvents') }}
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Project status: FAQ + Get involved affiancati, poi journey e step -->
    <section class="border-t border-stone-200 bg-stone-50 px-4 py-16 dark:border-stone-800 dark:bg-stone-900/30">

            <!-- The coworking journey: testo + immagine a lato -->
      <div class="mx-auto mt-10 max-w-6xl lg:mt-12 lg:grid lg:grid-cols-2 lg:gap-10 lg:items-start">
        <div class="max-w-4xl lg:max-w-none">
          <h2 class="text-center text-2xl font-bold text-stone-900 dark:text-white lg:text-left">
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
            <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
              <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
                </svg>
              </span>
              <p class="text-base leading-relaxed text-stone-600 dark:text-stone-400 sm:flex-1 sm:text-left">
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
        <div class="relative mt-10 aspect-[4/3] w-full overflow-hidden rounded-xl bg-stone-200 dark:bg-stone-800 lg:mt-0">
          <img
            src="/images/journey.jpg"
            :alt="$t('home.journey.imageAlt')"
            class="h-full w-full object-cover"
            loading="lazy"
            @error="($event.target as HTMLImageElement).style.display = 'none'"
          />
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

        <!-- Right column: Diventa socio (piani riservati ai soci) -->
        <div class="min-w-0">
          <h2 class="text-center text-2xl font-bold text-stone-900 dark:text-white lg:text-left">
            {{ $t('home.project.getInvolved') }}
          </h2>
          <div class="mt-8 rounded-2xl border-2 border-amber-200 bg-amber-50/80 p-5 shadow-sm dark:border-amber-800 dark:bg-amber-900/20 sm:p-6">
            <p class="inline-flex items-center gap-2 rounded-full bg-amber-200/90 px-3 py-1 text-sm font-semibold text-amber-900 dark:bg-amber-800/60 dark:text-amber-100">
              {{ $t('home.project.spotsRemaining', { count: coworkingSpotsLeft }) }}
            </p>
            <p class="mt-3 font-semibold text-stone-900 dark:text-white">
              {{ $t('home.project.plansDisclaimer') }}
            </p>
            <p class="mt-4 text-sm font-medium text-stone-700 dark:text-stone-300">
              {{ $t('home.project.contributionOverview') }}
            </p>
            <ul class="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <li
                v-for="plan in coworkingPlans"
                :key="plan.key"
                class="flex h-full flex-col justify-between rounded-xl border p-3"
                :class="plan.key === 'semiannual'
                  ? 'border-amber-500 bg-white/80 dark:border-amber-400 dark:bg-stone-900/50'
                  : 'border-amber-200/80 bg-white/80 dark:border-amber-800/70 dark:bg-stone-900/50'"
              >
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <p class="text-sm font-semibold text-stone-900 dark:text-white">
                      {{ $t(`home.project.plans.${plan.key}.name`) }}
                    </p>
                  </div>
                  <div class="text-right">
                    <p class="text-sm font-semibold text-stone-900 dark:text-white">
                      {{ plan.amount }}/{{ $t(`home.project.plans.period.${plan.periodKey}`) }}
                    </p>
                    <p
                      v-if="plan.oldAmount"
                      class="text-xs text-stone-500 line-through dark:text-stone-400"
                    >
                      {{ plan.oldAmount }}/{{ $t(`home.project.plans.period.${plan.periodKey}`) }}
                    </p>
                  </div>
                </div>
                <p
                  v-if="plan.savingPerMonth"
                  class="mt-2 text-xs font-medium text-emerald-700 dark:text-emerald-300"
                >
                  {{ $t('home.project.plans.savePerMonth', { amount: plan.savingPerMonth }) }}
                </p>
              </li>
            </ul>
            <p class="mt-3 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
              {{ $t('home.project.howToJoin') }}
            </p>
            <NuxtLink
              :to="contactUrl('membershipApplication')"
              class="mt-6 inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-medium text-amber-950 transition hover:bg-amber-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-stone-900"
            >
              {{ $t('home.project.becomeMemberCta') }}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>

      <div class="mx-auto mt-14 max-w-6xl lg:mt-16">
        <AppEarlyMerchGallery />
      </div>

      <!-- Timeline step: riga full-width per leggibilità -->
      <div class="mx-auto mt-14 max-w-6xl lg:mt-20" role="list" aria-label="Stato del progetto">
        <div class="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 lg:gap-6">
          <template v-for="(key, index) in milestoneKeys" :key="key">
            <div
              role="listitem"
              :aria-current="milestoneStatus[key] === 'current' ? 'step' : undefined"
              class="relative flex min-w-0 flex-col rounded-xl border-2 p-3 transition-all sm:p-4"
              :class="{
                'border-amber-500 bg-amber-50/80 dark:bg-amber-900/20 dark:border-amber-400': milestoneStatus[key] === 'current',
                'border-amber-200 bg-amber-50/80 dark:bg-amber-900/20 dark:border-amber-800/40': milestoneStatus[key] === 'done',
                'border-stone-200 bg-stone-100/50 dark:border-stone-800 dark:bg-stone-900/50': milestoneStatus[key] === 'next'
              }"
            >
              <span
                class="mb-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-semibold sm:h-8 sm:w-8"
                :class="{
                  'bg-amber-500 text-white dark:bg-amber-500': milestoneStatus[key] === 'current' || milestoneStatus[key] === 'done',
                  'bg-stone-200 text-stone-500 dark:bg-stone-700 dark:text-stone-400': milestoneStatus[key] === 'next'
                }"
                aria-hidden="true"
              >
                {{ index + 1 }}
              </span>
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
                :aria-label="`${$t('home.project.followProgress')} (Instagram) (${$t('a11y.opensNewTab')})`"
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
            class="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-medium text-amber-950 transition hover:bg-amber-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-stone-900"
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
            class="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-medium text-amber-950 transition hover:bg-amber-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-stone-900"
          >
            {{ $t('home.project.contactCta') }}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="relative overflow-hidden px-4 py-16">
      <div class="absolute inset-0 pointer-events-none opacity-[0.08] dark:opacity-[0.12]" aria-hidden="true">
        <svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="features-dots" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="4" cy="4" r="0.8" fill="#a8a29e" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#features-dots)" />
        </svg>
      </div>
      <div class="relative z-10 mx-auto max-w-6xl">
        <h2 class="text-center text-2xl font-bold text-stone-900 dark:text-white">
          {{ $t('home.features.title') }}
        </h2>
        <div class="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="feat in featureCards"
            :key="feat.key"
            class="rounded-xl border border-stone-200 bg-white shadow-sm dark:border-stone-800 dark:bg-stone-900 overflow-hidden"
          >
            <div class="relative aspect-[4/3] w-full bg-stone-200 dark:bg-stone-800">
              <img
                :src="feat.image"
                :alt="$t(`home.features.${feat.key}.title`)"
                class="h-full w-full object-cover"
                loading="lazy"
                @error="($event.target as HTMLImageElement).style.display = 'none'"
              />
            </div>
            <div class="p-6">
              <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/40" aria-hidden="true">
                <svg v-if="feat.key === 'liveMusic'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
                </svg>
                <svg v-else-if="feat.key === 'international'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                <svg v-else-if="feat.key === 'coworking'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" />
                </svg>
              </div>
              <h3 class="mt-4 font-semibold text-stone-900 dark:text-white">{{ $t(`home.features.${feat.key}.title`) }}</h3>
              <p class="mt-2 text-sm text-stone-600 dark:text-stone-400">{{ $t(`home.features.${feat.key}.description`) }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="relative border-t border-stone-200 overflow-hidden bg-stone-50 px-4 py-16 dark:border-stone-800 dark:bg-stone-900/30">
      <span class="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-amber-200/30 dark:bg-amber-900/20" aria-hidden="true" />
      <div class="relative z-10 mx-auto max-w-6xl grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10 lg:items-center">
        <div class="relative order-2 aspect-[4/3] w-full overflow-hidden rounded-xl bg-stone-200 dark:bg-stone-800 lg:order-1">
          <img
            src="/images/about-teaser.jpg"
            :alt="$t('home.about.imageAlt')"
            class="h-full w-full object-cover"
            loading="lazy"
            @error="($event.target as HTMLImageElement).style.display = 'none'"
          />
        </div>
        <div class="order-1 text-center lg:order-2 lg:text-left">
          <h2 class="text-2xl font-bold text-stone-900 dark:text-white">
            {{ $t('home.about.title') }}
          </h2>
          <p class="mt-4 text-stone-600 dark:text-stone-400">
            {{ $t('home.about.description') }}
          </p>
          <NuxtLink
            :to="localePath('/about')"
            class="mt-6 inline-flex items-center font-medium text-amber-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:text-amber-400"
          >
            {{ $t('home.about.link') }}
            <span aria-hidden="true">→</span>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
