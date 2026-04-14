<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const config = useRuntimeConfig().public
const coworkingSpotsLeft = (config.coworkingSpotsLeft as number) ?? 10

usePageSeo({
  title: `${t('common.brand')} - ${t('theSpace.hero.title')}`,
  description: t('theSpace.hero.subtitle'),
  path: '/the-space',
  keywords: t('seo.keywords.theSpace')
})
useBreadcrumbStructuredData([
  { name: t('nav.home'), path: localePath('/') },
  { name: t('theSpace.hero.title'), path: localePath('/the-space') }
])

const storyBlocks = ['morning', 'day', 'evening', 'night'] as const
const spaceBlockImages: Record<(typeof storyBlocks)[number], string> = {
  morning: '/images/space-morning.jpg',
  day: '/images/space-day.jpg',
  evening: '/images/space-evening.jpg',
  night: '/images/space-night.jpg'
}

const faqItems = computed(() => [
  { question: t('home.faq.q1.question'), answer: t('home.faq.q1.answer') },
  { question: t('home.faq.q2.question'), answer: t('home.faq.q2.answer') },
  { question: t('home.faq.q3.question'), answer: t('home.faq.q3.answer') },
  { question: t('home.faq.q4.question'), answer: t('home.faq.q4.answer') },
  { question: t('home.faq.q5.question'), answer: t('home.faq.q5.answer') },
  { question: t('home.faq.q6.question'), answer: t('home.faq.q6.answer') }
])

function contactUrl(subjectKey: 'membershipApplication') {
  const subject = t(`home.project.contactSubject.${subjectKey}`)
  return `${localePath('/')}?subject=${encodeURIComponent(subject)}#contact`
}

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
    <section class="relative border-b border-stone-200 overflow-hidden bg-gradient-to-b from-amber-50/50 to-white px-4 py-16 dark:border-stone-800 dark:from-stone-900/50 dark:to-stone-950">
      <div
        class="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style="background-image: url('/images/the-space-hero.jpg')"
        aria-hidden="true"
      />
      <div class="absolute inset-0 bg-white/70 dark:bg-stone-950/80" aria-hidden="true" />
      <div class="relative z-10 mx-auto max-w-3xl text-center">
        <h1 class="text-3xl font-bold tracking-tight text-stone-900 dark:text-white sm:text-4xl">
          {{ $t('theSpace.hero.title') }}
        </h1>
        <p class="mt-4 text-lg text-stone-600 dark:text-stone-400">
          {{ $t('theSpace.hero.subtitle') }}
        </p>
      </div>
    </section>

    <section class="px-4 py-12 sm:py-16">
      <div class="mx-auto max-w-2xl">
        <p class="text-center text-lg leading-relaxed text-stone-600 dark:text-stone-400">
          {{ $t('theSpace.intro') }}
        </p>
      </div>
    </section>

    <section class="border-t border-stone-200 bg-stone-50 px-4 py-12 dark:border-stone-800 dark:bg-stone-900/30 sm:py-16">
      <div class="mx-auto max-w-4xl space-y-16">
        <article
          v-for="(blockKey, i) in storyBlocks"
          :key="blockKey"
          class="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 md:items-center"
        >
          <div
            class="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-stone-200 dark:bg-stone-800"
            :class="i % 2 === 0 ? 'md:order-1' : 'md:order-2'"
          >
            <img
              :src="spaceBlockImages[blockKey]"
              :alt="$t(`theSpace.${blockKey}.title`)"
              class="h-full w-full object-cover"
              loading="lazy"
              @error="($event.target as HTMLImageElement).style.display = 'none'"
            />
          </div>
          <div
            class="min-w-0"
            :class="[i % 2 === 0 ? 'md:order-2' : 'md:order-1', i % 2 === 0 ? 'text-left' : 'text-left md:text-right']"
          >
            <h2 class="text-xl font-semibold text-amber-900 dark:text-amber-100 sm:text-2xl">
              {{ $t(`theSpace.${blockKey}.title`) }}
            </h2>
            <p class="mt-3 text-base leading-relaxed text-stone-600 dark:text-stone-400">
              {{ $t(`theSpace.${blockKey}.body`) }}
            </p>
          </div>
        </article>
      </div>
    </section>

    <section class="border-t border-stone-200 px-4 py-12 dark:border-stone-800 sm:py-16">
      <div class="mx-auto max-w-2xl text-center">
        <p class="text-lg leading-relaxed text-stone-600 dark:text-stone-400">
          {{ $t('theSpace.outro') }}
        </p>
      </div>
    </section>

    <section class="border-t border-stone-200 bg-stone-50 px-4 py-12 dark:border-stone-800 dark:bg-stone-900/30 sm:py-16">
      <div class="mx-auto max-w-4xl">
        <p class="mb-10 text-center text-base leading-relaxed text-stone-600 dark:text-stone-400 sm:mb-12">
          {{ $t('theSpace.membershipIntro') }}
        </p>
        <div class="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10 lg:items-start">
          <div>
            <h2 class="text-center text-2xl font-bold text-stone-900 dark:text-white lg:text-left">
              {{ $t('home.faq.title') }}
            </h2>
            <div class="mt-8">
              <AppFaq :items="faqItems" />
            </div>
          </div>
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
              <ul class="mt-4 space-y-2 text-sm text-stone-600 dark:text-stone-400">
                <li>{{ $t('home.project.placesLimit') }}</li>
                <li>{{ $t('home.project.reserveByAdvance') }}</li>
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
        <div class="mx-auto mt-12 max-w-4xl sm:mt-14">
          <AppEarlyMerchGallery />
        </div>
      </div>
    </section>
  </div>
</template>
