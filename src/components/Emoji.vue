<template>
  <v-card height="240" max-width="28vw" min-width="300" class="overflow-hidden">
    <v-tabs
      v-model="activeTab"
      dark
      vertical
      small
      height="240"
      background-color="grey lighten-3"
      :slider-color="color"
      slider-size="4"
    >
      <!-- SMILEY CATEGORY TABS -->
      <v-tab
        v-for="(cat, id) in catSmileys"
        :key="id"
        :href="`#tab-${id}`"
      >
        <v-icon :color="parseInt(activeTab.slice(-1)) === id ? color : 'grey lighten-1'">{{ cat.icon }}</v-icon>
      </v-tab>
      <!-- SMILEY GRIDS -->
      <v-tab-item
        v-for="(cat, id) in catSmileys"
        :key="id"
        :value="'tab-' + id"
      >
        <v-row class="mx-1">
          <v-col
            v-for="i in 72"
            :key="i-1"
            cols="1"
            class="ma-0 pa-0"
          >
            <v-btn
              fab
              small
              text
              @click="addSmiley(cat.name, i)"
            >
              {{
                cat.name === 'people' ? people[i-1] :
                cat.name === 'animals' ? animals[i-1] :
                cat.name === 'nature' ? nature[i-1] :
                cat.name === 'foods' ? foods[i-1] :
                cat.name === 'activities' ? activities[i-1] :
                cat.name === 'places' ? places[i-1] :
                cat.name === 'objects' ? objects[i-1] :
                cat.name === 'symbols' ? symbols[i-1] :
                symbols2[i-1]
              }}
            </v-btn>
          </v-col>
        </v-row>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
