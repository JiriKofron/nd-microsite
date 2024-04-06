<script setup lang="ts">

</script>

<template>
<section class="flex items-center justify-center fixed w-full h-full inset-0 overflow-hidden z-50 bg-light-gray overscroll-none">
  <div class="flex flex-col w-full md:w-2/3 max-w-[900px] bg-white p-8 md:py-12 md:px-20 gap-12 rounded-10 mx-8">
    <h2 class="text-green text-30 font-baloo font-normal m-0">Objednávka byla odeslána</h2>

    <div class="flex flex-col gap-4 text-base text-text-gray font-roboto font-normal m-0">
      <p class="m-0">Děkujeme za objednávku</p>
      <p class="m-0">Po objednání vám přijde potvrzovací e-mail s dalšími náležitostmi</p>
      <p class="m-0">Objednávky jsou odesílány 1x za 14 dní</p>
    </div>

    <button
        class="flex items-center justify-center h-[40px] px-12 rounded-full leading-relaxed cursor-pointer
          bg-orange border-none text-base md:text-17 text-white font-roboto font-semibold w-fit"
        type="button"
    >
      Chci poslat další objednávku
    </button>

    <div
        class="flex flex-col md:flex-row self-end gap-4 md:gap-16 p-8 shadow-warning-sign rounded-10"
    >
      <div class="flex flex-col gap-4">
        <h4 class="text-20 md:text-heading text-primary font-baloo font-semibold m-0">
          Chcete nás podpořit?
        </h4>

        <p
            class="text-base md:text-16 text-primary-text font-roboto font-normal tracking-[0.01em] m-0"
        >
          Karty dáváme zdarma a vše tiskneme, balíme a zasíláme na naše náklady. Pokud nás v naší
          činnosti chcete podpořit, můžete to <a href="https://www.darujme.cz/organizace/1200070" target="_blank">udělat na webu darujeme.cz</a>
          <span class="hidden md:inline"> nebo skrz QR kód zde přímo z mobilu. </span>
        </p>
      </div>

      <img
          src="@/assets/images/qr-darujme.png"
          alt="QR kód pro dárce"
          class="hidden md:block w-40 h-40 pr-12 aspect-square"
      />
    </div>
  </div>
</section>
</template>
