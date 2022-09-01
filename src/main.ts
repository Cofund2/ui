import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

import router from './router'

import "./main.less"

loadFonts()

createApp(App)
  .use(router)
  .use(createPinia) 
  .use(vuetify)
  .mount('#app')
