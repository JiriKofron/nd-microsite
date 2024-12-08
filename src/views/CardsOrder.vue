<script setup lang="ts">

import SupportUs from "@/components/CardsOrder.vue";
import http from "@/server/api";
import {onMounted, ref} from "vue";

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
    console.log('response karty', response.data)
    const [data] = response.data
    cardsOrder.value = data?.acf
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  await fetchData()
})
</script>

<template>
  <section>
    <section class="w-full max-w-[900px]">
      <SupportUs
          :karty="cardsOrder?.karty_5_plus_2"
          :balicek="cardsOrder?.karty_balicek"
          :support="cardsOrder?.chcete_nas_podporit"
      />
    </section>
  </section>
</template>

<style scoped>

</style>
