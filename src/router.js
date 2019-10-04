import Vue from 'vue'
import Router from 'vue-router'
import Profile from './views/Profile'
import Friends from './views/Friends'
import Textify from './views/Textify'
import Login from './views/Login'
import Settings from './views/Settings'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/friends',
      name: 'friends',
      component: Friends
    },
    {
      path: '/textify/:username',
      name: 'textify',
      component: Textify
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    }
  ]
})
