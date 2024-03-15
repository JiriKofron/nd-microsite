<script type="module" setup lang="ts">
import { RouterView } from 'vue-router'
import {computed, ref} from "vue";
import {useRoute} from "vue-router";

const routes = ref([
  {
    id: 1,
    to: '/poslouchejme-deti',
    text: 'Představení'
  },
  {
    id: 2,
    to: '/poslouchejme-deti/varovne-signaly',
    text: 'Varovné signály'
  },
  {
    id: 3,
    to: '/poslouchejme-deti/jak-vest-rozhovor',
    text: 'Jak vést rozhovor'
  },
  {
    id: 4,
    to: '/poslouchejme-deti/mista-pomoci',
    text: 'Místa pomoci'
  },
  {
    id: 5,
    to: '/poslouchejme-deti/pro-instituce',
    text: 'Pro pomáhající instituce'
  }
])

const activePage = computed(() => {
  return routes.value.find(route => route.to === useRoute()?.path )
})
</script>

<template>
  <section class="flex flex-col items-center justify-center w-full">
    <section class="flex justify-center w-full bg-primary pt-36">
      <article class="flex flex-col justify-between w-full max-w-[900px] max-h-[380px] text-white mt-0 md-mt-16 px-8 py-5">
        <div class="flex flex-col flex-nowrap gap-y-3 md:gap-y-18">
          <div class="flex items-center md:justify-center gap-x-2 px-6">
            <h1 class="text-clamp leading-tight my-0 pt-2 text-white font-baloo font-semibold max-w-[70%] md:max-w-full">
              Poslouchejme děti, když s námi mluví
            </h1>

            <img
                src="@/assets/icons/ico-cup.svg"
                alt="ikona hrnicku s srdcem a oblicejem"
                width="48"
                height="57"
                class="md:hidden"
            />
          </div>

          <div class="flex md:justify-center h-28 md:h-40 gap-x-7 w-full relative md:ml-28">
            <img
                src="@/assets/icons/ico-cup.svg"
                alt="ikona hrnicku s srdcem a oblicejem"
                width="70"
                height="100"
                class="hidden md:flex"
            />

            <div class="flex flex-col justify-center relative w-10/12 sm:w-11/12 max-w-[420px] pl-8 pr-4 py-2 bg-dark-violet rounded-30 text-[17px] md:text-4xl font-bold leading-normal md:leading-relaxed font-baloo">
              <span class="">Místo, kde vám poradíme co dělat,</span>
              <span class="uppercase md:text-[26px] text-orange">
                <strong>
                  když dítě není v pohodě . . .
                </strong>
              </span>

              <img
                  src="@/assets/icons/ico-orange-arrow-curved.svg"
                  alt="ikona oranžová šipka"
                  width="50"
                  height="110"
                  class="arrow-down"
              />
            </div>
          </div>
        </div>

        <nav class="flex items-center flex-wrap md:justify-center gap-4 pt-12 pb-6 font-roboto">
          <RouterLink
              v-for="route in routes"
              :key="route.id" :to="route.to"
              :class="[
                  'flex items-center justify-center bg-light-violet text-white',
                  'font-semibold text-base leading-8 tracking-wider',
                  'py-3.5 px-6 rounded-full no-underline',
                  'hover:no-underline hover:bg-white hover:text-primary',
                  'visited:no-underline visited:text-white route-btn',
                  {'active': activePage}
              ]"
          >
            {{route.text}}
          </RouterLink>
        </nav>
      </article>
    </section>

    <RouterView />
  </section>
</template>

<style lang="scss" scoped>
.arrow-down {
  position: absolute;
  right: -2.5rem;
  top: -2.5rem;

  @media screen and (min-width: 790px) {
    left: -17rem;
    transform: rotateY(180deg) rotateZ(70deg);
    width: 4rem;
  }
}

.route-btn {
  transition: all .3s ease;
}

.active {
  background-color: white;
  color: var(--primary-purple);
}
</style>
