<script type="module" setup lang="ts">
import { ref } from 'vue'
import OrderForm from '@/components/OrderForm.vue'
import OrderModal from '@/components/OrderModal.vue'
import type {ChceteNasPodporit, KartyPetPlusDvaPopis, KartyBalicek} from "@/views/CardsOrder.vue";

const showModal = ref(false)

const props = defineProps<{
  karty: KartyPetPlusDvaPopis | undefined
  balicek: KartyBalicek | undefined
  support: ChceteNasPodporit | undefined
}>()
</script>

<template>
  <section id="objednavka" class="flex flex-col bg-salmon p-8 md:p-16 gap-4 md:gap-16">
    <article class="flex flex-col gap-4 md:gap-16">
      <h3
        class="text-heading md:text-heading-large font-baloo font-semibold text-primary m-0 md:self-center"
      >
        Chci karty do ruky
      </h3>

      <div class="flex flex-col gap-4 md:flex-row md:gap-20">
        <img
          src="https://nevypustdusi.cz/wp-content/uploads/2024/03/karty_52.png"
          alt="náhled karet 5 + 2 kroků"
          class="w-1/2 self-center"
        />

        <div class="flex flex-col gap-4 py-4 md:py-0">
          <h4
            class="text-20 md:text-heading text-primary md:text-orange font-baloo font-semibold m-0"
          >
            {{props.karty?.nadpis}}
          </h4>

          <div
            class="flex flex-col text-base md:text-16 text-primary-text font-roboto font-normal tracking-[0.01em] m-0"
            v-html="props.karty?.popis"
           />
        </div>
      </div>

<!--
TODO: Makes no sense to have support qr code in money order page, but I suppose it will go somewhere else, so I just keep the code for myself
<div
        class="flex flex-col md:flex-row md:justify-between self-end md:w-10/12 gap-4 md:gap-16 p-8 bg-white rounded-10"
      >
        <div class="flex flex-col gap-4 basis-8/12">
          <h4 class="text-20 md:text-heading text-primary font-baloo font-semibold m-0">
            {{props.support?.nadpis}}
          </h4>

          <p
            class="text-base md:text-16 text-primary-text font-roboto font-normal tracking-[0.01em] m-0 max-w-[480px]"
          >
            <span v-html="props.support?.popis" />
            <span class="hidden md:inline"> nebo skrz QR kód zde přímo z mobilu. </span>
          </p>
        </div>

        <div class="hidden md:flex md:justify-center w-40 h-40 aspect-square md:basis-4/12">
          <img
            src="@/assets/images/qr-darujme.png"
            alt="QR kód pro dárce"
            width="120"
            height="120"
          />
        </div>
      </div>-->

      <div class="flex flex-col gap-4 py-4 md:py-0">
        <h4
          class="text-20 md:text-heading text-primary md:text-orange font-baloo font-semibold m-0"
        >
          {{ props.balicek?.nadpis }}
        </h4>

        <p
          class="text-base md:text-16 text-primary-text font-roboto font-normal tracking-[0.01em] m-0"
        >
          {{
            props.balicek?.popis
          }}
        </p>
      </div>
    </article>

    <OrderForm @submit="(value) => (showModal = value)" />

    <section class="relative">
      <OrderModal v-model="showModal" />
    </section>
  </section>
</template>

<style scoped></style>
