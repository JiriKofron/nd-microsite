<script setup lang="ts">
import TheCarousel from "@/components/TheCarousel.vue";
import NdButton from "@/components/NdButton.vue";
</script>

<template>
  <section>
    <article
    >
        <TheCarousel/>
    </article>

    <section class="bg-primary flex flex-col items-center justify-center p-8 gap-y-8">
      <NdButton
      variant="link"
      link="/"
      inverted
      >
        Autorský tým a podpora projektu
      </NdButton>

      <NdButton
          variant="link"
          link="/"
          inverted
      >
        Kdo projekt podpořil
      </NdButton>
    </section>
  </section>
</template>

<style scoped>

</style>
