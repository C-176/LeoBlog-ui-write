<template>
  <MyCompostion :slider=true :size="true">
    <div class="p-2">
      <div class="text-left text-xl font-bold">徽章展馆</div>
      <div class="text-left text-sm">购买过的徽章可以选择在个人头像旁显示</div>
      <div class="gs tv ard asa ces dcx">
        <ul role="list" class="lw yd aab aar cak cbp cyj dkq ">
          <li class="ab bg-white hover:bg-gray-50 rounded-xl transition duration-300 group" v-for="badge in badges"
              :key="badge.badgeId">
            <div class="bpw h j lp ti adb ado  bgu bgy bhc bhd  group-hover:opacity-75 flex items-center justify-center">
              <badge @click="showBadge(badge)" :badge-src="badge.badgeIcon" :size="150"></badge>
            </div>

            <p class="u kw lp adg avv avz axq">{{ badge.badgeName }}</p>
            <p class="u lp avv avz axm">{{ badge.badgeValue }}</p></li>

        </ul>
      </div>
    </div>
    <template #slider>
      <account></account>
    </template>
  </MyCompostion>
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

              <div
                  @click="purchase(focusBadge)"
                  :class="{
                    'cursor-not-allowed opacity-50': focusBadge.badgeType === 1,
                  }"
                  class="mt-6 cursor-pointer flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                {{hasKey(focusBadge) ? '已拥有' : '购买'}}
              </div>
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
import Account from "@/components/pub/account.vue";
import MyCompostion from "@/components/pub/MyCompostion.vue";

export default {
  name: "badgeShow",
  components: {MyCompostion, Account, MyModal, Badge, bgCover},
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
      if(this.hasKey(badge)){
        this.$st("已拥有","error")
        return
      }
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
      }else{
        this.$st("暂未开放","error")
      }


    },
  }
}

</script>

<style scoped>

</style>