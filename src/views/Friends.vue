<template>
  <div id="friends">
    <h2 class="my-1 primary--text text-center">TEXTIFY</h2>
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
            <FriendBar v-model="err" :error="err" :userlist="userList['users']" v-on:update-color="updateColor" v-on:add-friend="addFriend"></FriendBar>
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
    userList: [],
    currentSmiley: '🙂',
    color: 'primary',
    friendList: [],
    err: ''
  }),
  methods: {
    updateColor (c) {
      this.color = c
    },
    addFriend (friend) {
      let found = this.friendList.find(element => element.pseudo === friend.pseudo)
      if (found === undefined) {
        this.err = ''
        this.friendList.push(friend)
      } else {
        this.err = 'You are already friend with this person'
      }
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
        self.initFrdList()
      })
    },
    initFrdList () {
      for (let pseudo of this.userList['users'][0]['friends']) {
        console.log(pseudo)
        let found = this.userList['users'].find(element => element.pseudo === pseudo)
        if (found === undefined) {
          console.log("this person doesn't exist")
        } else {
          this.friendList.push(found)
        }
      }
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
      console.log('userlist')
      console.log(this.userList['users'])
    }
  }
}

</script>

<style scoped>
</style>
