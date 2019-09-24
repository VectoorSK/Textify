<template>
  <v-card class="overflow-hidden">
    <v-row class="mx-1" justify="space-between">
      <v-col
        v-for="(row, id) in smileys"
        :key="id"
        cols="2"
        class="ma-0 pa-0"
      >
        <v-btn
          v-for="(smiley, idx) in row"
          :key="idx"
          fab
          text
          @click="addSmiley(id, idx)"
          style="font-size: 2em"
        >
         {{ row[idx] }}
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    smileys: [
      ['🙂', '👊', '🔥', '🍻', '🍁'],
      ['😁', '💪', '💧', '☠️', '🎈'],
      ['😂', '️️✌', '⚡', '💩', '💯'],
      ['😍', '🤟', '💥', '👀', '💋'],
      ['😎', '🖕', '🌈', '🏆', '❤️']
    ]
  }),
  methods: {
    addSmiley (row, id) {
      this.$emit('input', this.smileys[row][id])
      this.$emit('close-dialog')
    }
  }
}
</script>
