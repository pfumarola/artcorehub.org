<script setup lang="ts">
const { getCategories, savePreferences, showBanner } = useCookieConsent()
const localePath = useLocalePath()
const isOpen = useState('cookie-preferences-open', () => false)
const modalContentRef = ref<HTMLElement | null>(null)

const categories = ref<{ analytics: boolean; marketing: boolean; functional: boolean }>({
  analytics: false,
  marketing: false,
  functional: false
})

function close() {
  isOpen.value = false
}

useFocusTrap(modalContentRef, isOpen, { onEscape: close })

watch(isOpen, (open) => {
  if (open) {
    const c = getCategories()
    categories.value = {
      analytics: c.analytics,
      marketing: c.marketing,
      functional: c.functional
    }
  }
})

function save() {
  savePreferences({
    necessary: true,
    analytics: categories.value.analytics,
    marketing: categories.value.marketing,
    functional: categories.value.functional
  })
  isOpen.value = false
}
</script>

<template>
  <Teleport to="body">
    <div
      v-show="isOpen"
      class="fixed inset-0 z-[101] flex items-center justify-center bg-black/50 p-4 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-modal-title"
      @click.self="close"
    >
      <div
        ref="modalContentRef"
        class="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg bg-white p-6 shadow-xl dark:bg-stone-900"
        @click.stop
      >
        <h2 id="cookie-modal-title" class="text-lg font-semibold text-stone-900 dark:text-white">
          {{ $t('cookie.modal.title') }}
        </h2>

        <div class="mt-4 space-y-4">
          <div class="rounded bg-stone-100 p-3 dark:bg-stone-800">
            <p class="font-medium text-stone-900 dark:text-white">{{ $t('cookie.modal.necessary') }}</p>
            <p class="mt-1 text-sm text-stone-600 dark:text-stone-400">{{ $t('cookie.modal.necessaryDesc') }}</p>
            <p class="mt-1 text-sm text-stone-500">On</p>
          </div>
          <div class="flex min-h-11 items-center justify-between gap-4 rounded bg-stone-50 p-3 dark:bg-stone-800/50">
            <div class="min-w-0 flex-1">
              <p class="font-medium text-stone-900 dark:text-white">{{ $t('cookie.modal.analytics') }}</p>
              <p class="mt-1 text-sm text-stone-600 dark:text-stone-400">{{ $t('cookie.modal.analyticsDesc') }}</p>
            </div>
            <label class="relative inline-flex min-h-11 min-w-11 cursor-pointer shrink-0 items-center justify-end">
              <input v-model="categories.analytics" type="checkbox" class="sr-only peer" />
              <div class="h-6 w-11 rounded-full bg-stone-200 after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-amber-500 peer-checked:after:translate-x-full peer-focus-visible:ring-2 peer-focus-visible:ring-amber-500 dark:bg-stone-700" />
            </label>
          </div>
          <div class="flex min-h-11 items-center justify-between gap-4 rounded bg-stone-50 p-3 dark:bg-stone-800/50">
            <div class="min-w-0 flex-1">
              <p class="font-medium text-stone-900 dark:text-white">{{ $t('cookie.modal.marketing') }}</p>
              <p class="mt-1 text-sm text-stone-600 dark:text-stone-400">{{ $t('cookie.modal.marketingDesc') }}</p>
            </div>
            <label class="relative inline-flex min-h-11 min-w-11 cursor-pointer shrink-0 items-center justify-end">
              <input v-model="categories.marketing" type="checkbox" class="sr-only peer" />
              <div class="h-6 w-11 rounded-full bg-stone-200 after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-amber-500 peer-checked:after:translate-x-full peer-focus-visible:ring-2 peer-focus-visible:ring-amber-500 dark:bg-stone-700" />
            </label>
          </div>
          <div class="flex min-h-11 items-center justify-between gap-4 rounded bg-stone-50 p-3 dark:bg-stone-800/50">
            <div class="min-w-0 flex-1">
              <p class="font-medium text-stone-900 dark:text-white">{{ $t('cookie.modal.functional') }}</p>
              <p class="mt-1 text-sm text-stone-600 dark:text-stone-400">{{ $t('cookie.modal.functionalDesc') }}</p>
            </div>
            <label class="relative inline-flex min-h-11 min-w-11 cursor-pointer shrink-0 items-center justify-end">
              <input v-model="categories.functional" type="checkbox" class="sr-only peer" />
              <div class="h-6 w-11 rounded-full bg-stone-200 after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-amber-500 peer-checked:after:translate-x-full peer-focus-visible:ring-2 peer-focus-visible:ring-amber-500 dark:bg-stone-700" />
            </label>
          </div>
        </div>

        <div class="mt-6 flex flex-wrap items-center justify-between gap-3">
          <NuxtLink
            :to="localePath('/cookie-policy')"
            class="inline-flex min-h-11 items-center py-2 text-sm font-medium text-amber-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:text-amber-400"
          >
            Cookie Policy
          </NuxtLink>
          <div class="flex gap-2">
            <button
              type="button"
              class="min-h-11 rounded-lg bg-stone-200 px-4 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:bg-stone-700 dark:text-stone-200"
              @click="close"
            >
              {{ $t('common.close') }}
            </button>
            <button
              type="button"
              class="min-h-11 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-medium text-amber-950 hover:bg-amber-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
              @click="save"
            >
              {{ $t('common.save') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
