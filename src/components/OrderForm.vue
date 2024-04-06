<script type="module" setup lang="ts">
import {ref} from 'vue'
import {Form, Field, useForm, ErrorMessage, validate} from "vee-validate";
import {object, string, number} from "yup";
import axios from "axios";

interface FormData {
  name: string
  address: string
  mail: string
  phone: string
  ico?: string
  invoice?: string
  petplusdva?: number
  mistastrachu: number
  note?: string
}

const formData = ref<FormData>({
  name: '',
  address: '',
  mail: '',
  phone: '',
  ico: '',
  invoice: '',
  petplusdva: 0,
  mistastrachu: 0,
  note: ''
})

const formElement = ref()
const schema = object({
    name: string().required('Vyplňte prosím svoje jméno').min(4, 'Minimální počet znaků jsou 4'),
    address: string().required('Vyplňte prosím dodací adresu'),
    email: string().required('Vyplňte prosím emailovou adresu').email('Email není validní'),
    phone: string().required('Vyplňte prosím svoje telefonní číslo'),
    ico: string(),
    invoice: string(),
    petplusdva: number(),
    mistastrachu: number(),
    note: string().max(250, 'Maximální délka poznámky je 250 znaků')
  })

const {
  isSubmitting,
} = useForm();

const submitForm = async () => {
  try {
    await axios.post('https://test.nevypustdusi.cz/wp-json/draftspot_theme/v1/order/', formData.value)
  } catch (error) {
    console.error(error)
  } finally {
    formElement.value.resetForm()
  }
}

const handleErrors = ({errors}: any ) => {

  if(errors) {
    const firstError = Object.keys(errors)[0];
    const el = document.querySelector(`#${firstError}`);

    el?.scrollIntoView({
      behavior: 'smooth',
    });

    (el as HTMLElement)?.focus();
  }
}
</script>

