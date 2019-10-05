import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSession from 'vue-session'
// import VueSessionStorage from 'vue-sessionstorage'

// Vue.use(VueSessionStorage)
Vue.use(VueSession)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
