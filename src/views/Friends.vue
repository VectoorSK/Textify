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
    <!--
    <v-card
      flat
      class="mx-auto my-2 pa-2"
      max-width="55vw"
      min-width="550"
      color="blue-grey lighten-4"
    >
      <v-text-field
        class="mx-5"
        v-model="user"
        label="Pseudo"
      ></v-text-field>
      <v-btn @click="load(user)" class="mx-5">load user</v-btn>
      {{ userload }}
    </v-card> -->
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
      this.$router.push('/login')
    }
    this.load(this.userload)
    this.color = this.$session.get('colorApp')
  },
  data: () => ({
    userList: [],
    color: 'primary',
    friendList: [],
    err: '',
    open: false,
    url: 'http://localhost:4000' // ''
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
          let { avatar, name, surname } = await this.getFriendInfo(username)
          this.friendList.push({
            avatar: avatar,
            name: name,
            surname: surname,
            username: username,
            isConv: false
          })
          this.friendList.sort(this.byPseudo)
        })
        this.getConvList(this.userload)
      }
    },
    // Recupere les infos d'un user à partir de son username
    async getFriendInfo (username) {
      const response = await this.axios.post(this.url + '/api/getInfo',
        {
          username: username
        }
      )
      if (response.data.message === 'found') {
        return response.data
      } else {
        return -1
      }
    },
    // Recupere la liste des amis avec une conversation existante et update 'isConv dans friendList[]
    async getConvList (username) {
      const response = await this.axios.post(this.url + '/api/getConvList',
        {
          username: username
        }
      )
      if (response) {
        for (const friend of this.friendList) {
          const isConv = response.data.convList.find(u => u === friend.username)
          friend.isConv = !!isConv
        }
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
      const fData = await this.getFriendInfo(friend)
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
        }
        if (res.data.error) {
          this.err = res.data.message
        } else {
          this.err = ''
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
      }
      // this.friendList.splice(id, 1)
    }
  },
  computed: {
    userload: {
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
