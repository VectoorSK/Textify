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
        <v-row justify="center">
          <v-col cols="11" class="pa-0 pt-3">
            <!-- FENETRE DE CONVERSATION -->
            <SettingBar v-model="currentSmiley" v-on:update-color="updateColor"></SettingBar>
            <Conversation :conversation="conversation" :color="color"></Conversation>
          </v-col>
        </v-row>
        <v-row align="center" class="my-0 mx-2 pa-0">
          <v-col cols="2" class="ma-0 pa-0">
            <!-- select smiley button -->
            <v-menu top offset-y max-height="33vh" max-width="28vw" min-width="300" :close-on-content-click="false">
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                  <v-icon>mdi-emoticon</v-icon>
                </v-btn>
              </template>
              <!-- Emoji pop up -->
              <EmojiTab v-model="smiley" v-on:addSmiley="message += smiley"></EmojiTab>
            </v-menu>
          <!-- send position button -->
            <v-btn icon @click="sendPos" :active-class="color">
              <v-icon>my_location</v-icon>
            </v-btn>
          <!-- send picture button -->
            <v-btn icon @click="inputType === 'text' ? inputType = 'file' : inputType = 'text'">
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
              @click="showSmiley = !showSmiley"
              @click:append="chgMarker"
              @click:append-outer="sendMessage"
              @click:clear="clearMessage"
              :color="color"
            ></v-text-field>
            <!-- input file -->
            <v-file-input
              v-else
              v-model="img"
              accept="image/*"
              label="Send picture"
              append-outer-icon="send"
              @click:append-outer="sendIMG"
            ></v-file-input>
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
    <!-- second text input -->
    <v-card
      class="mx-auto my-4 px-5 overflow-hidden"
      height="75"
      max-width="50vw"
      min-width="400"
      color="deep-purple lighten-4"
    >
      <v-text-field
        class="mx-5"
        v-model="message2"
        :append-icon="marker ? 'mdi-map-marker' : 'mdi-map-marker-off'"
        :append-outer-icon="message2 ? 'mdi-send' : 'mdi-microphone'"
        prepend-icon="mdi-emoticon"
        clearable
        label="Message"
        type="text"
        @click:append-outer="sendMessage2"
      ></v-text-field>
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
    inputType: 'text',
    message: '',
    message2: '',
    img: undefined,
    dialog: false,
    currentSmiley: '🙂',
    smiley: '',
    showSmiley: false,
    marker: false,
    latitude: null,
    longitude: null,
    town: '',
    color: '#512DA8',
    conversation: [
      { type: 'text',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis officia fugiat sunt id dignissimos porro, corrupti iusto, ullam animi nemo dolore totam doloremque ipsam magni, ea similique. Voluptatum, perferendis perspiciatis?',
        sender: true,
        from: 'Paris - 75001 (France)',
        date: new Date() },
      { type: 'text',
        content: 'Veritatis officia fugiat sunt id dignissimos porro, corrupti iusto, ullam animi nemo dolore totam doloremque ipsam magni, ea similique. Voluptatum, perferendis perspiciatis?',
        sender: false,
        from: 'Varazdin - 42000 (Hrvatska)',
        date: new Date() },
      { type: 'text',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        sender: true,
        from: 'Paris - 75001 (France)',
        date: new Date() },
      { type: 'text',
        content: 'blablablabla',
        sender: true,
        from: 'Paris - 75001 (France)',
        date: new Date() },
      { type: 'text',
        content: 'blablablablablablablabla',
        sender: false,
        from: 'Varazdin - 42000 (Hrvatska)',
        date: new Date() }
    ]
  }),
  methods: {
    updateColor (c) {
      this.color = c
    },
    sendMessage () {
      let from = this.marker ? this.town : ''
      if (this.message !== '') {
        this.conversation.push({
          type: 'text',
          content: this.message,
          sender: true,
          from: from,
          date: new Date()
        })
        this.clearMessage()
      }
    },
    sendMessage2 () {
      if (this.message2 !== '') {
        this.conversation.push({
          type: 'text',
          content: this.message2,
          sender: false,
          from: 'Varazdin - Hrvatska',
          date: new Date()
        })
        this.clearMessage2()
      }
    },
    clearMessage () {
      this.message = ''
    },
    clearMessage2 () {
      this.message2 = ''
    },
    sendIMG () {
      this.conversation.push({
        type: 'img',
        content: this.img,
        sender: true,
        date: new Date()
      })
    },
    sendSmiley () {
      this.conversation.push({
        type: 'smiley',
        content: this.currentSmiley,
        sender: true,
        date: new Date()
      })
    },
    sendPos () {
      var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }

      this.conversation.push({
        type: 'load',
        content: '',
        sender: true,
        date: new Date()
      })

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

        self.conversation.splice(id, 0, {
          type: 'pos',
          content: self.posLink,
          sender: true,
          date: new Date()
        })
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
    }
  }
}

/* codeLatLng(lat, lng)

var geocoder = new google.maps.Geocoder()

function codeLatLng (lat, lng) {
  var latlng = new google.maps.LatLng(lat, lng)
  geocoder.geocode({ 'latLng': latlng }, function (results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      console.log(results)
      if (results[1]) {
        // formatted address
        var address = results[0].formatted_address
        alert('address = ' + address)
      } else {
        alert('No results found')
      }
    } else {
      alert('Geocoder failed due to: ' + status)
    }
  })
} */
</script>

<style scoped>
</style>
