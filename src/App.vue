<template>
    <router-view></router-view>
</template>

<script>

export default {
  name: 'App',
  components: {

  },
  created() {
    document.getElementsByTagName('body')[0].className += 'loaded'
    if(document.getElementsByClassName('loader')[0] !== undefined) {
      document.getElementsByClassName('loader')[0].remove()
    }
  },

}
</script>

<style>

</style>
