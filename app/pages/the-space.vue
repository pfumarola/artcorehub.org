<script setup lang="ts">
const { t } = useI18n()
usePageSeo({
  title: `${t('common.brand')} - ${t('theSpace.hero.title')}`,
  description: t('theSpace.hero.subtitle'),
  path: '/the-space',
  keywords: 'spazio, coworking, live music, eventi, ARTCORE HUB'
})

const storyBlocks = ['morning', 'day', 'evening', 'night'] as const

const faqItems = computed(() => [
  { question: t('home.faq.q1.question'), answer: t('home.faq.q1.answer') },
  { question: t('home.faq.q2.question'), answer: t('home.faq.q2.answer') },
  { question: t('home.faq.q3.question'), answer: t('home.faq.q3.answer') },
  { question: t('home.faq.q4.question'), answer: t('home.faq.q4.answer') }
])
</script>

<template>
  <div>
    <section class="border-b border-stone-200 bg-gradient-to-b from-amber-50/50 to-white px-4 py-16 dark:border-stone-800 dark:from-stone-900/50 dark:to-stone-950">
      <div class="mx-auto max-w-3xl text-center">
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
      <div class="mx-auto max-w-2xl space-y-16">
        <article
          v-for="(blockKey, i) in storyBlocks"
          :key="blockKey"
          class="relative"
          :class="i % 2 === 0 ? 'text-left' : 'text-right sm:pr-0'"
        >
          <h2 class="text-xl font-semibold text-amber-900 dark:text-amber-100 sm:text-2xl">
            {{ $t(`theSpace.${blockKey}.title`) }}
          </h2>
          <p class="mt-3 text-base leading-relaxed text-stone-600 dark:text-stone-400">
            {{ $t(`theSpace.${blockKey}.body`) }}
          </p>
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
          {{ $t('theSpace.earlyAdopterIntro') }}
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
            <div class="mt-8">
              <AppFundraisingWidget />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
