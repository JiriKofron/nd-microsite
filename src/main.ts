import './assets/main.css'
import { createRouter, createWebHistory } from 'vue-router'

import { createApp } from 'vue'
import App from './App.vue'

import IntroductionView from "@/views/IntroductionView.vue";


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/poslouchejme-deti',
            name: 'introduction',
            component: IntroductionView
        },
        {
            path: '/poslouchejme-deti/varovne-signaly',
            name: 'warningSignal',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('./views/WarningSignalView.vue')
        },
        {
            path: '/poslouchejme-deti/jak-vest-rozhovor',
            name: 'howToTalk',
            component: () => import('./views/HowToTalkView.vue')
        },
        {
            path: '/poslouchejme-deti/mista-pomoci',
            name: 'safeSpaces',
            component: () => import('./views/SafeSpacesView.vue')
        },
        {
            path: '/poslouchejme-deti/pro-instituce',
            name: 'forInstitutions',
            component: () => import('./views/ForInstitutionsView.vue')
        }
    ]
})

const app = createApp(App)

app.use(router)

app.mount('#app')
