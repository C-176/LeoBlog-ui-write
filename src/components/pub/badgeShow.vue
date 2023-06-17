<template>
  <MyCompostion>
      <div class="w-2/3 mx-auto bg-white py-24 sm:py-32">
        <div class="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
          <div class="max-w-2xl">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">徽章展馆</h2>
            <p class="mt-6 text-lg leading-8 text-gray-600">Libero fames augue nisl porttitor nisi, quis. Id ac elit
              odio vitae elementum enim vitae ullamcorper suspendisse.</p>
            <div class="flex items-center justify-center">
              <icon src="sayrryhe" trigger="loop"/>
              <span class="text-gray-600">
                    剩余: {{ myMoney }}
                  </span>
            </div>
          </div>
          <ul role="list" class="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
            <li v-for="badge in badges" :key="badge.badgeId">
              <div class="flex items-center gap-x-6 ">
                <badge @click="showBadge(badge)" :badge-src="badge.badgeIcon" :size="100"></badge>
                <div>
                  <h3 class="text-base font-semibold leading-7 tracking-tight text-gray-900"
                      :class="{
                                'animate-ring': badge.badgeType === 1,
                                'text-red-300': badge.badgeType === 1,
                            }">
                    {{ badge.badgeName }}</h3>
                  <p class="text-sm font-semibold leading-6 text-indigo-600">{{ badge.badgeValue }}</p>
                </div>
                <div v-if="!hasKey(badge)" class="button cursor-pointer" @click="purchase(badge)">
                  {{ badge.badgeType == 1 ? '抢购限量徽章' : '购买' }}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
  </MyCompostion>


  <!--  <transition appear-->
  <!--              appear-active-class="ease-in-out duration-3000 transition-all"-->
  <!--              appear-to-class="translate-x-0 "-->
  <!--              appear-from-class="translate-x-80 ">-->

  <!--    <div :class="{-->

  <!--    // 'translate-x-0 ': visible-->
  <!--  }" v-if=false class=" relative z-10  " aria-labelledby="slide-over-title" role="dialog" aria-modal="true">-->
  <!--      &lt;!&ndash;-->
  <!--        Background backdrop, show/hide based on slide-over state.-->

  <!--        Entering: "ease-in-out duration-500"-->
  <!--          From: "opacity-0"-->
  <!--          To: "opacity-100"-->
  <!--        Leaving: "ease-in-out duration-500"-->
  <!--          From: "opacity-100"-->
  <!--          To: "opacity-0"-->
  <!--      &ndash;&gt;-->
  <!--      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>-->

  <!--      <div class="fixed inset-0 overflow-hidden-->
  <!--     ">-->
  <!--        <div class="absolute inset-0 overflow-hidden">-->

  <!--          <div class=" pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 mt-14">-->
  <!--            &lt;!&ndash;-->
  <!--              Slide-over panel, show/hide based on slide-over state.-->

  <!--              Entering: "transform transition ease-in-out duration-500 sm:duration-700"-->
  <!--                From: "translate-x-full"-->
  <!--                To: "translate-x-0"-->
  <!--              Leaving: "transform transition ease-in-out duration-500 sm:duration-700"-->
  <!--                From: "translate-x-0"-->
  <!--                To: "translate-x-full"-->
  <!--            &ndash;&gt;-->
  <!--            <div class="pointer-events-auto relative w-screen max-w-md">-->
  <!--              &lt;!&ndash;-->
  <!--                Close button, show/hide based on slide-over state.-->

  <!--                Entering: "ease-in-out duration-500"-->
  <!--                  From: "opacity-0"-->
  <!--                  To: "opacity-100"-->
  <!--                Leaving: "ease-in-out duration-500"-->
  <!--                  From: "opacity-100"-->
  <!--                  To: "opacity-0"-->
  <!--              &ndash;&gt;-->
  <!--              <div class="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">-->
  <!--                <button type="button" @click="visible = false"-->
  <!--                        class="rounded-md bg-indigo-600  text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">-->
  <!--                  <span class="sr-only">Close panel</span>-->
  <!--                  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"-->
  <!--                       aria-hidden="true">-->
  <!--                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>-->
  <!--                  </svg>-->
  <!--                </button>-->
  <!--              </div>-->

  <!--              <div class="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">-->
  <!--                <div class="px-4 sm:px-6">-->
  <!--                  <h2 class="text-base font-semibold leading-6 text-gray-900" id="slide-over-title">Panel title</h2>-->
  <!--                </div>-->
  <!--                <div class="relative mt-6 flex-1 px-4 sm:px-6">-->
  <!--                  &lt;!&ndash; Your content &ndash;&gt;-->
  <!--                  <button-->
  <!--                      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all duration-500 ease-in-out">-->
  <!--                    点击我-->
  <!--                  </button>-->

  <!--                </div>-->
  <!--              </div>-->
  <!--            </div>-->
  <!--          </div>-->

  <!--        </div>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--  </transition>-->
  <my-modal :visible="visible" @closeModal="visible=false">

    <div class="relative flex w-full items-center overflow-hidden bg-white  sm:px-2 sm:pt-2 p-3">
      <div class="grid w-full grid-cols-1 items-start gap-x-6 gap-y-6 sm:grid-cols-12 lg:gap-x-8">
        <div
            class="flex justify-center aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
          <!--                    <badge :badge-src="focusBadge.badgeIcon" :size="300"></badge>-->
          <lottie-player ref="lottie" autoplay loop mode="normal" style="width: 320px">
          </lottie-player>
        </div>
        <div class="sm:col-span-8 lg:col-span-7">
          <h2 class="text-2xl font-bold text-gray-900 sm:pr-12">{{ focusBadge.badgeName }}</h2>

          <section aria-labelledby="information-heading" class="mt-2">
            <h3 id="information-heading" class="sr-only">Product information</h3>

            <p class="text-2xl text-gray-900">${{ focusBadge.badgeValue }}</p>


          </section>

          <section aria-labelledby="options-heading" class="mt-10">

            <form>
              <!-- Colors -->
              <div>
                <h4 class="text-sm font-medium text-gray-900">描述</h4>
                <div>{{ focusBadge.badgeDescription }}</div>
              </div>

              <!-- Sizes -->
              <div class="mt-10">
                <div class="flex items-center justify-between">
                  <h4 class="text-sm font-medium text-gray-900">属性</h4>
                </div>
                <fieldset class="mt-4">
                  <legend class="sr-only">Choose a size</legend>
                  <div class="grid grid-cols-4 gap-4">
                    <!-- Active: "ring-2 ring-indigo-500" -->
                    <label
                        class="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 cursor-pointer bg-white text-gray-900 shadow-sm">
                      <input type="radio" name="size-choice" value="XXS"
                             class="sr-only" aria-labelledby="size-choice-0-label">
                      <span id="size-choice-0-label">{{
                          focusBadge.badgeType == 1 ? '限量' : '非限量'
                        }}</span>
                      <span class="pointer-events-none absolute -inset-px rounded-md"
                            aria-hidden="true"></span>
                    </label>

                  </div>
                </fieldset>
              </div>

              <button type="submit"
                      v-if="!hasKey(focusBadge)"
                      class="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                购买徽章
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  </my-modal>

  <bg-cover :show-cover="visible"></bg-cover>


