import './assets/main.css'
import { createRouter, createWebHistory } from 'vue-router'

import { createApp } from 'vue'
import App from './App.vue'

import IntroductionView from '@/views/IntroductionView.vue'

export const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: function (to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  },
  routes: [
    {
      path: '/poslouchejme-deti/',
      name: 'introduction',
      component: IntroductionView
    },
    {
      path: '/poslouchejme-deti/varovne-signaly/',
      name: 'warningSignal',
      component: () => import('./views/WarningSignalView.vue')
    },
    {
      path: '/poslouchejme-deti/jak-vest-rozhovor/',
      name: 'howToTalk',
      component: () => import('./views/HowToTalkView.vue')
    },
    {
      path: '/poslouchejme-deti/mista-pomoci-a-podpory/',
      name: 'safeSpaces',
      component: () => import('./views/SafeSpacesView.vue')
    },
    {
      path: '/poslouchejme-deti/pro-instituce/',
      name: 'forInstitutions',
      component: () => import('./views/ForInstitutionsView.vue')
    },
    {
      path: '/poslouchejme-deti/o-projektu/',
      name: 'about',
      component: () => import('./views/AboutView.vue')
    }
  ]
})

const app = createApp(App)

app.use(router)

app.mount('#app')
