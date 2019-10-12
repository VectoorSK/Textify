<template>
  <v-card min-width="400" flat color="grey lighten-4">
    <v-row class="mb-4">
      <v-col cols="12" :md="!logged ? '7' : '12'">
        <v-row>
          <div class="mx-auto">
            <v-row>
              <v-scale-transition>
                <v-img v-if="animate" :src="require('../../public/logos/textify-logo-' + color.slice(-6) +'.png')" max-width="55" class="ml-3"></v-img>
              </v-scale-transition>
              <v-slide-x-transition>
                <h1 v-if="animate" class="display-2 font-weight-light mr-3 ml-n3 mt-2 mb-n2 pr-10" :style="'color:' + color">extify</h1>
              </v-slide-x-transition>
            </v-row>
          </div>
        </v-row>
      </v-col>
    </v-row>
    <v-slide-x-transition>
    <v-row class="mx-5" v-if="animate">
      <v-col cols="12" :md="!logged ? '7' : '12'">
        <v-card class="mx-auto pa-2" flat color="grey lighten-4">
          <p class="subtitle-1 font-weight-light text-justify">Create your account, set your profile and communicate with all your friends through a responsive web application.</p>
          <p class="subtitle-2 font-weight-light">
            <!-- <v-btn fab depressed x-small class="mt-n1 mb-1" color="grey lighten-4" target="_blank" href="https://fr.wikipedia.org/wiki/JavaScript">
              <v-img :src="require('../../public/logos/js-logo.png')" max-width="30"></v-img>
            </v-btn> -->
            <v-btn fab text small class="mt-n1 mb-1" target="_blank" href="https://en.wikipedia.org/wiki/JavaScript">
              <v-icon class="pt-1" color="#f7df1e" large>mdi-language-javascript</v-icon>
            </v-btn>
            <span class="ml-2">JavaScript</span>
          </p>
          <p class="subtitle-2 font-weight-light">
            <!-- <v-btn fab depressed small class="mt-n1 mb-1" color="grey lighten-4" target="_blank" href="https://nodejs.org/en/">
              <v-img :src="require('../../public/logos/node-logo.png')" max-width="30"></v-img>
            </v-btn> -->
            <v-btn fab text small class="mt-n1 mb-1" target="_blank" href="https://nodejs.org/en/">
              <v-icon class="pt-1" color="#539e43" large>mdi-nodejs</v-icon>
            </v-btn>
            <span class="ml-2">Node.JS back-end framework</span>
          </p>
          <p class="subtitle-2 font-weight-light">
            <v-btn fab depressed small class="mt-n1 mb-1" color="grey lighten-4" target="_blank" href="https://vuejs.org/">
              <v-img :src="require('../../public/logos/vue-logo.png')" max-width="40"></v-img>
            </v-btn>
            <!-- <v-btn fab text small class="mt-n1 mb-1" target="_blank" href="https://vuejs.org/">
              <v-icon class="pt-1" color="#41b883" large>mdi-vuejs</v-icon>
            </v-btn> -->
            <span class="ml-2">Vue.JS front-end framework</span>
          </p>
          <p class="subtitle-2 font-weight-light">
            <v-btn fab depressed small class="mt-n1 mb-1" color="grey lighten-4" target="_blank" href="https://vuetifyjs.com/en/">
              <v-img :src="require('../../public/logos/vuetify-logo.png')" max-width="42"></v-img>
            </v-btn>
            <!-- <v-btn fab text small class="mt-n1 mb-1" target="_blank" href="https://vuetifyjs.com/en/">
              <v-icon class="pt-1" color="#7bc6ff" large>mdi-vuetify</v-icon>
            </v-btn> -->
            <span class="ml-2">Vuetify component framework</span>
          </p>
          <v-divider></v-divider>
          <p class="text-right mt-2 mb-0 subtitle-2 font-italic font-weight-light">
            Created by
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <a v-on="on" class="link" :style="'color:' + color" target="_blank" href="https://github.com/Aetaugan">Camille REGIS</a>
              </template>
              <v-icon dark class="ml-n1 mr-1">mdi-github-circle</v-icon>
              <span>Visit github</span>
            </v-tooltip>
            and
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <a v-on="on" class="link" :style="'color:' + color" target="_blank" href="https://github.com/VectoorSK">Victor BELIN</a>
              </template>
              <v-icon dark class="ml-n1 mr-1">mdi-github-circle</v-icon>
              <span>Visit github</span>
            </v-tooltip>
            <v-spacer></v-spacer>
            <span class="text-right">
              <v-icon small class="" :color="color">mdi-copyright</v-icon><span class="subtitle font-weight-regular" :style="'color:' + color">2019</span>
            </span>
          </p>
          <p class="text-right subtitle">
          </p>
        </v-card>
      </v-col>
      <v-col v-if="!logged" cols="12" md="5">
        <Login></Login>
      </v-col>
    </v-row>
    </v-slide-x-transition>
  </v-card>
</template>

<script>
import Login from '../views/Login'

export default {
  mounted: function () {
    this.logged = this.$session.exists()
    // setTimeout(() => {
    this.animate = true
    // }, 0)
    if (this.logged) {
      this.color = this.$session.get('colorApp')
    }
  },
  components: {
    Login
  },
  data: () => ({
    logged: false,
    animate: false,
    color: '#512DA8'
  }),
  watch: {
    '$route': function () {
      this.color = this.logged ? this.$session.get('colorApp') : '#512DA8'
    }
  },
  computed: {
    /* colorText: function () {
      const clr = this.color
      return clr === '#4ADF3E' ? 'light-green--text text--lighten-1'
        : clr === '#13CF13' ? 'light-green--text text--darken-1'
          : clr === '#4CAF50' ? 'green--text'
            : clr === '#20CEF5' ? 'light-blue--text text--lighten-2'
              : clr === '#00ACEE' ? 'cyan--text'
                : clr === '#3B5998' ? 'indigo--text'
                  : clr === '#FFC300' ? 'amber--text text--darken-1'
                    : clr === '#FF7E29' ? 'deep-orange--text text--lighten-1'
                      : clr === '#FF6306' ? 'orange--text text--accent-4'
                        : clr === '#E68585' ? 'red--text text--accent-1'
                          : clr === '#FA3C4C' ? 'red--text text--lighten-1'
                            : clr === '#F44336' ? 'red--text'
                              : clr === '#FF5CA1' ? 'pink--text text--lighten-2'
                                : clr === '#CE1980' ? 'pink--text text--darken-2'
                                  : clr === '#512DA8' ? 'deep-purple--text text--darken-2'
                                    : 'black--text'
    } */
  }
}
</script>

<style scoped>
.link {
  text-decoration: none
}

.link:hover {
  text-decoration: underline
}
</style>
