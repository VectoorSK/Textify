<template>
  <v-container>
    <v-card>
      <v-img
        class="white--text"
        height="200px"
        :src="require('../../public/backgrounds/' + friend.background + '.png')"
        alt="background"
      >
        <v-row
          align="start"
          class="fill-height mx-2 mt-2"
        >
          <v-avatar
            size="80"
          >
            <img
              :src="require('../../public/avatars/' + friend.avatar + '.png')"
              alt="avatar"
            >
          </v-avatar>
          <span class="ma-1">{{ friend.name + ' ' + friend.surname }}</span>
          <v-spacer></v-spacer>
          <v-list-item
            class="mt-4 mb-n4"
            color="rgba(0, 0, 0, .4)"
            dark
          >
            <v-list-item-content>
              <v-list-item-title class="title">{{ friend.username }}</v-list-item-title>
              <v-list-item-subtitle>{{ friend.email }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-list-item-action-text>{{ friend.birthday }}</v-list-item-action-text>
            </v-list-item-action>
          </v-list-item>
        </v-row>
      </v-img>
      <v-card-text>
        <span class="text--primary">
          <span>{{ friend.description }}</span>
        </span>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: {
    friend: Object
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
      description: ''
    }
  },
  methods: {
    update () {
      this.avatar = this.$session.get('avatar')
      this.background = this.$session.get('background')
      this.description = this.$session.get('description')
    }
  }
}
</script>
