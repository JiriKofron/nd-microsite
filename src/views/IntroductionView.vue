<script type="module" setup lang="ts">
import {onMounted, ref} from "vue";
import http from '@/server/api'
import NdButton from "@/components/NdButton.vue";

const page = ref(null)
const acf = ref<Acf | null>(null)
const categoryDetails = ref<CategoryDetail[] | undefined | null>(null)

interface CategoryDetail {
  nadpis_detail: string
  ikona: string
  text_detail: string
}
interface Acf {
  popis: string
  kategorie_nadpis: string
  kategorie: {
    kategorie_nadpis: string
    kategorie_detail: CategoryDetail[]
  }
}

const parseCategoryDetail = async (categoryDetail: CategoryDetail[] | undefined) => {
  if(!categoryDetail) {
    return
  }

  const promises = categoryDetail.map(async obj => {
    const response = await http.get(`/media/${obj.ikona}`)

    return {
      ...obj,
      ikona: response.data.source_url
    }
  })

  return await Promise.all(promises)
}

const fetchData = async () => {
  const response = await http.get('/pages?slug=poslouchejme-deti-2')
  const [data] = response.data
  page.value = data
  acf.value = data.acf
  categoryDetails.value = await parseCategoryDetail(acf.value?.kategorie.kategorie_detail)
}

onMounted( async () => {
  await fetchData()
})
</script>

<template>
<section
    v-if="page && acf"
    class="flex flex-col align-center justify-center w-full"
>
  <section class="flex flex-col items-center justify-center max-w-[900px] p-8">
    <article class="flex items-center justify-center w-100 p-4 gap-x-8">
      <img
          src="@/assets/icons/ico-violet-baloon.svg"
          alt="balonek"
          width="38"
      />
      <p class="text-17 leading-8 font-normal text-primary-text font-roboto">{{acf.popis}}</p>
    </article>

    <section
        v-if="categoryDetails"
        class="flex flex-col items-center justify-center gap-y-6"
    >
      <h2
          class="text-primary-text text-heading text-center font-baloo font-semibold m-0"
      >
        {{acf.kategorie.kategorie_nadpis}}
      </h2>

      <div class="flex flex-col items-center justify-center gap-y-16 p-4">
        <article
            v-for="(category, index) in categoryDetails"
            :key="index"
            class="bg-yellow p-8 pb-16 rounded-2xl"
        >
          <div class="flex items-start gap-8 mb-6">
            <img :src="category.ikona" alt="article icon" />
            <h3 class="text-sm-heading font-baloo font-semibold text-orange m-0">
              {{category.nadpis_detail}}
            </h3>
          </div>

          <div
              v-html="category.text_detail"
              class="flex flex-col items-center justify-center text-base font-roboto font-normal text-primary-text"
          />
        </article>

        <article class="bg-yellow p-8 pb-16 rounded-2xl">
          <div class="flex items-start gap-8 mb-6">
            <img src="@/assets/icons/ico-map.svg" alt="icon with map" />
            <h3 class="text-sm-heading font-baloo font-semibold text-orange m-0">
              Kde ve svém okolí můžete najít další podporu
            </h3>
          </div>

          <div class="flex flex-col items-center justify-center text-base font-roboto font-normal text-primary-text">
            <p>
              Říct si o pomoc vyžaduje odvahu. Možná tápete, kdo může pečovat o duše mladých?
            </p>
          </div>
          <NdButton variant="link" link="/poslouchejme-deti/mista-pomoci" block>
            Kdo může pečovat o duše mladých?
          </NdButton>

          <article
            class="flex flex-col items-center justify-center bg-white p-8 rounded-2xl gap-6 mt-7"
          >
            <p class="text-sm-heading text-primary font-semibold font-baloo m-0">
              Pomoct vám může také
            </p>

            <div class="flex flex-col items-center justify-center gap-4">
              <img src="@/assets/icons/ico-talking-bubble.svg" alt="talking bubble" />
              <NdButton variant="anchor" link="https://nevypustdusi.cz/kde-hledat-pomoc/">
                E-mailová poradna
              </NdButton>
            </div>

            <div class="flex flex-col items-center justify-center gap-4">
              <img src="@/assets/icons/ico-rozcestník.svg" alt="crossroad sign" />
              <NdButton variant="anchor" link="https://nevypustdusi.cz/kde-hledat-pomoc/">
                Rozcestník sítě pomoci
              </NdButton>
            </div>
          </article>
        </article>
      </div>
    </section>
  </section>

  <section class="bg-light-blue">
    karusel
  </section>

  <footer class="bg-primary">
    <button>Kdo za tím stojí</button>
    <button>Kdo projekt podpořil</button>
  </footer>
</section>
</template>

<style scoped>

</style>
