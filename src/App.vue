<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <section class="flex flex-col items-center justify-center w-full">
    <section class="flex justify-center w-full bg-primary pt-28">
      <article class="flex flex-col justify-between w-full max-w-[1000px] h-[380px] text-white pt-16">
        <div class="flex flex-col flex-nowrap">
          <div class="flex gap-x-7">
            <img src="@/assets/icons/ico-zazemi.svg" alt="ikona hrnicku s srdcem a oblicejem" width="122" height="137"  />
            <h1 class="text-heading max-w-80 leading-none pt-2 text-white">
              Poslouchejme děti, když s námi mluví
            </h1>
          </div>

          <div>
            <div>
              Místo, kde vám poradíme co dělat,
              <span>když dítě není v p o h o d ě</span>
            </div>
          </div>
        </div>

        <nav class="flex items-center justify-between">
          <RouterLink to="/">Představení</RouterLink>
          <RouterLink to="/varovne-signaly">Varovné signály</RouterLink>
          <RouterLink to="/jak-vest-rozhovor">Jak s dítětem mluvit</RouterLink>
          <RouterLink to="/mista-pomoci">Místa pomoci a podpory</RouterLink>
        </nav>
      </article>
    </section>

    <RouterView />
  </section>
</template>
