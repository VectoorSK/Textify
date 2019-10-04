<template>
  <v-card flat color="blue-grey lighten-4" class="mb-2">
    <v-row class="mx-0" align="center">
      <!-- Avatar -->
      <v-avatar color="blue-grey lighten-5" class="mr-3">
        <v-img v-bind:src="path"></v-img>
      </v-avatar>
      <v-select
        v-if="friend === null"
        v-model="to"
        :items="friendlist"
        label="Friend"
      ></v-select>
      <v-btn
        v-if="friend === null && to !== ''"
        small
        depressed
        class="ml-2"
        @click="selectFriend"
      >Select</v-btn> <!-- router :to="'/textify/' + to" -->
      <span>{{ friend && friend.name + ' ' + friend.surname + ' (' + friend.username + ')' }}</span>
      <v-spacer></v-spacer>
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
  props: {
    friendlist: Object,
    friend: Object
  },
  data: () => ({
    items: ['Vector', 'Bar', 'Fizz', 'Buzz'],
    to: '',
    currentSmiley: '🙂',
    color: '#512DA8',
    dialog: false,
    colorMenu: false,
    settingMenu: false
  }),
  methods: {
    selectFriend () {
      this.$router.push(this.to)
      location.reload()
    }
  },
  computed: {
    path: function () {
      return this.friend ? require('../../public/avatars/' + this.friend.avatar + '.png') : require('../../public/avatars/null.png')
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
