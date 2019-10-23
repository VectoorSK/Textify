<template>
  <v-container>
    <v-card class="elevation-2 pa-1 mx-auto" :color="color" max-width="408">
      <v-card class="mx-auto" flat max-width="400">
        <!-- Background picture -->
        <v-img
          class="white--text"
          height="200px"
          :src="require('../../public/backgrounds/' + background + '.png')"
        >
          <v-row
            align="start"
            class="fill-height mx-2 mt-2"
          >
            <!-- Profile picture -->
            <v-avatar size="80">
              <img
                :src="require('../../public/avatars/' + this.avatar + '.png')"
                alt="avatar"
              >
            </v-avatar>
            <v-spacer></v-spacer>
            <!-- Show settings button -->
            <v-btn @click="settings" fab small outlined :color="background > 15 ? setting ? 'grey lighten-1' : 'grey darken-1' : setting ? 'grey lighten-2' : 'white'" dark>
              <v-icon>fa-cogs</v-icon>
            </v-btn>
            <v-list-item
              class="mt-4 mb-n4"
              color="rgba(0, 0, 0, .4)"
              dark
            >
              <v-list-item-content>
                <!-- Username -->
                <v-list-item-title class="title" :class="background > 15 ? 'black--text' : ''">
                  {{ this.$session.get('username') }}
                </v-list-item-title>
                <!-- Email -->
                <v-list-item-subtitle :class="background > 15 ? 'black--text' : ''">
                  {{ this.$session.get('email') }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <!-- Birthday -->
                <v-list-item-action-text class="mb-3" :class="background > 15 ? 'black--text' : ''">
                  {{ this.$session.get('birthday') }}
                </v-list-item-action-text>
              </v-list-item-action>
            </v-list-item>
          </v-row>
        </v-img>
        <v-card-text>
          <span class="text--primary">
            <!-- Multilines description -->
            <div v-if="setting === false">
              <span v-for="(lines, id) in descMultLine" :key="id">{{ lines }}<br/></span>
            </div>
            <!-- Settings -->
            <Settings v-else v-model="setting" :desc="description" v-on:update="load"></Settings>
          </span>
        </v-card-text>
      </v-card>
    </v-card>
  </v-container>
</template>

<script>
import Settings from './Settings'

export default {
  components: {
    Settings
  },
  data () {
    return {
      // user logged infos
      avatar: 1,
      background: 1,
      description: '',
      color: '',
      // setting component boolean
      setting: false
    }
  },
  mounted: function () {
    this.load()
  },
  methods: {
    // load user logged info
    load () {
      if (this.$session.exists()) {
        this.avatar = this.$session.get('avatar')
        this.background = this.$session.get('background')
        this.description = this.$session.get('description')
        this.color = this.$session.get('colorApp')
      } else {
        this.$router.push('/')
      }
    },
    // open/close settings
    settings () {
      this.setting = !this.setting
    }
  },
  computed: {
    // split desc in lines
    descMultLine: function () {
      return this.description.split('\n')
    }
  },
  watch: {
    '$route': function () {
      this.load()
    }
  }
}
</script>
