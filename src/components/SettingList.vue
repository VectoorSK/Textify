<template>
  <v-card>
    <v-list class="py-0">
      <v-list-item-group>
        <!-- CHANGE BIG EMOJI DIALOG -->
        <v-list-item>
          <v-dialog max-height="300" max-width="300" v-model="dialog">
            <template v-slot:activator="{ on }">
              <div v-on="on">
                <span class="mx-2">{{ currentSmiley }}</span>
                <span class="mx-4">Emoji</span>
              </div>
            </template>
            <!-- Big Emoji pop up -->
            <EmojiSelect v-model="currentSmiley" v-on:close-dialog="closeDialog"></EmojiSelect>
          </v-dialog>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
import EmojiSelect from './EmojiSelect'

export default {
  components: {
    EmojiSelect
  },
  props: {
    color: String
  },
  data: () => ({
    currentSmiley: '🙂',
    dialog: false
  }),
  methods: {
    closeDialog () {
      this.dialog = false
    }
  },
  watch: {
    // send new bigsmiley to parent component
    currentSmiley: function () {
      this.$emit('input', this.currentSmiley)
    }
  }
}
</script>
