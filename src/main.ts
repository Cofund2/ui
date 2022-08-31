import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

import "./assets/main.less"

loadFonts()

createApp(App)
  .use(createPinia) 
  .use(vuetify)
  .mount('#app')
