<script setup lang="ts">
import Glide from '@glidejs/glide'
import { onMounted, ref } from "vue";
import type {Reference} from "@/types";

const references = ref<Reference[]>([{
  id: 0,
  jmeno: 'Lucie Čelikovská',
  pozice: 'vedoucí Centra Hladina',
  text: '“... záchytné lano pro každého dospěláka, na kterého se obrátí dítě s tíživou životní situací.”'
}, {
  id: 1,
  jmeno: 'Michal Považan',
  pozice: 'primář Dětské psychiatrie nemocnice Bohnice',
  text: '“Karty 5+2 můžou pomoct všem dospělým i dětem. Ukazují vhodnou cestu jak spolu mluvit i ve chvílích, kdy to vypadá, že žádná cesta neexistuje.”'
}, {
  id: 2,
  jmeno: 'Tereza Kvapil Baudišová',
  pozice: 'sociální pracovnice Nízkoprahový klub Pacific',
  text: '"Kdybych měla jako začínající pracovnice takový materiál v ruce, určitě bych šla do náročných rozhovorů s větší jistotou."'
}])

const glideRef = ref();
const currentSlide = ref(0);

onMounted( () => {
  const carousel = new Glide(glideRef.value, {
        type: 'carousel',
        startAt: 0,
        perView: 1
  })

  carousel.mount();
  carousel.on('run.after', (e: {direction: string, steps: number}) => {
    if(e.direction === '=') {
      currentSlide.value = Number(e.steps)
      return
    }

    switch (e.direction) {
      case '>':
        if (currentSlide.value < references.value.length - 1) {
          currentSlide.value++;
        } else {
          currentSlide.value = 0;
        }
        break;
      case '<':
        if (currentSlide.value > 0) {
          currentSlide.value--;
        } else {
          currentSlide.value = references.value.length - 1;
        }
        break;

      default:
        currentSlide.value = 0
        break;
    }


  })
})
</script>

<template>
  <section class="p-10">
    <div
        class="glide"
        ref="glideRef"
    >
      <div class="glide__track" data-glide-el="track">
        <ul class="glide__slides">
          <li
              v-for="reference in references"
              :key="reference.jmeno"
              class="glide__slide"
          >
            <div class="reference-wrapper flex flex-col items-center justify-center text-base text-primary-text font-roboto font-medium">
              <div class="italic px-8 py-20 mb-8 reference">
                <div class="reference__text p-8 -mt-8 max-w-[320px]">
                  {{reference.text}}
                </div>
              </div>
              <div class="text-orange text-center mb-4">
                <span>{{reference.jmeno}}, </span>
                <span>{{reference.pozice}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="relative px-20">
        <div class="glide__arrows absolute flex items-center justify-between w-full inset-0 z-10"
             data-glide-el="controls"
        >
          <button
              class="bg-transparent border-none"
              data-glide-dir="<"
          >
            <img src="@/assets/icons/ico-arrow_back_ios.svg" alt="ikona zpět" width="20">
          </button>
          <button
              class="bg-transparent border-none"
              data-glide-dir=">"
          >
            <img src="@/assets/icons/ico-arrow_back_ios.svg" alt="ikona vpřed" width="20" style="transform: rotate(180deg)">
          </button>
        </div>

        <div
            class="glide__bullets flex items-center justify-center gap-x-14 z-20 relative"
            data-glide-el="controls[nav]"
        >
          <button
              v-for="(i, index) in references.length"
              :key="index"
              class="glide__bullet bg-light-violet border-none w-12 h-12 rounded-full cursor-pointer"
              :class="{'bg-primary-text': currentSlide === index}"
              :data-glide-dir="`=${index}`"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import "node_modules/@glidejs/glide/src/assets/sass/glide.core";

.reference-wrapper {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  position: relative;

  .reference {
    background: url("@/assets/images/reference-text-bubble.svg") no-repeat center center;
    background-size: contain;
  }
}
</style>
