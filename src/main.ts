import './assets/main.css'
import { createRouter, createWebHashHistory } from 'vue-router'

import { createApp } from 'vue'
import App from './App.vue'

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
            component: () => import('./views/WarningSignalView.vue')
        },
        {
            path: '/jak-vest-rozhovor',
            name: 'howToTalk',
            component: () => import('./views/HowToTalkView.vue')
        },
        {
            path: '/mista-pomoci',
            name: 'safeSpaces',
            component: () => import('./views/SafeSpacesView.vue')
        }
    ]
})

const app = createApp(App)

app.use(router)

app.mount('#app')
