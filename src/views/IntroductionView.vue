<script type="module" setup lang="ts">
import {onMounted, ref} from "vue";
import http from '@/server/api'
import NdButton from "@/components/NdButton.vue";

const page = ref(null)
const acf = ref<Acf | null>(null)
const categoryDetails = ref<CategoryDetail[] | undefined | null>(null)

interface CategoryDetail {
  kategorie_nadpis: string
  ikona: string
  kategorie_text: string
}
interface Acf {
  popis: string
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
    class="flex flex-col align-center justify-center bg-yellow w-full"
>
  <section class="flex flex-col items-center justify-center w-full max-w-[900px]">
    <article class="flex items-center justify-center">
      <img src="" alt="balonek" />
      <p>{{acf.popis}}</p>
    </article>

    <section v-if="categoryDetails">
      <h2>{{acf.kategorie.nadpis}}</h2>
      <div>
        <article v-for="(category, index) in categoryDetails" :key="index">
          acf s daty
          {{category.text_detail}}
          <div class="category-header">
            <img :src="category.ikona" alt="article icon" />
          </div>

          <div>
            text kategorie
          </div>
        </article>
      </div>
    </section>

    <section>
      <div>
        <img src="@/assets/icons/ico-map.svg" alt="icon with map">
        <h3>
          Kde ve svém okolí můžete najít další podporu
        </h3>

        <p>
          Říct si o pomoc vyžaduje odvahu. Možná tápete, kdo může pečovat o duše mladých?
        </p>

        <NdButton>
          Kdo může pečovat o duše mladých
        </NdButton>

        <article>
          <p>
            Pomoct vám může také
          </p>

          <div>
            <img src="" alt="talking bubble" />
            <NdButton>
              E-mailová poradna
            </NdButton>
          </div>

          <div>
            <img src="" alt="crossroad sign" />
            <NdButton>
              Rozcestník sítě pomoci
            </NdButton>
          </div>
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
