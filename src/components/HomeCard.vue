<template>
  <v-card class="mx-auto pa-2" flat color="grey lighten-4">
    <!-- Description -->
    <p class="subtitle-1 font-weight-light text-justify">
      Create your account, set your profile and communicate with all your friends through a responsive web application.
    </p>
    <!-- JS icon (link) + text -->
    <p class="subtitle-2 font-weight-light">
      <v-btn fab text small class="mt-n1 mb-1" target="_blank" href="https://en.wikipedia.org/wiki/JavaScript">
        <v-icon class="pt-1" color="#f7df1e" large>mdi-language-javascript</v-icon>
      </v-btn>
      <span class="ml-2">JavaScript</span>
    </p>
    <!-- NodeJS icon (link) + text -->
    <p class="subtitle-2 font-weight-light">
      <v-btn fab text small class="mt-n1 mb-1" target="_blank" href="https://nodejs.org/en/">
        <v-icon class="pt-1" color="#539e43" large>mdi-nodejs</v-icon>
      </v-btn>
      <span class="ml-2">Node.JS back-end framework</span>
    </p>
    <!-- VueJS icon (link) + text -->
    <p class="subtitle-2 font-weight-light">
      <v-btn fab depressed small class="mt-n1 mb-1" color="grey lighten-4" target="_blank" href="https://vuejs.org/">
        <v-img :src="require('../../public/logos/vue-logo.png')" max-width="40"></v-img>
      </v-btn>
      <span class="ml-2">Vue.JS front-end framework</span>
    </p>
    <!-- Vuetify icon (link) + text -->
    <p class="subtitle-2 font-weight-light">
      <v-btn fab depressed small class="mt-n1 mb-1" color="grey lighten-4" target="_blank" href="https://vuetifyjs.com/en/">
        <v-img :src="require('../../public/logos/vuetify-logo.png')" max-width="42"></v-img>
      </v-btn>
      <span class="ml-2">Vuetify component framework</span>
    </p>
    <v-divider></v-divider>
    <!-- Developers (+ github link) -->
    <v-row class="mt-1 subtitle-2 font-italic font-weight-light">
      <div class="ml-4">
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
      </div>
      <v-spacer></v-spacer>
      <div class="caption text-right mr-4">
        <!-- Copyright -->
        <span>
          <v-icon small :color="color">mdi-copyright</v-icon><span class="subtitle font-weight-regular" :style="'color:' + color">2019</span>
        </span>
      </div>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: {
    color: String
  },
  data: () => ({})
}
</script>

<style scoped>
/* github links underline */
.link {
  text-decoration: none
}

.link:hover {
  text-decoration: underline
}
</style>
