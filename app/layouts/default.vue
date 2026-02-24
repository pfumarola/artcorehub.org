<script setup lang="ts">
useContactHashScroll()
</script>

<template>
  <div class="flex min-h-screen flex-col bg-white dark:bg-stone-950">
    <AppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
    <ClientOnly>
      <CookieBanner />
      <CookiePreferencesModal />
    </ClientOnly>
  </div>
</template>
