<template>
  <div class="whole">
    <card></card>
  </div>

</template>

<script>
import card from "@/components/pub/card";

export default {
  name: "team",
  components: {
    card,
  },
}
</script>

<style scoped>

.whole {
  background: #fff;
  /*float: left;*/
  width: 55%;
  margin-left: calc(22.5%);
  border-radius: 5px;
  padding: 10px;
  margin-top: 60px;


}
</style>