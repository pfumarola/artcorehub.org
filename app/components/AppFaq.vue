<script setup lang="ts">
export interface FaqItem {
  question: string
  answer: string
}

const props = withDefaults(
  defineProps<{
    items: FaqItem[]
    /** Se true, più voci possono essere aperte contemporaneamente */
    allowMultiple?: boolean
  }>(),
  { allowMultiple: false }
)

const openIndex = ref<number | null>(null)
const openSet = ref<Set<number>>(new Set())

function toggle(index: number) {
  if (props.allowMultiple) {
    const next = new Set(openSet.value)
    if (next.has(index)) next.delete(index)
    else next.add(index)
    openSet.value = next
  } else {
    openIndex.value = openIndex.value === index ? null : index
  }
}

function isOpen(index: number): boolean {
  if (props.allowMultiple) return openSet.value.has(index)
  return openIndex.value === index
}
</script>

<template>
  <div class="divide-y divide-stone-200 rounded-2xl border-2 border-stone-200 bg-white dark:divide-stone-700 dark:border-stone-700 dark:bg-stone-900">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="group"
    >
      <h3>
        <button
          type="button"
          class="flex w-full items-center justify-between gap-4 py-4 px-5 text-left text-base font-semibold text-stone-900 transition hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-inset dark:text-white dark:hover:bg-stone-800/50 sm:px-6"
          :aria-expanded="isOpen(index)"
          :aria-controls="`faq-answer-${index}`"
          :id="`faq-question-${index}`"
          @click="toggle(index)"
        >
          <span class="pr-2">{{ item.question }}</span>
          <span
            class="shrink-0 rounded-full p-1 text-stone-500 transition group-hover:text-amber-600 dark:text-stone-400 dark:group-hover:text-amber-400"
            aria-hidden="true"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="transition-transform"
              :class="{ 'rotate-180': isOpen(index) }"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </span>
        </button>
      </h3>
      <div
        :id="`faq-answer-${index}`"
        role="region"
        :aria-labelledby="`faq-question-${index}`"
        class="grid transition-[grid-template-rows] duration-200 ease-out"
        :class="isOpen(index) ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
      >
        <div class="overflow-hidden">
          <div class="border-t border-stone-100 px-5 pb-4 pt-1 dark:border-stone-700 sm:px-6">
            <p class="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
              {{ item.answer }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
