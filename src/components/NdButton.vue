<script type="module" setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  variant?: 'button' | 'anchor' | 'link'
  btnType?: 'submit' | 'reset' | 'button'
  link?: any
  block?: boolean
  inverted?: boolean
}>()

defineEmits(['click', 'submit'])
const defaultClasses = ref(
  'flex items-center justify-center xs:h-[40px] px-8 py-3 xs:py-0 rounded-full font-semibold text-[14px] xs:text-base font-roboto no-underline hover:no-underline visited:no-underline leading-relaxed cursor-pointer'
)
</script>

<template>
  <div :class="[!props.block ? 'w-fit px-8' : '']">
    <template v-if="props.variant === 'button'">
      <button
        class="bg-transparent border-none text-base no-underline hover:no-underline visited:no-underline visited:text-white"
        :class="[
          defaultClasses,
          props.inverted
            ? 'text-primary-text visited:text-primary-text hover:text-white'
            : 'text-white bg-light-violet visited:text-white'
        ]"
        :type="props.btnType"
        @click="$emit('click')"
        @submit="$emit('submit')"
      >
        <slot />
      </button>
    </template>

    <template v-else-if="props.variant === 'anchor'">
      <a
        :href="props.link"
        class="no-underline hover:no-underline visited:no-underline font-bold"
        :class="[
          defaultClasses,
          props.inverted
            ? 'text-primary-text visited:text-primary-text hover:text-white'
            : 'text-white bg-light-violet visited:text-white'
        ]"
      >
        <slot />
      </a>
    </template>
    <template v-else>
      <RouterLink
        :to="props.link"
        class="no-underline hover:no-underline visited:no-underline"
        :class="[
          defaultClasses,
          props.inverted
            ? 'text-primary-text bg-white hover:bg-light-violet hover:text-white visited:text-primary-text'
            : 'text-white bg-light-violet visited:text-white'
        ]"
      >
        <slot />
      </RouterLink>
    </template>
  </div>
</template>

<style scoped></style>
