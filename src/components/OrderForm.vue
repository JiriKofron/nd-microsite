<script type="module" setup lang="ts">
import { ref } from 'vue'
import axios from "axios";

const formData = ref({
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

const submitForm = async () => {
  console.log('submit', formData.value)

  const forms = await axios.post('https://test.nevypustdusi.cz/wp-json/draftspot_theme/v1/order/', formData.value)

  console.log(forms.data)
  formElement.value.reset()
}
</script>

<template>
  <section class="flex flex-col p-8 md:p-16 gap-8 md:gap-16 bg-white rounded-10">
    <div class="flex flex-col gap-8 md:gap-16">
      <h4 class="text-orange text-25 md:text-30 font-baloo font-semibold m-0">Objednat karty</h4>

      <p class="text-primary-text text-base md:text-16 font-roboto font-normal tracking-[0.01em] m-0">
        Objednávky jsou odesílány 1x za 14 dní. Po objednání vám přijde potvrzovací e-mail s dalšími
        náležitostmi.
      </p>
    </div>

    <form
        ref="formElement"
        class="flex flex-col gap-16"
        @submit.prevent="submitForm"
    >
      <div class="flex flex-col md:flex-row gap-8 md:gap-16">
        <h4 class="text-primary text-20-24 md:text-heading font-baloo font-semibold m-0 md:basis-2/6">Kontakt na vás</h4>

        <div class="flex flex-col gap-12 input__group md:basis-3/6">
          <div class="input">
            <label for="name" class="input__label">
              Jméno a příjmení *
            </label>
            <input
                v-model="formData.name"
                type="text"
                id="name"
                name="name"
                required
                minlength="4"
                class="input__field"
            />
          </div>

          <div class="input">
            <label
                for="address"
                class="input__label"
            >
              Adresa, kam karty zašleme *
            </label>
            <input
                v-model="formData.address"
                type="text"
                id="address"
                name="address"
                required
                minlength="4"
                class="input__field"
            />
          </div>

          <div class="input">
            <label
                for="mail"
                class="input__label"
            >
              Email, na který vám odpovíme *
            </label>
            <input
                v-model="formData.mail"
                type="email"
                id="mail"
                name="mail"
                required
                minlength="4"
                class="input__field"
            />
          </div>

          <div class="input">
            <label
                for="phone"
                class="input__label"
            >
              Telefon *
            </label>

            <input
                v-model="formData.phone"
                type="text"
                id="phone"
                name="phone"
                required
                minlength="9"
                maxlength="15"
                class="input__field"
            />
          </div>
        </div>
      </div>

      <div class="flex flex-col md:flex-row gap-8 md:gap-16">
        <h4 class="text-primary text-20-24 md:text-heading font-baloo font-semibold m-0 md:basis-2/6">Fakturační údaje</h4>

        <div class="flex flex-col gap-12 input__group md:basis-3/6">
          <div class="input">
            <label
                for="ico"
                class="input__label"
            >
              IČO
            </label>
            <input
                v-model="formData.ico"
                type="number"
                id="ico"
                name="ico"
                class="input__field"
            />
          </div>

          <div class="input">
            <label
                for="invoice"
                class="input__label"
            >
              Fakturační adresa
            </label>
            <input
                v-model="formData.invoice"
                type="text"
                id="invoice"
                name="invoice"
                class="input__field"
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
          <p class="text-primary text-20-24 font-baloo font-semibold m-0 md:basis-4/12">
            5+2 kroků k podpůrnému rozhovoru
          </p>

          <div class="flex items-center justify-evenly md:justify-start gap-4 md:gap-8 md:basis-6/12">
            <div class="input max-w-48 md:max-w-none md:flex md:items-center md:justify-start md:!w-40">
              <label
                  for="petplusdva"
                  class="input__label input__label--numbers"
              >
                Počet
              </label>
              <input
                v-model="formData.petplusdva"
                type="number"
                id="petplusdva"
                name="petplusdva"
                class="w-1/3 max-w-40 input__field"
              />
            </div>

            <div
              class="flex items-center justify-between md:justify-start gap-4 md:gap-8 w-2/3 text-primary-text"
            >
              <p class="text-base font-roboto font-normal m-0">Cena:</p>
              <p
                  class="font-bold font-baloo text-20-24 m-0"
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
          <p class="text-primary text-20-24 font-baloo font-semibold m-0 md:basis-4/12">
            5+2 kroků k podpůrnému rozhovoru a Místa strachu
          </p>

          <div class="flex items-center justify-evenly gap-4 md:gap-8 md:basis-6/12">
            <div class="input max-w-48 md:max-w-none md:!w-40">
              <label
                  for="mistastrachu"
                  class="input__label"
              >
                Počet
              </label>
              <input
                v-model="formData.mistastrachu"
                type="number"
                id="mistastrachu"
                name="mistastrachu"
                class="w-1/3 input__field md:w-40"
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
                    class="font-bold font-baloo text-20-24 m-0"
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
        <h4 class="text-primary text-20-24 font-baloo font-semibold m-0 md:basis-4/12">
          Zde můžete upřesnit svou objednávku
        </h4>

        <div class="input md:basis-6/12">
          <label
              for="note"
              class="input__label"
          >
            Poznámka
          </label>
          <textarea
              v-model="formData.note"
              id="note"
              name="note"
              class="input__field !h-72"
              rows="10"
          />
        </div>
      </div>

      <button
          class="flex items-center justify-center h-[40px] px-4 rounded-full leading-relaxed cursor-pointer
          bg-orange border-none text-base md:text-17-21 text-white font-roboto font-semibold w-2/3 md:w-1/3"
          type="submit"
          @submit="submitForm"
      >
        Odeslat objednávku
      </button>
    </form>
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
      color: var(--gray);

      &:focus {
        color: var(--primary-text);
      }
    }
  }
</style>
