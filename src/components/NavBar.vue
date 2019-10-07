<template>
  <nav>
    <v-app-bar app elevate-on-scroll class="grey lighten-4">
      <v-app-bar-nav-icon class="black--text" v-if="logged" @click="navDrawer = !navDrawer"></v-app-bar-nav-icon>
      <v-expand-x-transition>
        <v-toolbar-title class="headline text-uppercase font-weight-bold" v-if="!navDrawer">
          <span>{{ usrLogged.surname }}</span>
          <span class="font-weight-light">{{ usrLogged.name }}</span>
        </v-toolbar-title>
      </v-expand-x-transition>
      <v-spacer></v-spacer>
      <v-btn text @click="log" router to="/login">
        <v-icon small class="mr-1">{{ logged ? 'fa-sign-out-alt' : 'fa-sign-in-alt' }}</v-icon> <!-- exit_to_app -->
        <span>{{ logged ? 'Log Out' : 'Log In' }}</span>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer app v-model="navDrawer" v-if="logged" :color="color">
      <v-col align="center">
        <v-dialog width="60vw" v-model="dialog">
          <template v-slot:activator="{ on }">
            <v-avatar v-on="on" color="blue-grey lighten-3" class="mt-5" size="130">
              <v-img v-bind:src="path"></v-img>
            </v-avatar>
          </template>
          <!-- Change Avatar Pop Up -->
          <v-card class="pr-3">
            <v-row class="mx-0">
              <v-col cols="1" v-for="i in 50" :key="i" class="mx-0">
                <v-btn depressed fab @click="changeAvatar(i)" min-width="55" min-height="52" color="blue-grey lighten-3">
                  <v-avatar color="white">
                    <v-img :src="require('../../public/avatars/' + i + '.png')"></v-img>
                  </v-avatar>
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-dialog>
        <v-toolbar-title class="headline text-uppercase font-weight-bold white--text mt-2">
          <span class="font-weight-light">{{ usrLogged.name }}</span>
          <span>{{ ' ' + usrLogged.surname }}</span>
        </v-toolbar-title>
      </v-col>
      <v-list dark>
        <v-list-item-group>
          <v-list-item v-for="(link, id) in links" :key="id" router :to="link.route">
            <v-list-item-action>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ link.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <template v-slot:append>
      <!-- CHANGE COLOR MENU -->
      <v-menu right top offset-y offset-x :close-on-content-click="false" v-model="colorMenu">
        <template v-slot:activator="{ on }">
          <v-btn icon outlined dark v-on='on' class="ma-2">
            <v-icon>color_lens</v-icon>
          </v-btn>
        </template>
        <!-- ColorPicker pop up -->
        <ColorPicker v-model="color" v-on:update-color="changeColor"></ColorPicker>
      </v-menu></template>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import ColorPicker from './ColorPicker'

export default {
  components: {
    ColorPicker
  },
  data: () => ({
    logged: false,
    usrLogged: {
      avatar: 0,
      name: '',
      surname: ''
    },
    url: 'http://localhost:4000',
    navDrawer: true,
    links: [
      { icon: 'person', text: 'Profile', route: '/profile' },
      { icon: 'people_alt', text: 'Friends', route: '/friends' },
      { icon: 'comment', text: 'Messages', route: '/textify/null' }
    ],
    dialog: false,
    colorMenu: false,
    color: 'primary'
  }),
  methods: {
    async changeAvatar (i) {
      const res = await this.axios.post(this.url + '/api/changeAvatar', {
        username: this.$session.get('username'),
        avatar: i
      })
      if (res.data.status === 1) {
        this.$session.set('avatar', i)
        this.usrLogged.avatar = this.$session.get('avatar')
      }
      this.dialog = false
    },
    async changeColor () {
      const res = await this.axios.post(this.url + '/api/changeColor', {
        username: this.$session.get('username'),
        color: this.color
      })
      if (res.data.status === 1) {
        this.$session.set('colorApp', this.color)
        this.$router.go()
      }
    },
    log () {
      if (this.logged) {
        this.$session.clear()
        this.$session.destroy()
        this.usrLogged.avatar = 0
        this.usrLogged.name = ''
        this.usrLogged.surname = ''
        this.logged = false
      }
      this.$router.push({ name: 'login' })
    }
  },
  computed: {
    path: function () {
      return require('../../public/avatars/' + this.usrLogged.avatar + '.png')
    }
  },
  mounted () {
    if (this.$session.exists()) {
      this.logged = true
      this.usrLogged.avatar = this.$session.get('avatar')
      this.usrLogged.name = this.$session.get('name')
      this.usrLogged.surname = this.$session.get('surname')
      this.color = this.$session.get('colorApp')
    } else {
      this.logged = false
    }
  },
  watch: {
    '$route': function (to, from) {
      if (this.$session.exists()) {
        this.logged = true
        this.usrLogged.avatar = this.$session.get('avatar')
        this.usrLogged.name = this.$session.get('name')
        this.usrLogged.surname = this.$session.get('surname')
        this.color = this.$session.get('colorApp')
      } else {
        this.logged = false
      }
    }
  }
}
</script>
