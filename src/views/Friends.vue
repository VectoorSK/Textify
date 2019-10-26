<template>
  <div id="friends" class="px-1">
    <!-- CONTAINER (w/ border) -->
    <v-card class="elevation-2 pa-1 mx-auto" :color="color" max-width="55vw" min-width="338">
      <v-card
        flat
        class="mx-auto overflow-hidden pa-0"
        height="80vh"
        max-width="55vw"
        min-width="330"
        color="blue-grey lighten-4"
      >
        <v-row justify="center">
          <v-col cols="11" class="pa-0 pt-3">
            <!-- TOP BAR (add friend button) -->
            <FriendBar
              v-model="err"
              :error="err"
              :user="userload"
              :color="color"
              v-on:add-friend="addFriend"
            ></FriendBar>
            <!-- FRIENDLIST WINDOW -->
            <FriendList
              :friendlist="friendList"
              :color="color"
              v-on:del-friend="delFriend"
            ></FriendList>
          </v-col>
        </v-row>
      </v-card>
    </v-card>
    <!-- SNACKBAR (add/remove friend) -->
    <v-snackbar
      v-model="snackbar"
      :color="color"
      class="white--text"
    >
      {{ snackbarText }}
      <v-btn
        color="white"
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import FriendBar from '../components/FriendBar'
import FriendList from '../components/FriendList'

export default {
  components: {
    FriendBar, FriendList
  },
  data: () => ({
    // user logged info
    userload: '',
    color: '',
    friendList: [],
    // add friend error
    err: '',
    // snackbar
    snackbar: false,
    snackbarText: '',
    // prod
    url: '' // 'http://localhost:4000'
  }),
  mounted: function () {
    if (!this.$session.exists()) {
      this.$router.push('/')
    }
    this.userload = this.$session.get('username')
    this.loadFriends(this.userload)
    this.color = this.$session.get('colorApp')
  },
  methods: {
    // load friendlist (with all infos)
    async loadFriends (user) {
      const response = await this.axios.post(this.url + '/api/loadUser',
        {
          username: user
        }
      )
      if (response.data.friends) {
        this.userload = user
        this.friendList = []
        // for each friend in user.friends
        response.data.friends.forEach(async username => {
          // load friend info and put it in friendList
          let data = await this.getInfo(username)
          this.friendList.push({
            avatar: data.friend.avatar,
            name: data.friend.name,
            surname: data.friend.surname,
            username: username,
            isConv: data.isConv,
            notif: data.notif
          })
          this.friendList.sort(this.byPseudo)
        })
      }
    },
    // get friend info (avatar, name, surname, username, isConv, notif)
    async getInfo (friend) {
      const response = await this.axios.post(this.url + '/api/getInfo',
        {
          username: this.userload,
          friendname: friend
        }
      )
      if (response.data.message === 'found') {
        return response.data
      } else {
        return -1
      }
    },
    // sort by pseudo function
    byPseudo (a, b) {
      const userA = a.username.toUpperCase()
      const userB = b.username.toUpperCase()

      let comparison = 0
      if (userA > userB) {
        comparison = 1
      } else if (userA < userB) {
        comparison = -1
      }
      return comparison
    },
    // add 'friend' to user.friends and 'user' to friend.friends (Server side)
    async addFriend (user, friend) {
      const fData = await this.getInfo(friend)
      if (fData !== -1) {
        const res = await this.axios.post(this.url + '/api/addFriend',
          {
            username: user,
            friend: friend
          }
        )
        if (res) {
          if (res.data.error) {
            this.err = res.data.message
          } else {
            // reload friendList
            this.loadFriends(this.userload)
            let list = res.data.list.sort()
            this.$session.set('friends', list)
            this.err = ''
            this.snackbarText = friend + ' has been added to your friend list.'
            this.snackbar = true
          }
        }
      } else {
        this.err = 'Invalid username'
      }
    },
    // delete 'friend' from user.friends and 'user' from friend.friends (Server side)
    async delFriend (friend) {
      const rep = await this.axios.post(this.url + '/api/delFriend',
        {
          username: this.userload,
          friend: friend
        }
      )
      if (rep) {
        // reload friendList
        this.loadFriends(this.userload)
        this.snackbarText = friend + ' has been removed from your friend list.'
        this.snackbar = true
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
