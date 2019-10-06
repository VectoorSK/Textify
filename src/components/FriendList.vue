<template>
  <v-card
    flat
    class="overflow-y-auto"
    height="69.8vh"
    ref="mylist"
  >
    <v-list color="grey lighten-5" class="py-0">
      <v-list-item-group>
        <v-list-item v-for="(friend, id) in friendlist" :key="id" justify="center">
          <v-row align="center">
            <v-col cols="2">
              <v-avatar>
                <img :src="require('../../public/avatars/' + friend.avatar + '.png')">
              </v-avatar>
            </v-col>
            <v-col cols="3">
              {{ friend.name + ' ' + friend.surname }}
            </v-col>
            <v-col cols="3">
              {{ friend.username }}
            </v-col>
            <v-col cols="2">
            </v-col>
            <v-col cols="1">
              <v-btn icon small @click="goToTextify(friend.username)">
                <v-icon :color="friend.isConv && 'primary'" small>fa-comments</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="1">
              <v-btn icon small @click="delFriend(friend.username)">
                <v-icon color="red">clear</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  props: {
    friendlist: Array,
    color: String
  },
  data: () => ({
  }),
  methods: {
    scrollDown () {
      this.$refs.mylist.$el.scrollTop = this.$refs.mylist.$el.scrollHeight
    },
    goToTextify (username) {
      this.$router.push('/textify/' + username)
    },
    delFriend (username) {
      this.$emit('del-friend', username)
    }
  },
  watch: {
  },
  computed: {
  }
}

</script>
