<script setup lang="ts">
const { t } = useI18n()
usePageSeo({
  title: `${t('common.brand')} - ${t('cookiePolicy.title')}`,
  description: t('cookiePolicy.intro'),
  path: '/cookie-policy',
  keywords: 'cookie policy, cookies, ARTCORE HUB'
})
</script>

<template>
  <div>
    <section class="border-b border-stone-200 bg-stone-50 px-4 py-16 dark:border-stone-800 dark:bg-stone-900/30">
      <div class="mx-auto max-w-3xl">
        <h1 class="text-3xl font-bold tracking-tight text-stone-900 dark:text-white">
          {{ $t('cookiePolicy.title') }}
        </h1>
        <p class="mt-4 text-stone-600 dark:text-stone-400">
          {{ $t('cookiePolicy.intro') }}
        </p>
      </div>
    </section>

    <section class="px-4 py-16">
      <div class="mx-auto max-w-3xl space-y-8">
        <div>
          <h2 class="text-xl font-semibold text-stone-900 dark:text-white">
            {{ $t('cookiePolicy.what') }}
          </h2>
          <p class="mt-2 text-stone-600 dark:text-stone-400">
            {{ $t('cookiePolicy.whatDesc') }}
          </p>
        </div>
        <div>
          <h2 class="text-xl font-semibold text-stone-900 dark:text-white">
            {{ $t('cookiePolicy.types') }}
          </h2>
          <ul class="mt-4 space-y-3">
            <li class="text-stone-600 dark:text-stone-400">{{ $t('cookiePolicy.necessary') }}</li>
            <li class="text-stone-600 dark:text-stone-400">{{ $t('cookiePolicy.analytics') }}</li>
            <li class="text-stone-600 dark:text-stone-400">{{ $t('cookiePolicy.marketing') }}</li>
            <li class="text-stone-600 dark:text-stone-400">{{ $t('cookiePolicy.functional') }}</li>
          </ul>
        </div>
        <div>
          <p class="text-stone-600 dark:text-stone-400">
            {{ $t('cookiePolicy.manage') }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
