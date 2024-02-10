import { createRouter, createWebHashHistory } from 'vue-router'
import IntroductionView from "@/views/IntroductionView.vue";


const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'introduction',
      component: IntroductionView
    },
    {
      path: '/varovne-signaly',
      name: 'warningSignal',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/WarningSignalView.vue')
    },
    {
      path: '/jak-vest-rozhovor',
      name: 'howToTalk',
      component: () => import('../views/HowToTalkView.vue')
    },
    {
      path: '/mista-pomoci',
      name: 'safeSpaces',
      component: () => import('../views/SafeSpacesView.vue')
    }
  ]
})

export default router
