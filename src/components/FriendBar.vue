<template>
  <v-card flat color="blue-grey lighten-4" class="mb-2">
    <v-row class="mx-0" justify="space-between" align="center">
      <v-col
        cols="1"
        class="ma-0 pa-0"
        >
        <v-dialog width="33vw">
          <template v-slot:activator="{ on }">
            <v-btn icon small v-on="on">
              <v-icon>add_circle</v-icon>
            </v-btn>
          </template>
          <v-card class="py-2 px-5">
            {{ user }}
            <v-text-field
              v-model="newFriend"
              label="Pseudo"
              :error="error !== '' && true"
              :error-messages="error"
            ></v-text-field>
            <v-row>
              <v-btn
                color="success"
                class="mx-auto mt-2"
                @click="checkUser(newFriend)"
              >
                <v-icon class="mr-2">person_add</v-icon>
                ADD
              </v-btn>
            </v-row>
          </v-card>
        </v-dialog>
      </v-col>
      <v-col
        cols="1"
        class="ma-0 pa-0"
      >
        <!-- CHANGE COLOR MENU -->
        <v-menu bottom offset-y :close-on-content-click="false" v-model="colorMenu">
          <template v-slot:activator="{ on }">
              <v-btn icon v-on="on" class="ml-4">
                <v-icon :color="color">color_lens</v-icon>
              </v-btn>
          </template>
          <!-- ColorPicker pop up -->
          <ColorPicker v-model="color"></ColorPicker>
        </v-menu>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import ColorPicker from './ColorPicker'

export default {
  components: {
    ColorPicker
  },
  props: {
    userlist: Array,
    error: String,
    user: String
  },
  data: () => ({
    color: '#512DA8',
    avatar: 1,
    newFriend: '',
    dialog: false,
    colorMenu: false,
    settingMenu: false
  }),
  methods: {
    checkUser (friend) {
      this.$emit('input', '')
      this.$emit('add-friend', this.user, friend)
      /* let found = false
      for (let user of this.userlist) {
        if (this.newFriend === user.pseudo) {
          found = true
          this.$emit('input', '')
          this.$emit('add-friend', user)
          break
        }
      }
      if (!found) {
        this.$emit('input', 'Invalid pseudo')
        console.warn('pseudo invalide !')
      } */
    }
  },
  computed: {
  },
  watch: {
    color: function () {
      this.colorMenu = false
      this.$emit('update-color', this.color)
    }
  }
}
</script>
