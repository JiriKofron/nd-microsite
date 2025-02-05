<script type="module" setup lang="ts">
import http from '@/server/api'
import { onMounted, ref } from 'vue'

interface OProjektu {
  nadpis: string
  podnadpis: string
  popis: string
  loga: Logo[]
}

interface AutorskyTym {
  jmeno: string
  pozice: string
}

interface Logo {
  nazev?: string
  logo: string
}

interface Podporovatele {
  nadpis: string
  popis: string
  loga?: Logo[]
}

interface SpolupracujiciOrganizace {
  nazev_instituce: string
  logo: string
  odkaz: string
}

interface OProjektuAcf {
  o_projektu: OProjektu
  autorsky_tym: AutorskyTym[]
  podporovatele: Podporovatele
  spolupracujici_organizace: SpolupracujiciOrganizace[]
}

const oProjektuAcf = ref<OProjektuAcf | null>(null)
const oProjektu = ref<OProjektu | undefined | null>(null)
const podporovatele = ref<Podporovatele | undefined | null>(null)
const spolupracujiciOrganizace = ref<SpolupracujiciOrganizace[] | undefined | null>(null)
const loading = ref(false)

const parseOProjektu = async (oProjektu: OProjektu | undefined) => {
  if (!oProjektu) {
    return
  }

  if (!oProjektu.loga) {
    return oProjektu
  }

  const promises = oProjektu.loga.map(async (obj: Logo) => {
    const response = await http.get(`/media/${obj.logo}`)

    return {
      ...obj,
      logo: response.data.source_url
    }
  })

  const parsedLoga = await Promise.all(promises)

  return {
    ...oProjektu,
    loga: parsedLoga
  }
}

const parsePodporovatele = async (podporovatele: Podporovatele | undefined) => {
  if (!podporovatele) {
    return
  }

  if (!podporovatele.loga) {
    return podporovatele
  }

  const promises = podporovatele.loga.map(async (obj: Logo) => {
    const response = await http.get(`/media/${obj.logo}`)

    return {
      ...obj,
      logo: response.data.source_url
    }
  })

  const parsedLoga = await Promise.all(promises)

  return {
    ...podporovatele,
    loga: parsedLoga
  }
}

const parseSpolupracujiciOrganizace = async (
  spolupracujiciOrganizace: SpolupracujiciOrganizace[] | undefined
) => {
  if (!spolupracujiciOrganizace) {
    return
  }

  const asyncMap = spolupracujiciOrganizace?.map(async (organizace) => {
    if (!organizace?.logo) {
      return organizace
    }

    const response = await http.get(`/media/${organizace.logo}`)

    return {
      ...organizace,
      logo: response.data.source_url
    }
  })

  return await Promise.all(asyncMap)
}

const fetchData = async () => {
  try {
    const response = await http.get('pages?slug=o-projektu')
    const [data] = response.data
    oProjektuAcf.value = data?.acf
    oProjektu.value = await parseOProjektu(oProjektuAcf.value?.o_projektu)
    podporovatele.value = await parsePodporovatele(oProjektuAcf.value?.podporovatele)
    spolupracujiciOrganizace.value = await parseSpolupracujiciOrganizace(
      oProjektuAcf.value?.spolupracujici_organizace
    )
    loading.value = false
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  loading.value = true
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })

  await fetchData()
})
</script>

