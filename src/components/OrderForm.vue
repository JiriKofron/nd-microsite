<script type="module" setup lang="ts">
import { ref } from 'vue'

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

const submitForm = () => {
  console.log('submit', formData.value)
}
</script>

<template>
  <section class="flex flex-col p-8 gap-8 bg-white rounded-10">
    <div class="flex flex-col gap-8">
      <h4 class="text-orange text-25 font-baloo font-semibold m-0">Objednat karty</h4>

      <p class="text-primary-text text-base font-roboto font-normal tracking-[0.01em] m-0">
        Objednávky jsou odesílány 1x za 14 dní. Po objednání vám přijde potvrzovací e-mail s dalšími
        náležitostmi.
      </p>
    </div>

    <form class="flex flex-col gap-16" @submit.prevent="submitForm">
      <div class="flex flex-col gap-4">
        <h4 class="text-primary text-20-24 font-baloo font-semibold m-0">Kontakt na vás</h4>

        <div class="flex flex-col gap-4">
          <label for="name">Jméno a příjmení *</label>
          <input v-model="formData.name" type="text" id="name" name="name" required minlength="4" />

          <label for="address">Adresa, kam karty zašleme *</label>
          <input
            v-model="formData.address"
            type="text"
            id="address"
            name="address"
            required
            minlength="4"
          />

          <label for="mail">Email, na který vám odpovíme *</label>
          <input
            v-model="formData.mail"
            type="email"
            id="mail"
            name="mail"
            required
            minlength="4"
          />

          <label for="phone">Telefon *</label>
          <input
            v-model="formData.phone"
            type="text"
            id="phone"
            name="phone"
            required
            minlength="9"
            maxlength="15"
          />
        </div>
      </div>

      <div class="flex flex-col gap-4">
        <h4 class="text-primary text-20-24 font-baloo font-semibold m-0">Fakturační údaje</h4>

        <div class="flex flex-col gap-4">
          <label for="ico">IČO</label>
          <input v-model="formData.ico" type="number" id="ico" name="ico" />

          <label for="invoice">Fakturační adresa</label>
          <input v-model="formData.invoice" type="text" id="invoice" name="invoice" />
        </div>
      </div>

      <div class="flex flex-col gap-4 p-8 shadow-warning-sign rounded-10">
        <p class="text-primary-text text-base font-roboto font-normal m-0">
          5+2 kroků v podpůrném rozhovoru si můžete objednat zdarma pouze ve variantě 10 kusů a více
          na adresu instituce, pro kterou budou využity.
        </p>
        <div class="flex flex-col gap-4">
          <p class="text-primary text-20-24 font-baloo font-semibold m-0">
            5+2 kroků k podpůrnému rozhovoru
          </p>

          <div class="flex items-center justify-evenly gap-4">
            <div class="flex flex-col">
              <label for="petplusdva">Počet</label>
              <input
                v-model="formData.petplusdva"
                type="number"
                id="petplusdva"
                name="petplusdva"
                class="w-1/3"
              />
            </div>

            <div
              class="flex justify-between gap-4 w-2/3 text-primary-text text-base font-roboto font-normal"
            >
              <p class="m-0">Cena:</p>
              <p class="m-0 font-bold">Zdarma</p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-4 p-8 shadow-warning-sign rounded-10">
        <p class="text-primary-text text-base font-roboto font-normal m-0">
          Sadu karet 5+2 kroků a Místa strachu si může zakoupit kdokoliv za cenu 600 Kč za balení
          této dvojice karet.
        </p>
        <div class="flex flex-col gap-4">
          <p class="text-primary text-20-24 font-baloo font-semibold m-0">
            5+2 kroků k podpůrnému rozhovoru a Místa strachu
          </p>

          <div class="flex items-center justify-evenly gap-4">
            <div class="flex flex-col">
              <label for="mistastrachu">Počet</label>
              <input
                v-model="formData.mistastrachu"
                type="number"
                id="mistastrachu"
                name="mistastrachu"
                class="w-1/3"
              />
            </div>

            <div
              class="flex justify-between gap-4 w-2/3 text-primary-text text-base font-roboto font-normal"
            >
              <p class="m-0">Cena</p>

              <p class="m-0 font-bold">0</p>
              <p class="m-0">(600 Kč/ks)</p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-4">
        <h4 class="text-primary text-20-24 font-baloo font-semibold m-0">
          Zde můžete upřesnit svou objednávku
        </h4>

        <div>
          <label for="note"> Poznámka </label>
          <textarea v-model="formData.note" id="note" name="note" />
        </div>
      </div>

      <button type="submit">Odeslat objednávku</button>
    </form>
  </section>
</template>

<style scoped></style>
