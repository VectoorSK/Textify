<template>
  <v-card flat color="blue-grey lighten-4" class="mb-2">
    <v-row class="mx-0" align="center">
      <!-- Avatar -->
      <v-avatar color="blue-grey lighten-5" class="mr-3">
        <v-img v-bind:src="path"></v-img>
      </v-avatar>
      <span class="mr-2">{{ friend && friend.name + ' ' + friend.surname + ' (' + friend.username + ')' }}</span>
      <v-col cols="4" class="ma-0 pa-0">
        <v-select
          v-if="friend === null"
          v-model="to"
          :items="friendlist"
          @change="selectFriend"
          label="Select a friend"
          class="mt-4 mb-n4 pa-0"
          :color="color"
        ></v-select>
      </v-col>
      <v-spacer></v-spacer>
      <!-- SETTING MENU -->
      <v-menu bottom offset-y :close-on-content-click="false" v-model="settingMenu">
        <template v-slot:activator="{ on }">
          <v-btn icon outlined :color="color" v-on="on" right>
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
import SettingList from './SettingList'

export default {
  components: {
    SettingList
  },
  props: {
    friendlist: Array,
    friend: Object,
    color: String
  },
  data: () => ({
    to: '',
    currentSmiley: '🙂',
    dialog: false,
    settingMenu: false
  }),
  methods: {
    selectFriend () {
      this.$router.push({ path: this.to })
      // location.reload()
    }
  },
  computed: {
    path: function () {
      return this.friend ? require('../../public/avatars/' + this.friend.avatar + '.png') : require('../../public/avatars/0.png')
    }
  },
  watch: {
    currentSmiley: function () {
      this.settingMenu = false
      this.$emit('input', this.currentSmiley)
    }
  }
}
</script>
