<script setup lang="ts">
const { t } = useI18n()
const runtimeConfig = useRuntimeConfig().public

const props = withDefaults(
  defineProps<{
    iban?: string
    transferAmount?: string
    paypalDonateUrl?: string
  }>(),
  {
    iban: 'IT86O0300203280461328972831',
    transferAmount: '480€',
    paypalDonateUrl: ''
  }
)

const paypalDonateUrlEffective = computed(
  () => (props.paypalDonateUrl || (runtimeConfig.paypalDonateUrl as string) || '') as string
)

const showTransferModal = ref(false)
const showTermsModal = ref(false)
const copiedField = ref<'iban' | 'causal' | null>(null)

async function copyToClipboard(text: string, field: 'iban' | 'causal') {
  if (import.meta.client && typeof navigator !== 'undefined' && navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text)
      copiedField.value = field
      setTimeout(() => { copiedField.value = null }, 2000)
    } catch {
      copiedField.value = null
    }
  }
}
</script>

<template>
  <div class="flex flex-col rounded-2xl border-2 border-amber-200 bg-amber-50/80 p-5 shadow-sm dark:border-amber-800 dark:bg-amber-900/20">
    <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-200 dark:bg-amber-800/50" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-amber-700 dark:text-amber-300">
        <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
        <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
        <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z" />
      </svg>
    </span>
    <div class="mt-3 flex flex-wrap items-center gap-2">
      <h4 class="font-semibold text-amber-900 dark:text-amber-100">
        {{ t('home.project.earlyAdopterTitle') }}
      </h4>
      <span
        class="inline-flex shrink-0 items-center rounded-full bg-emerald-500 px-2.5 py-0.5 text-xs font-semibold text-white"
        :aria-label="`20% ${t('home.project.earlyAdopterSavings')}`"
      >
        {{ t('home.project.earlyAdopterDiscountBadge') }}
      </span>
    </div>
    <p class="mt-2 text-sm text-stone-600 dark:text-stone-400">
      {{ t('home.project.earlyAdopterDesc') }}
    </p>
    <p class="mt-2 text-sm font-medium text-amber-800 dark:text-amber-200">
      {{ t('home.project.earlyAdopterBenefit') }}
    </p>
    <p class="mt-3 text-sm text-stone-600 dark:text-stone-400">
      <button
        type="button"
        class="rounded text-amber-700 underline hover:text-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:text-amber-300 dark:hover:text-amber-200"
        @click="showTermsModal = true"
      >
        {{ t('home.project.termsAndConditions') }}
      </button>
    </p>
    <div class="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
      <button
        type="button"
        class="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-medium text-amber-950 transition hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:focus:ring-offset-amber-900/20"
        @click="showTransferModal = true"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
          <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
          <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z" />
        </svg>
        {{ t('home.project.bankTransferDetails') }}
      </button>
      <span v-if="paypalDonateUrlEffective" class="shrink-0 text-stone-500 dark:text-stone-400" aria-hidden="true">{{ t('home.project.paymentOr') }}</span>
      <a
        v-if="paypalDonateUrlEffective"
        :href="paypalDonateUrlEffective"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 rounded-lg border-2 border-[#0070ba] bg-[#0070ba] px-3 py-2 text-sm font-medium text-white transition hover:bg-[#005ea6] focus:outline-none focus:ring-2 focus:ring-[#0070ba] focus:ring-offset-2 dark:focus:ring-offset-amber-900/20"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.77.77 0 0 1 .76-.657h5.782c2.018 0 3.597.558 4.616 1.654 1.007 1.082 1.472 2.57 1.377 4.396-.09 1.693-.613 3.034-1.553 3.993-.94.96-2.19 1.446-3.724 1.446H9.77a.77.77 0 0 0-.762.657l-.924 5.465zM22.463 8.26h-2.787c-.234 0-.433.17-.47.398l-.312 1.848-.098.58a.642.642 0 0 1 .633.74l-.924 5.465a.77.77 0 0 0 .762.657h1.428a.641.641 0 0 0 .633-.74l.924-5.465a.77.77 0 0 0-.762-.657h-.726l.312-1.848a.642.642 0 0 0-.633-.74h2.787a.77.77 0 0 1 .762.657l.392 2.315c.037.228-.162.398-.396.398h-.234l-.098.58-.312 1.848a.642.642 0 0 0 .633.74h1.428a.77.77 0 0 0 .762-.657l.924-5.465a.641.641 0 0 0-.633-.74h-.726l.312-1.848a.77.77 0 0 0-.762-.657z" />
        </svg>
        {{ t('home.project.donatePayPal') }}
      </a>
    </div>
  </div>

  <!-- Terms and conditions modal -->
  <AppModal
    v-model="showTermsModal"
    :title="t('home.project.termsModalTitle')"
    title-id="terms-modal-title"
    max-width="lg"
  >
    <p class="text-sm leading-relaxed text-stone-700 dark:text-stone-300">
      {{ t('home.project.termsModalRefund') }}
    </p>
  </AppModal>

  <!-- Bank transfer details modal -->
  <AppModal
    v-model="showTransferModal"
    :title="t('home.project.bankTransferModalTitle')"
    title-id="transfer-modal-title"
  >
    <div class="space-y-4">
      <div>
        <p class="text-xs font-medium text-stone-700 dark:text-stone-300">
          {{ t('home.project.transferAmount') }}
        </p>
        <p class="mt-1 font-semibold text-stone-800 dark:text-stone-200">{{ transferAmount }}</p>
      </div>
      <div>
        <p class="text-xs font-medium text-stone-700 dark:text-stone-300">
          {{ t('home.project.bankTransfer') }} ({{ t('home.project.iban') }})
        </p>
        <div class="mt-1.5 flex flex-wrap items-center gap-2">
          <code class="max-w-full select-all break-all rounded bg-white px-2 py-1.5 font-mono text-sm text-stone-800 dark:bg-stone-800 dark:text-stone-200">{{ iban }}</code>
          <button
            type="button"
            class="shrink-0 rounded border border-stone-300 bg-white px-2 py-1.5 text-xs font-medium text-stone-600 transition hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700"
            @click="copyToClipboard(iban, 'iban')"
          >
            {{ copiedField === 'iban' ? t('home.project.copied') : t('home.project.copy') }}
          </button>
        </div>
      </div>
      <div>
        <p class="text-xs font-medium text-stone-700 dark:text-stone-300">
          {{ t('home.project.causal') }}
        </p>
        <div class="mt-1.5 flex flex-wrap items-center gap-2">
          <code class="max-w-full select-all break-all rounded bg-white px-2 py-1.5 font-mono text-sm text-stone-800 dark:bg-stone-800 dark:text-stone-200">{{ t('home.project.causalValue') }}</code>
          <button
            type="button"
            class="shrink-0 rounded border border-stone-300 bg-white px-2 py-1.5 text-xs font-medium text-stone-600 transition hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700"
            @click="copyToClipboard(t('home.project.causalValue'), 'causal')"
          >
            {{ copiedField === 'causal' ? t('home.project.copied') : t('home.project.copy') }}
          </button>
        </div>
      </div>
      <div v-if="paypalDonateUrlEffective" class="border-t border-amber-200/80 pt-4 dark:border-amber-800/50">
        <p class="text-xs font-medium text-stone-600 dark:text-stone-400">
          {{ t('home.project.orPayPal') }}
        </p>
        <a
          :href="paypalDonateUrlEffective"
          target="_blank"
          rel="noopener noreferrer"
          class="mt-2 inline-flex w-fit items-center gap-2 rounded-lg border-2 border-[#0070ba] bg-[#0070ba] px-3 py-2 text-sm font-medium text-white transition hover:bg-[#005ea6] focus:outline-none focus:ring-2 focus:ring-[#0070ba] focus:ring-offset-2 dark:focus:ring-offset-amber-900/20"
          @click="showTransferModal = false"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.77.77 0 0 1 .76-.657h5.782c2.018 0 3.597.558 4.616 1.654 1.007 1.082 1.472 2.57 1.377 4.396-.09 1.693-.613 3.034-1.553 3.993-.94.96-2.19 1.446-3.724 1.446H9.77a.77.77 0 0 0-.762.657l-.924 5.465zM22.463 8.26h-2.787c-.234 0-.433.17-.47.398l-.312 1.848-.098.58a.642.642 0 0 1 .633.74l-.924 5.465a.77.77 0 0 0 .762.657h1.428a.641.641 0 0 0 .633-.74l.924-5.465a.77.77 0 0 0-.762-.657h-.726l.312-1.848a.642.642 0 0 0-.633-.74h2.787a.77.77 0 0 1 .762.657l.392 2.315c.037.228-.162.398-.396.398h-.234l-.098.58-.312 1.848a.642.642 0 0 0 .633.74h1.428a.77.77 0 0 0 .762-.657l.924-5.465a.641.641 0 0 0-.633-.74h-.726l.312-1.848a.77.77 0 0 0-.762-.657z" />
          </svg>
          {{ t('home.project.donatePayPal') }}
        </a>
      </div>
    </div>
  </AppModal>
</template>
