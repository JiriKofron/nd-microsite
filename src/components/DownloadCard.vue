<script setup lang="ts">
const props = defineProps<{
  downloadLink: string
}>()
</script>

<template>
<div>
  <slot />

  <div>
    <a :href="props.downloadLink">
      <span>Stáhnout "ikona" PDF</span>
    </a>
  </div>
</div>
</template>

<style scoped>

</style>