<template>
  <section class="flex flex-col p-8 md:p-16 gap-8 md:gap-16 bg-white rounded-10">
    <div class="flex flex-col gap-8 md:gap-16">
      <h4 class="text-orange text-heading md:text-30 font-baloo font-semibold m-0">Objednat karty</h4>

      <p class="text-primary-text text-base md:text-16 font-roboto font-normal tracking-[0.01em] m-0">
        Objednávky jsou odesílány 1x za 14 dní. Po objednání vám přijde potvrzovací e-mail s dalšími
        náležitostmi.
      </p>
    </div>

    <Form
        v-slot="{errors}"
        ref="formElement"
        class="flex flex-col gap-16"
        :validation-schema="schema"
        @invalid-submit="handleErrors"
        @submit="submitForm"
    >
      <div class="flex flex-col md:flex-row gap-10 md:gap-16">
        <h4 class="text-primary text-20 md:text-heading font-baloo font-semibold m-0 md:basis-2/6">Kontakt na vás</h4>

        <div class="flex flex-col gap-14 input__group md:basis-3/6">
          <div class="input">
            <label
                for="name"
                class="input__label"
                :class="{'input__label--errors': errors.name}"
            >
              Jméno a příjmení *
            </label>

            <Field
                v-model="formData.name"
                id="name"
                name="name"
                type="text"
                class="input__field"
                :class="{'input__field--errors focus-visible:outline-danger outline-2': errors.name}"
            />

            <ErrorMessage
                name="name"
                class="text-sm font-roboto text-danger pl-8 pt-1"
            />
          </div>

          <div class="input">
            <label
                for="address"
                class="input__label"
                :class="{'input__label--errors': errors.address}"
            >
              Adresa, kam karty zašleme *
            </label>

            <Field
                v-model="formData.address"
                id="address"
                name="address"
                type="text"
                class="input__field"
                :class="{'input__field--errors focus-visible:outline-danger outline-2': errors.address}"
            />

            <ErrorMessage
                name="address"
                class="text-sm font-roboto text-danger pl-8 pt-1"
            />
          </div>

          <div class="input">
            <label
                for="email"
                class="input__label"
                :class="{'input__label--errors': errors.email}"
            >
              Email, na který vám odpovíme *
            </label>
            <Field
                v-model="formData.mail"
                id="email"
                name="email"
                type="text"
                class="input__field"
                :class="{'input__field--errors focus-visible:outline-danger outline-2': errors.email}"
            />

            <ErrorMessage
                name="email"
                class="text-sm font-roboto text-danger pl-8 pt-1"
            />
          </div>

          <div class="input">
            <label
                for="phone"
                class="input__label"
                :class="{'input__label--errors': errors.phone}"
            >
              Telefon *
            </label>

            <Field
                v-model="formData.phone"
                id="phone"
                name="phone"
                type="text"
                class="input__field"
                :class="{'input__field--errors focus-visible:outline-danger outline-2': errors.phone}"
            />

            <ErrorMessage
                name="phone"
                class="text-sm font-roboto text-danger pl-8 pt-1"
            />
          </div>
        </div>
      </div>

      <div class="flex flex-col md:flex-row gap-8 md:gap-16">
        <h4 class="text-primary text-20 md:text-heading font-baloo font-semibold m-0 md:basis-2/6">Fakturační údaje</h4>

        <div class="flex flex-col gap-14 input__group md:basis-3/6">
          <div class="input">
            <label
                for="ico"
                class="input__label"
                :class="{'input__label--errors': errors.ico}"
            >
              IČO
            </label>
            <Field
                v-model="formData.ico"
                id="ico"
                name="ico"
                type="text"
                class="input__field"
                :class="{'input__field--errors focus-visible:outline-danger outline-2': errors.ico}"
                @change="errors.ico = ''"
            />

            <ErrorMessage
                name="ico"
                class="text-sm font-roboto text-danger pl-8 pt-1"
            />
          </div>

          <div class="input">
            <label
                for="invoice"
                class="input__label"
                :class="{'input__label--errors': errors.invoice}"
            >
              Fakturační adresa
            </label>
            <Field
                v-model="formData.invoice"
                id="invoice"
                name="invoice"
                type="text"
                class="input__field"
                :class="{'input__field--errors focus-visible:outline-danger outline-2': errors.invoice}"
                @change="errors.invoice = ''"
            />

            <ErrorMessage
                name="invoice"
                class="text-sm font-roboto text-danger pl-8 pt-1"
            />
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-8 md:gap-16 p-8 md:p-0 shadow-warning-sign md:shadow-none rounded-10">
        <p class="text-primary-text text-base md:text-16 font-roboto font-normal m-0">
          5+2 kroků v podpůrném rozhovoru si můžete objednat zdarma pouze ve variantě 10 kusů a více
          na adresu instituce, pro kterou budou využity.
        </p>

        <div class="flex flex-col md:flex-row gap-8 md:gap-16">
          <p class="text-primary text-20 font-baloo font-semibold m-0 md:basis-4/12">
            5+2 kroků k podpůrnému rozhovoru
          </p>

          <div class="flex items-center justify-evenly md:justify-start gap-4 md:gap-8 md:basis-6/12">
            <div class="input max-w-48 md:max-w-none md:flex md:items-center md:justify-start md:!w-40">
              <label
                  for="petplusdva"
                  class="input__label input__label--numbers"
                  :class="{'input__label--errors': errors.petplusdva}"
              >
                Počet
              </label>

              <Field
                  v-model="formData.petplusdva"
                  id="petplusdva"
                  name="petplusdva"
                  type="number"
                  class="w-1/3 max-w-40 input__field"
                  :class="{'input__field--errors focus-visible:outline-danger outline-2': errors.petplusdva}"
                  @change="errors.petplusdva = ''"
              />

              <ErrorMessage
                  name="petplusdva"
                  class="text-sm font-roboto text-danger pl-2 pt-1"
              />
            </div>

            <div
              class="flex items-center justify-between md:justify-start gap-4 md:gap-8 w-2/3 text-primary-text"
            >
              <p class="text-base font-roboto font-normal m-0">Cena:</p>
              <p
                  class="font-bold font-baloo text-20 m-0"
              >
                Zdarma
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-4 p-8 md:p-0 md:gap-16 shadow-warning-sign md:shadow-none rounded-10">
        <p class="text-primary-text text-base md:text-16 font-roboto font-normal m-0">
          Sadu karet 5+2 kroků a Místa strachu si může zakoupit kdokoliv za cenu 600 Kč za balení
          této dvojice karet.
        </p>
        <div class="flex flex-col md:flex-row gap-8 md:gap-16">
          <p class="text-primary text-20 font-baloo font-semibold m-0 md:basis-4/12">
            5+2 kroků k podpůrnému rozhovoru a Místa strachu
          </p>

          <div class="flex items-center justify-evenly gap-4 md:gap-8 md:basis-6/12">
            <div class="input max-w-48 md:max-w-none md:!w-40">
              <label
                  for="mistastrachu"
                  class="input__label"
                  :class="{'input__label--errors': errors.mistastrachu}"
              >
                Počet
              </label>

              <Field
                  v-model="formData.mistastrachu"
                  id="mistastrachu"
                  name="mistastrachu"
                  type="number"
                  class="w-1/3 max-w-40 input__field"
                  :class="{'input__field--errors focus-visible:outline-danger outline-2': errors.mistastrachu}"
                  @change="errors.mistastrachu = ''"
              />

              <ErrorMessage
                  name="mistastrachu"
                  class="text-sm font-roboto text-danger pl-8 pt-1"
              />
            </div>

            <div
              class="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 w-2/3 text-primary-text"
            >
              <div class="flex items-center justify-between md:justify-start gap-4 md:gap-8">
                <p
                    class="text-base font-roboto font-normal m-0"
                >
                  Cena:
                </p>

                <p
                    class="font-bold font-baloo text-20 m-0"
                >
                  {{formData.mistastrachu * 600 }} Kč
                </p>
              </div>
              <p class="text-base font-roboto font-normal m-0">(600 Kč/ks)</p>
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
              :class="{'input__label--errors focus-visible:outline-danger outline-2': errors.note}"
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
              :class="{'input__field--errors': errors.note}"
              @change="errors.note= ''"
          />

          <ErrorMessage
              name="note"
              class="text-sm font-roboto text-danger pl-8 pt-1"
          />
        </div>
      </div>

      <button
          class="flex items-center justify-center h-[40px] px-4 rounded-full leading-relaxed cursor-pointer
          bg-orange border-none text-base md:text-17 text-white font-roboto font-semibold w-2/3 md:w-1/3"
          type="submit"
          :disabled="isSubmitting"
      >
        Odeslat objednávku
      </button>
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
      padding: 0 .5rem;
      position: absolute;
      top: - 1rem;
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
