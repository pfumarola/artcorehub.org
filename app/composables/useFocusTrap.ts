const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

function getFocusables(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => el.offsetParent !== null && !el.hasAttribute('aria-hidden')
  )
}

export function useFocusTrap(
  containerRef: Ref<HTMLElement | null>,
  isActive: Ref<boolean>,
  options?: { onEscape?: () => void }
) {
  let previousActive: HTMLElement | null = null

  function handleKeydown(e: KeyboardEvent) {
    if (!containerRef.value || !isActive.value) return
    if (e.key === 'Escape') {
      options?.onEscape?.()
      return
    }
    if (e.key !== 'Tab') return
    const focusables = getFocusables(containerRef.value)
    if (focusables.length === 0) return
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault()
        last.focus()
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
  }

  watch(
    isActive,
    (open) => {
      if (open) {
        previousActive = document.activeElement as HTMLElement | null
        nextTick(() => {
          if (!containerRef.value) return
          const focusables = getFocusables(containerRef.value)
          if (focusables.length > 0) focusables[0].focus()
        })
        document.addEventListener('keydown', handleKeydown)
      } else {
        document.removeEventListener('keydown', handleKeydown)
        nextTick(() => {
          if (previousActive && document.contains(previousActive)) {
            previousActive.focus()
          }
        })
      }
    },
    { immediate: true }
  )

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
  })
}
