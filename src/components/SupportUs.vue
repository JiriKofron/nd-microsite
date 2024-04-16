<script type="module" setup lang="ts">
import {onMounted, ref} from 'vue'
import OrderForm from '@/components/OrderForm.vue'
import OrderModal from '@/components/OrderModal.vue'
import type {ChceteNasPodporit, ObjednavkyKartyPetPlusDva, PodpurnyRozhovorAcf} from "@/views/HowToTalkView.vue";
import http from "@/server/api";

const showModal = ref(false)
const props = defineProps<{
  data: PodpurnyRozhovorAcf | null
}>()
const pageData = ref<PodpurnyRozhovorAcf | null>(null)

onMounted(async() => {

  const parseKartyPetPlusDvaObjednavky = async (kartyObjednavka: ObjednavkyKartyPetPlusDva | undefined) => {
    if(!kartyObjednavka) {
      return
    }

    const response = await http.get(`/media/${kartyObjednavka.ikona}`)
    return {
      ...kartyObjednavka,
      ikona: response.data.source_url
    }
  }

  const parseChceteNasPodporit = async (podporteNas: ChceteNasPodporit | undefined) => {
    if(!podporteNas) {
      return
    }

    const response = await http.get(`/media/${podporteNas.qr_kod}`)
    return {
      ...podporteNas,
      qr_kod: response.data.source_url
    }
  }

  pageData.value = {
    ...props.data as PodpurnyRozhovorAcf,
    karty_5_plus_2: await parseKartyPetPlusDvaObjednavky(props.data?.karty_5_plus_2),
    chcete_nas_podporit: await parseChceteNasPodporit(props.data?.chcete_nas_podporit),
  }
})
</script>

<template>
  <section
      v-if="pageData"
      id="objednavka"
      class="flex flex-col bg-salmon p-8 md:p-16 gap-4 md:gap-16"
  >
    <article class="flex flex-col gap-4 md:gap-16">
      <h3
        class="text-heading md:text-heading-large font-baloo font-semibold text-primary m-0 md:self-center"
      >
        {{ pageData.nadpis }}
      </h3>

      <div class="flex flex-col gap-4 md:flex-row md:gap-20">
        <img
          src="https://nevypustdusi.cz/wp-content/uploads/2024/03/karty_52.png"
          alt="náhled karet 5 + 2 kroků"
          class="w-1/2 self-center"
        />

        <div
            v-if="pageData.karty_5_plus_2"
            class="flex flex-col gap-4 py-4 md:py-0">
          <h4
            class="text-20 md:text-heading text-primary md:text-orange font-baloo font-semibold m-0"
          >
            {{pageData.karty_5_plus_2.nadpis}}
          </h4>

          <div
              v-html="pageData.karty_5_plus_2.popis"
              class="flex flex-col gap-4 text-base md:text-16 text-primary-text font-roboto font-normal tracking-[0.01em] m-0" />
        </div>
      </div>

      <div
          v-if="pageData.chcete_nas_podporit"
        class="flex flex-col md:flex-row md:justify-between self-end md:w-10/12 gap-4 md:gap-16 p-8 bg-white rounded-10"
      >
        <div class="flex flex-col gap-4 basis-8/12">
          <h4 class="text-20 md:text-heading text-primary font-baloo font-semibold m-0">
            {{ pageData.chcete_nas_podporit.nadpis }}
          </h4>

          <p
              v-html="pageData.chcete_nas_podporit.popis"
            class="text-base md:text-16 text-primary-text font-roboto font-normal tracking-[0.01em] m-0 max-w-[480px]"
          />
        </div>

        <div class="hidden md:flex md:justify-center w-40 h-40 aspect-square md:basis-4/12">
          <img
            :src="pageData.chcete_nas_podporit.qr_kod"
            alt="QR kód pro dárce"
            width="120"
            height="120"
          />
        </div>
      </div>

      <div
          v-if="pageData.karty_balicek"
          class="flex flex-col gap-4 py-4 md:py-0">
        <h4
          class="text-20 md:text-heading text-primary md:text-orange font-baloo font-semibold m-0"
        >
          {{ pageData.karty_balicek.nadpis }}
        </h4>

        <p
            v-html="pageData.karty_balicek.popis"
          class="text-base md:text-16 text-primary-text font-roboto font-normal tracking-[0.01em] m-0"
        />
      </div>
    </article>

    <OrderForm @submit="(value) => (showModal = value)" />

    <section class="relative">
      <OrderModal v-model="showModal" />
    </section>
  </section>
</template>

<style lang="scss" scoped>
::v-deep(p) {
  margin: 0;
}
</style>
