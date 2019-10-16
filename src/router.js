import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Profile from './views/Profile'
import Friends from './views/Friends'
import Textify from './views/Textify'
import Error404 from './views/Error404'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
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
      path: '/404',
      name: '404',
      component: Error404
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
