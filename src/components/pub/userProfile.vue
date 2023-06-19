<template>
  <div
      :class="{
    'translate-x-full ': !visible,
    'translate-0': visible
  }" class="z-50 u  z an cz lg:flex hidden text-left tw atb cfz ease-in-out transition duration-500">
    <div class="v tz w-screen vr" id="headlessui-dialog-panel-11" data-headlessui-state="open">
      <div class="ls pc ym adf alj bbj">
        <div class="ard arz ces">
          <div class="ls ys za">
            <div class="jr ls nz yu">
              <button type="button" @click="toggle"
                      class="adp alj axk bks bmz bnl"><span class="t">Close panel</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor" aria-hidden="true" class="nx rz">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <h2 id="slide-over-heading" class="avt awb awk axq">个人详情</h2>

          </div>
        </div>
        <div>
          <div class="asd cfu">
            <div>
              <div class="ab ns bxw">
                <img class="aa pc ti apz"
                     :src="userx.userProfilePhoto"
                     alt="">
              </div>
              <div class="lf ard bxd bxh cax ces">
                <div class="bzn">
                  <div>
                    <div class="ls yu"><h3 class="avw avy axq chl">{{ userx.userNickname }}</h3><span
                        class="jp lq nh rj uk adn aja"><span class="t">Online</span></span></div>
                    <p class="avv axm">@{{ userx.userId }}</p></div>
                  <div class="le ls yo abq ccc cch">
                    <button type="button"
                            @click="chat"
                            class="lt ti uk yu yz adp ajm ara arq avv awb bac bbi bin bot bou bow bpf bzn">私信
                    </button>
                    <button type="button" class="lt ti uh yu yz adp alj ara arq avv awb axq bbi bbo bbs bca bic">Call
                    </button>
                    <div class="jr lt bvt">
                      <div class="ab lq avf" data-headlessui-state="">
                        <button class="lt yu adp alj aql axk bbi bbo bbs bca bic" id="headlessui-menu-button-12"
                                type="button" aria-haspopup="menu" aria-expanded="false"
                                data-headlessui-state=""><span
                            class="t">Open options menu</span>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                               aria-hidden="true" class="nu rw">
                            <path
                                d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="ard asq auy cei cgp">
            <dl class="abu ard ccm ces">
              <div>
                <dt class="avv avz axm byq bzq">个人介绍</dt>
                <dd class="kp avv axq btv"><p>{{
                    userx.userIntro
                  }}</p></dd>
              </div>
              <div>
                <dt class="avv avz axm byq bzq">地点</dt>
                <dd class="kp avv axq btv">{{ userx.userPos }}</dd>
              </div>
              <div>
                <dt class="avv avz axm byq bzq">行业</dt>
                <dd class="kp avv axq btv">{{ userx.userIndustry }}</dd>
              </div>
              <div>
                <dt class="avv avz axm byq bzq">生日</dt>
                <dd class="kp avv axq btv">
                  <time datetime="1988-06-23">{{ this.$moments(userx.userBirthday, 'Y-M-D') }}</time>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>


export default {
  name: 'userProfile',
  props: {},

  data() {
    return {
      visible: true,
      userx: {
        userId: 0,
        userNickname: '',
        userIntroduction: '',
        userBirthday: '',
        userIndustry: '',
        userPos: '',
        userProfilePhoto: '',

      }
    }
  },
  computed: {
    visible() {
      return this.$store.state.userProfileVisible
    },
    userId() {
      return this.$store.state.userProfileId
    },


  },
  watch: {
    userId(val) {
      this.$store.dispatch('getUserById', val).then(res => {
        this.userx = res
      })

    }

  },
  methods: {
    toggle() {
      this.$store.commit('changeUserProfileVisible', false)
      // this.$emit('close')
    },
    chat() {
      this.$axios.get(this.baseURL + '/chat/connect/' + this.$store.state.user.userId + '/' + this.userx.userId).then(res => {
        if (res.data.code === 200) {
          this.$store.commit('changeAddChat', this.userx.userId);
          this.$store.commit('changeChatVisible', true)
          this.$store.commit('changeUserProfileVisible', false)
        } else {
          this.$st(res.data.data, "error")
        }
      })

    }


  },
  mounted() {
    this.$store.dispatch('getUserById', this.userId).then(res => {
      this.userx = res
    })
  }
}
</script>


<style scoped>

</style>