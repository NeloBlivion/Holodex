import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index'
import store from './store/index.js'
import { createHead } from '@vueuse/head'
import './assets/index.postcss'
import { VueQueryPlugin } from "vue-query";
import { vuetify, i18n } from './vuetify'
import * as icons from './utils/icons'

const head = createHead()
const app = createApp(App)

app.use(store);
app.use(i18n);
app.use(vuetify);
app.use(createPinia())
app.use(router)
app.use(head)
app.use(VueQueryPlugin);

app.config.globalProperties.icons = icons
app.mount('#app')