<template>
  <section class="flex flex-col items-center justify-center w-full">
    <section v-if="oProjektuAcf && !loading" class="max-w-[900px]">
      <article
        class="flex flex-col items-center justify-center bg-salmon px-8 py-10 md:p-16 gap-y-8"
      >
        <div class="flex justify-start md:justify-center gap-x-8 md:gap-x-16 px-4">
          <img
            src="@/assets/icons/ico-kdo-stoji.svg"
            alt="ikona siluet lidí"
            class="h-24 md:h-44"
          />
          <h1 class="font-baloo text-heading md:text-40 text-primary font-semibold m-0">
            {{ oProjektuAcf.o_projektu.nadpis }}
          </h1>
        </div>

        <h2 class="text-20 md:text-30 font-baloo font-semibold text-orange text-center m-0 md:mt-8">
          {{ oProjektuAcf.o_projektu.podnadpis }}
        </h2>

        <p class="text-base md:text-16 font-roboto font-normal text-primary-text m-0">
          {{ oProjektuAcf.o_projektu.popis }}
        </p>

        <div v-if="oProjektu && oProjektu.loga.length > 0">
          <img
            :src="logo.logo"
            v-for="logo in oProjektu.loga"
            :key="logo.logo"
            alt=""
            width="250"
          />
        </div>
      </article>

      <section class="flex flex-col p-8">
        <h2
          class="text-heading lg:text-heading-large font-baloo font-bold text-primary text-center"
        >
          Autorský tým
        </h2>

        <p
          class="text-20 lg:text-heading font-baloo font-semibold text-primary text-center md:text-left"
        >
          Odbornice a odborníci, kteří se podíleli na tvorbě nástrojů
        </p>

        <div>
          <ul class="flex flex-col gap-6 pl-0 md:pl-6">
            <li
              v-for="autor in oProjektuAcf.autorsky_tym"
              :key="autor.jmeno"
              class="flex list-none gap-12"
            >
              <img src="@/assets/icons/ico-dot-orange.svg" alt="ikona seznamu" class="self-start" />

              <span>
                <span class="text-base md:text-16 font-roboto font-bold text-primary">
                  {{ `${autor.jmeno} - ` }}
                </span>
                <span
                  class="text-base md:text-16 font-roboto font-normal tracking-[0.01em] text-primary-text"
                  >{{ autor.pozice }}</span
                >
              </span>
            </li>
          </ul>
        </div>
      </section>

      <section v-if="podporovatele" class="flex flex-col items-center gap-8 p-8">
        <div class="flex flex-col items-center">
          <h3 class="text-22 md:text-heading font-baloo font-semibold text-primary m-0">
            {{ podporovatele.nadpis }}
          </h3>

          <p
            v-html="podporovatele.popis"
            class="text-base md:text-16 font-roboto font-normal text-primary-text"
          />
        </div>

        <div v-if="podporovatele.loga" class="flex justify-center gap-12">
          <div v-for="logo in podporovatele.loga" :key="logo.logo">
            <img :src="logo.logo" :alt="logo.nazev" class="w-[100px]" />
          </div>
        </div>
      </section>

      <section
        v-if="spolupracujiciOrganizace"
        class="flex flex-col items-center gap-8 p-8 md:py-16"
      >
        <h3 class="text-22 md:text-heading font-baloo font-semibold text-primary m-0 py-8">
          Spolupracující organizace
        </h3>

        <div
          v-if="spolupracujiciOrganizace.length > 0"
          class="flex flex-wrap justify-center gap-20 md:gap-8"
        >
          <div
            v-for="organizace in spolupracujiciOrganizace"
            :key="organizace.nazev_instituce"
            class="flex flex-col items-stretch w-[250px] gap-4 box-border"
          >
            <a
              :href="organizace.odkaz"
              target="_blank"
              class="flex flex-col items-center gap-4 no-underline hover:no-underline visited:no-underline w-full"
            >
              <div class="flex items-center justify-center h-[120px]">
                <img
                  :src="organizace.logo"
                  :alt="organizace.nazev_instituce"
                  class="max-w-[200px] max-h-[120px]"
                />
              </div>

              <div
                class="flex items-stretch justify-between px-8 py-2 bg-yellow w-full rounded-10 overflow-hidden box-border"
              >
                <div class="basis-auto text-20 font-roboto font-medium text-light-violet py-4 pr-4">
                  {{ organizace.nazev_instituce }}
                </div>
                <div class="flex">
                  <hr class="text-white w-[2px] bg-white border-none" />
                  <div class="flex items-center justify-center pl-8">
                    <img
                      src="@/assets/icons/ico-open-in-new.svg"
                      alt="ikona pro otevření odkazu v novém okně"
                    />
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>
    </section>
    <section v-if="loading" class="w-full h-dvh flex justify-center mt-24 opacity-20">
      <img src="@/assets/images/loader.gif" alt="" width="100" height="100" />
    </section>
  </section>
</template>
