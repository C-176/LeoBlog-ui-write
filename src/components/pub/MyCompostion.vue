<template>
  <div class="w-full h-full flex justify-center space-x-2 items-start">

    <div class=" flex-col justify-center w-full text-center  items-center"
         :class="{
      'md:w-2/3':size,
      'w-full':!size
    }">
      <slot></slot>
    </div>
    <div v-if="slider" class="md:w-1/4 h-full ">
      <slot name="slider"></slot>
    </div>
  </div>
  <a-back-top/>

</template>
<script>
import Account from "@/components/pub/account.vue";
import articleShow from "@/components/pub/articleShow.vue";

export default {
  name: "MyCompostion",
  components: {},
  props: {
    slider: {
      type: Boolean,
      default: false,
    },
    size: {
      type: Boolean,
      default: true
    }

  },
  data() {
    return {};
  },
  created() {
  },
  methods: {}
};
</script>


<style scoped>

</style>