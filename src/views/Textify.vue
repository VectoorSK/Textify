<template>
  <div id="textify">
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
            <!-- TOP BAR (friend info) -->
            <SettingBar v-model="currentSmiley" :friendlist="userFriends" :friend="friendLoad" :color="color"></SettingBar>
            <!-- CONVERSATION WINDOW -->
            <Conversation :conversation="conversation" :to_seen="to_seen" :user="user" :color="color" :size="convSize"></Conversation>
          </v-col>
        </v-row>
        <v-row v-if="friendLoad !== null" align="center" justify="center">
          <!-- INPUT BAR (bottom) -->
          <v-col cols="10" md="3" class="ma-0 pa-0">
            <!-- select smiley button -->
            <v-menu top offset-y height="240" max-width="28vw" min-width="300" :close-on-content-click="false" v-model="emojiTabOpen">
              <template v-slot:activator="{ on }">
                <v-btn icon
                  v-on="on"
                  :color="emojiTabOpen || colorTab ? color : ''"
                  @mouseover="colorTab = true"
                  @mouseout="colorTab = false"
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
              :color="colorLocation ? color : ''"
              @mouseover="colorLocation = true"
              @mouseout="colorLocation = false"
            >
              <v-icon>my_location</v-icon>
            </v-btn>
            <!-- send picture button -->
            <v-btn icon
              @click="inputType === 'text' ? inputType = 'file' : inputType = 'text'"
              :color="colorPic ? color : ''"
              @mouseover="colorPic = true"
              @mouseout="colorPic = false"
            >
              <v-icon>{{ inputType === 'text' ? 'mdi-upload' : 'mdi-text-subject' }}</v-icon>
            </v-btn>
            <!-- send smiley button -->
            <v-btn v-if="$vuetify.breakpoint.smAndDown" text fab @click="sendSmiley" style="font-size: 1.5em">
              {{ currentSmiley }}
            </v-btn>
          </v-col>
          <!-- input textarea -->
          <v-col cols="10" md="7" class="ma-0 pa-0" align="center">
            <v-textarea
              v-if="inputType === 'text'"
              v-model="message"
              :append-icon="marker ? 'mdi-map-marker' : 'mdi-map-marker-off'"
              append-outer-icon="send"
              clearable
              no-resize
              label="Message"
              @click:append="chgMarker"
              @click:append-outer="sendMessage"
              @keyup.shift.enter="sendMessage"
              @click:clear="clearMessage"
              :color="color"
              :rows="nbRow"
              ref="textarea"
            ></v-textarea>
            <!-- input image / audio / video -->
            <v-file-input
              v-else-if="inputType === 'file'"
              v-model="file"
              multiple
              accept="image/*,audio/*,video/*"
              label="Select file (image, audio, video)"
              append-outer-icon="send"
              v-on:change="filesChange"
              @click:append-outer="sendFiles"
              ref="fileinput"
            >
              <template v-slot:selection="{ index, text }">
                <v-img
                  v-if="file[index].type.includes('image') && index < 50"
                  class="mr-1"
                  max-width="30px"
                  max-height="30px"
                  :src="iconSRC[index]"
                ></v-img>
                <v-chip
                  v-if="!file[index].type.includes('image') && index < 50"
                  :color="color"
                  dark
                  outlined
                  pill
                  small
                >
                  <v-icon left>{{ file[index].type.includes('audio') ? 'mdi-music' : 'mdi-youtube' }}</v-icon>
                  {{ text }}
                </v-chip>
                <span
                  v-else-if="index === 50"
                  class="overline grey--text text--darken-3 mx-2"
                >
                  +{{ file.length - 5 }} File(s)
                </span>
              </template>
            </v-file-input>
          </v-col>
          <!-- send smiley button -->
          <v-col v-if="$vuetify.breakpoint.mdAndUp" cols="1" class="ma-0 pa-0">
            <v-btn text fab @click="sendSmiley" style="font-size: 1.5em">
              {{ currentSmiley }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-card>
  </div>
</template>

<script>
import EmojiTab from '../components/Emoji'
import Conversation from '../components/Conversation'
import SettingBar from '../components/SettingBar'

export default {
  components: { EmojiTab, Conversation, SettingBar },
  data: () => ({
    // user logged infos:
    user: '',
    userFriends: [],
    color: '',
    // friend infos:
    to: '',
    friendLoad: null,
    // conversation infos:
    conversation: [],
    from_seen: null,
    to_seen: null,
    // smiley select button
    emojiTabOpen: false,
    colorTab: false,
    smiley: '',
    // gps location:
    colorLocation: false,
    latitude: null,
    longitude: null,
    town: '',
    // message/file input:
    message: '',
    marker: false,
    inputType: 'text',
    file: undefined,
    iconSRC: [],
    nbRow: 1,
    baseConvSize: 58,
    convSize: 58,
    colorPic: false,
    // big smiley button:
    currentSmiley: '🙂',
    // prod:
    url: '' // 'http://localhost:4000'
  }),
  mounted: function () {
    if (this.$session.exists()) {
      this.color = this.$session.get('colorApp')
      this.user = this.$session.get('username')
      this.userFriends = this.$session.get('friends')
      this.to = this.$route.params.username
      this.loadConv()
      if (this.$vuetify.breakpoint.smAndDown) {
        this.baseConvSize = 52
        this.adaptConvHeight()
      }
    } else {
      this.$router.push('/')
    }
  },
  methods: {
    async hasConvChange () {
      const rep = await this.axios.post(this.url + '/api/updateConv',
        {
          username: this.user,
          friend: this.to,
          length: this.conversation.length
        }
      )
      if (rep) {
        this.loadConv()
      }
    },
    adaptConvHeight () {
      if (this.message !== null) {
        this.nbRow = this.message.split('\n').length < 8 ? this.message.split('\n').length : 7
        this.convSize = this.baseConvSize - 2.45 * (this.nbRow - 1)
      }
    },
    // load conversation infos between 'from' and 'to'
    async loadConv () {
      const res = await this.axios.post(this.url + '/api/getConv',
        {
          from: this.user,
          to: this.to
        }
      )
      if (res.data.status === 1) {
        this.conversation = res.data.content
        this.friendLoad = res.data.To
        this.from_seen = res.data.from_seen
        this.to_seen = res.data.to_seen
        this.hasConvChange()
      } else if (res.data.status === 0) {
        this.conversation = []
        this.friendLoad = res.data.To
      } else {
        this.conversation = []
        this.friendLoad = null
      }
    },
    // send message to the conv (Server side)
    async send (message) {
      const res = await this.axios.post(this.url + '/api/sendMess',
        {
          from: this.user,
          to: this.to,
          message: message
        }
      )
      if (res) {
        this.from_seen = true
        this.to_seen = false
      }
    },
    // clear text message
    clearMessage () {
      setTimeout(() => { this.message = '' }, 0)
    },
    // send text message
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
        this.message = ''
        // send on server
        this.send(message)
      }
    },
    // send one audio/video message for each files
    sendFiles () {
      console.log(this.file)
      for (let i = 0; i < this.file.length; i++) {
        this.sendFile(this.file[i])
      }
      this.file = null
      this.iconSRC = []
    },
    // send audio/video message
    sendFile (f) {
      var reader = new FileReader()
      let self = this
      reader.addEventListener('load', function () {
        // get image source (bytes)
        // console.log(this.result)
        let type = f.type.includes('image') ? 'img'
          : f.type.includes('audio') ? 'audio'
            : f.type.includes('video') ? 'video' : ''

        let file = {
          type: type,
          content: this.result,
          sender: self.user,
          from: '',
          date: new Date()
        }
        self.conversation.push(file)
        self.send(file)
        self.file = null
      })
      reader.readAsDataURL(f)
    },
    // update file to upload and set src of thumbnails (iconSRC)
    filesChange () {
      this.iconSRC = []
      for (var i = 0; i < this.file.length; i++) {
        let self = this
        let type = this.file[i].type.includes('image')
        var reader = new FileReader()
        reader.addEventListener('load', function () {
          if (type) {
            self.iconSRC.push(this.result)
          } else {
            self.iconSRC.push('not_img')
          }
        })
        reader.readAsDataURL(this.file[i])
      }
    },
    // send big smiley message
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
    // send location message
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
    // enable/disable marker position
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
    // get city from gps coords (read JSON from openstreetmap API)
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
              let city = data['address'].village ? data['address'].village
                : data['address'].city ? data['address'].city
                  : data['address'].town ? data['address'].town
                    : data['address'].county
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
    },
    // get JSON from url function
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
    }
  },
  computed: {
    // google maps link to actual coords
    posLink: function () {
      return 'https://maps.google.com/?q=' + this.latitude + ',' + this.longitude
    },
    // openstreet map link for reverse geocoding
    jsonLink: function () {
      return 'https://nominatim.openstreetmap.org/reverse?format=json&lat=' +
        this.latitude + '&lon=' + this.longitude + '&zoom=18&addressdetails=1'
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
    },
    message: function () {
      this.adaptConvHeight()
    },
    '$vuetify.breakpoint.smAndDown': function () {
      if (this.$vuetify.breakpoint.smAndDown) {
        this.baseConvSize -= 6
      } else {
        this.baseConvSize += 6
      }
      this.adaptConvHeight()
    }
  }
}
</script>
