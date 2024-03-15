<script setup lang="ts">

const props = defineProps<{
  variant?: 'button' | 'anchor' | 'link'
  btnType?: 'submit' | 'reset' | 'button'
  link?: string
  block?: boolean
}>()

defineEmits(['click', 'submit'])
</script>


<template>
  <div
      class="flex items-center justify-center bg-light-violet h-[40px] px4 rounded-full font-semibold text-white text-base no-underline hover:no-underline visited:no-underline visited:text-white leading-relaxed"
      :class="{'w-fit px-8': !props.block}"
  >
    <template v-if="props.variant === 'button'">
      <button
          class="bg-transparent border-none text-white text-base no-underline hover:no-underline visited:no-underline visited:text-white font-roboto"
          :type="props.btnType"
          @click="$emit('click')"
          @submit="$emit('submit')"
      >
        <slot />
      </button>
    </template>

    <template
        v-else-if="props.variant === 'anchor'"
    >
      <a :href="props.link"  class="text-white text-base no-underline hover:no-underline visited:no-underline visited:text-white">
        <slot />
      </a>
    </template>
    <template v-else>
      <RouterLink :to="props.link"  class="text-white text-base no-underline hover:no-underline visited:no-underline visited:text-white">
        <slot />
      </RouterLink>
    </template>
  </div>
</template>

<style scoped>

</style>
