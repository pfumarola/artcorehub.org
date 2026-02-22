<script setup lang="ts">
const { t, locale } = useI18n()
usePageSeo({
  title: `${t('common.brand')} - ${t('about.hero.title')}`,
  description: t('about.mission.description'),
  path: '/about',
  keywords: 'about, mission, values, ARTCORE HUB, APS'
})

// Team: array of members (name and surname not translated, role by locale)
const teamMembers = [
  {
    image: '/images/lbonasia.jpg',
    name: 'Lucrezia',
    surname: 'Bonasia',
    role: { it: 'Co-fondatore, Direttore Artistico', en: 'Co-founder, Artistic Director' }
  },
  {
    image: '/images/pfumarola.jpg',
    name: 'Paolo',
    surname: 'Fumarola',
    role: { it: 'Co-fondatore, Direttore Operativo', en: 'Co-founder, Operational Director' }
  },
  {
    image: 'https://picsum.photos/seed/artcore-team-8/480/640',
    name: 'Diletta',
    surname: 'Bonasia',
    role: { it: 'Co-fondatore, Community Manager', en: 'Co-founder, Community Manager' }
  },
  {
    image: 'https://picsum.photos/seed/artcore-team-4/480/480',
    name: 'Michele',
    surname: 'Fumarola',
    role: { it: 'Co-fondatore, Spazi & Operazioni', en: 'Co-founder, Spaces & Operations' }
  },
  {
    image: '/images/gmarangi.jpg',
    name: 'Giusi',
    surname: 'Marangi',
    role: { it: 'Co-fondatore, Eventi', en: 'Co-founder, Events' }
  },
  {
    image: 'https://picsum.photos/seed/artcore-team-6/480/640',
    name: 'Antonio',
    surname: 'Colonna',
    role: { it: 'Co-fondatore, Eventi e logistica', en: 'Co-founder, Events & Logistics' }
  },
  {
    image: 'https://picsum.photos/seed/artcore-team-7/480/640',
    name: 'Francesco Paolo',
    surname: 'Santoro',
    role: { it: 'Co-fondatore, Marketing & Comunicazione', en: 'Co-founder, Marketing & Communication' }
  }
]
</script>

<template>
  <div>
    <section class="border-b border-stone-200 bg-gradient-to-b from-amber-50/50 to-white px-4 py-12 dark:border-stone-800 dark:from-stone-900/50 dark:to-stone-950 sm:py-16">
      <div class="mx-auto max-w-4xl px-2 text-center sm:px-4">
        <h1 class="text-2xl font-bold tracking-tight text-stone-900 dark:text-white sm:text-3xl lg:text-4xl">
          {{ $t('about.hero.title') }}
        </h1>
        <p class="mt-3 text-base text-stone-600 dark:text-stone-400 sm:mt-4 sm:text-lg">
          {{ $t('about.hero.subtitle') }}
        </p>
      </div>
    </section>

    <section class="px-4 py-12 sm:py-16">
      <div class="mx-auto max-w-3xl px-2 sm:px-4">
        <h2 class="text-xl font-bold text-stone-900 dark:text-white sm:text-2xl">
          {{ $t('about.mission.title') }}
        </h2>
        <p class="mt-3 text-sm text-stone-600 dark:text-stone-400 sm:mt-4 sm:text-base">
          {{ $t('about.mission.description') }}
        </p>
      </div>
    </section>

    <section class="border-t border-stone-200 bg-stone-50 px-4 py-12 dark:border-stone-800 dark:bg-stone-900/30 sm:py-16">
      <div class="mx-auto max-w-3xl px-2 sm:px-4">
        <h2 class="text-xl font-bold text-stone-900 dark:text-white sm:text-2xl">
          {{ $t('about.values.title') }}
        </h2>
        <ul class="mt-4 space-y-3 sm:mt-6 sm:space-y-4">
          <li class="flex items-start gap-3 rounded-lg border border-stone-200 bg-white p-3 dark:border-stone-700 dark:bg-stone-900 sm:p-4">
            <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300" aria-hidden="true">1</span>
            <span class="text-sm text-stone-700 dark:text-stone-300 sm:text-base">{{ $t('about.values.community') }}</span>
          </li>
          <li class="flex items-start gap-3 rounded-lg border border-stone-200 bg-white p-3 dark:border-stone-700 dark:bg-stone-900 sm:p-4">
            <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300" aria-hidden="true">2</span>
            <span class="text-sm text-stone-700 dark:text-stone-300 sm:text-base">{{ $t('about.values.creativity') }}</span>
          </li>
          <li class="flex items-start gap-3 rounded-lg border border-stone-200 bg-white p-3 dark:border-stone-700 dark:bg-stone-900 sm:p-4">
            <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300" aria-hidden="true">3</span>
            <span class="text-sm text-stone-700 dark:text-stone-300 sm:text-base">{{ $t('about.values.inclusion') }}</span>
          </li>
          <li class="flex items-start gap-3 rounded-lg border border-stone-200 bg-white p-3 dark:border-stone-700 dark:bg-stone-900 sm:p-4">
            <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300" aria-hidden="true">4</span>
            <span class="text-sm text-stone-700 dark:text-stone-300 sm:text-base">{{ $t('about.values.sustainability') }}</span>
          </li>
        </ul>
      </div>
    </section>

    <!-- Team: multi-row grid -->
    <section class="border-t border-stone-200 px-4 py-12 dark:border-stone-800 sm:py-16">
      <div class="mx-auto max-w-3xl px-2 sm:px-4 lg:max-w-5xl">
        <div class="text-center">
          <h2 class="text-xl font-bold text-stone-900 dark:text-white sm:text-2xl">
            {{ $t('about.team.title') }}
          </h2>
          <p class="mt-2 text-sm text-stone-600 dark:text-stone-400 sm:text-base">
            {{ $t('about.team.subtitle') }}
          </p>
        </div>
        <div class="mt-8 grid grid-cols-2 justify-items-center gap-6 sm:mt-12 sm:grid-cols-3 sm:gap-8 md:grid-cols-4 lg:mt-14 lg:gap-10">
          <article
            v-for="(member, i) in teamMembers"
            :key="`${member.name}-${member.surname}-${i}`"
            class="flex min-w-0 max-w-[11rem] flex-col items-center"
          >
            <div class="group relative h-20 w-20 shrink-0 overflow-hidden rounded-full ring-2 ring-white shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl dark:ring-stone-900 sm:h-24 sm:w-24 sm:ring-4 sm:shadow-xl md:h-28 md:w-28 lg:h-32 lg:w-32 lg:shadow-2xl">
              <img
                :src="member.image"
                :alt="member.surname ? `${member.name} ${member.surname}` : member.name"
                class="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div class="mt-3 w-full min-w-0 text-center sm:mt-4">
              <p class="truncate text-sm font-semibold text-stone-900 dark:text-white sm:text-base" :title="member.surname ? `${member.name} ${member.surname}` : member.name">
                {{ member.name }}{{ member.surname ? ` ${member.surname}` : '' }}
              </p>
              <p class="mt-0.5 text-xs text-amber-600 dark:text-amber-400 sm:text-sm">
                {{ member.role[locale] }}
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>
