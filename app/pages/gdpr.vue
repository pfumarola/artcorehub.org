<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
usePageSeo({
  title: `${t('common.brand')} - ${t('gdpr.title')}`,
  description: t('gdpr.subtitle'),
  path: '/gdpr',
  keywords: t('seo.keywords.gdpr'),
  image: '/images/og-default.webp'
})
useBreadcrumbStructuredData([
  { name: t('nav.home'), path: localePath('/') },
  { name: t('gdpr.title'), path: localePath('/gdpr') }
])

const dataTypes = ['item1', 'item2', 'item3', 'item4', 'item5'] as const
const legalBases = ['item1', 'item2', 'item3', 'item4'] as const
const disclosures = ['item1', 'item2', 'item3'] as const
</script>

<template>
  <div>
    <section class="border-b border-stone-200 bg-stone-50 px-4 py-16 dark:border-stone-800 dark:bg-stone-900/30">
      <div class="mx-auto max-w-3xl">
        <h1 class="text-3xl font-bold tracking-tight text-stone-900 dark:text-white">
          {{ $t('gdpr.title') }}
        </h1>
        <p class="mt-4 text-stone-600 dark:text-stone-400">{{ $t('gdpr.subtitle') }}</p>
        <p class="mt-1 text-stone-600 dark:text-stone-400">{{ $t('gdpr.entity') }}</p>
        <p class="mt-1 text-stone-600 dark:text-stone-400">{{ $t('gdpr.address') }}</p>
        <p class="mt-1 text-stone-600 dark:text-stone-400">{{ $t('gdpr.email') }}</p>
      </div>
    </section>

    <section class="px-4 py-16">
      <div class="mx-auto max-w-3xl space-y-8">
        <div>
          <h2 class="text-xl font-semibold text-stone-900 dark:text-white">
            {{ $t('gdpr.sections.controller.title') }}
          </h2>
          <p class="mt-2 text-stone-600 dark:text-stone-400">
            {{ $t('gdpr.sections.controller.body') }}
          </p>
        </div>
        <div>
          <h2 class="text-xl font-semibold text-stone-900 dark:text-white">
            {{ $t('gdpr.sections.dataTypes.title') }}
          </h2>
          <p class="mt-2 text-stone-600 dark:text-stone-400">{{ $t('gdpr.sections.dataTypes.lead') }}</p>
          <ul class="mt-3 list-disc space-y-2 pl-6 text-stone-600 dark:text-stone-400">
            <li v-for="key in dataTypes" :key="key">{{ $t(`gdpr.sections.dataTypes.${key}`) }}</li>
          </ul>
          <p class="mt-3 text-stone-600 dark:text-stone-400">{{ $t('gdpr.sections.dataTypes.minorsNote') }}</p>
        </div>
        <div>
          <h2 class="text-xl font-semibold text-stone-900 dark:text-white">
            {{ $t('gdpr.sections.purpose.title') }}
          </h2>
          <p class="mt-2 text-stone-600 dark:text-stone-400">{{ $t('gdpr.sections.purpose.lead') }}</p>
          <ul class="mt-3 list-disc space-y-2 pl-6 text-stone-600 dark:text-stone-400">
            <li v-for="key in legalBases" :key="key">{{ $t(`gdpr.sections.purpose.${key}`) }}</li>
          </ul>
        </div>
        <div>
          <h2 class="text-xl font-semibold text-stone-900 dark:text-white">
            {{ $t('gdpr.sections.processing.title') }}
          </h2>
          <p class="mt-2 text-stone-600 dark:text-stone-400">
            {{ $t('gdpr.sections.processing.p1') }}
          </p>
          <p class="mt-2 text-stone-600 dark:text-stone-400">
            {{ $t('gdpr.sections.processing.p2') }}
          </p>
        </div>
        <div>
          <h2 class="text-xl font-semibold text-stone-900 dark:text-white">
            {{ $t('gdpr.sections.disclosure.title') }}
          </h2>
          <p class="mt-2 text-stone-600 dark:text-stone-400">{{ $t('gdpr.sections.disclosure.lead') }}</p>
          <ul class="mt-3 list-disc space-y-2 pl-6 text-stone-600 dark:text-stone-400">
            <li v-for="key in disclosures" :key="key">{{ $t(`gdpr.sections.disclosure.${key}`) }}</li>
          </ul>
          <p class="mt-3 text-stone-600 dark:text-stone-400">{{ $t('gdpr.sections.disclosure.noTransfer') }}</p>
        </div>
        <div>
          <h2 class="text-xl font-semibold text-stone-900 dark:text-white">
            {{ $t('gdpr.sections.retention.title') }}
          </h2>
          <p class="mt-2 text-stone-600 dark:text-stone-400">
            {{ $t('gdpr.sections.retention.body') }}
          </p>
        </div>
        <div>
          <h2 class="text-xl font-semibold text-stone-900 dark:text-white">
            {{ $t('gdpr.sections.rights.title') }}
          </h2>
          <p class="mt-2 text-stone-600 dark:text-stone-400">
            {{ $t('gdpr.sections.rights.p1') }}
          </p>
          <p class="mt-2 text-stone-600 dark:text-stone-400">
            {{ $t('gdpr.sections.rights.p2') }}
          </p>
        </div>
        <div>
          <h2 class="text-xl font-semibold text-stone-900 dark:text-white">
            {{ $t('gdpr.sections.cookies.title') }}
          </h2>
          <p class="mt-2 text-stone-600 dark:text-stone-400">
            {{ $t('gdpr.sections.cookies.p1') }}
          </p>
          <p class="mt-2 text-stone-600 dark:text-stone-400">
            {{ $t('gdpr.sections.cookies.p2') }}
          </p>
        </div>
        <div>
          <h2 class="text-xl font-semibold text-stone-900 dark:text-white">
            {{ $t('gdpr.sections.updates.title') }}
          </h2>
          <p class="mt-2 text-stone-600 dark:text-stone-400">
            {{ $t('gdpr.sections.updates.p1') }}
          </p>
          <p class="mt-2 text-stone-600 dark:text-stone-400">
            {{ $t('gdpr.sections.updates.p2') }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
