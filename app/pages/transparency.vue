<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

usePageSeo({
  title: `${t('common.brand')} - ${t('transparency.hero.title')}`,
  description: t('transparency.hero.subtitle'),
  path: '/transparency',
  keywords: t('seo.keywords.transparency')
})
useBreadcrumbStructuredData([
  { name: t('nav.home'), path: localePath('/') },
  { name: t('transparency.hero.title'), path: localePath('/transparency') }
])

// Statute: place the file at public/documents/statuto.pdf (or update the URL)
const statutoUrl = '/documents/statuto.pdf'

// Financial reports by year: add year, report link and optional attachments here
interface Allegato {
  label: string
  url: string
}
interface RendicontoAnno {
  year: number
  rendicontoUrl: string
  attachments?: Allegato[]
}

const rendicontiPerAnno = ref<RendicontoAnno[]>([
  // Example (comment out or remove when you have the files):
  // { year: 2024, rendicontoUrl: '/documents/rendiconto-2024.pdf', attachments: [{ label: 'Allegato A', url: '/documents/2024-allegato-a.pdf' }] },
  // { year: 2023, rendicontoUrl: '/documents/rendiconto-2023.pdf' },
])
</script>

<template>
  <div>
    <section class="border-b border-stone-200 bg-gradient-to-b from-amber-50/50 to-white px-4 py-16 dark:border-stone-800 dark:from-stone-900/50 dark:to-stone-950">
      <div class="mx-auto max-w-4xl text-center">
        <h1 class="text-3xl font-bold tracking-tight text-stone-900 dark:text-white sm:text-4xl">
          {{ $t('transparency.hero.title') }}
        </h1>
        <p class="mt-4 text-lg text-stone-600 dark:text-stone-400">
          {{ $t('transparency.hero.subtitle') }}
        </p>
      </div>
    </section>

    <section class="px-4 py-16">
      <div class="mx-auto max-w-3xl space-y-12">
        <!-- Statute -->
        <div class="rounded-xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
          <h2 class="text-xl font-semibold text-stone-900 dark:text-white">
            {{ $t('transparency.statuto.title') }}
          </h2>
          <p class="mt-2 text-stone-600 dark:text-stone-400">
            {{ $t('transparency.statuto.description') }}
          </p>
          <a
            :href="statutoUrl"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="`${$t('transparency.statuto.linkText')} (${$t('a11y.opensNewTab')})`"
            class="mt-4 inline-flex items-center font-medium text-amber-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:text-amber-400"
          >
            {{ $t('transparency.statuto.linkText') }}
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        <!-- Financial reports -->
        <div class="rounded-xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
          <h2 class="text-xl font-semibold text-stone-900 dark:text-white">
            {{ $t('transparency.rendiconti.title') }}
          </h2>
          <p class="mt-2 text-stone-600 dark:text-stone-400">
            {{ $t('transparency.rendiconti.description') }}
          </p>

          <template v-if="rendicontiPerAnno.length > 0">
            <ul class="mt-6 space-y-6">
              <li
                v-for="item in rendicontiPerAnno"
                :key="item.year"
                class="rounded-lg border border-stone-200 bg-stone-50 p-4 dark:border-stone-700 dark:bg-stone-800/50"
              >
                <h3 class="font-medium text-stone-900 dark:text-white">
                  {{ $t('transparency.rendiconti.year', { year: item.year }) }}
                </h3>
                <div class="mt-2 flex flex-wrap gap-3">
                  <a
                    :href="item.rendicontoUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    :aria-label="`${$t('transparency.rendiconti.rendiconto')} (${$t('a11y.opensNewTab')})`"
                    class="text-sm font-medium text-amber-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:text-amber-400"
                  >
                    {{ $t('transparency.rendiconti.rendiconto') }}
                    <span aria-hidden="true">↗</span>
                  </a>
                  <template v-if="item.attachments && item.attachments.length > 0">
                    <span class="text-stone-400 dark:text-stone-500">|</span>
                    <span class="text-sm text-stone-500 dark:text-stone-400">
                      {{ $t('transparency.rendiconti.allegati') }}:
                    </span>
                    <template v-for="(att, i) in item.attachments" :key="att.url">
                      <a
                        :href="att.url"
                        target="_blank"
                        rel="noopener noreferrer"
                        :aria-label="`${att.label} (${$t('a11y.opensNewTab')})`"
                        class="text-sm font-medium text-amber-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:text-amber-400"
                      >
                        {{ att.label }}<span aria-hidden="true">↗</span>
                      </a>
                      <span v-if="item.attachments && i < item.attachments.length - 1" class="text-stone-400">,</span>
                    </template>
                  </template>
                </div>
              </li>
            </ul>
          </template>
          <p v-else class="mt-4 text-sm text-stone-500 dark:text-stone-400">
            {{ $t('transparency.rendiconti.noData') }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
