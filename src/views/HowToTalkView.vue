<script type="module" setup lang="ts">
import http from '@/server/api'
import { onMounted, ref } from 'vue'
import DownloadCard from '@/components/DownloadCard.vue'
import { useRouter } from 'vue-router'

interface NahledKarty {
  nahled: string
  popis: string
}

interface PodpurnyRozhovor {
  nadpis: string
  podnadpis: string
  nahledy_karet: NahledKarty[]
}

interface SekceKarty {
  nadpis_sekce: string
  popis_sekce: string
  polozky_sekce: {
    polozka: string
  }[]
}

interface KartaPetPlusDva {
  nadpis: string
  popis: string
  ikony: Record<string, string>[]
  sekce: SekceKarty[]
  tipy: {
    tip: string
  }[]
}

interface KartyMistaStrachu {
  nadpis: string
  popis: string
  obavy: Record<string, string>[]
  detail: string
  soubory_ke_stazeni: Record<string, string>[]
}

interface PodpurnyRozhovorAcf {
  jak_vest_rozhovor: PodpurnyRozhovor
  karty_pet_plus_dva: KartaPetPlusDva[]
  karty_ke_stazeni: KartyKeStazeni[]
  karty_mista_strachu: KartyMistaStrachu
}

interface KartyKeStazeni {
  nazev_souboru: string
  soubor: string
}

const podpurnyRozhovorAcf = ref<PodpurnyRozhovorAcf | null>(null)
const podpurnyRozhovor = ref<PodpurnyRozhovor | undefined | null>(null)
const kartyKeStazeni = ref<KartyKeStazeni[] | undefined | null>(null)
const kartyMistaStrachu = ref<KartyMistaStrachu | undefined | null>(null)
const kartyPetPlusDva = ref<KartaPetPlusDva[] | undefined | null>(null)
const loading = ref(false)
const router = useRouter()

const parsePodpurnyRozhovorData = async (podpurnyRozhovor: PodpurnyRozhovor | undefined) => {
  if (!podpurnyRozhovor) {
    return
  }

  if (!podpurnyRozhovor.nahledy_karet) {
    return podpurnyRozhovor
  }

  const promises = podpurnyRozhovor.nahledy_karet.map(async (obj: NahledKarty) => {
    const response = await http.get(`/media/${obj.nahled}`)

    return {
      ...obj,
      nahled: response.data.source_url
    }
  })

  const parsedNahledy = await Promise.all(promises)

  return {
    ...podpurnyRozhovor,
    nahledy_karet: parsedNahledy
  }
}

const parseKartyKeStazeni = async (kartyKeStazeni: KartyKeStazeni[] | undefined) => {
  if (!kartyKeStazeni) {
    return
  }

  const promises = kartyKeStazeni.map(async (obj) => {
    const response = await http.get(`/media/${obj.soubor}`)

    return {
      ...obj,
      soubor: response.data.source_url
    }
  })

  return await Promise.all(promises)
}

const parseKarty = async (kartyPetPlusDva: KartaPetPlusDva[] | undefined) => {
  if (!kartyPetPlusDva) {
    return
  }

  const asyncMap = kartyPetPlusDva?.map(async (kartaPetPlusDva) => {
    if (!kartaPetPlusDva?.ikony) {
      return kartaPetPlusDva
    }

    const promises = kartaPetPlusDva.ikony.map(async (obj) => {
      const response = await http.get(`/media/${obj.ikona}`)

      return {
        ikona: response.data.source_url
      }
    })

    const parsedIcons = await Promise.all(promises)

    return {
      ...kartaPetPlusDva,
      ikony: parsedIcons
    }
  })

  return await Promise.all(asyncMap)
}

const parseKartyMistaStrachu = async (kartyMistaStrachu: KartyMistaStrachu | undefined) => {
  if (!kartyMistaStrachu) {
    return
  }

  if (!kartyMistaStrachu.soubory_ke_stazeni) {
    return kartyMistaStrachu
  }

  const promises = kartyMistaStrachu.soubory_ke_stazeni.map(async (obj: Record<string, string>) => {
    const response = await http.get(`/media/${obj.soubor}`)

    return {
      ...obj,
      soubor: response.data.source_url
    }
  })

  const parsedSoubory = await Promise.all(promises)

  return {
    ...kartyMistaStrachu,
    soubory_ke_stazeni: parsedSoubory
  }
}

