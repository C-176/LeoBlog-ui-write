<template>
  <div
      class="w-1/4 overscroll-contain overflow-y-auto h-screen rounded-xl pb-20 fixed flex-col justify-start items-center space-y-2">
    <div class="ado ail bbi bbo bck w-full h-auto  rounded-xl bg-gray-50 ">
      <dl class="ls yo">
        <div class="ui atk auz flex-col justify-start items-center space-y-1 ">
          <div class="rounded-full w-14 h-14 mx-auto overflow-hidden border-2 border-indigo-600 ">
            <img class="w-full h-full" :src="$store.state.user.userProfilePhoto" alt="">
          </div>
          <div>
            <div class="">
              <dt class="avv awb awk axq">余额</dt>
              <div class="flex items-center justify-center">
                <icon src="sayrryhe" trigger="loop"/>
                <span class="text-gray-600">   {{ myMoney }} </span>
              </div>
            </div>
            <div class="uj acx arf auw">
              <dt class="t">Status</dt>
              <dd class="adp ajc aqy ark avx avz axt bbo bbs bcn">Paid</dd>
            </div>
          </div>
        </div>
        <div class="lf ls ti uj aab afh afx arf auz">
          <dt class="uj"><span class="t">Client</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
                 class="nx rw axk">
              <path fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z"
                    clip-rule="evenodd"></path>
            </svg>
          </dt>
          <dd class="avv avz awk axq">{{ $store.state.user.userNickname }}</dd>
        </div>
        <div class="lc ls ti uj aab arf">
          <dt class="uj"><span class="t">生日</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
                 class="nx rw axk">
              <path
                  d="M5.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H6a.75.75 0 01-.75-.75V12zM6 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H6zM7.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H8a.75.75 0 01-.75-.75V12zM8 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H8zM9.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V10zM10 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H10zM9.25 14a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V14zM12 9.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V10a.75.75 0 00-.75-.75H12zM11.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75V12zM12 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H12zM13.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H14a.75.75 0 01-.75-.75V10zM14 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H14z"></path>
              <path fill-rule="evenodd"
                    d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z"
                    clip-rule="evenodd"></path>
            </svg>
          </dt>
          <dd class="avv awk axm">
            <time datetime="2023-01-31">{{ $moments($store.state.user.userBirthday, 'Y-M-D') }}</time>
          </dd>
        </div>
        <div class="lc ls ti uj aab arf">
          <dt class="uj"><span class="t">Status</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
                 class="nx rw axk">
              <path fill-rule="evenodd"
                    d="M2.5 4A1.5 1.5 0 001 5.5V6h18v-.5A1.5 1.5 0 0017.5 4h-15zM19 8.5H1v6A1.5 1.5 0 002.5 16h15a1.5 1.5 0 001.5-1.5v-6zM3 13.25a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zm4.75-.75a.75.75 0 000 1.5h3.5a.75.75 0 000-1.5h-3.5z"
                    clip-rule="evenodd"></path>
            </svg>
          </dt>
          <dd class="avv awk axm">Paid with MasterCard</dd>
        </div>
      </dl>
      <div class="lf afh afx arf arz"><a href="#" class="avv awb awk axq">Download receipt <span
          aria-hidden="true">→</span></a></div>
    </div>

  </div>
</template>
<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "account",
  data() {
    return {
      myMoney: 0
    }
  },
  methods: {
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
  }
})
</script>


<style scoped>

</style>