export default {
  props: {
    color: String
  },
  data: () => ({
    activeTab: 'tab-0',
    // smiley categories list:
    catSmileys: [
      { name: 'people', img: '🙂', icon: 'mdi-emoticon' },
      { name: 'animals', img: '🐵', icon: 'mdi-cat' },
      { name: 'nature', img: '🌴', icon: 'mdi-palm-tree' },
      { name: 'foods', img: '🍗', icon: 'mdi-food' },
      { name: 'activities', img: '🛹', icon: 'mdi-basketball' },
      { name: 'places', img: '🏍️', icon: 'mdi-car-sports' },
      { name: 'objects', img: '💻', icon: 'mdi-laptop' },
      { name: 'symbols', img: '️❤️', icon: 'mdi-heart' },
      { name: 'symbols2', img: '️🆒', icon: 'mdi-new-box' }
    ],
    // smiley categories:
    people: [
      '🙂', '🙃', '😃', '😀', '😄', '😁', '😊', '😇', '😅', '😂', '😆', '🤣',
      '😬', '😌', '🤤', '😉', '😋', '😛', '😜', '😝', '😎', '🤫', '🤐', '🤡',
      '😏', '🤭', '🤗', '😗', '😚', '😘', '🥰', '😍', '🤩', '🤪', '🤑', '😵',
      '🤔', '🤨', '🙄', '😕', '😐', '😑', '😶', '🙁', '☹️', '😟', '😞', '😔',
      '😢', '😪', '😭', '😩', '😫', '😣', '😖', '😒', '😤', '😠', '😡', '🤬',
      '😮', '😳', '😲', '🤯', '😨', '😰', '😱', '😴', '🤕', '🤢', '🥶', '🥵'

    ],
    animals: [
      '🐱', '🦁', '🐯', '🐶', '🐺', '🦊', '🐴', '🦓', '🦄', '🐷', '🐗', '🐮',
      '🐭', '🐹', '🐰', '🐔', '🐸', '🦝', '🐨', '🐼', '🐻', '🐵', '🦒', '🐘',
      '🙈', '🙉', '🙊', '🐟', '🐠', '🐬', '🦈', '🐳', '🐙', '🦐', '🦀', '🦞',
      '🐜', '🦗', '🐛', '🦋', '🐞', '🐝', '🦟', '🦂', '🕷️', '🕸️', '🐌', '🐚',
      '🐤', '🐓', '🦆', '🦃', '🐦', '🕊️', '🦅', '🦉', '🦚', '🦜', '🦢', '🐧',
      '🐾', '🦡', '🦔', '🐿️', '🦇', '🦎', '🐢', '🐍', '🐊', '🐉', '🦖', '🦕'
    ],
    nature: [
      '🌱', '🌼', '🌻', '🌹', '🌷', '🥀', '🌾', '🌺', '🌸', '💮', '🏵️', '💐',
      '🌳', '🌲', '🎄', '🌴', '🌵', '🌿', '🍀', '🍃', '🍂', '🍁', '🌰', '🍄',
      '☀️', '🌞', '🌙', '🌝', '🌚', '🌕', '🌗', '🌑', '🌓', '⭐', '🌟', '💥',
      '⚡', '🔥', '🌪️', '💧', '💦', '🌊', '🌈', '✨', '💫', '🌀', '🌠', '☄️',
      '🌤️', '☁️', '🌧️', '🌩️', '⛈️', '🌨️', '⛄', '☔', '☂️', '🌬️', '💨', '🌫️',
      '🕛', '🕐', '🕑', '🕒', '🕓', '🕔', '🕕', '🕖', '🕗', '🕘', '🕙', '🕚'
    ],
    foods: [
      '🍉', '🍊', '🍋', '🍌', '🍍', '🍎', '🍐', '🍑', '🍒', '🍓', '🥝', '🥥',
      '🍅', '🥑', '🍆', '🥔', '🥕', '🌽', '🌶️', '🥒', '🥬', '🥦', '🍄', '🍠',
      '🍞', '🥐', '🥖', '🥨', '🥞', '🍪', '🍩', '🍨', '🎂', '🧁', '🍫', '🍭',
      '🍗', '🥩', '🥓', '🧀', '🍯', '🥛', '☕', '🍾', '🍺', '🍷', '🍹', '🥃',
      '🍔', '🍟', '🍕', '🌭', '🥪', '🌮', '🌯', '🥙', '🍳', '🍝', '🍲', '🥣',
      '🍱', '🍘', '🍙', '🍚', '🍛', '🍢', '🍣', '🍤', '🍥', '🥮', '🍡', '🥠'
    ],
    activities: [
      '⚽', '⚾', '🏀', '🏐', '🏈', '🏉', '🎾', '🏓', '🏸', '🏏', '🏒', '🏑',
      '🥊', '🥋', '⛳', '🎯', '🎳', '🎱', '🥏', '🎣', '🛹', '⛸️', '🎿', '🛷',
      '🏆', '🥇', '🥈', '🥉', '🎮', '🕹️', '🎰', '🎲', '🧩', '♟️', '🎨', '🎭',
      '🎤', '🎙️', '🎧', '🎷', '🎸', '🎹', '🎺', '🎻', '🥁', '🎛️', '🎼', '🎵',
      '🏄', '🚣', '🏊', '⛷️', '🏂', '🏇', '🧗', '🤼', '🏋️', '🤾', '🧘', '🤸',
      '️🕺', '💃', '🎈', '🎉', '🎊', '🧨', '🎀', '🎁', '🧸', '🧧', '🔮', '💎'
    ],
    places: [
      '⛰️', '🌋', '🏕️', '🏖️', '🏜️', '🏝️', '🏞️', '🌄', '🌅', '🌍', '🌎', '🌏',
      '🏡', '🏢', '🏤', '🏥', '🏨', '🏪', '🏫', '🏭', '🏰', '⛪', '🕌', '🕍',
      '🚗', '🚕', '🚓', '🚑', '🚒', '🚐', '🚌', '🚚', '🚜', '🛵', '🏍️', '️🏎️',
      '🚶', '🏃', ' 🚴', '🚲', '🛹', '🛴', '🚂', '🚃', '🚅', '🚈', '🚋', '🚇',
      '⛵', '🚤', '⛴️', '️🛥️', '🚢', '🛳️', '✈️', '🛩️', '🚁', '🚀', '🛰️', '🛸',
      '⛲', '🎡', '🎢', '🌉', '🏗️', '🚏', '🚦', '🚧', '⛽', '⚓', '⛩️', '🗿'
    ],
    objects: [
      '📱', '☎️', '📠', '💻', '🖥️', '🖨️', '📻', '📺', '📷', '📹', '🎥', '📽️',
      '📞', '🔋', '⌨️', '🖱️', '💾', '💽', '💿', '📀', '📼', '🎞️', '📟', '🔌',
      '📖', '📕', '📚', '📜', '📄', '📰', '✉️', '📦', '📫', '✏️', '📁', '📅',
      '📌', '📎', '📏', '✂️', '🗑️', '🔒', '🔓', '🔑', '🧲', '🧪', '🧬', '🔭',
      '🔨', '🔧', '⚙️', '🔪', '⚔️', '🛡️', '🔫', '💣', '💉', '💊', '🚬', '⚰️',
      '🚪', '🛏️', '🛋️', '🚽', '🚿', '🛁', '🧻', '🧼', '🧽', '🧴', '🧹', '🧺'
    ],
    symbols: [
      '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '💔', '❣️', '💕', '💖', '💘',
      '☑️', '✅', '✔️', '❌', '✖️', '➗', '➕', '➖', '❕', '❔', '❗', '❓',
      '♾️', '📶', '🔅', '🔆', '🔈', '🔉', '🔊', '🔔', '♻️', '©️', '®️', '™️',
      '♠️', '♥️', '♦️', '♣️', '🃏', '🀄', '💯', '💢', '♨️', '💬', '💭', '💤',
      '⛔', '🚫', '🚳', '🚭', '🚯', '🚱', '🔞', '🔕', '🔇', '🚸', '⚠️', '☢️',
      '⚪', '⚫', '⬜', '⬛', '🔵', '🔴', '🔷', '🔶', '🔺', '🔻', '🔳', '🔲'
    ],
    symbols2: [
      '♿', '🚹', '🚺', '🚻', '🚮', '🚰', '🚾', '🆗', '🆕', '🆓', '🆒', '🆘',
      '⬆️', '➡️', '⬇️', '⬅️', '🔄', '↩️', '↪️', '🔙', '🔚', '🔛', '🔜', '🔝',
      '◀️', '▶️', '⏸️', '⏹️', '⏏️', '⏺️', '🎦', '⏪', '⏩', '🔀', '🔂', '🔁',
      '0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟', '🔠',
      '♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓',
      '🈸', '🉑', '🉐', '㊗️', '㊙️', '🈲', '🈵', '🈹', '🈁', '🈂️', '🈳', '🈯'
    ]
  }),
  methods: {
    // send smiley value to parent components
    addSmiley (catName, i) {
      if (catName === 'people') {
        this.$emit('input', this.people[i - 1])
      } else if (catName === 'animals') {
        this.$emit('input', this.animals[i - 1])
      } else if (catName === 'nature') {
        this.$emit('input', this.nature[i - 1])
      } else if (catName === 'foods') {
        this.$emit('input', this.foods[i - 1])
      } else if (catName === 'activities') {
        this.$emit('input', this.activities[i - 1])
      } else if (catName === 'places') {
        this.$emit('input', this.places[i - 1])
      } else if (catName === 'objects') {
        this.$emit('input', this.objects[i - 1])
      } else if (catName === 'symbols') {
        this.$emit('input', this.symbols[i - 1])
      } else {
        this.$emit('input', this.symbols2[i - 1])
      }
      this.$emit('addSmiley')
    }
  }
}
</script>
