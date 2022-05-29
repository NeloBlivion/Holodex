import { createApp, h } from 'vue'
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
const app = createApp({
    i18n,
    router,
    store,
    vuetify,
    render: () => h(App)
})

app.use(store);
app.use(i18n);
app.use(vuetify);
app.use(createPinia())
app.use(router)
app.use(head)
app.use(VueQueryPlugin);

app.config.devtools = true;
app.config.performance = true;


app.config.globalProperties.icons = icons
app.mount('#app')
