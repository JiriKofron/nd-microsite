<script type="module" setup lang="ts">
import http from '@/server/api'
import { onMounted, ref } from 'vue'

interface VarovnySignal {
  nadpis: string
  ikona: string
  detail: string
}

interface ZavaznySignal {
  popis: string
}
interface VarovneSignaly {
  nadpis: string
  detail: string
  signal: VarovnySignal[]
}

interface ZavazneSignaly {
  nadpis: string
  popis: string
  zavazny_signal: ZavaznySignal[]
}
interface VarovneSignalyAcf {
  nadpis: string
  podnadpis: string
  popis: string
  varovne_signaly: VarovneSignaly
  zavazne_signaly: ZavazneSignaly
}

const varovneSignalyAcf = ref<VarovneSignalyAcf | null>(null)
const varovneSignaly = ref<VarovnySignal[] | undefined>([])
const loading = ref(false)

const parseWarningSignalContent = async (warningSignals: VarovnySignal[] | undefined) => {
  if (!warningSignals) {
    return
  }

  const promises = warningSignals.map(async (obj) => {
    const response = await http.get(`/media/${obj.ikona}`)

    return {
      ...obj,
      ikona: response.data.source_url
    }
  })

  return await Promise.all(promises)
}

const fetchData = async () => {
  loading.value = true
  try {
    const response = await http.get('pages?slug=varovne-signaly')
    const [data] = response.data
    varovneSignalyAcf.value = data?.acf
    varovneSignaly.value = await parseWarningSignalContent(
      varovneSignalyAcf.value?.varovne_signaly.signal
    )

    loading.value = false
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  await fetchData()
})
</script>

<template>
  <section v-if="varovneSignalyAcf && !loading" class="max-w-[900px]">
    <article class="flex flex-col items-center justify-center bg-salmon px-8 py-10 md:p-16 gap-y-8">
      <div class="flex md:items-center justify-start md:justify-center gap-x-8 px-4">
        <img
          src="@/assets/icons/ico-varovne-signaly.svg"
          alt="varovne signaly ikona vykricnik v trojuhelniku"
          class="h-24 md:h-40 grow basis-1/5"
        />
        <h1
          class="font-baloo text-heading md:text-heading-large text-primary font-semibold m-0 grow basis-2/3"
        >
          {{ varovneSignalyAcf.nadpis }}
        </h1>
      </div>

      <h2 class="text-20 md:text-30 font-baloo font-semibold text-orange text-center m-0">
        {{ varovneSignalyAcf.podnadpis }}
      </h2>
      <p
        v-html="varovneSignalyAcf.popis"
        class="text-base font-roboto font-normal text-primary-text m-0"
      />
    </article>

    <section class="flex flex-col items-center justify-center gap-y-8 p-8 pt-10 md:p-16">
      <article class="flex flex-col items-center justify-center gap-y-8">
        <h2 class="text-heading md:text-heading-large font-baloo text-primary font-semibold m-0">
          {{ varovneSignalyAcf.zavazne_signaly.nadpis }}
        </h2>

        <div
          v-html="varovneSignalyAcf.zavazne_signaly.popis"
          class="font-roboto text-base text-primary-text font-normal"
        />

        <div
          class="flex flex-col md:flex-row items-stretch justify-center md:justify-between gap-8"
        >
          <div
            v-for="(signal, index) in varovneSignalyAcf.zavazne_signaly.zavazny_signal"
            :key="signal.popis"
            class="flex md:flex-col gap-x-8 bg-salmon px-10 py-8 rounded-10"
          >
            <div
              class="inline-block text-40 text-primary-text font-baloo font-semibold basis-[6.5rem]"
            >
              {{ index + 1 }}.
            </div>
            <div class="inline-block text-base text-primary-text font-roboto font-normal">
              {{ signal.popis }}
            </div>
          </div>
        </div>
      </article>

      <section class="py-8">
        <article class="flex flex-col items-center justify-center gap-y-8 py-8">
          <h2
            class="text-heading md:text-heading-large font-baloo text-primary font-semibold m-0 text-center"
          >
            {{ varovneSignalyAcf.varovne_signaly.nadpis }}
          </h2>

          <div
            v-html="varovneSignalyAcf.varovne_signaly.detail"
            class="font-roboto text-base text-primary-text font-normal"
          />

          <div class="flex flex-col items-stretch gap-8 md:gap-12 mt-8">
            <div
              v-for="signal in varovneSignaly"
              :key="signal.nadpis"
              class="flex flex-col flex-nowrap gap-6 md:gap-12 shadow-warning-sign p-8 md:p-16 rounded-10"
            >
              <div class="text-20 md:text-heading font-baloo text-orange font-semibold">
                {{ signal.nadpis }}
              </div>

              <div class="flex flex-col md:flex-row gap-6 md:gap-12">
                <div class="flex md:flex-col items-center md:items-start gap-8 md:basis-2/12">
                  <span
                    class="inline-block uppercase text-17 md:text-16 md:tracking-tracking-[0.01em] text-primary font-roboto font-medium md:font-bold"
                    >co se děje:
                  </span>
                  <img :src="signal.ikona" alt="ikona karta závažné signály" class="w-20" />
                </div>

                <div
                  v-html="signal.detail"
                  class="text-base font-roboto font-normal text-primary-text flex-1"
                />
              </div>
            </div>
          </div>
        </article>
      </section>
    </section>
  </section>
</template>

<style scoped>
::v-deep(p:first-of-type) {
  margin-top: 0;
}

::v-deep(p:last-of-type) {
  margin-bottom: 0;
}
</style>
