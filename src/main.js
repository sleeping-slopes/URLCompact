import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.config.globalProperties.$window = window.location.origin;

app.use(router)

app.mount('#app')
