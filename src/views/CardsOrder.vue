<script setup lang="ts">
import http from '@/server/api'
import { onMounted, ref, watchEffect } from 'vue'
import OrderForm from '@/components/OrderForm.vue'

export interface KartyBalicekFormular {
  cena: number
}

export interface KartyPetPlusDvaPopis {
  ikona: string
  nadpis: string
  popis: string
}

export interface KartyBalicek {
  nadpis: string
  popis: string
  ikony: { pet_plus_dva: string; mista_strachu: string }
  formular: KartyBalicekFormular
}

export interface ChceteNasPodporit {
  nadpis: string
  popis: string
  qr_kod: string
}

interface CardsOrder {
  karty_5_plus_2: KartyPetPlusDvaPopis | undefined
  karty_balicek: KartyBalicek | undefined
  chcete_nas_podporit: ChceteNasPodporit | undefined
}

const cardsOrder = ref<CardsOrder>()

const fetchData = async () => {
  try {
    const response = await http.get('pages?slug=objednat-karty')
    const [data] = response.data
    cardsOrder.value = data?.acf
  } catch (error) {
    console.error(error)
  }
}

const cardsIcons = ref()

const parseAsset = async (asset: any) => {
  const response = await http.get(`/media/${asset}`)
  return response.data.source_url
}

watchEffect(async () => {
  cardsIcons.value = {
    petPlusDva: await parseAsset(cardsOrder.value?.karty_balicek?.ikony.pet_plus_dva),
    mistaStrachu: await parseAsset(cardsOrder.value?.karty_balicek?.ikony.mista_strachu)
  }
})

onMounted(async () => {
  await fetchData()
})
</script>

<template>
  <section class="w-full max-w-[900px]">
    <section id="objednavka" class="flex flex-col bg-salmon p-8 md:p-16 gap-4 md:gap-16">
      <article class="flex flex-col gap-4 md:gap-16">
        <h3
          class="text-heading md:text-heading-large font-baloo font-semibold text-primary m-0 md:self-center"
        >
          Chci karty do ruky
        </h3>

        <div
          v-if="cardsIcons"
          class="flex flex-col items-center md:flex-row gap-12 md:gap-36 justify-center"
        >
          <img
            :src="cardsIcons.petPlusDva"
            alt="náhled karet"
            class="object-contain"
            loading="lazy"
            height="200px"
            width="200px"
          />

          <img
            :src="cardsIcons.mistaStrachu"
            alt="náhled karet"
            class="object-contain"
            loading="lazy"
            height="200px"
            width="200px"
          />
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
            {{ cardsOrder?.karty_balicek?.nadpis }}
          </h4>

          <p
            v-html="cardsOrder?.karty_balicek?.popis"
            class="text-base md:text-16 text-primary-text font-roboto font-normal tracking-[0.01em] m-0"
          />
        </div>
      </article>

      <OrderForm :details="cardsOrder?.karty_balicek?.formular" />
    </section>
  </section>
</template>

<style scoped></style>
