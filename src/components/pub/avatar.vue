<template>
  <div @click="showUser" class= "cursor-pointer">
<!--    <div class="hidden lg:visible">-->
    <slot></slot>
<!--  </div>-->
  </div>

</template>

<script>
export default {
  name: 'avatar',
  props: ['userId'],
  methods: {
    showUser() {
      if (this.$store.state.userProfileVisible) {
        this.$store.commit('changeUserProfileVisible', false);
        setTimeout(() => {
          this.$store.commit('changeUserProfileId', this.userId);
          this.$store.commit('changeUserProfileVisible', true);
        }, 300)
      } else {
        this.$store.commit('changeUserProfileId', this.userId);
        this.$store.commit('changeUserProfileVisible', true);
      }


    }
  }

}

</script>

<style>

</style>