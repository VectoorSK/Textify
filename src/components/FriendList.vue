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
      <v-dialog v-model="dialogDel" max-width="400">
        <v-card class="pa-2">
          <p class="subtitle-1 font-weight-bold">Are you sure to remove {{ userDelConfirm }} from your friends?</p>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="green darken-1" text @click="delFriend(userDelConfirm)">Agree</v-btn>
            <v-btn color="red darken-1" text @click="dialogDel = false">Cancel</v-btn>
          </v-card-actions>
        </v-card>
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
              @mouseover="colorClear = id"
              @mouseout="colorClear = -1"
              color="red"
              @click.stop="openDelConfirm(frd.username)"
            >
              <v-icon :small="colorClear !== id" :color="colorClear === id ? 'red' : 'grey'">clear</v-icon>
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
    userDelConfirm: '',
    dialogDel: false,
    url: 'http://localhost:4000' // ''
  }),
  methods: {
    test () {
      console.log(this.$refs.de)
    },
    scrollDown () {
      this.$refs.mylist.$el.scrollTop = this.$refs.mylist.$el.scrollHeight
    },
    goToTextify (username) {
      this.$router.push('/textify/' + username)
    },
    openDelConfirm (username) {
      this.userDelConfirm = username
      this.dialogDel = true
    },
    delFriend (username) {
      this.$emit('del-friend', username)
      this.dialogDel = false
    },
    async openProfile (username) {
      const res = await this.axios.post(this.url + '/api/getFriendProfile', {
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
