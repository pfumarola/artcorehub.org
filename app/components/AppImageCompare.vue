<script setup lang="ts">
const props = defineProps<{
  beforeSrc: string
  afterSrc: string
  beforeAlt?: string
  afterAlt?: string
}>()

const container = ref<HTMLElement>()
const position = ref(50)
const isDragging = ref(false)

function updatePosition(clientX: number) {
  if (!container.value) return
  const rect = container.value.getBoundingClientRect()
  const x = clientX - rect.left
  position.value = Math.min(100, Math.max(0, (x / rect.width) * 100))
}

function onPointerDown(e: PointerEvent) {
  e.preventDefault()
  isDragging.value = true
  container.value!.setPointerCapture(e.pointerId)
  updatePosition(e.clientX)
}

function onPointerMove(e: PointerEvent) {
  if (!isDragging.value) return
  e.preventDefault()
  updatePosition(e.clientX)
}

function onPointerUp() {
  isDragging.value = false
}
</script>

<template>
  <div
    ref="container"
    class="relative aspect-[4/3] w-full cursor-col-resize select-none overflow-hidden rounded-xl bg-stone-200 dark:bg-stone-800"
    style="touch-action: none"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointercancel="onPointerUp"
  >
    <img
      :src="props.afterSrc"
      :alt="props.afterAlt ?? ''"
      class="absolute inset-0 h-full w-full object-cover"
      loading="lazy"
      draggable="false"
    />

    <div
      class="absolute inset-0"
      :style="{ clipPath: `inset(0 ${100 - position}% 0 0)` }"
    >
      <img
        :src="props.beforeSrc"
        :alt="props.beforeAlt ?? ''"
        class="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
        draggable="false"
      />
    </div>

    <div
      class="absolute top-0 bottom-0 z-10 w-0.5 bg-white shadow-lg"
      :style="{ left: position + '%' }"
    >
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-white/80 shadow-md backdrop-blur-sm">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-stone-700">
          <path d="M18 8l4 4-4 4" />
          <path d="M6 8l-4 4 4 4" />
        </svg>
      </div>
    </div>

    <span class="absolute top-3 left-3 z-10 rounded-full bg-black/50 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
      {{ $t('theSpace.compare.before') }}
    </span>
    <span class="absolute top-3 right-3 z-10 rounded-full bg-black/50 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
      {{ $t('theSpace.compare.after') }}
    </span>
  </div>
</template>
