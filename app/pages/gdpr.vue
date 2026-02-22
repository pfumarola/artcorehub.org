<script setup lang="ts">
const { t } = useI18n()
usePageSeo({
  title: `${t('common.brand')} - ${t('gdpr.title')}`,
  description: t('gdpr.intro'),
  path: '/gdpr',
  keywords: 'privacy, GDPR, ARTCORE HUB'
})
</script>

<template>
  <div>
    <section class="border-b border-stone-200 bg-stone-50 px-4 py-16 dark:border-stone-800 dark:bg-stone-900/30">
      <div class="mx-auto max-w-3xl">
        <h1 class="text-3xl font-bold tracking-tight text-stone-900 dark:text-white">
          {{ $t('gdpr.title') }}
        </h1>
        <p class="mt-4 text-stone-600 dark:text-stone-400">
          {{ $t('gdpr.intro') }}
        </p>
      </div>
    </section>

    <section class="px-4 py-16">
      <div class="mx-auto max-w-3xl space-y-8">
        <div>
          <h2 class="text-xl font-semibold text-stone-900 dark:text-white">
            {{ $t('gdpr.controller') }}
          </h2>
          <p class="mt-2 text-stone-600 dark:text-stone-400">
            {{ $t('gdpr.controllerDesc') }}
          </p>
        </div>
        <div>
          <h2 class="text-xl font-semibold text-stone-900 dark:text-white">
            {{ $t('gdpr.data') }}
          </h2>
          <p class="mt-2 text-stone-600 dark:text-stone-400">
            {{ $t('gdpr.dataDesc') }}
          </p>
        </div>
        <div>
          <h2 class="text-xl font-semibold text-stone-900 dark:text-white">
            {{ $t('gdpr.purpose') }}
          </h2>
          <p class="mt-2 text-stone-600 dark:text-stone-400">
            {{ $t('gdpr.purposeDesc') }}
          </p>
        </div>
        <div>
          <h2 class="text-xl font-semibold text-stone-900 dark:text-white">
            {{ $t('gdpr.rights') }}
          </h2>
          <p class="mt-2 text-stone-600 dark:text-stone-400">
            {{ $t('gdpr.rightsDesc') }}
          </p>
        </div>
        <div>
          <h2 class="text-xl font-semibold text-stone-900 dark:text-white">
            {{ $t('gdpr.contact') }}
          </h2>
          <p class="mt-2 text-stone-600 dark:text-stone-400">
            info@artcorehub.org
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
