<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const { locale } = useI18n()
useOrganizationAndWebSite()
useHead({
  htmlAttrs: {
    lang: () => locale.value || 'it'
  }
})
</script>
