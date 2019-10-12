<template>
  <v-card flat color="blue-grey lighten-4" class="mb-2">
    <v-dialog width="350" v-model="dialogAdd">
      <template v-slot:activator="{ on }">
        <v-btn
          icon
          small
          v-on="on"
          :color="dialogAdd || colorAdd ? color : ''"
          @mouseover="colorAdd = true"
          @mouseout="colorAdd = false"
        >
          <v-icon>add_circle</v-icon>
        </v-btn>
      </template>
      <v-card class="py-2 px-5">
        <span class="subtitle-1 font-weight-medium" :style="'color:' + color">Enter a username:</span>
        <v-text-field
          :color="color"
          v-model="newFriend"
          label="Pseudo"
          :error="error !== '' && true"
          :error-messages="error"
          @keypress.enter="checkUser(newFriend)"
        ></v-text-field>
        <v-row>
          <v-btn
            :color="color"
            class="mx-auto mt-2"
            @click="checkUser(newFriend)"
          >
            <v-icon color="white" class="mr-2">person_add</v-icon>
            <span class="white--text">ADD</span>
          </v-btn>
        </v-row>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>

export default {
  props: {
    userlist: Array,
    error: String,
    user: String,
    open: Boolean,
    color: String
  },
  data: () => ({
    avatar: 1,
    newFriend: '',
    dialogAdd: false,
    colorAdd: false
  }),
  methods: {
    checkUser (friend) {
      this.$emit('input', '')
      this.$emit('add-friend', this.user, friend)
      // this.newFriend = ''
    }
  },
  computed: {
    //
  }
}
</script>
