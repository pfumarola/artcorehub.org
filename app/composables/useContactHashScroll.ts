/**
 * Quando l'URL contiene #contact, rimuove l'hash se l'utente scrolla via
 * dalla sezione contatti (così il link "Contatti" non resta attivo e l'URL si aggiorna).
 * Usa history.replaceState per evitare che il router triggeri scroll (e lo scatto in cima).
 */
export function useContactHashScroll() {
  const route = useRoute()
  /** Condiviso con l'header: true solo se in URL c'è davvero #contact (aggiornato anche dopo replaceState). */
  const isContactHashInUrl = useState('contact-hash-in-url', () => ref(false))

  let observer: IntersectionObserver | null = null

  watch(
    () => route.hash,
    (hash) => {
      isContactHashInUrl.value = hash === '#contact'
    },
    { immediate: true }
  )

  onMounted(() => {
    const contact = document.getElementById('contact')
    if (!contact || typeof IntersectionObserver === 'undefined') return

    observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (!entry?.isIntersecting && isContactHashInUrl.value) {
          const fullPath = route.fullPath.replace(/#contact$/, '')
          history.replaceState(history.state, '', fullPath)
          isContactHashInUrl.value = false
        }
      },
      { rootMargin: '-10% 0px -10% 0px', threshold: 0 }
    )

    observer.observe(contact)
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return { isContactHashInUrl }
}

/** Usa nell'header/footer per sapere se il link Contatti è attivo (hash #contact in URL). */
export function useContactHashInUrl() {
  return { isContactHashInUrl: useState('contact-hash-in-url', () => ref(false)) }
}
