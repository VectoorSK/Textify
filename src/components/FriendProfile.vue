<template>
  <v-container>
    <v-card>
      <!-- Background picture -->
      <v-img
        class="white--text"
        height="200px"
        :src="require('../../public/backgrounds/' + friend.background + '.png')"
        alt="background"
      >
        <v-row
          align="start"
          class="fill-height mx-2 mt-2"
        >
          <!-- Profile picture -->
          <v-avatar size="80">
            <img
              :src="require('../../public/avatars/' + friend.avatar + '.png')"
              alt="avatar"
            >
          </v-avatar>
          <!-- Name & Surname -->
          <span class="ma-1">{{ friend.name + ' ' + friend.surname }}</span>
          <v-spacer></v-spacer>
          <v-list-item
            class="mt-4 mb-n4"
            color="rgba(0, 0, 0, .4)"
            dark
          >
            <v-list-item-content>
              <!-- Username -->
              <v-list-item-title class="title">{{ friend.username }}</v-list-item-title>
              <!-- Email -->
              <v-list-item-subtitle>{{ friend.email }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <!-- Birthday -->
              <v-list-item-action-text>{{ friend.birthday }}</v-list-item-action-text>
            </v-list-item-action>
          </v-list-item>
        </v-row>
      </v-img>
      <v-card-text>
        <!-- Multilines description -->
        <span class="text--primary">
          <span v-for="(lines, id) in descMultLine" :key="id">{{ lines }}<br/></span>
        </span>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: {
    friend: Object
  },
  data () {
    return {
    }
  },
  computed: {
    // split desc in lines
    descMultLine: function () {
      return this.friend.description.split('\n')
    }
  }
}
</script>
