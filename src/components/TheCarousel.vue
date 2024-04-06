<script type="module" setup lang="ts">
import Glide from '@glidejs/glide'
import { onMounted, ref } from 'vue'
import type { Reference } from '@/types'
import http from '@/server/api'

const loading = ref(false)
const references = ref<Reference[] | undefined>([])

const fetchData = async () => {
  try {
    const response = await http.get('/pages?slug=poslouchejme-deti-2')
    const [data] = response.data
    references.value = data?.acf?.reference
    loading.value = false
  } catch (error) {
    console.error(error)
  }
}

const glideRef = ref()
const currentSlide = ref(0)

onMounted(() => {
  loading.value = true
  fetchData()
    .then(() => {
      const carousel = new Glide(glideRef.value, {
        type: 'carousel',
        startAt: 0,
        perView: 1
      })

      // @ts-expect-error
      carousel.on('run.after', function (e: any) {
        if (e.direction === '=') {
          currentSlide.value = Number(e.steps)
          return
        }

        if (references.value?.length) {
          switch (e.direction) {
            case '>':
              if (currentSlide.value < references.value.length - 1) {
                currentSlide.value++
              } else {
                currentSlide.value = 0
              }
              break
            case '<':
              if (currentSlide.value > 0) {
                currentSlide.value--
              } else {
                currentSlide.value = references.value.length - 1
              }
              break

            default:
              currentSlide.value = 0
              break
          }
        } else {
          currentSlide.value = 0
        }
      })
      carousel.mount()
      loading.value = false
    })
    .catch((error) => {
      console.error(error)
    })
})
</script>

<template>
  <section class="py-10 w-[85%] max-w-[900px]">
    <div v-if="references" class="glide" ref="glideRef">
      <div class="glide__track" data-glide-el="track">
        <ul class="glide__slides">
          <li v-for="reference in references" :key="reference.jmeno" class="glide__slide">
            <div
              class="reference-wrapper flex flex-col items-center justify-center text-[13px] xs:text-base text-primary-text font-roboto font-medium"
            >
              <div
                class="md:flex md:items-center md:justify-center italic md:px-8 py-20 mb-8 reference"
              >
                <div
                  class="reference__text p-8 -mt-8 ml-2 md:ml-0 md:-mt-16 max-w-[320px] md:max-w-[520px] md:text-22 md:font-roboto md:font-normal"
                >
                  {{ reference.text }}
                </div>
              </div>

              <div class="text-orange text-center mb-4 md:text-20 max-w-4xl">
                <span>{{ reference.jmeno }}, </span>
                <span>{{ reference.pozice }}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="relative px-20 py-6">
        <div
          class="glide__arrows absolute flex items-center justify-center w-full inset-0 z-10 gap-8"
          data-glide-el="controls"
        >
          <button class="flex bg-transparent border-none p-0" data-glide-dir="<">
            <img src="@/assets/icons/ico-arrow_back_ios.svg" alt="ikona zpět" width="20" />
          </button>

          <div
            v-if="references"
            class="glide__bullets flex items-center justify-center gap-x-14 z-20 relative"
            data-glide-el="controls[nav]"
          >
            <button
              v-for="(i, index) in references.length"
              :key="index"
              class="glide__bullet bg-light-violet border-none w-12 h-12 rounded-full cursor-pointer p-0 hover:text-primary-text hover:bg-primary-text"
              :class="{ 'bg-primary-text': currentSlide === index }"
              :data-glide-dir="`=${index}`"
            />
          </div>

          <button class="flex bg-transparent border-none p-0" data-glide-dir=">">
            <img
              src="@/assets/icons/ico-arrow_back_ios.svg"
              alt="ikona vpřed"
              width="20"
              style="transform: rotate(180deg)"
            />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import 'node_modules/@glidejs/glide/src/assets/sass/glide.core';

.reference-wrapper {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  position: relative;

  .reference {
    background: url('@/assets/images/reference-text-bubble.svg') no-repeat center center;
    background-size: contain;

    @media screen and (min-width: 768px) {
      width: 100%;
      height: 340px;
    }
  }
}
</style>
