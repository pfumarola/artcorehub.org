<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: boolean
    title: string
    titleId: string
    maxWidth?: 'md' | 'lg'
  }>(),
  { maxWidth: 'md' }
)

const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()

function close() {
  emit('update:modelValue', false)
}
</script>

<template>
  <Teleport to="body">
    <div
      v-show="modelValue"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))]"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="titleId"
      @keydown.escape="close"
    >
      <div
        class="absolute inset-0 bg-stone-900/60 dark:bg-stone-950/80"
        aria-hidden="true"
        @click="close"
      />
      <div
        class="relative flex max-h-[min(90vh,calc(100dvh-2rem))] w-full flex-col rounded-2xl border-2 border-amber-200 bg-amber-50/95 shadow-xl dark:border-amber-800 dark:bg-amber-900/30"
        :class="maxWidth === 'lg' ? 'max-w-lg' : 'max-w-md'"
        @click.stop
      >
        <div class="flex shrink-0 items-start justify-between gap-4 border-b border-amber-200/80 px-4 py-4 sm:px-6 dark:border-amber-800/50">
          <h3 :id="titleId" class="text-lg font-semibold text-amber-900 dark:text-amber-100">
            {{ title }}
          </h3>
          <button
            type="button"
            class="flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-lg text-stone-500 transition hover:bg-amber-200 hover:text-stone-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:hover:bg-amber-800/50 dark:hover:text-stone-200"
            :aria-label="$t('common.close')"
            @click="close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-6">
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>
