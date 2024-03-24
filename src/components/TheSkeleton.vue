<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'

const { width, height } = useWindowSize()
console.log('vue use', {
  width,
  height
})
</script>

<template>
  <section
    class="absolute inset-0 bg-white skeleton flex items-center justify-center w-full h-dvh z-20 overflow-hidden"
  >
    <img
      src="@/assets/icons/ico-violet-baloon.svg"
      alt="skeleton icon"
      :width="width / 3"
      class="absolute"
    />
    <img
      src="@/assets/images/loader.gif"
      alt="loader icon"
      width="50"
      class="absolute -mt-28 opacity-20 hue-rotate-60"
    />
  </section>
</template>

<style scoped></style>