</template>


<script>
import Badge from "@/components/pub/badge.vue";
import MyModal from "@/components/pub/myModal.vue";
import bgCover from "@/components/pub/bgCover.vue";

export default {
  name: "badgeShow",
  components: {MyModal, Badge, bgCover},
  data() {
    return {
      lottie: null,
      visible: false,
      badges: [{
        badgeId: 0,
        badgeName: '',
        badgeDescription: '',
        badgeIcon: '',
        badgeValue: 1,
        badgeType: 1
      }, {}],
      focusBadge: {},
      owns: [1, 2],
      myMoney: 0
    }
  },
  mounted() {
    this.getBadges()
    this.getMyBadges()
    this.getMyMoney()
    this.lottie = this.$refs.lottie
  }
  ,
  methods: {
    showBadge(badge) {
      this.visible = true
      this.focusBadge = badge
      try {
        this.lottie.load(this.focusBadge.badgeIcon);
      } catch (e) {
        console.error(e)
      }


    },


    getMyMoney() {
      let userId = this.$store.state.user.userId
      this.$axios.get(`/account/${userId}`).then(res => {
        if (res.data.code === 200) {
          this.myMoney = res.data.data.userMoney
        } else {
          this.$st("error", res.data.data)
        }
      })
    }
    ,
    hasKey(badge) {
      return this.owns.includes(badge.badgeId)
    }
    ,
    getMyBadges() {
      let userId = this.$store.state.user.userId
      this.$axios.get(`/badge/user/${userId}`).then(res => {
        if (res.data.code === 200) {
          this.owns = res.data.data
        } else {
          this.$st("error", res.data.data)
        }
      })
    },
    getBadges() {
      this.$axios.get('/badge/all').then(res => {
        if (res.data.code === 200) {
          this.badges = res.data.data
        } else {
          this.$st("error", res.data.data)
        }
      })
    },
    purchase(badge) {
      let badgeType = badge.badgeType
      let badgeId = badge.badgeId
      let url = badgeType === 0 ? `/badge/buy/${badgeId}` : `/badge/buy/limited/${badgeId}`
      if (badgeType === 0) {
        // 获取用户ID
        this.$axios.post(url).then(res => {
          if (res.data.code === 200) {
            this.$st(res.data.data, "success")
            // 刷新徽章和余额
            this.getMyBadges()
            this.getMyMoney()

          } else {
            this.$st(res.data.data, "error")
          }
        })
      }

    },
  }
}

</script>

<style scoped>

</style>