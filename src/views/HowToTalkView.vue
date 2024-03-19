<script type="module" setup lang="ts">
import http from "@/server/api";
import {onMounted, ref} from "vue";
import DownloadCard from "@/components/DownloadCard.vue";

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
  sekce: SekceKarty[]
  tipy: {
    tip: string
  }[]
}

interface PodpurnyRozhovorAcf {
  jak_vest_rozhovor: PodpurnyRozhovor
  karty_pet_plus_dva: KartaPetPlusDva[]
}

const podpurnyRozhovorAcf = ref<PodpurnyRozhovorAcf | null>(null);
const podpurnyRozhovor = ref<PodpurnyRozhovor | undefined | null>(null);
const karty = ref<KartaPetPlusDva[] | undefined | null>(null)

const parsePodpurnyRozhovorData = async (podpurnyRozhovor: PodpurnyRozhovor | undefined) => {
  if(!podpurnyRozhovor) {
    return
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

const fetchData = async () => {
  const response = await http.get('pages?slug=podpurny-rozhovor')
  const [data] = response.data
  podpurnyRozhovorAcf.value = data?.acf
  karty.value = podpurnyRozhovorAcf.value?.karty_pet_plus_dva
  podpurnyRozhovor.value = await parsePodpurnyRozhovorData(podpurnyRozhovorAcf.value?.jak_vest_rozhovor)
}

onMounted(async () => {
  await fetchData()
})
</script>

<template>
<section>
  <section v-if="podpurnyRozhovor">
    <div>
      <img src="@/assets/icons/ico-ask-them.svg" alt="icon zazemi">
      <h1>{{podpurnyRozhovor.nadpis}}</h1>
    </div>

    <h2>
      {{podpurnyRozhovor.podnadpis}}
    </h2>

    <article>
      <div v-for="karta in podpurnyRozhovor.nahledy_karet" :key="karta.popis">
        <img :src="karta.nahled" :alt="karta.popis" />
        <p>{{karta.popis}}</p>
      </div>
    </article>
  </section>

  <section>
    <h1>
      Podpora pro podpůrný rozhovor
    </h1>

    <button>
      Chci karty v krabičce
    </button>
    <DownloadCard download-link="/">
      Název slot
    </DownloadCard>

    <DownloadCard download-link="/">
      Název slot 2
    </DownloadCard>
  </section>

  <section>
    <h1>5+2 kroků v podpůrném rozhovoru</h1>

    <img src="@/assets/images/podpurny_rozhovor_graphic.svg" alt="grafika s radami při podpůrném rozhovoru" />
  </section>

  <section v-if="karty">
    <article v-for="karta in karty" :key="karta.nadpis">
      <div>
        {{karta.nadpis}}
      </div>

      <div>
        {{karta.popis}}
      </div>

      <div v-for="sekce in karta.sekce" :key="sekce.nadpis_sekce">
        <div>
          {{sekce.nadpis_sekce}}
        </div>

        <div v-for="polozka in sekce.polozky_sekce" :key="polozka.polozka">
          {{polozka.polozka}}
        </div>
      </div>

      <div>
        <div v-for="(tip, index) in karta.tipy" :key="index">
          {{tip.tip}}
        </div>
      </div>
    </article>
  </section>
</section>
</template>

<style scoped>

</style>
