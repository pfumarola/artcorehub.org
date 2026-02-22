const STORAGE_KEY = 'artcorehub-cookie-consent'

export type CookieCategories = {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  functional: boolean
}

export type ConsentState = 'pending' | 'accepted' | 'rejected' | 'custom'

export function useCookieConsent() {
  const consent = useState<{
    state: ConsentState
    categories: CookieCategories
  } | null>(STORAGE_KEY, () => null)

  function loadFromStorage() {
    if (import.meta.client && typeof localStorage !== 'undefined') {
      try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) {
          const parsed = JSON.parse(raw) as { state: ConsentState; categories: CookieCategories }
          consent.value = parsed
          return parsed
        }
      } catch {
        // ignore
      }
    }
    consent.value = null
    return null
  }

  function saveToStorage(state: ConsentState, categories: CookieCategories) {
    const payload = { state, categories }
    consent.value = payload
    if (import.meta.client && typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    }
  }

  const hasConsent = computed(() => {
    const c = consent.value ?? loadFromStorage()
    return c !== null && c.state !== 'pending'
  })

  const showBanner = computed(() => !hasConsent.value)

  function acceptAll() {
    saveToStorage('accepted', {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true
    })
  }

  function rejectAll() {
    saveToStorage('rejected', {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    })
  }

  function openPreferences() {
    // Handled by CookieBanner opening the modal
  }

  function savePreferences(categories: CookieCategories) {
    categories.necessary = true
    saveToStorage('custom', categories)
  }

  function getCategories(): CookieCategories {
    const c = consent.value ?? loadFromStorage()
    if (c) return { ...c.categories }
    return {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    }
  }

  if (import.meta.client) {
    loadFromStorage()
  }

  return {
    hasConsent,
    showBanner,
    acceptAll,
    rejectAll,
    openPreferences,
    savePreferences,
    getCategories,
    loadFromStorage
  }
}
