<template>
  <lord-icon
      :class=class1
      :src="'https://cdn.lordicon.com/'+src+'.json'"
      :trigger=trigger
      :colors=colors
      :stroke=stroke
      :state=state
      :style="'width:'+size+'px;height:'+size+'px'">
  </lord-icon>
</template>

<script>
export default {
  name: "icon",
  props: {
    src: {
      type: String,
      default: "default"
    },
    size: {
      type: Number,
      default: 32
    },
    stroke: {
      type: String,
      default: "100"
    },
    colors: {
      type: String,
      default: "primary:#4f46e5,secondary:#4be1ec"
    },
    trigger: {
      type: String,
      default: "loop-on-hover"
    },
    class1: {
      type: String,
      default: ""
    },
    state: {
      type: String,
      default: ""
    }
  }
}
</script>

<style scoped>

</style>