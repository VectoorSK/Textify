<template>
  <div id="friends">
    <!-- <h2 class="my-1 primary--text text-center">TEXTIFY</h2> -->
    <!-- CONTAINER -->
    <v-card class="pa-1 mx-auto" :color="color" max-width="55vw" min-width="560">
      <v-card
        flat
        class="mx-auto overflow-hidden pa-0"
        height="80vh"
        max-width="55vw"
        min-width="550"
        color="blue-grey lighten-4"
      >
        <v-row justify="center">
          <v-col cols="11" class="pa-0 pt-3">
            <!-- FENETRE DE CONVERSATION -->
            <FriendBar
              v-model="err"
              :open="open"
              :error="err"
              :userlist="userList['users']"
              :user="userload"
              :color="color"
              v-on:update-color="updateColor"
              v-on:add-friend="addFriend"
            ></FriendBar>
            <FriendList
              v-if="userList"
              :friendlist="friendList"
              :color="color"
              v-on:del-friend="delFriend"
            ></FriendList>
          </v-col>
        </v-row>
      </v-card>
    </v-card>
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
  mounted: function () {
    if (!this.$session.exists()) {
      this.$router.push('/')
    }
    this.userload = this.$session.get('username')
    this.load(this.userload)
    this.color = this.$session.get('colorApp')
  },
  watch: {
    '$route': function () {
      this.color = this.$session.get('colorApp')
    }
  },
  data: () => ({
    userload: '',
    userList: [],
    color: 'primary',
    friendList: [],
    err: '',
    open: false,
    url: 'http://localhost:4000', // '',
    snackbar: false,
    snackbarText: ''
  }),
  methods: {
    // Affiche les amis de l'user correspondant
    async load (user) {
      const response = await this.axios.post(this.url + '/api/loadUser',
        {
          username: user
        }
      )
      if (response.data.friends) {
        this.userload = user
        this.friendList = []
        response.data.friends.forEach(async username => {
          let data = await this.getInfo(username)
          // let { avatar, name, surname } = await this.getInfo(username).friend
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
    // Recupere les infos d'un user à partir de son username
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
    // sort by pseudo
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
    // change color
    updateColor (c) {
      this.color = c
    },
    // ajoute "friend" à la liste d'ami de "user" et vice versa
    async addFriend (user, friend) {
      const fData = await this.getInfo(friend)
      // Si "friend" existe
      if (fData !== -1) {
        const res = await this.axios.post(this.url + '/api/addFriend',
          {
            username: user,
            friend: friend
          }
        )
        if (res) {
          this.load(this.userload)
          this.open = !this.open
          if (res.data.error) {
            this.err = res.data.message
          } else {
            let list = res.data.list.sort()
            this.$session.set('friends', list)
            this.err = ''
            this.snackbarText = friend + ' has been added to your friend list.'
            this.snackbar = true
          }
        }
      } else { // Sinon
        this.err = 'Invalid username'
      }
    },
    async delFriend (friend) {
      const rep = await this.axios.post(this.url + '/api/delFriend',
        {
          username: this.userload,
          friend: friend
        }
      )
      if (rep) {
        this.load(this.userload)
        this.snackbarText = friend + ' has been removed from your friend list.'
        this.snackbar = true
      }
      // this.friendList.splice(id, 1)
    }
  },
  computed: {
    userloadS: {
      get: function () {
        return this.$session.get('username')
      },
      set: function () {
        //
      }
    }
  }
}

</script>

<style scoped>
</style>
