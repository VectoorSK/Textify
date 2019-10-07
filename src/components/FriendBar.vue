<template>
  <v-card flat color="blue-grey lighten-4" class="mb-2">
    <v-row class="mx-0" justify="space-between" align="center">
      <v-dialog width="33vw" v-model="dialogAdd">
        <template v-slot:activator="{ on }">
          <v-btn icon small v-on="on">
            <v-icon>add_circle</v-icon>
          </v-btn>
        </template>
        <v-card class="py-2 px-5">
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
    </v-row>
  </v-card>
</template>

<script>

export default {
  props: {
    userlist: Array,
    error: String,
    user: String,
    open: Boolean
  },
  data: () => ({
    avatar: 1,
    newFriend: '',
    dialogAdd: false
  }),
  methods: {
    checkUser (friend) {
      this.$emit('input', '')
      this.$emit('add-friend', this.user, friend)
    }
  },
  computed: {
    //
  }
}
</script>
