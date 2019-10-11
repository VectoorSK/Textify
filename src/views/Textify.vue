<template>
  <div id="textify">
    <!-- <h2 class="my-1 text-center" :style="'color: ' + color">TEXTIFY</h2> -->
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
        <!-- {{ 'from_seen = ' + from_seen + ' | to_seen = ' + to_seen }} -->
        <v-row justify="center">
          <v-col cols="11" class="pa-0 pt-3">
            <!-- FENETRE DE CONVERSATION -->
            <SettingBar v-model="currentSmiley" :friendlist="userFriends" :friend="friendLoad" :color="color"></SettingBar>
            <Conversation :conversation="conversation" :to_seen="to_seen" :user="user" :color="color"></Conversation>
          </v-col>
        </v-row>
        <v-row v-if="friendLoad !== null" align="center" class="my-0 mx-2 pa-0">
          <v-col cols="2" class="ma-0 pa-0">
            <!-- select smiley button -->
            <v-menu top offset-y height="240" max-width="28vw" min-width="300" :close-on-content-click="false" v-model="emojiTabOpen">
              <template v-slot:activator="{ on }">
                <v-btn icon
                  v-on="on"
                  :color="emojiTabOpen || colorTab ? color : ''"
                  @mouseover="colorTab = color"
                  @mouseout="colorTab = ''"
                >
                  <v-icon>mdi-emoticon</v-icon>
                </v-btn>
              </template>
              <!-- Emoji pop up -->
              <EmojiTab :color="color" v-model="smiley" v-on:addSmiley="message += smiley"></EmojiTab>
            </v-menu>
            <!-- send position button -->
            <v-btn icon
              @click="sendPos"
              :color="colorLocation"
              @mouseover="colorLocation = color"
              @mouseout="colorLocation = ''"
            >
              <v-icon>my_location</v-icon>
            </v-btn>
            <!-- send picture button -->
            <v-btn icon
              @click="inputType === 'text' ? inputType = 'file' : inputType = 'text'"
              :color="colorPic"
              @mouseover="colorPic = color"
              @mouseout="colorPic = ''"
            >
              <v-icon>{{ inputType === 'text' ? 'add_photo_alternate' : 'subject' }}</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="9" class="ma-0 pa-1">
            <!-- input text (change with <v-textarea>) -->
            <v-text-field
              v-if="inputType === 'text'"
              v-model="message"
              :append-icon="marker ? 'mdi-map-marker' : 'mdi-map-marker-off'"
              append-outer-icon="send"
              clearable
              label="Message"
              @click:append="chgMarker"
              @click:append-outer="sendMessage"
              @keyup.enter="sendMessage"
              @click:clear="clearMessage"
              :color="color"
            ></v-text-field>
            <!-- input file -->
            <!-- <v-file-input
              v-else
              v-model="file"
              accept="image/*"
              label="Send picture"
              append-outer-icon="send"
              @click="handleFileUpload"
              @click:append-outer="submitFile"
            ></v-file-input> -->
            <div v-else>
              <input type="file" id="file" ref="file" v-on:change="handleFileUpload"/>
              <v-btn v-on:click="sendIMG">Submit</v-btn>
            </div>
          </v-col>
          <!-- send smiley button -->
          <v-col cols="1" class="ma-0 pa-0">
            <v-btn text fab @click="sendSmiley" style="font-size: 1.5em">
              {{ currentSmiley }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-card>
    <!-- TEST FILE -->
    <!--  <v-card>
      {{ file }}
    </v-card> -->
    <!-- <v-card
      flat
      class="mx-auto my-2 pa-2"
      max-width="55vw"
      min-width="550"
      color="blue-grey lighten-4"
    >
      <v-text-field
        class="mx-5"
        v-model="from"
        label="User"
      ></v-text-field>
      <v-text-field
        class="mx-5"
        v-model="to"
        label="Friend"
      ></v-text-field>
      <v-btn @click="loadConv" class="mx-5">load conversation</v-btn>
      {{ 'To: ' + to + ' / user: ' + user }}
    </v-card> -->
  </div>
</template>

<script>
import EmojiTab from '../components/Emoji'
import Conversation from '../components/Conversation'
import SettingBar from '../components/SettingBar'

export default {
  components: { EmojiTab, Conversation, SettingBar },
  mounted: function () {
    if (this.$session.exists()) {
      this.color = this.$session.get('colorApp')
      this.user = this.$session.get('username')
      this.userFriends = this.$session.get('friends')
      this.to = this.$route.params.username
      this.loadConv()
    } else {
      this.$router.push('/')
    }
  },
  data: () => ({
    user: '',
    to: '',
    from_seen: null,
    to_seen: null,
    userFriends: [],
    friendLoad: null,
    url: 'http://localhost:4000', // ''
    inputType: 'text',
    message: '',
    message2: '',
    file: undefined,
    img: null,
    colorPic: '',
    dialog: false,
    currentSmiley: '🙂',
    smiley: '',
    emojiTabOpen: false,
    colorTab: '',
    marker: false,
    latitude: null,
    longitude: null,
    town: '',
    colorLocation: '',
    color: '#512DA8',
    conversation: []
  }),
  methods: {
    async loadConv () {
      const res = await this.axios.post(this.url + '/api/getConv',
        {
          from: this.user,
          to: this.to
        }
      )
      if (res.data.status === 1) {
        console.log('FOUND')
        console.log(res.data)
        this.conversation = res.data.content
        this.friendLoad = res.data.To
        this.from_seen = res.data.from_seen
        this.to_seen = res.data.to_seen
      } else if (res.data.status === 0) {
        console.log('NOT FOUND')
        this.conversation = []
        this.friendLoad = res.data.To
      } else {
        console.log('NO SUCH USER')
        this.conversation = []
        this.friendLoad = null
      }
    },
    updateColor (c) {
      this.color = c
    },
    async send (message) {
      const res = await this.axios.post(this.url + '/api/sendMess',
        {
          from: this.user,
          to: this.to,
          message: message
        }
      )
      if (res) {
        console.log(res.data.message)
        this.from_seen = true
        this.to_seen = false
      }
    },
    sendMessage () {
      let from = this.marker ? this.town : ''
      if (this.message !== '') {
        let message = {
          type: 'text',
          content: this.message,
          sender: this.user,
          from: from,
          date: new Date()
        }
        this.conversation.push(message)
        this.send(message)
        this.clearMessage()
      }
    },
    sendMessage2 () {
      if (this.message2 !== '') {
        let message = {
          type: 'text',
          content: this.message2,
          sender: this.to,
          from: 'Varazdin - Hrvatska',
          date: new Date()
        }
        this.conversation.push(message)
        this.send(message)
        this.clearMessage2()
      }
    },
    clearMessage () {
      this.message = ''
    },
    clearMessage2 () {
      this.message2 = ''
    },
    submitFile () {
      let formData = new FormData()
      formData.append('file', this.file, 'file')
      console.log(formData)

      this.axios.post(this.url + '/api/upload-file',
        {
          formData,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(function () {
          console.log('SUCCESS!!')
        })
        .catch(function () {
          console.log('FAILURE!!')
        })
    },
    handleFileUpload () {
      console.log(this.$refs.file.files)
      this.file = this.$refs.file.files[0]
      console.log(this.file)
    },
    sendIMG () {
      // const client = require('filestack-js').init('AIC8o333S52FzCIfpPKB4z')
      // client.picker().open()

      let image = {
        type: 'img',
        content: this.img,
        sender: this.user,
        from: '',
        date: new Date()
      }
      this.conversation.push(image)
      this.send(image)
    },
    sendSmiley () {
      let smiley = {
        type: 'smiley',
        content: this.currentSmiley,
        sender: this.user,
        from: '',
        date: new Date()
      }
      this.conversation.push(smiley)
      this.send(smiley)
    },
    sendPos () {
      var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }

      let load = {
        type: 'load',
        content: '',
        sender: this.user,
        from: '',
        date: new Date()
      }
      this.conversation.push(load)
      this.send(load)

      navigator.geolocation.getCurrentPosition(success, error, options)
      var self = this
      function success (pos) {
        var latitude = pos.coords.latitude
        var longitude = pos.coords.longitude
        var acc = pos.coords.accuracy

        console.log('Votre position actuelle est :')
        console.log(`Latitude: ${latitude}.`)
        console.log(`Longitude: ${longitude}.`)
        console.log(`La précision est de ${acc} mètres.`)

        self.latitude = latitude
        self.longitude = longitude

        let id = 0
        for (let mess of self.conversation) {
          if (mess.type === 'load') {
            id = getIDload()
            self.conversation.splice(id, 1)
          }
        }

        let posMess = {
          type: 'pos',
          content: self.posLink,
          sender: self.user,
          date: new Date()
        }
        self.conversation.splice(id, 0, posMess)
        self.send(posMess)
      }

      function error (err) {
        for (let mess of self.conversation) {
          if (mess.type === 'load') {
            let id = getIDload()
            self.conversation.splice(id, 1)
          }
        }
        console.warn(`ERREUR in sendPos() (${err.code}): ${err.message}`)
      }

      function getIDload () {
        let id = self.conversation.findIndex((mess) => {
          if (mess.type === 'load') {
            return mess
          }
        })
        return id
      }
    },
    getJSON (url, callback) {
      let xhr = new XMLHttpRequest()
      xhr.open('GET', url, true)
      xhr.responseType = 'json'
      xhr.onload = function () {
        let status = xhr.status
        if (status === 200) {
          callback(null, xhr.response)
        } else {
          callback(status, xhr.response)
        }
      }
      xhr.send()
    },
    chgMarker () {
      if (!this.marker) {
        this.findCity()
      } else {
        this.latitude = ''
        this.longitude = ''
        this.town = ''
        this.marker = false
      }
    },
    findCity () {
      var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
      navigator.geolocation.getCurrentPosition(success, error, options)
      let self = this
      function success (pos) {
        var latitude = pos.coords.latitude
        var longitude = pos.coords.longitude

        self.latitude = latitude
        self.longitude = longitude
        let that = self
        self.getJSON(self.jsonLink,
          function (err, data) {
            if (err !== null) {
              that.marker = false
              console.warn(`ERREUR in findCity() (${err.code}): ${err.message}`)
              that.town = ''
            } else {
              let city = data['address'].village ? data['address'].village : data['address'].city ? data['address'].city : data['address'].town ? data['address'].town : data['address'].county
              that.marker = true
              that.town = city + ' - ' + data['address'].postcode + ' (' + data['address'].country + ')'
            }
          }
        )
      }

      function error (err) {
        self.marker = false
        console.warn(`ERREUR in findCity() (${err.code}): ${err.message}`)
      }
    }
  },
  computed: {
    posLink: function () {
      return 'https://maps.google.com/?q=' + this.latitude + ',' + this.longitude
    },
    jsonLink: function () {
      return 'https://nominatim.openstreetmap.org/reverse?format=json&lat=' + this.latitude + '&lon=' + this.longitude + '&zoom=18&addressdetails=1'
    },
    friendPic: function () {
      return 10
    }
  },
  watch: {
    '$route': function () {
      if (this.$route.params.username !== 'null') {
        this.to = this.$route.params.username
      } else {
        this.to = ''
      }
      this.color = this.$session.get('colorApp')
      this.loadConv()
    }
  }
}
</script>
