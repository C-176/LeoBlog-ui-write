<template>
  <bread>视频外链</bread>
  <!--  <template v-if="loading">-->
  <!--    <a-skeleton active/>-->
  <!--    <a-skeleton active/>-->
  <!--    <a-skeleton active/>-->
  <!--  </template>-->

  <!--  <template v-else>-->
  <div v-loading="loading" class="">
    <iframe :src="'https://'+add.replaceAll('*','/')" class="fixed left-0 w-screen h-screen "></iframe>
    <!--  </template>--></div>
</template>

<script>
export default {
  name: "video",
  data() {
    return {
      loading: true,
      add: '',

    };
  },
  beforeMount() {
    this.add = this.$route.params.add
    this.loading = false
  }
}
</script>

<style scoped>

</style>