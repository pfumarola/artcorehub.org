export default defineNuxtRouteMiddleware((to) => {
  const config = useRuntimeConfig().public
  if (!config.maintenanceMode) return

  const comingSoonPath = '/coming-soon'
  const path = to.path
  const isEn = path.startsWith('/en')
  const expectedComingSoon = isEn ? '/en/coming-soon' : comingSoonPath

  if (path === expectedComingSoon) return

  return navigateTo(expectedComingSoon)
})
