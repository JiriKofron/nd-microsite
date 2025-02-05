<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import axios from 'axios'
import http from '@/server/api'

const router = useRouter()

interface Zaplaceno {
  nadpis: string
  podnadpis: string
  popis: string
}

interface Nezaplaceno {
  nadpis: string
  podnadpis: string
  popis: string
}

interface Waiting {
  nadpis: string
  popis: string
}

interface Dotazy {
  nadpis: string
  popis: string
}

interface PaymentDetails {
  zaplaceno: Zaplaceno
  nezaplaceno: Nezaplaceno
  cekame_na_platbu: Waiting
  dotazy: Dotazy
}

interface PaymentData {
  amount: number
  currency: string
  gw_url: string
  id: number
  lang: string
  order_number: string
  payer: Record<string, unknown>
  payment_instrument: string
  state: string
  target: {
    goid: number
    type: string
  }
}

interface OrderData {
  address: string
  company?: string
  ico?: string
  invoice?: string
  mail: string
  mistastrachu: number
  name: string
  orderId: string
  phone: string
  total: string
}

const paymentDetails = ref<PaymentDetails>()
const paymentData = ref<PaymentData | undefined>()
const orderData = ref<OrderData | undefined>()
const fetchData = async () => {
  try {
    const response = await http.get('pages?slug=platba')
    const [data] = response.data
    paymentDetails.value = data?.acf
  } catch (error) {
    console.error(error)
  }
}

//TODO: Notification messages from responses
onMounted(async () => {
  await router.isReady()

  if (router.currentRoute.value.query) {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/wp-json/draftspot_theme/v1/payment_status/`,
      {
        paymentId: router.currentRoute.value.query.id
      }
    )

    paymentData.value = JSON.parse(data.body)
  }

  await fetchData()
  const response = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/wp-json/draftspot_theme/v1/confirmation/`,
    {
      paymentId: paymentData.value?.id,
      status: paymentData.value?.state
    }
  )

  orderData.value = response.data
})

const isPaid = computed(() => {
  return paymentData.value?.state === 'PAID'
})

const waitingForPayment = computed(() => {
  return (
    paymentData.value?.state === 'CREATED' ||
    paymentData.value?.state === 'PAYMENT_METHOD_CHOSEN' ||
    paymentData.value?.state === 'AUTHORIZED'
  )
})

const retryPayment = () => {
  window.location.href = paymentData.value?.gw_url || 'https://www.nevypustdusi.cz/objednat-karty'
}

const headingText = computed(() => {
  switch (paymentData.value?.state) {
    case 'PAID':
      return paymentDetails.value?.zaplaceno?.nadpis
    case 'CREATED':
    case 'AUTHORIZED':
    case 'PAYMENT_METHOD_CHOSEN':
      return paymentDetails.value?.cekame_na_platbu?.nadpis
    case 'CANCELED':
    case 'TIMEOUTED':
      return paymentDetails.value?.nezaplaceno?.nadpis
    default:
      return 'Prosím počkejte na aktualizaci stavu platby'
  }
})

const descriptionText = computed(() => {
  switch (paymentData.value?.state) {
    case 'PAID':
      return paymentDetails.value?.zaplaceno?.popis
    case 'CREATED':
    case 'AUTHORIZED':
    case 'PAYMENT_METHOD_CHOSEN':
      return paymentDetails.value?.cekame_na_platbu?.popis
    case 'CANCELED':
    case 'TIMEOUTED':
      return paymentDetails.value?.nezaplaceno?.popis
    default:
      return ''
  }
})
</script>

<template>
  <section
    v-if="paymentData"
    class="flex flex-col items-center justify-center gap-12 px-8 py-6 max-w-[900px]"
  >
    <h1
      class="text-clamp leading-tight font-baloo font-semibold text-center md:w-full max-w-[540px]"
      :class="[isPaid ? 'text-green' : 'text-danger']"
    >
      {{ headingText }}
    </h1>

    <p v-html="descriptionText" class="text-16 font-roboto text-text-gray m-0" />

    <section v-if="isPaid || waitingForPayment" class="flex flex-col items-center justify-center shadow-warning-sign w-full py-8 text-text-gray ga-12">
      <h2 class="text-primary font-baloo text-clamp text-center">
        Shrnutí objednávky č. {{ orderData?.orderId }}
      </h2>
      <div class="flex flex-col p-8 md:p-12 gap-12 w-full">
        <article class="flex flex-col gap-4">
          <h3 class="text-20 m-0 font-roboto">Zakoupené produkty:</h3>

          <div
            class="flex gap-4 flex-nowrap text-base font-roboto text-text-gray justify-between font-normal"
          >
            <span>{{ orderData?.mistastrachu }} x</span>
            <span>Místa strachu</span>
            <span>
              {{
                orderData?.total
                  ? (parseInt(orderData.total) as number) / orderData.mistastrachu
                  : ''
              }}
              Kč/kus</span
            >
            <span>{{ orderData?.total || (paymentData?.amount ?? 100) / 100 }} Kč</span>
          </div>

          <div class="flex justify-between text-16 font-semibold font-roboto">
            <span>Cena celkem:</span>
            <span>{{ orderData?.total || (paymentData?.amount ?? 100) / 100 }} Kč</span>
          </div>
        </article>

        <article class="flex flex-col gap-2">
          <h3 class="text-20 m-0 font-roboto">Doručovací adresa:</h3>
          <span class="text-base font-roboto text-text-gray font-normal">{{
            `${orderData?.name}, ${orderData?.address}`
          }}</span>
        </article>

        <article class="flex flex-col gap-2">
          <h3 class="text-20 m-0 font-roboto">Kontakt:</h3>
          <span class="text-base font-roboto text-text-gray font-normal">
            {{ `${orderData?.mail}, ${orderData?.phone}` }}
          </span>
          <span class="text-base font-roboto text-text-gray font-normal">
            {{ orderData?.invoice || orderData?.address }}, IČO: {{ orderData?.ico }}
          </span>
        </article>
      </div>

      <button
        v-if="waitingForPayment"
        class="flex items-center justify-center px-6 py-2 border-none bg-orange text-white rounded-full text-base tracking-[0.05em] font-roboto font-bold w-fit cursor-pointer hover:bg-white hover:text-orange hover:outline hover:outline-[3px] hover:outline-orange hover:no-underline transition-all duration-300"
        type="button"
        @click="retryPayment"
      >
        Dokončit platbu
      </button>
    </section>

    <section
      v-else
      class="flex flex-col items-center justify-center shadow-warning-sign w-full py-12 text-text-gray"
    >
      <h2 class="text-primary font-baloo text-clamp text-center">
        Zkuste prosím provést platbu znova
      </h2>

      <button
        class="flex items-center justify-center px-6 py-2 border-none bg-orange text-white rounded-full text-base tracking-[0.05em] font-roboto font-bold w-fit cursor-pointer hover:bg-white hover:text-orange hover:outline hover:outline-[3px] hover:outline-orange hover:no-underline transition-all duration-300"
        type="button"
        @click="retryPayment"
      >
        Opakovat platbu
      </button>
    </section>

    <section>
      <div v-if="paymentDetails?.dotazy" class="flex flex-col items-center justify-center gap-6">
        <h2 class="text-primary text-clamp text-center font-baloo m-0">
          {{ paymentDetails.dotazy.nadpis }}
        </h2>
        <p v-html="paymentDetails.dotazy.popis" class="m-0 text-sm text-text-gray font-roboto" />
      </div>
    </section>
  </section>
</template>

<style scoped></style>
