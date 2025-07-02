import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { createWebHistory, createRouter } from 'vue-router'
import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'menu-active',
  linkExactActiveClass: 'menu-active',
})

const app = createApp(App)

app.use(createPinia())

app.use(router)
app.mount('#app')
