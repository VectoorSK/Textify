<template>
  <div id="friends">
    <h2 class="my-1 primary--text text-center">TEXTIFY</h2>
    <v-text-field
      class="mx-5"
      v-model="user"
      label="Pseudo"
    ></v-text-field>
    <v-btn @click="login(user)">LOGIN</v-btn>
    {{ user }}
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
            <FriendBar v-model="err" :error="err" :userlist="userList['users']" :user="user" v-on:update-color="updateColor" v-on:add-friend="addFriend"></FriendBar>
            <!-- <FriendList :friendlist="friendlist" :color="color"></FriendList> -->
            <FriendList v-if="userList" :friendlist="friendList" :color="color" v-on:del-friend="delFriend"></FriendList>
          </v-col>
        </v-row>
      </v-card>
    </v-card>
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
    user: 'Vector',
    userList: [],
    color: 'primary',
    friendList: [],
    err: '',
    url: '' // 'http://localhost:4000'
  }),
  methods: {
    // Affiche les amis de l'user correspondant
    async login (user) {
      const response = await this.axios.post(this.url + '/api/login',
        {
          username: user,
          password: 'pswd'
        }
      )
      console.log('response: ', response.data.friends)
      if (response.data.friends) {
        this.friendList = []
        response.data.friends.forEach(async username => {
          let { avatar, name, surname } = await this.getFriendInfo(username)
          this.friendList.push({
            avatar: avatar,
            name: name,
            surname: surname,
            username: username
          })
          this.friendList.sort(this.byPseudo)
        })
      }
    },
    // Recupere les infos d'un user à partir de son username
    async getFriendInfo (username) {
      const response = await this.axios.post(this.url + '/api/getInfo',
        {
          username: username
        }
      )
      console.log('response: ', response.data)
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
      const fData = await this.getFriendInfo(friend)
      // Si "friend" existe
      if (fData !== -1) {
        const res = await this.axios.post(this.url + '/api/addFriend',
          {
            username: user,
            friend: friend
          }
        )
        if (res.data.error) {
          this.err = res.data.message
        } else {
          this.err = ''
        }
      } else { // Sinon
        this.err = 'Invalid username'
      }
      /* let found = this.friendList.find(element => element.pseudo === friend.pseudo)
      if (found === undefined) {
        this.err = ''
        this.friendList.push(friend)
      } else {
        this.err = 'You are already friend with this person'
      } */
    },
    delFriend (id) {
      this.friendList.splice(id, 1)
    },
    loadUserJSON (callback) {
      let xobj = new XMLHttpRequest()
      xobj.overrideMimeType('application/json')
      xobj.open('GET', '/users.json', true)
      xobj.onreadystatechange = function () {
        if (xobj.readyState === 4 && xobj.status === 200) {
          // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
          callback(xobj.responseText)
        }
      }
      xobj.send(null)
    },
    initUsers () {
      let self = this
      this.loadUserJSON(function (response) {
        // Parse JSON string into object
        self.userList = JSON.parse(response)
      })
    }
  },
  computed: {
  },
  mounted () {
    this.initUsers()
  },
  watch: {
    userList: function () {
      // console.clear()
      // console.log('userlist')
      // console.log(this.userList['users'])
    }
  }
}

</script>

<style scoped>
</style>
