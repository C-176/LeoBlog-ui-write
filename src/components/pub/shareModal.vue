<template>
  <div @click="$emit('close')"
      class="h-screen fixed inset-0 z-20 w-screen   flex items-center justify-center">
    <!--MODAL ITEM-->
    <div class="bg-white shadow-2xl relative w-full mx-4 p-4 rounded-xl lg:w-1/3">
      <!--MODAL HEADER-->
      <div
          class="flex justify-between items center border-b border-gray-200 py-3"
      >
        <div class="flex items-center justify-center">
          <p class="text-xl font-bold text-gray-800">分享</p>
        </div>

      </div>
      <a-tooltip id="close" class="absolute top-2 right-2" title="关闭">
        <button class="rounded-xl z-20 text-white h-8 w-8 text-center bg-indigo-600 hover:bg-indigo-500"
                @click="close">
          ✖
        </button>
      </a-tooltip>

      <!--MODAL BODY-->
      <div class="my-4">
        <p class="text-sm" @click="close">通过以下途径分享</p>

        <div class="flex justify-around my-4">

          <!--BOX LINK-->
          <div class="border-2 border-gray-200 flex justify-between items-center pr-2 mt-4 py-2">
            <div class="w-full outline-none bg-transparent">
              {{ href }}

              <button class="button w-1/3 " @click="copyLink(this.href)">
                复制
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!--    </transition>-->
</template>

<script>
import useClipboard from "vue-clipboard3";
import MyModal from '@/components/pub/myModal.vue'

export default {
  name: "shareModal",
  components: {
    MyModal,
  },
  props: {
    showShare: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      href: ""
    };
  },
  created() {
    this.href = window.location.href;
  },

  methods: {
    async copyLink(text) {
      const {toClipboard} = useClipboard();
      //将文字复制到剪贴板
      try {
        await toClipboard(text);  //实现复制
        this.$st("复制成功", 'success')
      } catch (e) {
        console.error(e);
      }


    },
    close() {
      this.$emit("close");
    },
  },


}
</script>

<style scoped>

.fade-enter-active, .fade-leave-active {
  transition: opacity .0s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>