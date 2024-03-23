<script setup lang="ts">

const props = defineProps<{
  variant?: 'button' | 'anchor' | 'link'
  btnType?: 'submit' | 'reset' | 'button'
  link?: any
  block?: boolean
  inverted?: boolean
}>()

defineEmits(['click', 'submit'])
</script>


<template>
  <div
      class="flex items-center justify-center bg-light-violet h-[40px] px4 rounded-full font-semibold text-white text-base no-underline hover:no-underline visited:no-underline visited:text-white leading-relaxed"
      :class="{'w-fit px-8': !props.block, 'bg-white !text-primary-text hover:bg-light-violet hover:!text-white': props.inverted}"
  >
    <template v-if="props.variant === 'button'">
      <button
          class="bg-transparent border-none text-white text-base no-underline hover:no-underline visited:no-underline visited:text-white font-roboto"
          :class="{'!text-primary-text': props.inverted}"
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
      <a
          :href="props.link"
          class="text-white text-base no-underline hover:no-underline visited:no-underline visited:text-white font-roboto font-bold"
          :class="{'!text-primary-text': props.inverted}"
      >
        <slot />
      </a>
    </template>
    <template v-else>
      <RouterLink
          :to="props.link"
          class="text-white text-base no-underline hover:no-underline visited:no-underline visited:text-white font-roboto"
          :class="{'!text-primary-text': props.inverted}"
      >
        <slot />
      </RouterLink>
    </template>
  </div>
</template>

<style scoped>

</style>
