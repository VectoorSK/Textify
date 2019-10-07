<template>
  <v-container>
    <v-card class="elevation-12 mx-auto" max-width="400">
      <v-img
        class="white--text"
        height="200px"
        :src="require('../../public/backgrounds/' + background + '.png')"
      >
        <v-row
          align="start"
          class="fill-height mx-2 mt-2"
        >
          <v-avatar
            size="80"
          >
            <img
              :src="avatarPath"
              alt="avatar"
            >
          </v-avatar>
          <v-spacer></v-spacer>
          <v-btn @click="settings" fab small outlined :color="setting ? 'grey lighten-1' : 'white'" dark>
            <v-icon>fa-cogs</v-icon>
          </v-btn>
          <v-list-item
            class="mt-4 mb-n4"
            color="rgba(0, 0, 0, .4)"
            dark
          >
            <v-list-item-content>
              <v-list-item-title class="title">{{ this.$session.get('username') }}</v-list-item-title>
              <v-list-item-subtitle>{{ this.$session.get('email') }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-list-item-action-text>{{ this.$session.get('birthday') }}</v-list-item-action-text>
            </v-list-item-action>
          </v-list-item>
        </v-row>
      </v-img>
      <v-card-text>
        <span class="text--primary">
          <div v-if="setting === false">
            <span v-for="(lines, id) in descMultLine" :key="id">{{ lines }}<br/></span>
          </div>
          <Settings v-else v-model="setting" :desc="description" v-on:update="update"></Settings>
        </span>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import Settings from './Settings'

export default {
  components: {
    Settings
  },
  mounted: function () {
    if (this.$session.exists()) {
      this.avatar = this.$session.get('avatar')
      this.background = this.$session.get('background')
      this.description = this.$session.get('description')
    } else {
      this.$router.push('login')
    }
  },
  data () {
    return {
      loading: false,
      avatar: 1,
      background: 1,
      description: '',
      setting: false
    }
  },
  methods: {
    settings () {
      this.setting = !this.setting
    },
    update () {
      this.avatar = this.$session.get('avatar')
      this.background = this.$session.get('background')
      this.description = this.$session.get('description')
    }
  },
  computed: {
    avatarPath: function () {
      return require('../../public/avatars/' + this.avatar + '.png')
    },
    descMultLine: function () {
      return this.description.split('\n')
    },
    nbLines: function () {
      return this.descMultLine.length
    }
  }
}
</script>
