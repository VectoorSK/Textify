import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard'
import Friends from './views/Friends'
import Textify from './views/Textify'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/friends',
      name: 'friends',
      component: Friends
    },
    {
      path: '/textify',
      name: 'textify',
      component: Textify
    }
  ]
})
