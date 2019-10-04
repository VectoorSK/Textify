
<template>
  <v-container>
    <v-card class="elevation-12 mx-auto" max-width="400">
      <v-img class="white--text" height="200px" src="../../public/backgrounds/1.jpg">
        <v-row align="end" class="fill-height">
          <v-col align-self="start" class="pa-0 ml-3 mt-2" cols="12">
            <v-avatar :tile="false" :size="90">
              <img src="../../public/avatars/6.png" alt="avatar" />
            </v-avatar>
          </v-col>
          <v-col class="pb-n4">
            <v-list-item color="rgba(0, 0, 0, .4)" dark>
              <v-list-item-content>
                <v-list-item-title class="title">{{ this.$session.get('username')}}</v-list-item-title>
                <v-list-item-subtitle>{{ this.$session.get('email') }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-list-item-action-text v-text="this.$session.get('birthday')"></v-list-item-action-text>
              </v-list-item-action>
            </v-list-item>
          </v-col>
        </v-row>
      </v-img>
      <v-card-text>
        <span></span>
        <br />
        <span class="text--primary">
          <v-form>
            <v-file-input
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Pick an avatar"
              prepend-icon="mdi-camera"
              label="Avatar"
            ></v-file-input>
            <v-file-input
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Pick a background"
              prepend-icon="fa-image"
              label="Avatar"
            ></v-file-input>
            <v-text-field v-model="email" prepend-icon="fa-at" name="email" :rules="emailRules" label="E-mail"></v-text-field>
            <v-textarea
              v-model="description"
              auto-grow
              shaped
              name="description"
              color="deep-purple"
              label="Description"
              rows="3"
              maxlength="50"
            ></v-textarea>
            <v-btn class="mx-auto" @click="submit">submit</v-btn>
            <v-chip disabled>{{ error }}</v-chip>
          </v-form>
        </span>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    username: '',
    email: '',
    description: '',
    error: '',
    emailRules: [
      // eslint-disable-next-line no-useless-escape
      v => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid'
    ]
  }),
  methods: {
    openAvatarPicker () {
      this.showAvatarPicker = true
    },
    selectAvatar (avatar) {
      this.form.avatar = avatar
    },
    logout () {
      this.$session.clear()
      this.$session.destroy()
      this.$router.push('/login')
    },
    async submit () {
      console.log(this.email)

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

        console.log('Logged !')
        this.$router.push('/profile')
      } catch (error) {
        console.log('3bis')

        this.error = error.response.data
        console.log('response', JSON.stringify(error.response))
      }
    }
  }
}
</script>
