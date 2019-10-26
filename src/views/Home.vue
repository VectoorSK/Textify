<template>
  <v-card min-width="300" flat color="grey lighten-4">
    <!-- TITLE -->
    <v-row class="mb-4">
      <v-col cols="12" :md="!logged ? '7' : '12'">
        <v-row>
          <div class="mx-auto">
            <v-row>
              <!-- Textify logo (T) -->
              <v-scale-transition>
                <v-img v-if="animate" :src="require('../../public/logos/textify-logo-' + color.slice(-6) +'.png')" max-width="55" class="ml-3"></v-img>
              </v-scale-transition>
              <!-- Textify text (extify) -->
              <v-slide-x-transition>
                <h1 v-if="animate" class="display-2 font-weight-light mr-3 ml-n3 mt-2 mb-n2 pr-10" :style="'color:' + color">extify</h1>
              </v-slide-x-transition>
            </v-row>
          </div>
        </v-row>
      </v-col>
    </v-row>
    <!-- PRESESENTATION CARD -->
    <v-row class="mx-0" v-if="animate">
      <v-col cols="12" :md="!logged ? '7' : '12'">
        <HomeCard :color="color"></HomeCard>
      </v-col>
      <!-- LOGIN / REGISTRATION CARD -->
      <v-col v-if="!logged" cols="12" md="5">
        <Login></Login>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import Login from '../views/Login'
import HomeCard from '../components/HomeCard'

export default {
  components: {
    HomeCard, Login
  },
  data: () => ({
    logged: false,
    animate: false,
    color: '#512DA8'
  }),
  mounted: function () {
    this.animate = true
    this.logged = this.$session.exists()
    if (this.logged) {
      this.color = this.$session.get('colorApp')
    }
  },
  watch: {
    '$route': function () {
      this.color = this.logged ? this.$session.get('colorApp') : '#512DA8'
    }
  }
}
</script>
