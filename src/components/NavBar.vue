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
      <v-spacer></v-spacer>
      <v-btn v-if="logged" text @click="log" router to="/login">
        <v-icon small class="mr-1">fa-sign-out-alt</v-icon> <!-- exit_to_app -->
        <span>Log Out</span>
      </v-btn>
    </v-app-bar>

    <v-footer app absolute inset class="grey lighten-4">
      <!-- CHANGE COLOR MENU -->
      <v-menu right top offset-y offset-x :close-on-content-click="false" v-model="colorMenuFooter">
        <template v-slot:activator="{ on: menu }">
          <v-tooltip right>
            <template v-slot:activator="{ on: tooltip }">
              <div v-on="{ ...menu, ...tooltip }">
                <v-scale-transition :hide-on-leave="navDrawer ? true : false">
                  <v-btn v-if="!navDrawer" small icon outlined :color="color" >
                    <v-icon>mdi-palette</v-icon>
                  </v-btn>
                </v-scale-transition>
              </div>
            </template>
            <span>Change color app</span>
          </v-tooltip>
        </template>
        <!-- ColorPicker pop up -->
        <ColorPicker v-model="color" v-on:update-color="changeColor"></ColorPicker>
      </v-menu>
      <v-spacer></v-spacer>
      <v-spacer v-if="navDrawer"></v-spacer>
      <v-spacer v-if="navDrawer"></v-spacer>
      <v-spacer v-if="navDrawer"></v-spacer>
      <v-spacer v-if="navDrawer"></v-spacer>
      <v-spacer v-if="navDrawer"></v-spacer>
      <v-spacer v-if="navDrawer"></v-spacer>
      <v-spacer v-if="navDrawer"></v-spacer>
      <v-spacer v-if="navDrawer"></v-spacer>
      <v-btn fab depressed color="grey lighten-4" class="pt-2" router to="/">
        <v-img :src="require('../../public/logos/textify-logo-' + this.color.slice(-6) + '.png')" max-width="35" class="ma-1 pa-0"></v-img>
      </v-btn>
      <v-spacer v-if="navDrawer"></v-spacer>
      <v-spacer v-if="navDrawer"></v-spacer>
    </v-footer>

    <v-navigation-drawer app disable-resize-watcher :temporary="false" v-model="navDrawer" v-if="logged" :color="color">
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
              <v-icon v-if="link.icon">{{ link.icon }}</v-icon>
              <v-img v-else max-width="22" :src="link.img"></v-img>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                <v-row class="mx-0" align="center">
                <span>{{ link.text }}</span>
                <v-spacer></v-spacer>
                <v-btn v-if="link.text === 'Friends' && notif > 0" icon small class="white ma-0 pa-0" :color="color">{{ notif }}</v-btn>
                </v-row>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <template v-slot:append>
        <div>
          <!-- CHANGE COLOR MENU -->
          <v-menu right top offset-y offset-x :close-on-content-click="false" v-model="colorMenu">
            <template v-slot:activator="{ on: menu }">
              <v-tooltip right>
                <template v-slot:activator="{ on: tooltip }">
                  <v-btn icon outlined dark v-on="{ ...menu, ...tooltip }" class="ma-2">
                    <v-icon>mdi-palette</v-icon>
                  </v-btn>
                </template>
                <span>Change color app</span>
              </v-tooltip>
            </template>
            <!-- ColorPicker pop up -->
            <ColorPicker v-model="color" v-on:update-color="changeColor"></ColorPicker>
          </v-menu>
        </div>
      </template>
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
      username: '',
      name: '',
      surname: ''
    },
    notif: 0,
    url: 'http://localhost:4000',
    navDrawer: true,
    links: [
      { img: require('../../public/logos/textify-logo-white.png'), text: 'Home', route: '/' },
      { icon: 'mdi-clipboard-account-outline', text: 'Profile', route: '/profile' },
      { icon: 'mdi-account-multiple', text: 'Friends', route: '/friends' },
      { icon: 'mdi-message-processing-outline', text: 'Messages', route: '/textify/null' }
    ],
    dialog: false,
    colorMenu: false,
    colorMenuFooter: false,
    color: '#512DA8'
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
        const current = this.$router.currentRoute.path
        if (current.includes('profile')) {
          this.$router.push('home')
          this.$router.push(current)
        }
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
        this.colorMenu = false
        this.colorMenuFooter = false
        const current = this.$router.currentRoute.path
        if (!current.includes('profile')) {
          this.$router.push('profile')
        } else {
          this.$router.push('home')
        }
        this.$router.push(current)
      }
    },
    async getNotif () {
      const res = await this.axios.post(this.url + '/api/getConvList',
        {
          username: this.usrLogged.username
        }
      )
      if (res) {
        let notif = 0
        for (const item of res.data.convList) {
          notif += item.notif ? 1 : 0
        }
        this.notif = notif
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
      this.$router.push('/')
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
      this.usrLogged.username = this.$session.get('username')
      this.usrLogged.name = this.$session.get('name')
      this.usrLogged.surname = this.$session.get('surname')
      this.color = this.$session.get('colorApp')
      this.getNotif()
    } else {
      this.logged = false
    }
  },
  watch: {
    '$route': function (to, from) {
      if (this.$session.exists()) {
        this.logged = true
        this.usrLogged.avatar = this.$session.get('avatar')
        this.usrLogged.username = this.$session.get('username')
        this.usrLogged.name = this.$session.get('name')
        this.usrLogged.surname = this.$session.get('surname')
        this.color = this.$session.get('colorApp')
        setTimeout(() => { this.getNotif() }, 0)
      } else {
        this.logged = false
        this.color = '#512DA8'
      }
    }
  }
}
</script>
