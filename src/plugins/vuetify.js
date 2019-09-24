import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@fortawesome/fontawesome-free/css/all.css'
import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdi'
  },
  theme: {
    themes: {
      light: {
        primary: '#512DA8', // deep-purple darken-2
        secondary: '#64B5F6', // blue lighten-4
        default: '#CFD8DC'
      }
    },
    options: {
      customProperties: true
    }
  }
})
