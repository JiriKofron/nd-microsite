<script type="module" setup lang="ts">
import { ref } from 'vue'
import { Form, Field, useForm, ErrorMessage } from 'vee-validate'
import { object, string, number } from 'yup'
import axios from 'axios'
import type { KartyBalicekFormular } from '@/views/CardsOrder.vue'

const { details } = defineProps<{
  details: KartyBalicekFormular | undefined
}>()

interface FormData {
  name: string
  address: string
  mail: string
  phone: string
  ico?: string
  company?: string
  invoice?: string
  petplusdva?: number
  mistastrachu: number
  payment: string
  note?: string
}

const formData = ref<FormData>({
  name: '',
  address: '',
  mail: '',
  phone: '',
  ico: '',
  company: '',
  invoice: '',
  petplusdva: 0,
  mistastrachu: 0,
  payment: 'GoPay',
  note: ''
})

const formElement = ref()
const schema = object({
  name: string().required('Vyplňte prosím svoje jméno').min(4, 'Minimální počet znaků jsou 4'),
  address: string().required('Vyplňte prosím dodací adresu'),
  email: string().required('Vyplňte prosím emailovou adresu').email('Email není validní'),
  phone: string().required('Vyplňte prosím svoje telefonní číslo'),
  ico: string(),
  company: string(),
  invoice: string(),
  petplusdva: number(),
  mistastrachu: number().required('Vyplňte prosím počet kusů'),
  payment: string().nullable(),
  note: string().max(250, 'Maximální délka poznámky je 250 znaků')
})

const { isSubmitting } = useForm()
const isSending = ref(false)

const submitForm = async () => {
  isSending.value = true
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/wp-json/draftspot_theme/v1/place_order/`,
      {
        ...formData.value,
        total: formData.value.mistastrachu * (details?.cena ?? 700) * 100
      }
    )
    console.log(data)

    const dataToSave = {
      ...formData.value,
      orderId: data.order_number,
      paymentId: data.id,
      paymentStatus: data.state,
      total: data.amount / 100
    }

    await axios.post(
      `${import.meta.env.VITE_BASE_URL}/wp-json/draftspot_theme/v1/insert/`,
      dataToSave
    )

    // Redirect go GoPay gateway
    window.location.href = data.gw_url
  } catch (error) {
    console.error(error)
  } finally {
    formElement.value.resetForm()
    isSending.value = false
  }
}

const handleErrors = ({ errors }: any) => {
  if (errors) {
    const firstError = Object.keys(errors)[0]
    const el = document.querySelector(`#${firstError}`)

    el?.scrollIntoView({
      behavior: 'smooth'
    })
    ;(el as HTMLElement)?.focus()
  }
}
</script>

