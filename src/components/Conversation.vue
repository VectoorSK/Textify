<template>
  <v-card
    flat
    class="overflow-y-auto"
    height="60vh"
    ref="mylist"
  >
    <v-list color="grey lighten-5" class="py-0">
      <v-list-item-group>
        <v-list-item v-for="(mess, id) in conversation" :key="id" justify="center">
          <v-spacer v-if="mess.sender === user"></v-spacer>
          <!-- icon localisation (gauche) -->
          <v-tooltip
            :right="mess.sender !== user && true"
            :left="mess.sender === user && true"
          >
            <template v-slot:activator="{ on }">
              <v-icon small v-if="mess.sender === user" v-on="mess.type !== 'pos' && on" class="mr-1">
                {{ mess.from !== '' && mess.type === 'text' ?'mdi-map-marker' : '' }}
              </v-icon>
            </template>
            <span>{{ mess.from }}</span>
          </v-tooltip>
          <!-- heure (gauche) -->
          <span
            v-if="mess.sender === user && mess.type !== 'smiley'"
            class="caption grey--text"
            :class="mess.type === 'load' && 'd-none'"
          >
            {{ getDateHours(mess.date) + ':'
            +  getDateMins(mess.date) }}
          </span>
          <!-- <v-badge
            :color="color"
            bottom
            overlap
            style="min-width: 100%"
          >
            <template v-slot:badge>
              <v-icon v-if="id === lastMessageFromYou" dark>
                {{ to_seen ? 'mdi-eye' : 'mdi-eye-off' }}
              </v-icon>
            </template> -->
          <!-- MESSAGES -->
          <v-scroll-y-transition>
            <!-- text messages -->
            <v-card
              v-if="mess.type === 'text'"
              max-width="80%"
              class="my-1 px-3 py-2 justify-center"
              :class="mess.sender === user ? 'white--text ml-2' : 'grey lighten-4 black--text mr-2'"
              style="border-radius:20px"
              :style="'background-color: ' + color"
            >
              {{ mess.content }}
            </v-card>
            <!-- position -->
            <v-card
              v-else-if="mess.type === 'pos'"
              class="my-1 px-3 py-2 justify-center"
              :class="mess.sender === user ? 'white--text ml-2' : 'grey lighten-4 black--text mr-2'"
              style="border-radius:20px"
              :style="'background-color: ' + color"
            >
              <v-btn
                small
                rounded
                text
                :href="mess.content"
                :dark="mess.sender === user ? true : false"
                target="_blank"
              >
                <v-icon class="ml-n1 mr-1">person_pin</v-icon>
                FIND ME
              </v-btn>
            </v-card>
            <!-- loading -->
            <v-progress-circular
              v-else-if="mess.type === 'load'"
              indeterminate
              :class="mess.sender === user ? 'ml-auto' : 'mr-auto'"
              :style="'color: ' + color"
            ></v-progress-circular>
            <!-- pictures -->
            <v-card
              v-else-if="mess.type === 'img'"
              max-width="35%"
              class="my-1 pa-2"
              :class="mess.sender === user ? 'white--text ml-2' : 'grey lighten-4 black--text mr-2'"
              :style="'background-color: ' + color"
            >
              <v-dialog max-width="70vw" max-height="80vh">
                <template v-slot:activator="{ on }">
                  <v-card class="white pa-2" flat v-on="on">
                    <v-img src="../../public/picture.png"></v-img>
                  </v-card>
                </template>
                <v-card class="pa-2">
                  <v-img contain src="../../public/picture.png" max-height="80vh"></v-img>
                </v-card>
              </v-dialog>
            </v-card>
            <!-- big smiley -->
            <div v-else-if="mess.type === 'smiley'" :class="mess.sender === user ? 'ml-auto' : 'mr-auto'" style="font-size: 3em">{{ mess.content }}</div>
          </v-scroll-y-transition>
          <!-- </v-badge> -->

          <!-- heure (droite) -->
          <span
            v-if="mess.sender !== user && mess.type !== 'smiley'"
            class="caption grey--text"
            :class="mess.type === 'load' && 'd-none'"
          >
            {{ getDateHours(mess.date) + ':'
            +  getDateMins(mess.date) }}
          </span>
          <!-- icon localisation (droite) -->
          <v-tooltip
            :right="mess.sender !== user && true"
            :left="mess.sender === user && true"
            v-if="mess.type === 'text'"
          >
            <template v-slot:activator="{ on }">
              <v-icon small v-if="mess.sender !== user" v-on="on" class="ml-1">
                {{ mess.from !== '' ? 'mdi-map-marker' : '' }}
              </v-icon>
            </template>
            <span>{{ mess.from }}</span>
          </v-tooltip>
          <template v-if="id === lastMessageFromYou" v-slot:badge>
            <v-icon class="ma-0 px-3">{{ to_seen ? 'mdi-eye' : 'mdi-eye-off' }}</v-icon>
          </template>
        </v-list-item>
        <v-list-item dense :color="color">
          <v-spacer></v-spacer>
          <v-icon class="ma-0 px-3" small>{{ to_seen ? 'mdi-eye' : 'mdi-eye-off' }}</v-icon>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  props: {
    conversation: Array,
    to_seen: Boolean,
    user: String,
    color: String
  },
  data: () => ({
  }),
  methods: {
    getDateHours (str) {
      let date = new Date(str)
      return ('0' + date.getHours()).slice(-2)
    },
    getDateMins (str) {
      let date = new Date(str)
      return ('0' + date.getMinutes()).slice(-2)
    },
    scrollDown () {
      this.$refs.mylist.$el.scrollTop = this.$refs.mylist.$el.scrollHeight
    }
  },
  watch: {
    nbMessage: function () {
      setTimeout(() => this.scrollDown(), 0)
    }
  },
  computed: {
    nbMessage: function () {
      return this.conversation.length
    },
    lastMessage: function () {
      if (this.conversation.length > 0) {
        return this.conversation[this.conversation.length - 1].sender === this.user ? 'to' : 'from'
      } else {
        return 'from'
      }
    },
    lastMessageFromYou: function () {
      let id = 0
      for (const [idx, mess] of this.conversation.entries()) {
        if (mess.sender === this.user) {
          id = idx
        }
      }
      return id
    }
  }
}

</script>
