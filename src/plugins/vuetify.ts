// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import type { ThemeDefinition } from 'vuetify'


// let vuetify = createVuetify() 
const theme: ThemeDefinition = {
  dark: true,
  colors: {
    background: '#222',
    surface: '#333',
    primary: '#49bbcb',
    'primary-darken-1': '#3700B3',
    secondary: '#bb1353',
    'secondary-darken-1': '#018786',
    error: '#f04060',
    info: '#41b6F3',
    success: '#4fdF50',
    warning: '#FBaC20',
  }
}
// Vuetify
import { createVuetify } from 'vuetify'

export default createVuetify({
  // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
  theme: {
    defaultTheme: 'cofundTheme', 
    themes: {
      cofundTheme: theme 
    }
  }
})