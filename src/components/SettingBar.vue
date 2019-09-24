<template>
  <v-card flat color="blue-grey lighten-4" class="mb-2">
    <v-row class="mx-0" justify="space-between" align="center">
      <v-col
        cols="4"
        class="ma-0 pa-0"
        >
        <!-- Avatar -->
        <v-dialog width="60vw" v-model="dialog">
          <template v-slot:activator="{ on }">
            <v-btn fab text v-on="on" class="ma-0">
              <v-avatar color="blue-grey lighten-5">
                <v-img v-bind:src="path"></v-img>
              </v-avatar>
            </v-btn>
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
      </v-col>
      <v-col
        cols="2"
        class="ma-0 pa-0"
      >
        <!-- CHANGE COLOR MENU -->
        <v-menu bottom offset-y :close-on-content-click="false" v-model="colorMenu">
          <template v-slot:activator="{ on }">
              <v-btn icon v-on="on" class="ml-8">
                <v-icon :color="color">color_lens</v-icon>
              </v-btn>
          </template>
          <!-- ColorPicker pop up -->
          <ColorPicker v-model="color"></ColorPicker>
        </v-menu>
        <!-- SETTING MENU -->
        <v-menu bottom offset-y :close-on-content-click="false" v-model="settingMenu">
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on" right>
              <v-icon :color="color">more_horiz</v-icon>
            </v-btn>
          </template>
          <!-- Settings pop up -->
          <SettingList v-model="currentSmiley" :color="color"></SettingList>
        </v-menu>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import ColorPicker from './ColorPicker'
import SettingList from './SettingList'

export default {
  components: {
    ColorPicker, SettingList
  },
  data: () => ({
    currentSmiley: '🙂',
    color: '#512DA8',
    avatar: 1,
    dialog: false,
    colorMenu: false,
    settingMenu: false
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
  },
  watch: {
    currentSmiley: function () {
      this.settingMenu = false
      this.$emit('input', this.currentSmiley)
    },
    color: function () {
      this.colorMenu = false
      this.$emit('update-color', this.color)
    }
  }
}
</script>
