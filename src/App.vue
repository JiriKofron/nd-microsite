<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <section class="flex flex-col items-center justify-center w-full">
    <section class="flex justify-center w-full bg-primary pt-28">
      <article class="flex flex-col justify-between w-full max-w-[1000px] h-[380px] text-white mt-16 px-8 py-5">
        <div class="flex flex-col flex-nowrap px-3">
          <div class="flex gap-x-7">
            <img src="@/assets/icons/ico-zazemi.svg" alt="ikona hrnicku s srdcem a oblicejem" width="122" height="137"  />
            <h1 class="text-heading leading-none pt-2 text-white font-baloo">
              Poslouchejme děti,
              <br/>když s námi mluví
            </h1>
          </div>

          <div class="flex justify-end h-28 gap-x-7">
            <img
                src="@/assets/icons/ico-orange-arrow.svg"
                alt="ikona oranžová šipka"
                width="81"
                height="142"
                class="-mt-6"
            />
            <div class="flex flex-col justify-center w-full max-w-[480px] px-7 py-2.5 bg-orange rounded-30 gap-y-2.5">
              <span class="text-xl font-roboto">Místo, kde vám poradíme co dělat,</span>
              <span class="uppercase text-3xl font-bold font-baloo">když dítě není v p o h o d ě...</span>
            </div>
          </div>
        </div>

        <nav class="flex items-center gap-x-2.5 font-montserrat font-semibold">
          <RouterLink to="/" class="py-2 px-4 rounded-3xl">Představení</RouterLink>
          <RouterLink to="/varovne-signaly" class="py-2 px-4 rounded-3xl">Varovné signály</RouterLink>
          <RouterLink to="/jak-vest-rozhovor" class="py-2 px-4 rounded-3xl">Jak s dítětem mluvit</RouterLink>
          <RouterLink to="/mista-pomoci" class="py-2 px-4 rounded-3xl">Místa pomoci a podpory</RouterLink>
        </nav>
      </article>
    </section>

    <RouterView />
  </section>
</template>
