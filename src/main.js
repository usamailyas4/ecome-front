import { createApp } from 'vue'
import './style.css'
import 'animate.css';
import App from './App.vue'
import store from './store'
import router from './router'
import axios from 'axios'

axios.defaults.baseURL = "https://ecommerce-app-production-1aea.up.railway.app/api/v1"

const app = createApp(App)

app.use(store)

store.dispatch('getCategories')

router.beforeEach((to, from, next) => {
  const defaultTitle = 'Ecommerce-App'
  document.title = to.meta.title || defaultTitle
  next()
})
app.use(router)


app.mount('#app')