<template>
  <section class="flex flex-col p-8 md:p-16 gap-8 md:gap-16 bg-white rounded-10">
    <div class="flex flex-col gap-8 md:gap-16">
      <h4 class="text-orange text-heading md:text-30 font-baloo font-semibold m-0">
        {{details?.nadpis}}
      </h4>

      <p
        v-html="details?.popis"
        class="text-primary-text text-base md:text-16 font-roboto font-normal tracking-[0.01em] m-0"
      />
    </div>

    <Form
      v-slot="{ errors }"
      ref="formElement"
      class="flex flex-col gap-16"
      :validation-schema="schema"
      @invalid-submit="handleErrors"
      @submit="submitForm"
    >
      <div class="flex flex-col md:flex-row gap-10 md:gap-16">
        <h4 class="text-primary text-20 md:text-heading font-baloo font-semibold m-0 md:basis-2/6">
          Kontakt na vás
        </h4>

        <div class="flex flex-col gap-14 input__group md:basis-3/6">
          <div class="input">
            <label for="name" class="input__label" :class="{ 'input__label--errors': errors.name }">
              Jméno a příjmení *
            </label>

            <Field
              v-model="formData.name"
              id="name"
              name="name"
              type="text"
              class="input__field"
              :class="{
                'input__field--errors focus-visible:outline-danger outline-2': errors.name
              }"
            />

            <ErrorMessage name="name" class="text-sm font-roboto text-danger pl-8 pt-1" />
          </div>

          <div class="input">
            <label
              for="address"
              class="input__label"
              :class="{ 'input__label--errors': errors.address }"
            >
              Adresa, kam karty zašleme *
            </label>

            <Field
              v-model="formData.address"
              id="address"
              name="address"
              type="text"
              class="input__field"
              :class="{
                'input__field--errors focus-visible:outline-danger outline-2': errors.address
              }"
            />

            <ErrorMessage name="address" class="text-sm font-roboto text-danger pl-8 pt-1" />
          </div>

          <div class="input">
            <label
              for="email"
              class="input__label"
              :class="{ 'input__label--errors': errors.email }"
            >
              Email, na který vám odpovíme *
            </label>
            <Field
              v-model="formData.mail"
              id="email"
              name="email"
              type="text"
              class="input__field"
              :class="{
                'input__field--errors focus-visible:outline-danger outline-2': errors.email
              }"
            />

            <ErrorMessage name="email" class="text-sm font-roboto text-danger pl-8 pt-1" />
          </div>

          <div class="input">
            <label
              for="phone"
              class="input__label"
              :class="{ 'input__label--errors': errors.phone }"
            >
              Telefon *
            </label>

            <Field
              v-model="formData.phone"
              id="phone"
              name="phone"
              type="text"
              class="input__field"
              :class="{
                'input__field--errors focus-visible:outline-danger outline-2': errors.phone
              }"
            />

            <ErrorMessage name="phone" class="text-sm font-roboto text-danger pl-8 pt-1" />
          </div>
        </div>
      </div>

      <div class="flex flex-col md:flex-row gap-8 md:gap-16">
        <h4 class="text-primary text-20 md:text-heading font-baloo font-semibold m-0 md:basis-2/6">
          Fakturační údaje
        </h4>

        <div class="flex flex-col gap-14 input__group md:basis-3/6">
          <div class="input">
            <label
              for="company"
              class="input__label"
              :class="{ 'input__label--errors': errors.company }"
            >
              Název firmy
            </label>
            <Field
              v-model="formData.company"
              id="company"
              name="company"
              type="text"
              class="input__field"
              :class="{
                'input__field--errors focus-visible:outline-danger outline-2': errors.company
              }"
              @change="errors.company = ''"
            />

            <ErrorMessage name="company" class="text-sm font-roboto text-danger pl-8 pt-1" />
          </div>

          <div class="input">
            <label for="ico" class="input__label" :class="{ 'input__label--errors': errors.ico }">
              IČO
            </label>
            <Field
              v-model="formData.ico"
              id="ico"
              name="ico"
              type="text"
              class="input__field"
              :class="{ 'input__field--errors focus-visible:outline-danger outline-2': errors.ico }"
              @change="errors.ico = ''"
            />

            <ErrorMessage name="ico" class="text-sm font-roboto text-danger pl-8 pt-1" />
          </div>

          <div class="input">
            <label
              for="invoice"
              class="input__label"
              :class="{ 'input__label--errors': errors.invoice }"
            >
              Fakturační adresa
            </label>
            <Field
              v-model="formData.invoice"
              id="invoice"
              name="invoice"
              type="text"
              class="input__field"
              :class="{
                'input__field--errors focus-visible:outline-danger outline-2': errors.invoice
              }"
              @change="errors.invoice = ''"
            />

            <ErrorMessage name="invoice" class="text-sm font-roboto text-danger pl-8 pt-1" />
          </div>
        </div>
      </div>

      <div
        class="flex flex-col gap-4 p-8 md:p-0 md:gap-16 shadow-warning-sign md:shadow-none rounded-10"
      >
        <div class="flex flex-col md:flex-row gap-8 md:gap-16">
          <p class="text-primary text-20 font-baloo font-semibold m-0 md:basis-4/12">
            5+2 kroků k podpůrnému rozhovoru a Místa strachu
          </p>

          <div class="flex items-center justify-evenly gap-4 md:gap-8 md:basis-6/12">
            <div class="input max-w-48 md:max-w-none md:!w-40">
              <label
                for="mistastrachu"
                class="input__label"
                :class="{ 'input__label--errors': errors.mistastrachu }"
              >
                Počet
              </label>

              <Field
                v-model="formData.mistastrachu"
                id="mistastrachu"
                name="mistastrachu"
                type="number"
                class="w-1/3 max-w-40 input__field"
                :class="{
                  'input__field--errors focus-visible:outline-danger outline-2': errors.mistastrachu
                }"
                @change="errors.mistastrachu = ''"
              />

              <ErrorMessage name="mistastrachu" class="text-sm font-roboto text-danger pl-8 pt-1" />
            </div>

            <div
              class="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 w-2/3 text-primary-text"
            >
              <div class="flex items-center justify-between md:justify-start gap-4 md:gap-8">
                <p class="text-base font-roboto font-normal m-0">Cena:</p>

                <p class="font-bold font-baloo text-20 m-0">
                  {{ formData.mistastrachu * (details?.cena ?? 700) }} Kč
                </p>
              </div>
              <p class="text-base font-roboto font-normal m-0">
                ( {{ details?.cena ?? 700 }} Kč/ks)
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col md:flex-row gap-8 md:gap-16 h-[240px]">
        <h4 class="text-primary text-20 font-baloo font-semibold m-0 md:basis-4/12">
          Zde můžete upřesnit svou objednávku
        </h4>

        <div class="input md:basis-6/12">
          <label
            for="note"
            class="input__label"
            :class="{ 'input__label--errors focus-visible:outline-danger outline-2': errors.note }"
          >
            Poznámka
          </label>

          <Field
            v-model="formData.note"
            id="note"
            name="note"
            as="textarea"
            rows="7"
            class="input__field !h-72 !p-6"
            :class="{ 'input__field--errors': errors.note }"
            @change="errors.note = ''"
          />

          <ErrorMessage name="note" class="text-sm font-roboto text-danger pl-8 pt-1" />
        </div>
      </div>

      <div class="flex flex-col gap-4">
        <h4 class="text-primary text-20 font-baloo font-semibold m-0 md:basis-4/12">
          Způsob platby
        </h4>

        <div class="flex items-center gap-4">
          <Field
            v-model="formData.payment"
            id="payment"
            name="payment"
            type="radio"
            value="GoPay"
            class="m-0 before:!w-7 before:!h-7 before:!top-[5px] after:!bg-primary after:!w-4 after:!h-4 after:!left-[0.28em] after:!top-[0.6em]"
          />

          <p class="text-primary text-17 font-baloo font-semibold m-0">GoPay - online platba</p>
        </div>
      </div>

      <div class="flex flex-col gap-3">
        <button
          class="flex items-center justify-center h-[40px] px-4 rounded-full leading-relaxed cursor-pointer bg-orange border-none text-base md:text-17 text-white font-roboto font-semibold w-2/3 md:w-1/3 hover:bg-white hover:text-orange hover:outline hover:outline-[3px] hover:outline-orange transition-all duration-300"
          type="submit"
          :disabled="isSubmitting || isSending"
        >
          {{ isSending ? 'Odesílám...' : 'Závazně objednat' }}
        </button>

        <span class="text-base font-roboto text-light-gray">
          Po kliknutí budete přesměrováni na platební bránu GoPay
        </span>
      </div>
    </Form>
  </section>
</template>

<style lang="scss" scoped>
.input {
  position: relative;
  width: 100%;
  height: 6rem;
  box-sizing: border-box;

  &__label {
    z-index: 2;
    height: 1.6rem;
    padding: 0 0.5rem;
    position: absolute;
    top: -1rem;
    left: 1.5rem;
    background-color: white;
    font-size: 1.5rem;
    line-height: 2rem;
    font-family: 'Roboto', sans-serif;
    color: var(--primary-text);

    &--errors {
      color: var(--danger);
    }
  }

  &__field {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border: 1px solid var(--dark-violet);
    border-radius: 1rem;
    padding: 1rem;
    font-size: 1.7rem;
    line-height: 2.1rem;
    font-family: 'Roboto', sans-serif;
    color: var(--primary-text);

    &:focus {
      color: var(--primary-text);
    }

    &--errors {
      border: 1px solid var(--danger);
    }
  }
}
</style>
