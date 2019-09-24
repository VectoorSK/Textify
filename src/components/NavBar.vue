<template>
  <nav>
    <v-app-bar app elevate-on-scroll class="grey lighten-4">
      <v-app-bar-nav-icon class="black--text" @click="navDrawer = !navDrawer"></v-app-bar-nav-icon>
      <v-expand-x-transition>
        <v-toolbar-title class="headline text-uppercase font-weight-bold" v-if="!navDrawer">
          <span>belin</span>
          <span class="font-weight-light">victor</span>
        </v-toolbar-title>
      </v-expand-x-transition>
      <v-spacer></v-spacer>
      <v-btn text href="" target="_blank">
        <span class="mr-2">Log In</span>
        <v-icon>exit_to_app</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer app v-model="navDrawer" class="primary">
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
          <span class="font-weight-light">Victor </span>
          <span>belin</span>
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
    </v-navigation-drawer>

  </nav>
</template>

<script>
export default {
  data: () => ({
    navDrawer: false,
    links: [
      { icon: 'dashboard', text: 'Dashboard', route: '/' },
      { icon: 'people_alt', text: 'Friends', route: '/friends' },
      { icon: 'comment', text: 'Messages', route: '/textify' }
    ],
    avatar: 6,
    dialog: false
  }),
  methods: {
    changeAvatar (i) {
      this.avatar = i
      this.dialog = false
    }
  },
  computed: {
    path: function () {
      return require('../../public/avatars/' + this.avatar + '.png')
    }
  }
}
</script>
