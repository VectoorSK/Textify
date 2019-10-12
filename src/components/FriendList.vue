<template>
  <v-card
    flat
    class="overflow-y-auto"
    height="69.8vh"
    ref="mylist"
  >
    <v-list color="grey lighten-5" class="pa-0">
      <v-dialog v-model="dialogFriend" max-width="400" class="pa-0">
        <FriendProfile :friend="friend" class="pa-0"></FriendProfile>
      </v-dialog>
      <v-list-item-group>
        <v-list-item v-for="(frd, id) in friendlist" :key="id" @click="goToTextify(frd.username)" class="pa-0">
          <v-row align="center" class="ma-0">
            <v-col cols="6" lg="5" xl="4">
              <v-btn icon small @click.stop="openProfile(frd.username)">
                <v-icon :color="color" small>mdi-account-card-details-outline</v-icon>
              </v-btn>
              <v-avatar>
                <img :src="require('../../public/avatars/' + frd.avatar + '.png')">
              </v-avatar>
              <span class="mx-4">{{ frd.name + ' ' + frd.surname }}</span>
            </v-col>
            <v-col cols="3">
              <span class="mx-0">{{ frd.username }}</span>
            </v-col>
            <v-spacer></v-spacer>
            <v-icon v-if="frd.notif" :color="color" small class="mr-2">mdi-comment-alert</v-icon>
            <v-icon v-if="frd.isConv && !frd.notif" :color="color" small class="mr-2">fa-comments</v-icon>
            <v-spacer></v-spacer>
            <v-btn
              icon
              small
              class="mr-2"
              @click.stop="delFriend(frd.username)"
              @mouseover="colorClear = id"
              @mouseout="colorClear = -1"
              color="red"
            >
              <v-icon :small="colorClear !== id" :color="colorClear === id ? 'red' : ''">clear</v-icon>
            </v-btn>
          </v-row>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
import FriendProfile from './FriendProfile'

export default {
  components: {
    FriendProfile
  },
  props: {
    friendlist: Array,
    color: String
  },
  data: () => ({
    dialogFriend: false,
    friend: {},
    colorClear: -1,
    url: 'http://localhost:4000' // ''
  }),
  methods: {
    scrollDown () {
      this.$refs.mylist.$el.scrollTop = this.$refs.mylist.$el.scrollHeight
    },
    goToTextify (username) {
      this.$router.push('/textify/' + username)
    },
    delFriend (username) {
      this.$emit('del-friend', username)
    },
    async openProfile (username) {
      const res = await this.axios.post(this.url + '/api/getNotif', {
        username: username
      })
      if (res) {
        this.friend = res.data.friend
        this.dialogFriend = true
      }
    }
  }
}

</script>
