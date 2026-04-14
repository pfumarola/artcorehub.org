<script setup lang="ts">
const { t } = useI18n()

type EarlyMerchImage = {
  src: string
}

const props = withDefaults(
  defineProps<{
    /** Se vuoto, usa la gallery predefinita */
    images?: EarlyMerchImage[]
  }>(),
  { images: undefined }
)

const defaultGallery: EarlyMerchImage[] = [
  { src: '/images/gadget-1.jpg' },
  { src: '/images/gadget-2.png' }
]

const items = computed(() => props.images ?? defaultGallery)

function hideBroken(e: Event) {
  const el = e.target as HTMLImageElement | null
  if (el?.parentElement) el.parentElement.style.display = 'none'
}
</script>

<template>
  <section
    class="rounded-2xl border border-stone-200 bg-gradient-to-br from-white to-amber-50/40 p-6 shadow-sm dark:border-stone-700 dark:from-stone-900 dark:to-amber-950/30 sm:p-8"
    aria-labelledby="early-merch-title"
  >
    <div class="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start lg:gap-8">
      <div class="max-w-3xl">
      <p class="text-xs font-semibold uppercase tracking-wider text-amber-800 dark:text-amber-300">
        {{ t('home.project.earlyMerch.kicker') }}
      </p>
      <h2
        id="early-merch-title"
        class="mt-2 text-xl font-bold tracking-tight text-stone-900 dark:text-white sm:text-2xl"
      >
        {{ t('home.project.earlyMerch.title') }}
      </h2>
      <p class="mt-3 text-sm leading-relaxed text-stone-600 dark:text-stone-400 sm:text-base">
        {{ t('home.project.earlyMerch.body') }}
      </p>
      <p class="mt-2 text-xs leading-relaxed text-stone-500 dark:text-stone-500">
        {{ t('home.project.earlyMerch.disclaimer') }}
      </p>
      </div>

      <div
        class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-2 lg:gap-4"
        role="list"
        :aria-label="t('home.project.earlyMerch.sliderAria')"
      >
        <figure
          v-for="(item, i) in items"
          :key="`g-${item.src}-${i}`"
          role="listitem"
          class="overflow-hidden rounded-xl ring-1 ring-stone-200/90 dark:ring-stone-600"
        >
          <div class="aspect-[4/3] w-full bg-stone-100 dark:bg-stone-800">
            <img
              :src="item.src"
              :alt="t('home.project.earlyMerch.imageAlt', { n: i + 1 })"
              class="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
              @error="hideBroken"
            >
          </div>
        </figure>
      </div>
    </div>
  </section>
</template>