const fetchData = async () => {
  try {
    const response = await http.get('pages?slug=jak-vest-rozhovor')
    const [data] = response.data
    podpurnyRozhovorAcf.value = data?.acf

    kartyPetPlusDva.value = await parseKarty(podpurnyRozhovorAcf.value?.karty_pet_plus_dva)
    kartyMistaStrachu.value = await parseKartyMistaStrachu(
      podpurnyRozhovorAcf.value?.karty_mista_strachu
    )
    kartyKeStazeni.value = await parseKartyKeStazeni(podpurnyRozhovorAcf.value?.karty_ke_stazeni)
    podpurnyRozhovor.value = await parsePodpurnyRozhovorData(
      podpurnyRozhovorAcf.value?.jak_vest_rozhovor
    )

    loading.value = false

    if (router.currentRoute.value.hash) {
      window.location.href = router.currentRoute.value.hash
    }
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  loading.value = true
  await fetchData()
})
</script>

<template>
  <section>
    <section v-if="podpurnyRozhovor && !loading" class="w-full max-w-[900px]">
      <section class="flex flex-col justify-center gap-8 bg-salmon p-8 md:p-16">
        <div class="flex md:items-center md:justify-center gap-8 md:gap-12">
          <img
            src="@/assets/icons/ico-ask-them.svg"
            alt="icon zazemi"
            class="md:h-44 grow basis-1/5"
          />
          <h1
            class="text-heading md:text-heading-large font-baloo font-semibold text-primary m-0 grow basis-2/3"
          >
            {{ podpurnyRozhovor.nadpis }}
          </h1>
        </div>

        <h2 class="text-20 md:text-30 font-baloo text-orange text-center font-semibold m-0 md:mt-8">
          {{ podpurnyRozhovor.podnadpis }}
        </h2>

        <article class="flex flex-col md:flex-row gap-8">
          <div
            v-for="karta in podpurnyRozhovor.nahledy_karet"
            :key="karta.popis"
            class="flex flex-col md:flex-col-reverse items-center md:justify-end gap-8 basis-6/12"
          >
            <img :src="karta.nahled" :alt="karta.popis" class="w-72" />
            <p
              class="text-base md:text-16 font-roboto font-normal text-primary-text tracking-[0.01em] m-0"
            >
              {{ karta.popis }}
            </p>
          </div>
        </article>
      </section>

      <section class="flex flex-col items-center p-8 md:p-16 gap-8 md:gap-16 mt-4">
        <h1
          class="text-heading md:text-heading-large font-baloo font-semibold text-primary m-0 text-center"
        >
          Jak vést podpůrný rozhovor
        </h1>

        <a
          href="/objednat-karty"
          class="flex items-center justify-center px-10 h-[40px] border-none bg-orange text-white rounded-full text-base font-roboto font-bold hover:no-underline hover:bg-white hover:outline hover:outline-[3px] hover:outline-orange hover:text-orange no-underline visited:no-underline transition-all duration-300"
        >
          Chci karty v krabičce
        </a>

        <div class="flex flex-col gap-8 download-cards md:w-full">
          <DownloadCard
            v-for="(soubor, index) in kartyKeStazeni"
            :key="soubor.nazev_souboru"
            :download-link="soubor.soubor"
            :class="`download-card-${index}`"
          >
            {{ soubor.nazev_souboru }}
          </DownloadCard>
        </div>
      </section>

      <section class="flex flex-col p-8 md:px-16 gap-10">
        <h3 class="text-heading md:text-40 font-baloo font-semibold text-primary m-0 text-center">
          5+2 kroků v podpůrném rozhovoru
        </h3>

        <img
          src="@/assets/images/podpurny_rozhovor_graphic.svg"
          alt="grafika s radami při podpůrném rozhovoru"
          class="bg-primary rounded-10 overflow-hidden w-full md:w-8/12 max-w-[512px] self-center"
          width="500"
        />
      </section>

      <section
        v-if="kartyPetPlusDva"
        class="flex flex-col items-center p-8 md:px-16 gap-8 md:gap-16"
      >
        <article
          v-for="(karta, index) in kartyPetPlusDva"
          :key="karta.nadpis"
          class="flex flex-col justify-center p-8 md:p-16 gap-8 shadow-warning-sign rounded-10"
        >
          <div v-if="karta.ikony" class="flex items-center justify-center gap-8">
            <img
              v-for="(ikona, index) in karta.ikony"
              :key="index"
              :src="ikona.ikona"
              alt="ikona karta"
              class="h-28"
            />
          </div>

          <div class="text-heading font-baloo text-primary font-semibold">
            {{ `${index + 1}. ${karta.nadpis}` }}
          </div>

          <p class="text-base font-roboto font-normal text-primary-text tracking-[0.01em] m-0">
            {{ karta.popis }}
          </p>

          <div v-for="sekce in karta.sekce" :key="sekce.nadpis_sekce" class="flex flex-col gap-4">
            <h3 class="text-17 font-baloo font-semibold text-primary m-0">
              {{ sekce.nadpis_sekce }}
            </h3>

            <div>
              <p
                v-for="polozka in sekce.polozky_sekce"
                :key="polozka.polozka"
                class="text-base font-roboto font-medium text-orange italic tracking-[0.02em] m-0"
              >
                {{ polozka.polozka }}
              </p>
            </div>
          </div>

          <div class="flex flex-col gap-2 md:gap-8 mt-6">
            <img src="@/assets/icons/ico-tipy.svg" alt="ikona tipy rozhovor" class="h-28 md:h-36" />
            <ul class="pl-0 list-none">
              <li
                v-for="(tip, index) in karta.tipy"
                :key="index"
                class="flex items-start gap-6 text-base text-primary-text font-roboto font-normal py-2"
              >
                <img src="@/assets/icons/ico-tipy-list.svg" alt="ikona seznamu" />
                {{ tip.tip }}
              </li>
            </ul>
          </div>
        </article>
      </section>

      <section v-if="kartyMistaStrachu" id="mista-strachu" class="flex flex-col p-8 md:p-16 gap-4">
        <h3
          class="text-heading md:text-heading-large font-baloo font-semibold text-primary m-0 text-center"
        >
          {{ kartyMistaStrachu.nadpis }}
        </h3>

        <p
          class="text-base md:text-16 font-roboto font-normal text-primary-text tracking-[0.01em] m-0"
        >
          {{ kartyMistaStrachu.popis }}
        </p>

        <p class="text-base font-roboto font-bold text-orange m-0">Bojíme se například</p>

        <ul class="m-0 pl-8">
          <li
            v-for="obava in kartyMistaStrachu.obavy"
            :key="obava.obava"
            class="py-2 flex items-center list-none gap-3"
          >
            <img src="@/assets/icons/ico-dot-orange.svg" alt="ikona list orange" class="w-6 h-6" />
            <span class="text-base md:text-16 font-roboto font-normal text-primary-text">{{
              obava.obava
            }}</span>
          </li>
        </ul>

        <p
          class="text-base md:text-16 font-roboto font-normal text-primary-text tracking-[0.01em] m-0"
        >
          {{ kartyMistaStrachu.detail }}
        </p>
      </section>
    </section>

    <section v-if="loading" class="w-full h-dvh flex justify-center mt-24 opacity-20">
      <img src="@/assets/images/loader.gif" alt="" width="100" height="100" />
    </section>
  </section>
</template>

<style scoped>
.download-cards {
  @media screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(3, 1fr);
    align-items: center;
    justify-content: center;
    gap: 2rem;
  }
}

.download-card-0 {
  grid-column-start: 4;
  grid-column-end: 10;
}

.download-card-1,
.download-card-2 {
  grid-row-start: 2;
}

.download-card-1 {
  grid-column-start: 1;
  justify-self: end;
  grid-column-end: 7;
}

.download-card-2 {
  grid-column-start: 7;
  grid-column-end: 12;
}

.download-card-3 {
  grid-row-start: 3;
  grid-column-start: 4;
  grid-column-end: 10;
}
</style>
