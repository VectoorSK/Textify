<template>
  <v-container>
    <v-card class="elevation-12 mx-auto" max-width="400">
      <v-img
        class="white--text"
        height="200px"
        src="../../public/backgrounds/1.jpg"
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
          <v-btn @click="settings" fab small dark>
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
          <span>{{ this.$session.get('description') }}</span>
        </span>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  pageTitle: 'My Profile',
  mounted: function () {
    if (this.$session.exists()) {
      this.avatar = this.$session.get('avatar')
    } else {
      this.$router.push('login')
    }
  },
  data () {
    return {
      loading: false,
      form: {
        firstName: 'John',
        lastName: 'Doe',
        contactEmail: 'john@doe.com',
        avatar: 'MALE_CAUCASIAN_BLOND_BEARD'
      },
      showAvatarPicker: false,
      avatar: 1
    }
  },
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
    settings () {
      this.$router.push('/settings')
    }
  },
  computed: {
    avatarPath: function () {
      return require('../../public/avatars/' + this.avatar + '.png')
    }
  }
}
</script>
