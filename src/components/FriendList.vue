<template>
  <v-card
    flat
    class="overflow-y-auto"
    height="69.8vh"
    ref="mylist"
  >
    <v-list color="grey lighten-5" class="pa-0">
      <!-- FRIEND PROFILE DIALOG -->
      <v-dialog v-model="dialogFriend" max-width="400" class="pa-0">
        <FriendProfile :friend="friend" class="pa-0"></FriendProfile>
      </v-dialog>
      <!-- CONFIRM DELETE FRIEND DIALOG -->
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
        <!-- FRIEND LIST -->
        <v-list-item v-for="(frd, id) in friendlist" :key="id" @click="goToTextify(frd.username)" class="pa-0">
          <v-row align="center" justify="space-between" class="ma-0">
            <v-col cols="4" md="3">
              <!-- open friend profile button -->
              <v-btn icon small @click.stop="openProfile(frd.username)">
                <v-icon :color="color" small>mdi-account-card-details-outline</v-icon>
              </v-btn>
              <!-- friend profile picture -->
              <v-avatar>
                <img :src="require('../../public/avatars/' + frd.avatar + '.png')">
              </v-avatar>
            </v-col>
            <v-col cols="6" md="7">
              <v-row>
                <v-col cols="12" md="6">
                  <!-- friend name & surname -->
                  <span>{{ frd.name + ' ' + frd.surname }}</span>
                </v-col>
                <v-col cols="12" md="6">
                  <!-- friend username -->
                  <span>{{ frd.username }}</span>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="1">
              <!-- friend isNotif / isConv icons -->
              <v-icon v-if="frd.notif" :color="color" small class="ml-n2 mr-2">mdi-comment-alert</v-icon>
              <v-icon v-else-if="frd.isConv" :color="color" small class="ml-n2 mr-2">fa-comments</v-icon>
            </v-col>
            <v-col cols="1">
              <!-- delete friend button -->
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
            </v-col>
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
    // friend info (for profile)
    friend: {},
    // id colored del button
    colorClear: -1,
    // dialogs
    dialogFriend: false,
    dialogDel: false,
    userDelConfirm: '',
    // prod
    url: '' // 'http://localhost:4000'
  }),
  methods: {
    // open conversation with 'username'
    goToTextify (username) {
      this.$router.push('/textify/' + username)
    },
    // open confirmation on deleting friend
    openDelConfirm (username) {
      this.userDelConfirm = username
      this.dialogDel = true
    },
    // tell Friend.vue to delete friend
    delFriend (username) {
      this.$emit('del-friend', username)
      this.dialogDel = false
    },
    // load friend info and open his profile
    async openProfile (username) {
      const res = await this.axios.post(this.url + '/api/getFriendProfile', {
        username: username
      })
      if (res) {
        this.friend = res.data.friend
        this.dialogFriend = true
      }
    },
    // scrollDown function (unused)
    scrollDown () {
      this.$refs.mylist.$el.scrollTop = this.$refs.mylist.$el.scrollHeight
    }
  }
}

</script>
