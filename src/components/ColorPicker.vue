<template>
  <v-color-picker
    v-model="color"
    :swatches="colors"
    disabled
    show-swatches
    hide-canvas
    hide-inputs
    hide-mode-switch
  ></v-color-picker>
</template>

<script>
export default {
  mounted () {
    this.color = this.$session.get('colorApp')
    setTimeout(() => { this.set = true }, 0)
  },
  data: () => ({
    set: false,
    color: '#512DA8',
    colors: [
      ['#4ADF3E', '#13CF13', '#4CAF50'],
      ['#20CEF5', '#00ACEE', '#3B5998'],
      ['#FFC300', '#FF7E29', '#FF6306'],
      ['#E68585', '#FA3C4C', '#F44336'],
      ['#FF5CA1', '#CE1980', '#512DA8']
    ]
  }),
  watch: {
    color: function () {
      if (this.set) {
        this.$emit('input', this.color)
        this.$emit('update-color')
      }
    }
  }
}

</script>
