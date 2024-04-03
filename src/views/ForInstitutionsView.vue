<script type="module" setup lang="ts">
import http from '@/server/api'
import { onMounted, ref } from 'vue'
import DownloadCard from '@/components/DownloadCard.vue'

interface Nahled {
  nazev: string
  nahled: string
}

interface Soubor {
  nazev: string
  soubor_ke_stazeni: string
}

interface MaterialyInfografiky {
  nahledy: Nahled[]
  soubory: Soubor[]
}

interface Infografika {
  nadpis: string
  popis: string
  materialy: MaterialyInfografiky
}

interface Ebook {
  nazev: string
  popis: string
  disclaimer: string
  soubory_ke_stazeni: Soubor[]
}

interface Materialy {
  nadpis: string
  popis: string
  infografiky: Infografika[]
  ebooky: Ebook[]
}

interface ProInstituceAcf {
  nadpis: string
  popis: string
  materialy: Materialy
}

const proInstituceAcf = ref<ProInstituceAcf | null>(null)
const materialyInfografiky = ref<Infografika[] | undefined | null>(null)
const materialyEbook = ref<Ebook[] | undefined | null>(null)

const parseAsset = async (asset: any) => {
  const response = await http.get(`/media/${asset}`)
  return response.data.source_url
}

const parseMaterialyInfografiky = async (infografiky: Infografika[] | undefined) => {
  if (!infografiky) {
    return
  }

  const parsedInfografiky = infografiky.map(async (infografika) => {
    return {
      ...infografika,
      materialy: {
        nahledy: await Promise.all(
          infografika.materialy.nahledy.map(async (nahled) => {
            return {
              ...nahled,
              nahled: await parseAsset(nahled.nahled)
            }
          })
        ),
        soubory: await Promise.all(
          infografika.materialy.soubory.map(async (soubor) => {
            return {
              ...soubor,
              soubor_ke_stazeni: await parseAsset(soubor.soubor_ke_stazeni)
            }
          })
        )
      }
    }
  })

  return await Promise.all(parsedInfografiky)
}

const parsetMaterialyEbook = async (ebooky: Ebook[] | undefined) => {
  if (!ebooky) {
    return
  }

  return await Promise.all(
    ebooky.map(async (ebook) => {
      const parsedSoubory = ebook.soubory_ke_stazeni.map(async (soubor) => {
        return {
          ...soubor,
          soubor_ke_stazeni: await parseAsset(soubor.soubor_ke_stazeni)
        }
      })

      return {
        ...ebook,
        soubory_ke_stazeni: await Promise.all(parsedSoubory)
      }
    })
  )
}

const fetchData = async () => {
  const response = await http.get('pages?slug=pro-pomahajici-instituce')
  const [data] = response.data
  proInstituceAcf.value = data?.acf
  materialyInfografiky.value = await parseMaterialyInfografiky(
    proInstituceAcf.value?.materialy?.infografiky
  )
  materialyEbook.value = await parsetMaterialyEbook(proInstituceAcf.value?.materialy?.ebooky)
}

onMounted(async () => {
  await fetchData()
})
</script>

<template>
  <section v-if="proInstituceAcf" class="max-w-[900px]">
    <article class="flex flex-col items-center justify-center bg-salmon px-8 py-12 md:p-16 gap-y-8">
      <div class="flex items-center justify-start md:justify-center gap-x-8 px-4">
        <img
          src="@/assets/icons/ico-institutions.svg"
          alt="varovne signaly ikona vykricnik v trojuhelniku"
          class="h-24 md:h-40"
        />
        <h1 class="font-baloo text-heading md:text-heading-large text-primary font-semibold m-0">
          {{ proInstituceAcf.nadpis }}
        </h1>
      </div>

      <h2
        class="text-20 md:text-30 font-baloo font-semibold text-orange text-center m-0"
      >
        {{ proInstituceAcf.popis }}
      </h2>
    </article>

    <section class="flex flex-col items-center p-8 md:p-16 gap-8 md:gap-16 md:w-full box-border">
      <h2
        class="text-heading md:text-heading-large font-baloo font-bold text-primary text-center m-0"
      >
        {{ proInstituceAcf.materialy.nadpis }}
      </h2>

      <div
        v-html="proInstituceAcf.materialy.popis"
        class="font-roboto text-base md:text-16 text-primary-text font-normal"
      />

      <div v-if="materialyInfografiky" class="flex flex-col gap-8 py-8 md:gap-16">
        <h3 class="text-20 md:text-30 text-primary font-baloo font-semibold text-center m-0">
          Infografiky a plakáty
        </h3>
        <div
          v-for="infografika in materialyInfografiky"
          :key="infografika.nadpis"
          class="flex flex-col gap-6 md:gap-8"
        >
          <h4 class="text-17 md:text-heading text-orange font-baloo font-semibold m-0">
            {{ infografika.nadpis }}
          </h4>

          <p
            v-html="infografika.popis"
            class="text-base md:text-16 font-roboto text-primary-text font-normal m-0"
          />

          <div class="flex flex-col md:flex-row md:justify-center items-center gap-6 md:gap-8">
            <img
              v-for="nahled in infografika.materialy.nahledy"
              :key="nahled.nahled"
              :src="nahled.nahled"
              :alt="nahled.nazev"
              class="w-2/3 md:w-1/4"
            />
          </div>

          <div class="flex flex-col items-center">
            <DownloadCard
              v-for="soubor in infografika.materialy.soubory"
              :key="soubor.nazev"
              :download-link="soubor.soubor_ke_stazeni"
              class="text-primary hover:underline"
            >
              {{ soubor.nazev }}
            </DownloadCard>
          </div>
        </div>

        <div
          v-if="proInstituceAcf.materialy.ebooky.length > 0"
          class="flex flex-col gap-8 md:gap-16 py-8"
        >
          <h3 class="text-20 md:text-30 text-primary font-baloo font-semibold text-center m-0">
            Nebuďte na to ve službách sami
          </h3>
          <div
            v-for="ebook in materialyEbook"
            :key="ebook.nazev"
            class="flex flex-col gap-4 md:gap-8"
          >
            <h4 class="text-17 md:text-heading text-orange font-baloo font-semibold m-0">
              {{ ebook.nazev }}
            </h4>

            <p
              v-html="ebook.popis"
              class="text-base md:text-16 font-roboto text-primary-text font-normal m-0"
            />

            <div
              class="flex flex-col px-8 md:px-16 py-8 gap-4 md:gap-8 rounded-10 bg-pale-violet"
            >
              <h4
                class="text-17 md:text-heading text-primary font-baloo font-semibold m-0 uppercase"
              >
                Upozornění
              </h4>
              <div
                v-html="ebook.disclaimer"
                class="flex flex-col text-primary-text text-base md:text-16 font-roboto font-normal tracking-[0.01em] gap-4"
              />
            </div>
            <DownloadCard
              v-for="soubor in ebook.soubory_ke_stazeni"
              :key="soubor.nazev"
              :download-link="soubor.soubor_ke_stazeni"
              class="text-primary hover:underline md:self-center"
            >
              {{ ebook.nazev }}
            </DownloadCard>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<style scoped>
::v-deep(p) {
  margin: 0;
}
</style>
