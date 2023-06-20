<template>
  <bread>联系我们</bread>
  <MyCompostion>
    <section class="relative z-10  h-5/6 bg-white py-20 lg:py-[120px]">
      <div class="w-full mx-auto overflow-hidden text-left">
        <div class="-mx-4 flex flex-wrap lg:justify-between">
          <div class="w-full px-4 lg:w-1/2 xl:w-6/12">
            <div class="mb-12 p-4 lg:p-0 max-w-[570px] lg:mb-0">
              <h2
                  class="text-dark mb-6 text-[32px] font-bold uppercase sm:text-[40px] lg:text-[36px] xl:text-[40px]"
              >
                联系我们
              </h2>

              <div class="mb-8 flex w-full max-w-[370px]  space-x-2">
                <icon src="osuxyevn" trigger="loop"></icon>
                <div class="w-full">
                  <h4 class="text-dark mb-1 text-xl font-bold">地址</h4>
                  <p class="text-body-color text-base">
                    江苏省南京市栖霞区文苑路9号南京邮电大学仙林校区
                  </p>
                </div>
              </div>
              <div class="mb-8 flex w-full max-w-[370px] space-x-2">
                <icon src="ssvybplt" trigger="loop"></icon>
                <div class="w-full">
                  <h4 class="text-dark mb-1 text-xl font-bold">电话</h4>
                  <p class="text-body-color text-base">(+86)176 *** *** 3323</p>
                </div>
              </div>
              <div class="mb-8 flex w-full max-w-[370px] space-x-2">
                <icon src="diihvcfp" trigger="loop"></icon>

                <div class="w-full">
                  <h4 class="text-dark mb-1 text-xl font-bold">电子邮箱</h4>
                  <p class="text-body-color text-base">RTG1999@163.com</p>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full px-4 lg:w-1/2 xl:w-5/12">
            <div class="relative rounded-lg bg-white p-8 shadow-lg sm:p-12">

              <div class="mb-6">
                <input
                    v-model="name"
                    type="text"
                    placeholder="你的名字"
                    class="input"
                    required
                >
              </div>
              <div class="mb-6">
                <input
                    v-model="email"
                    type="email"
                    placeholder="电子邮箱"
                    class="input "
                    required
                />
              </div>
              <div class="mb-6">
                <input
                    v-model="phone"
                    type="text"
                    placeholder="手机"
                    class="input"
                    required
                />
              </div>
              <div class="mb-6">
              <textarea
                  v-model="message"
                  rows="6"
                  placeholder="你的问题"
                  class="input"
                  required
              ></textarea>
              </div>
              <div>
                <button class="button w-full mx-auto" @click="sendMsg">提交</button>
              </div>


            </div>
          </div>
        </div>
      </div>
    </section>
  </MyCompostion>

</template>

<script>
import MyCompostion from "@/components/pub/MyCompostion.vue";

export default {
  name: "contact",
  components: {MyCompostion},
  data() {
    return {
      name: '',
      phone: '',
      email: '',
      message: '',
    }
  },
  methods: {
    sendMsg() {
      this.$axios.post('/api/contact', {
        name: this.name,
        phone: this.phone,
        email: this.email,
        message: this.message,
      }).then(res => {
        if (res.code === 200) {
          this.$st('提交成功', 'success')
        } else {
          this.$st('提交失败', 'error')
        }
      })

    }
  }
}


</script>

<style scoped>

</style>