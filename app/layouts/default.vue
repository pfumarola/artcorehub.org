<script setup lang="ts">
useContactHashScroll()
</script>

<template>
  <div class="flex min-h-screen flex-col bg-white dark:bg-stone-950">
    <a
      href="#main-content"
      class="absolute left-0 top-0 z-[100] flex -translate-y-full items-center rounded-br bg-amber-500 px-4 py-3 text-sm font-medium text-white shadow transition focus:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-stone-950 min-h-11"
    >
      {{ $t('a11y.skipToMain') }}
    </a>
    <AppHeader />
    <main id="main-content" class="flex-1 scroll-mt-20">
      <slot />
    </main>
    <AppFooter />
    <ClientOnly>
      <CookieBanner />
      <CookiePreferencesModal />
    </ClientOnly>
  </div>
</template>
