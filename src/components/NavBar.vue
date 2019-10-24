<template>
  <nav>
    <!-- TOP BAR -->
    <v-app-bar app :elevate-on-scroll="logged" class="grey lighten-4">
      <!-- open/close nav bar -->
      <v-slide-x-reverse-transition>
        <v-app-bar-nav-icon class="black--text" v-if="!navDrawer" @click="navDrawer = !navDrawer"></v-app-bar-nav-icon>
      </v-slide-x-reverse-transition>
      <!-- username -->
      <v-slide-x-reverse-transition>
        <v-toolbar-title v-if="!navDrawer" class="headline text-uppercase font-weight-bold">
          <span>{{ usrLogged.username }}</span>
        </v-toolbar-title>
      </v-slide-x-reverse-transition>
      <v-spacer></v-spacer>
      <!-- logout button -->
      <v-btn v-if="logged" text @click="logout" router to="/login">
        <span>Log Out</span>
        <v-icon small class="ml-1">fa-sign-out-alt</v-icon> <!-- exit_to_app -->
      </v-btn>
    </v-app-bar>

    <!-- NAVIGATION BAR (left) -->
    <v-navigation-drawer app disable-resize-watcher :temporary="false" v-model="navDrawer" v-if="logged" :color="color">
      <!-- open/close nav bar -->
      <v-btn dark icon large class="mt-3 mb-n3 ml-1" @click="navDrawer = !navDrawer">
        <v-icon size="24">mdi-menu</v-icon>
      </v-btn>
      <v-col align="center">
        <!-- profile picture -->
        <v-avatar color="blue-grey lighten-4" class="mt-5" size="130">
          <v-img :src="require('../../public/avatars/' + this.usrLogged.avatar + '.png')"></v-img>
        </v-avatar>
        <!-- name & surname -->
        <v-toolbar-title class="headline text-uppercase font-weight-bold white--text mt-2">
          <span class="font-weight-light">{{ usrLogged.name }}</span>
          <span>{{ ' ' + usrLogged.surname }}</span>
        </v-toolbar-title>
      </v-col>
      <v-list dark>
        <v-list-item-group>
          <!-- navigation links -->
          <v-list-item v-for="(link, id) in links" :key="id" router :to="link.route">
            <v-list-item-action>
              <!-- link icon or image -->
              <v-icon v-if="link.icon">{{ link.icon }}</v-icon>
              <v-img v-else max-width="22" :src="link.img"></v-img>
            </v-list-item-action>
            <v-list-item-content>
              <!-- link title -->
              <v-list-item-title>
                <v-row class="mx-0" align="center">
                <span>{{ link.text }}</span>
                <v-spacer></v-spacer>
                <!-- notification bubble (friendlist link only) -->
                <v-btn v-if="link.text === 'Friends' && notif > 0" icon x-small class="white ma-0 pa-0" :color="color">{{ notif }}</v-btn>
                </v-row>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <!-- navigation footer -->
      <template v-slot:append>
        <div>
          <!-- change color menu w/ tooltip -->
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

    <!-- FOOTER BAR -->
    <v-footer app fixed inset class="grey lighten-4">
      <!-- change color menu w/ tooltip -->
      <v-menu right top offset-y offset-x :close-on-content-click="false" v-model="colorMenuFooter">
        <template v-slot:activator="{ on: menu }">
          <v-tooltip right>
            <template v-slot:activator="{ on: tooltip }">
              <div v-on="{ ...menu, ...tooltip }">
                <v-scale-transition :hide-on-leave="navDrawer ? true : false">
                  <v-btn v-if="!navDrawer" small icon outlined :color="color" class="mt-2 mb-n2 mr-2 ml-n2">
                    <v-icon>mdi-palette</v-icon>
                  </v-btn>
                </v-scale-transition>
                <v-btn v-if="navDrawer" small icon>
                  <v-icon></v-icon>
                </v-btn>
              </div>
            </template>
            <span>Change color app</span>
          </v-tooltip>
        </template>
        <!-- ColorPicker pop up -->
        <ColorPicker v-model="color" v-on:update-color="changeColor"></ColorPicker>
      </v-menu>
      <v-spacer></v-spacer>
      <!-- Textify logo (home button) -->
      <v-btn fab depressed color="grey lighten-4" class="pt-2" router to="/">
        <v-img :src="require('../../public/logos/textify-logo-' + this.color.slice(-6) + '.png')" max-width="35" class="ma-1 pa-0"></v-img>
      </v-btn>
      <v-spacer></v-spacer>
    </v-footer>

    <!-- SNACKBAR (bottom) -->
    <v-snackbar
      v-model="snackbar"
      :color="color"
      class="white--text"
      :timeout="3000"
    >
      {{ snackbarText }}
      <v-btn
        color="white"
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </nav>
</template>

<script>
import ColorPicker from './ColorPicker'

export default {
  components: {
    ColorPicker
  },
  data: () => ({
    // user logged infos
    logged: false,
    usrLogged: {
      avatar: 0,
      username: '',
      name: '',
      surname: ''
    },
    notif: 0,
    color: '#512DA8',
    // nav bar
    navDrawer: true,
    links: [
      { img: require('../../public/logos/textify-logo-white.png'), text: 'Home', route: '/' },
      { icon: 'mdi-clipboard-account-outline', text: 'Profile', route: '/profile' },
      { icon: 'mdi-account-multiple', text: 'Friends', route: '/friends' },
      { icon: 'mdi-message-processing-outline', text: 'Messages', route: '/textify/null' }
    ],
    // color menus
    colorMenu: false,
    colorMenuFooter: false,
    // snackbar
    snackbar: false,
    snackbarText: '',
    // prod
    url: '' // 'http://localhost:4000'
  }),
  mounted () {
    this.load('mount')
  },
  methods: {
    // load user logged infos
    load (src) {
      if (this.$session.exists()) {
        this.usrLogged.avatar = this.$session.get('avatar')
        this.usrLogged.username = this.$session.get('username')
        this.usrLogged.name = this.$session.get('name')
        this.usrLogged.surname = this.$session.get('surname')
        this.color = this.$session.get('colorApp')
        if (this.logged === false && src === 'route') {
          this.snackbarText = 'Hello ' + this.usrLogged.username + '. Welcome!'
          this.snackbar = true
        }
        this.logged = true
        setTimeout(() => { this.getNotif(this.usrLogged.username) }, 100)
      } else {
        this.logged = false
        this.color = '#512DA8'
      }
    },
    // change colorApp of user logged
    async changeColor () {
      const res = await this.axios.post(this.url + '/api/changeColor', {
        username: this.$session.get('username'),
        color: this.color
      })
      if (res.data.status === 1) {
        this.$session.set('colorApp', this.color)
        this.colorMenu = false
        this.colorMenuFooter = false
        // reload router-view to update components color
        const current = this.$router.currentRoute.path
        if (!current.includes('profile')) {
          this.$router.push('profile')
        } else {
          this.$router.push('home')
        }
        this.$router.push(current)
      }
    },
    async getNotif (username) {
      const res = await this.axios.post(this.url + '/api/getNotif', {
        username: username
      })
      if (res) {
        this.notif = res.data.notif
      }
    },
    // clear session and go to homepage
    logout () {
      if (this.logged) {
        this.$session.clear()
        this.$session.destroy()
        this.usrLogged.avatar = 0
        this.usrLogged.username = ''
        this.usrLogged.name = ''
        this.usrLogged.surname = ''
        this.logged = false
      }
      this.$router.push('/')
    }
  },
  watch: {
    '$route': function (to, from) {
      this.load('route')
    }
  }
}
</script>
