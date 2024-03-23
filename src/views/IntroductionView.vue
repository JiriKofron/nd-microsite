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

const loading = ref(false)

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
  try {
    const response = await http.get('/pages?slug=poslouchejme-deti-2')
    const [data] = response.data
    page.value = data
    acf.value = data.acf
    categoryDetails.value = await parseCategoryDetail(acf.value?.kategorie.kategorie_detail)
    loading.value = false
  } catch (error) {
    console.error(error)
  }
}

onMounted( async () => {
  loading.value = true
  await fetchData()
})
</script>

<template>
  <section
        v-if="page && acf && !loading"
        class="flex flex-col align-center justify-center w-full"
    >
      <section class="flex flex-col items-center justify-center max-w-[900px] p-8 md:p-16 md:mx-auto">
        <article class="flex items-center justify-center w-100 p-4 gap-x-8 md:gap-x-20">
          <img
              src="@/assets/icons/ico-violet-baloon.svg"
              alt="balonek"
              class="w-20 md:w-40"
          />
          <p
              class="text-17-21 font-semibold text-primary-text font-roboto md:text-heading md:font-baloo md:font-semibold"
          >
            {{acf.popis}}
          </p>
        </article>

        <section
            v-if="categoryDetails"
            class="flex flex-col items-center justify-center gap-y-6"
        >
          <h2
              class="text-primary-text text-heading text-center font-baloo font-semibold m-0 md:my-8 md:text-heading-large"
          >
            {{acf.kategorie.kategorie_nadpis}}
          </h2>

          <div class="flex flex-col items-center justify-center gap-y-16 p-4">
            <div class="flex flex-col md:flex-row items-center md:items-stretch justify-center gap-16">
              <article
                  v-for="(category, index) in categoryDetails"
                  :key="index"
                  class="bg-yellow p-8 pb-16 md:p-20 rounded-2xl md:basis-6/12"
              >
                <div class="flex items-start gap-8 mb-6">
                  <img :src="category.ikona" alt="article icon" class="md:w-48" />
                  <h3 class="text-20-24 font-baloo font-semibold text-orange m-0">
                    {{category.nadpis_detail}}
                  </h3>
                </div>

                <div
                    v-html="category.text_detail"
                    class="flex flex-col items-center justify-center text-base font-roboto font-normal text-primary-text m-0 text-detail gap-6"
                />
              </article>
            </div>

            <article class="flex flex-col gap-6 bg-yellow p-8 pb-16 rounded-2xl md:w-[95%] md:mx-32">
              <div class="flex items-start gap-8">
                <img src="@/assets/icons/ico-map.svg" alt="icon with map" class="md:hidden" />
                <h3 class="text-sm-heading font-baloo font-semibold text-orange m-0 md:font-roboto md:font-bold">
                  Kde ve svém okolí můžete najít další podporu
                </h3>
              </div>

              <div class="flex flex-col items-center md:items-start justify-center text-base font-roboto font-normal md:font-bold text-primary-text md:text-20">
                <p class="md:m-0 md:mb-6">
                  Říct si o pomoc vyžaduje odvahu. Možná tápete, kdo může pečovat o duše mladých?
                </p>
              </div>
              <NdButton variant="link" link="/poslouchejme-deti/mista-pomoci" block class="md:w-5/12">
                Kdo může pečovat o duše mladých?
              </NdButton>

              <article
                  class="flex flex-col items-center justify-center bg-white p-8 rounded-2xl gap-6 mt-7"
              >
                <p class="text-sm-heading text-primary font-semibold font-baloo m-0">
                  Pomoct vám může také
                </p>

                <div class="flex flex-col md:flex-row items-center md:items-stretch justify-center gap-12">
                  <div class="flex flex-col items-center justify-center gap-4 md:gap-8">
                    <img
                        src="@/assets/icons/ico-talking-bubble.svg"
                        alt="talking bubble"
                        class="md:w-32"
                    />
                    <NdButton
                        variant="anchor"
                        link="https://nevypustdusi.cz/kde-hledat-pomoc/"
                    >
                      E-mailová poradna
                    </NdButton>
                  </div>

                  <div class="flex flex-col items-center justify-center md:justify-end gap-4 md:gap-8">
                    <img
                        src="@/assets/icons/ico-rozcestník.svg"
                        alt="crossroad sign"
                        class="md:w-32"
                    />
                    <NdButton
                        variant="anchor"
                        link="https://nevypustdusi.cz/kde-hledat-pomoc/"
                    >
                      Rozcestník sítě pomoci
                    </NdButton>
                  </div>
                </div>
              </article>
            </article>
          </div>
        </section>
      </section>
    </section>
</template>

<style lang="scss" scoped>
::v-deep(p) {
  margin: 0;
}
</style>
