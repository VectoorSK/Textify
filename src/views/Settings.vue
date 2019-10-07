
<template>
<v-container>
    <span class="text--primary">
      <v-form>
        <!-- <v-file-input
          accept="image/png, image/jpeg, image/bmp"
          placeholder="Pick a background"
          prepend-icon="fa-image"
          label="Avatar"
        ></v-file-input> -->
        <v-row class="my-2">
          <v-avatar class="ml-4 mr-3" max-width="40" max-height="40">
            <v-img
              :src="require('../../public/avatars/' + this.avatar + '.png')"
            ></v-img>
          </v-avatar>
          <v-dialog v-model="dialogAv" max-width="55vw">
            <template v-slot:activator="{ on }">
              <v-btn v-on="on">Change Avatar</v-btn>
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
        </v-row>
        <v-row class="my-2">
          <v-img
            max-width="50" max-height="35"
            class="ml-4 mr-3"
            :src="require('../../public/backgrounds/' + this.background + '.png')"
          ></v-img>
          <v-dialog v-model="dialogBg" max-width="55vw">
            <template v-slot:activator="{ on }">
              <v-btn v-on="on">Change Banner</v-btn>
            </template>
            <!-- Change Background Pop Up -->
            <v-card class="pr-3">
              <v-row class="mx-0">
                <v-col cols="1" v-for="i in 15" :key="i" class="mx-0">
                  <v-avatar color="white" tile @click="changeBackground(i)">
                    <v-img :src="require('../../public/backgrounds/' + i + '.png')"></v-img>
                  </v-avatar>
                </v-col>
              </v-row>
            </v-card>
          </v-dialog>
        </v-row>
        <v-text-field v-model="email" prepend-icon="fa-at" name="email" :rules="emailRules" label="E-mail"></v-text-field>
        <v-textarea
          v-model="description"
          auto-grow
          outlined
          name="description"
          color="primary"
          label="Description"
          rows="3"
          maxlength="150"
        ></v-textarea>
        <!-- select smiley button -->
        <v-menu left top offset-x max-height="33vh" max-width="28vw" min-width="300" :close-on-content-click="false">
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>mdi-emoticon</v-icon>
            </v-btn>
          </template>
          <!-- Emoji pop up -->
          <EmojiTab v-model="smiley" v-on:addSmiley="description += smiley"></EmojiTab>
        </v-menu>
        <v-btn class="mx-auto" @click="submit">submit</v-btn>
        <v-chip disabled>{{ error }}</v-chip>
      </v-form>
    </span>
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
  mounted: function () {
    if (this.$session.exists()) {
      this.avatar = this.$session.get('avatar')
      this.background = this.$session.get('background')
      this.description = this.desc
    }
  },
  data: () => ({
    valid: false,
    username: '',
    email: '',
    description: '',
    error: '',
    emailRules: [
      // eslint-disable-next-line no-useless-escape
      v => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid'
    ],
    avatar: 1,
    background: 1,
    dialogAv: false,
    dialogBg: false,
    smiley: '',
    url: 'http://localhost:4000' // ''
  }),
  methods: {
    async submit () {
      if (this.email === '') {
        this.email = this.$session.get('email')
      }
      if (this.description === '') {
        this.description = this.$session.get('description')
      }
      try {
        const res = await this.axios.post(
          'http://localhost:4000/api/changeSettings',
          {
            email: this.email,
            description: this.description,
            username: this.$session.get('username')
          }
        )
        this.$session.set('email', res.data.email)
        this.$session.set('description', res.data.description)
        this.$emit('input', false)
        this.$emit('update')
      } catch (error) {
        this.error = error.response.data
        console.log('response', JSON.stringify(error.response))
      }
    },
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
    '$route': function (to, from) {
      if (this.$session.exists()) {
        this.avatar = this.$session.get('avatar')
        this.background = this.$session.get('background')
      }
    }
  }
}
</script>
