<template>
  <v-card min-width="400" flat color="grey lighten-4">
    <!-- TITLE -->
    <v-row justify="center" class="mt-5 mb-10">
      <!-- 404 not found -->
      <h1 class="display-2 font-weight-light" :style="'color:' + color">Error 404: page not found</h1>
    </v-row>
    <!-- PRESESENTATION CARD -->
    <v-row justify="center">
      <p class="mt-2 headline font-weight-light text-justify">
        Sorry, that page doesn’t exist!
      </p>
    </v-row>
    <v-row justify="center" class="mt-2">
      <v-btn
        dark
        router to="/"
        :color="color"
        class="title font-weight-light text-justify"
      >
        Go to homepage
      </v-btn>
    </v-row>
    <audio controls ref="audio">
      <source src="../../public/sound.mp3">
    </audio>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    logged: false,
    color: '#512DA8'
  }),
  mounted: function () {
    if (this.$session.exists()) {
      this.color = this.$session.get('colorApp')
    }
    console.log(this.$refs)
    console.log(this.$refs.audio.paused)
  },
  watch: {
    '$route': function () {
      this.color = this.logged ? this.$session.get('colorApp') : '#512DA8'
    }
  }
}
</script>
