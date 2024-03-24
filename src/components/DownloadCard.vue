<script setup lang="ts">
const props = defineProps<{
  downloadLink: string
}>()
</script>

<template>
  <div
    class="flex flex-col justify-center max-w-[476px] rounded-10 overflow-hidden shadow-warning-sign"
  >
    <div class="bg-salmon py-8 px-10 text-20-24 font-baloo font-semibold text-primary">
      <slot />
    </div>

    <div class="px-10 py-8">
      <a
        :href="props.downloadLink"
        target="_blank"
        class="flex items-center gap-4 text-base text-orange font-bold font-roboto tracking-[0.05em] no-underline"
      >
        <span>Stáhnout</span>
        <img src="@/assets/icons/ico-download.svg" alt="download icon" />
        <span>PDF</span>
      </a>
    </div>
  </div>
</template>

<style scoped></style>
