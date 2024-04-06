<script type="module" setup lang="ts">
import http from '@/server/api'
import { ref, onMounted } from 'vue'

interface SouborKeStazeni {
  nazev: string
  soubor: string
}

interface Odkaz {
  nazev: string
  odkaz: string
}

interface Sekce {
  nadpis: string
  popis: string
  body: {
    bod: string
  }[]
}

interface SirsiPodpurnaSit {
  nadpis: string
  popis: string
  showMore: boolean
  sekce: Sekce[]
  odkazy: Odkaz[]
  soubory_ke_stazeni: SouborKeStazeni[]
}

interface MistaPomociAcf {
  nadpis: string
  podnadpis: string
  popis: Record<string, string>[]
  sirsi_podpurna_sit: SirsiPodpurnaSit[]
}

const mistaPomociAcf = ref<MistaPomociAcf | null>(null)
const sirsiPodpurnaSit = ref<SirsiPodpurnaSit[] | undefined | null>(null)

const parseSirsiPodpurnaSit = (sirsiPodpurnaSit: SirsiPodpurnaSit[] | undefined) => {
  return sirsiPodpurnaSit?.map((sit) => {
    return {
      ...sit,
      showMore: false
    }
  })
}

const fetchData = async () => {
  const response = await http.get('pages?slug=mista-pomoci-a-podpory')
  const [data] = response.data
  mistaPomociAcf.value = data.acf
  sirsiPodpurnaSit.value = parseSirsiPodpurnaSit(mistaPomociAcf.value?.sirsi_podpurna_sit)
}

onMounted(async () => {
  await fetchData()
})
</script>

<template>
  <section v-if="mistaPomociAcf" class="max-w-[900px]">
    <article
      class="flex flex-col items-center justify-center bg-salmon px-8 md:p-16 py-10 gap-y-8 md:gap-16"
    >
      <div class="flex items-center justify-start md:justify-center gap-x-8 px-4">
        <img
          src="@/assets/icons/ico-mista-pomoci.svg"
          alt="místa pomoci ilustrace ruka"
          class="h-24 md:h-36"
        />
        <h1 class="font-baloo text-heading md:text-heading-large text-primary font-semibold m-0">
          {{ mistaPomociAcf.nadpis }}
        </h1>
      </div>

      <h2 class="text-20 md:text-30 font-baloo font-semibold text-orange text-center m-0">
        {{ mistaPomociAcf.podnadpis }}
      </h2>

      <div class="flex flex-col gap-8">
        <p
          v-for="(popis, index) in mistaPomociAcf.popis"
          :key="index"
          v-html="popis.odstavec"
          class="text-base md:text-16 font-roboto font-normal text-primary-text m-0"
        />
      </div>
    </article>

    <section
      class="flex flex-col items-center p-8 md:p-16 gap-8 md:gap-16 mt-4 md:w-full box-border"
    >
      <h2
        class="text-heading md:text-heading-large font-baloo font-bold text-primary text-center m-0"
      >
        Místa pomoci - Širší podpůrná síť
      </h2>

      <a
        href="https://nevypustdusi.cz/kde-hledat-pomoc/"
        class="flex items-center justify-center px-10 py-4 border-none bg-orange text-white rounded-full text-base font-roboto font-bold w-fit no-underline box-border hover:bg-white hover:text-orange hover:outline hover:outline-[3px] hover:outline-orange"
      >
        Adresář všech kontaktů podle krajů
      </a>

      <article
        v-if="mistaPomociAcf && mistaPomociAcf.sirsi_podpurna_sit"
        class="flex flex-col gap-6 md:gap-16 md:w-full"
      >
        <div
          v-for="(sit, index) in sirsiPodpurnaSit"
          :key="index"
          class="flex flex-col p-8 gap-4 shadow-warning-sign rounded-10"
        >
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h3
              class="text-heading md:text-26 font-baloo text-primary font-semibold m-0"
              :class="{ 'md:text-heading-large': sit.showMore }"
            >
              {{ sit.nadpis }}
            </h3>

            <button
              v-if="!sit.showMore"
              @click="sit.showMore = true"
              class="flex items-center justify-center px-6 py-2 border-none bg-orange text-white rounded-full text-base tracking-[0.05em] font-roboto font-bold w-fit gap-2 self-end"
              type="button"
            >
              <span>Zobrazit detail</span>
              <img
                src="@/assets/icons/ico-keyboard-arrow-up.svg"
                alt="ikona šipka nahoru"
                class="rotate-180"
              />
            </button>
          </div>

          <div v-if="sit.showMore">
            <p
              v-html="sit.popis"
              class="text-base font-roboto font-normal tracking-[0.01em] text-primary-text"
            />

            <article v-for="sekce in sit.sekce" :key="sekce.nadpis" class="py-8">
              <h4 class="text-20 md:text-heading font-baloo font-semibold text-orange my-4">
                {{ sekce.nadpis }}
              </h4>

              <p
                v-if="sekce.popis"
                v-html="sekce.popis"
                class="text-base md:text-16 font-roboto font-normal tracking-[0.01em] text-primary-text"
              />

              <ul v-if="sekce.body && sekce.body.length > 0" class="pl-0 md:pl-6 list-none">
                <li
                  v-for="(bod, index) in sekce.body"
                  :key="index"
                  class="flex items-start gap-6 text-base md:text-16 text-primary-text font-roboto font-normal py-2"
                >
                  <img src="@/assets/icons/ico-dot-orange.svg" alt="ikona seznamu" />
                  <span v-html="bod.bod" />
                </li>
              </ul>
            </article>
          </div>

          <button
            v-if="sit.showMore"
            @click="sit.showMore = false"
            class="flex items-center justify-center px-6 py-2 border-none bg-orange text-white rounded-full text-base md:text-17 font-roboto font-bold tracking-[0.05em] md:tracking-[0.03em] w-fit gap-2 self-end"
            type="button"
          >
            <span>Skrýt</span>
            <img src="@/assets/icons/ico-keyboard-arrow-up.svg" alt="ikona šipka nahoru" />
          </button>
        </div>
      </article>
    </section>
  </section>
</template>

<style scoped></style>
