/**
 * Quando l'URL contiene #contact, rimuove l'hash se l'utente scrolla via
 * dalla sezione contatti (così il link "Contatti" non resta attivo e l'URL si aggiorna).
 */
export function useContactHashScroll() {
  const route = useRoute()
  const router = useRouter()
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    const contact = document.getElementById('contact')
    if (!contact || typeof IntersectionObserver === 'undefined') return

    observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (!entry?.isIntersecting && route.hash === '#contact') {
          router.replace({ path: route.path, query: route.query, hash: '' })
        }
      },
      { rootMargin: '-10% 0px -10% 0px', threshold: 0 }
    )

    observer.observe(contact)
  })

  onUnmounted(() => {
    observer?.disconnect()
  })
}
