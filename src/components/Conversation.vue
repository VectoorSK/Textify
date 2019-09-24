<template>
  <v-card
    flat
    class="overflow-y-auto"
    height="58vh"
    ref="mylist"
  >
    <v-list color="grey lighten-5" class="py-0">
      <v-list-item-group>
        <v-list-item v-for="(mess, id) in conversation" :key="id" justify="center">
          <!-- icon localisation (gauche) -->
          <v-tooltip
            :right="!mess.sender && true"
            :left="mess.sender && true"
          >
            <template v-slot:activator="{ on }">
              <v-icon small v-if="mess.sender" v-on="mess.type !== 'pos' && on" class="ml-auto mr-1">
                {{ mess.from !== '' && mess.type === 'text' ?'mdi-map-marker' : '' }}
              </v-icon>
            </template>
            <span>{{ mess.from }}</span>
          </v-tooltip>
          <!-- heure (gauche) -->
          <span
            v-if="mess.sender && mess.type !== 'smiley'"
            class="caption grey--text"
            :class="mess.type === 'load' && 'd-none'"
          >
          {{ ('0' + mess.date.getHours()).slice(-2) + ':'
            + ('0' + mess.date.getMinutes()).slice(-2) }}
          </span>
          <!-- MESSAGES -->
          <v-scroll-y-transition>
            <!-- text messages -->
            <v-card
              v-if="mess.type === 'text'"
              max-width="80%"
              class="my-1 px-3 py-2 justify-center"
              :class="mess.sender ? 'white--text ml-2' : 'grey lighten-4 black--text mr-2'"
              style="border-radius:20px"
              :style="'background-color: ' + color"
            >
              {{ mess.content }}
            </v-card>
            <!-- position -->
            <v-card
              v-else-if="mess.type === 'pos'"
              class="my-1 px-3 py-2 justify-center"
              :class="mess.sender ? 'white--text ml-2' : 'grey lighten-4 black--text mr-2'"
              style="border-radius:20px"
              :style="'background-color: ' + color"
            >
              <v-btn
                small
                rounded
                text
                :href="mess.content"
                :dark="mess.sender ? true : false"
                target="_blank"
              >
                <v-icon small class="mr-2">fa-map-marker-alt</v-icon>
                FIND ME
              </v-btn>
            </v-card>
            <!-- loading -->
            <v-progress-circular
              v-else-if="mess.type === 'load'"
              indeterminate
              :class="mess.sender ? 'ml-auto' : 'mr-auto'"
              :style="'color: ' + color"
            ></v-progress-circular>
            <!-- pictures -->
            <v-card
              v-else-if="mess.type === 'img'"
              max-width="35%"
              class="my-1 pa-2"
              :class="mess.sender ? 'white--text ml-2' : 'grey lighten-4 black--text mr-2'"
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
            <div v-else-if="mess.type === 'smiley'" :class="mess.sender ? 'ml-auto' : 'mr-auto'" style="font-size: 3em">{{ mess.content }}</div>
          </v-scroll-y-transition>
          <!-- heure (droite) -->
          <span
            v-if="!mess.sender && mess.type !== 'smiley'"
            class="caption grey--text"
            :class="mess.type === 'load' && 'd-none'"
          >
            {{ ('0' + mess.date.getHours()).slice(-2) + ':'
            + ('0' + mess.date.getMinutes()).slice(-2) }}
          </span>
          <!-- icon localisation (droite) -->
          <v-tooltip
            :right="!mess.sender && true"
            :left="mess.sender && true"
            v-if="mess.type === 'text'"
          >
            <template v-slot:activator="{ on }">
              <v-icon small v-if="!mess.sender" v-on="on" class="mr-auto ml-1">
                {{ mess.from !== '' ?'mdi-map-marker' : '' }}
              </v-icon>
            </template>
            <span>{{ mess.from }}</span>
          </v-tooltip>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  props: {
    conversation: Array,
    color: String
  },
  data: () => ({
  }),
  methods: {
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
    }
  }
}

</script>
