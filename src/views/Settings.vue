
<template>
  <v-container class="pa-0">
    <v-form>
      <!-- change profile and background picture -->
      <v-row class="my-2" align="center">
        <v-spacer></v-spacer>
        <!-- change profile picture w/ badge -->
        <v-badge overlap bottom :color="color">
          <v-avatar color="grey lighten-2">
            <v-img
              :src="require('../../public/avatars/' + this.avatar + '.png')"
            ></v-img>
          </v-avatar>
          <template v-slot:badge>
            <v-dialog v-model="dialogAv" max-width="55vw">
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" dark icon x-small>
                  <v-icon x-small>mdi-settings</v-icon>
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
          </template>
        </v-badge>
        <v-spacer></v-spacer>
        <!-- change background picture w/ badge -->
        <v-badge overlap bottom :color="color" style="height: 100%">
          <v-avatar color="grey lighten-2" tile>
            <v-img
              :src="require('../../public/backgrounds/' + this.background + '.png')"
            ></v-img>
          </v-avatar>
          <template v-slot:badge>
            <v-dialog v-model="dialogBg" max-width="55vw">
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" dark icon x-small>
                  <v-icon x-small>mdi-settings</v-icon>
                </v-btn>
              </template>
              <!-- Change Background Pop Up -->
              <v-card class="pr-3">
                <v-row class="mx-0">
                  <v-col cols="1" v-for="i in 30" :key="i" class="mx-0">
                    <v-avatar color="white" tile @click="changeBackground(i)">
                      <v-img :src="require('../../public/backgrounds/' + i + '.png')"></v-img>
                    </v-avatar>
                  </v-col>
                </v-row>
              </v-card>
            </v-dialog>
          </template>
        </v-badge>
        <v-spacer></v-spacer>
      </v-row>
      <!-- change Email field -->
      <v-text-field
        v-model="email"
        :color="color"
        class="mb-3"
        prepend-icon="fa-at"
        name="email"
        label="E-mail"
        :rules="emailRules"
      ></v-text-field>
      <!-- Description text area w/ badge (smileys) -->
      <v-badge overlap :color="color" style="min-width: 100%">
        <template v-slot:badge>
          <!-- select smiley button -->
          <v-menu right bottom height="240" max-width="28vw" min-width="300" :close-on-content-click="false">
            <template v-slot:activator="{ on }">
              <v-btn dark icon x-small v-on="on">
                <v-icon small>mdi-emoticon</v-icon>
              </v-btn>
            </template>
            <!-- Emoji pop up -->
            <EmojiTab :color="color" v-model="smiley" v-on:addSmiley="description += smiley"></EmojiTab>
          </v-menu>
        </template>
        <v-textarea
          class="ma-0 pa-0"
          v-model="description"
          auto-grow
          outlined
          name="description"
          :color="color"
          label="Description"
          rows="3"
        ></v-textarea>
      </v-badge>
      <!-- Submit button -->
      <v-row class="ma-0">
        <v-btn dark class="mx-auto" :color="color" @click="submit">submit</v-btn>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import EmojiTab from '../components/Emoji'

export default {
  components: {
    EmojiTab
  },
  props: {
    desc: String
  },
  data: () => ({
    // user logged info
    username: '',
    avatar: 1,
    background: 1,
    email: '',
    color: '',
    description: '',
    smiley: '',
    // valid email regex
    emailRules: [
      // eslint-disable-next-line no-useless-escape
      v => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid'
    ],
    // avatar & background dialogs
    dialogAv: false,
    dialogBg: false,
    // prod
    url: 'http://localhost:4000' // ''
  }),
  mounted: function () {
    if (this.$session.exists()) {
      this.avatar = this.$session.get('avatar')
      this.background = this.$session.get('background')
      this.description = this.desc
      this.color = this.$session.get('colorApp')
    }
  },
  methods: {
    // submit setting changes
    async submit () {
      if (this.email === '') {
        this.email = this.$session.get('email')
      }
      if (this.description === '') {
        this.description = this.$session.get('description')
      }
      try {
        const res = await this.axios.post(this.url + '/api/changeSettings',
          {
            email: this.email,
            description: this.description,
            username: this.$session.get('username')
          }
        )
        this.$session.set('email', res.data.email)
        this.$session.set('description', res.data.description)
        // close Setting components and update in server
        this.$emit('input', false)
        this.$emit('update')
      } catch (error) {
        console.log('response', JSON.stringify(error.response))
      }
    },
    // change profile picture in server
    async changeAvatar (i) {
      const res = await this.axios.post(this.url + '/api/changeAvatar', {
        username: this.$session.get('username'),
        avatar: i
      })
      if (res.data.status === 1) {
        this.$session.set('avatar', i)
        this.avatar = this.$session.get('avatar')
        this.dialogAv = false
      }
    },
    // change background picture in server
    async changeBackground (i) {
      const res = await this.axios.post(this.url + '/api/changeBackground', {
        username: this.$session.get('username'),
        background: i
      })
      if (res.data.status === 1) {
        this.$session.set('background', i)
        this.background = this.$session.get('background')
        this.dialogBg = false
      }
    }
  },
  watch: {
    '$route': function () {
      this.color = this.$session.get('colorApp')
    }
  }
}
</script>
