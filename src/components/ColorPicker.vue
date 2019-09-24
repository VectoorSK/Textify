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
  data: () => ({
    color: '#512DA8',
    colors: [
      ['#4adf3e', '#13cf13', '#4caf50'],
      ['#20cef5', '#00acee', '#3b5998'],
      ['#ffc300', '#ff7e29', '#ff6306'],
      ['#e68585', '#fa3c4c', '#f44336'],
      ['#ff5ca1', '#ce1980', '#512da8']
    ]
  }),
  watch: {
    color: function () {
      this.$emit('input', this.color)
    }
  }
}

</script>
