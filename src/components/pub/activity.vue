<template>
  <div
      class="w-1/4 overscroll-contain overflow-y-auto h-screen rounded-xl
      pb-20 fixed flex-col justify-start items-center space-y-2">
    <div class="crw w-full  bg-gray-50 p-2 text-left rounded-xl">
      <h2 class="avv awb awk axq">活动事件</h2>
      <cursor-div :get-key="getKey" :load-data="getActivities"  v-slot="slot">
          <div class="ab ls w-full" v-for="item in slot.list" :key="item.messageId">
            <user-holder :user-id="item.userId" v-slot="user">
              <div class="as aa cb di ls rz yz">
                <div class="tj aig"></div>
              </div>
              <div v-if="this.isMySelf(item.userId)" class="ab ls nx rz uj yu yz ">
                <div class="mz ra adn aie bbo bca"></div>
              </div>
              <template v-else>
                <avatar :user-id="item.userId">
                  <img
                      :src="user.userProfilePhoto"
                      alt="" class="ab w-6 h-6 uj adn ail">
                </avatar>
              </template>
              <div class="flex pl-1 w-11/12 items-start justify-between">
              <div class="flex-col arj avx awj w-5/6 axm cursor-pointer group truncate"
                   @click="this.$router.push(item.messageRedirect)">
                <span v-if="!this.isMySelf(item.userId)" class="avz axq ">{{ user.userNickname }}</span>
                <div class="text-gray-600 truncate">{{
                    item.messageTitle
                  }}
                </div>
                <!--              <div -->
                <!--                   class ="rounded-2xl ring-2 ring-gray-300 p-2">-->
                <!--                -->
                <!--              </div>-->
                <div v-if="item.messageContent != null && item.messageContent.trim().length != 0"
                     class="adb  p-0 bbi  bbs  bgu bgz">
                  <div
                      class="border-l-2 border-indigo-300
                      overflow-hidden cursor-pointer text-xs bg-indigo-50 rounded text-gray-400 outline-0 lp h-auto
                       ti  p-2 focus-visible:outline-0 arl bfy bmx  chv"
                  >{{item.messageContent}}</div>
                </div>
              </div>
              <div class=" arj avx awj axm">{{ this.$simpleFormat(item.messageUpdateTime) }}</div></div>
            </user-holder>


          </div>
      </cursor-div>


      <div class=" ls aaa mt-4" v-if="login"><img
          :src="this.$store.state.user.userProfilePhoto"
          alt="" class="nx rz uj adn ail">
        <form class="ab ui">
          <div class="adb ado asg bbi bbo bbs bca bgu bgz"><label for="comment" class="t">评价活动轨迹</label>
            <textarea rows="2" name="comment" id="comment"
                      class="lp ti xo aev p-2 focus-visible:outline-0 alh arl axq bfy bmx cht chv"
                      placeholder="添加评论..."></textarea></div>
          <div class="aa aj bx ls za arq ath atv">
            <button type="submit" class="adp  aqz arl avv awb axq bbi bbo bbs bca bic">评论</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import activity from '@/util/activity.js'
import {ComboboxLabel} from "@headlessui/vue";
import UserHolder from "@/components/pub/user-holder.vue";
import CursorDiv from "@/components/pub/cursorDiv.vue";
import UserProfile from "@/components/pub/userProfile.vue";
import {mapState} from "vuex";

export default {
  name: 'activity',
  components: {UserProfile, CursorDiv, UserHolder, ComboboxLabel},
  props: {
    userId: {
      type: Number,
      default: null
    }
  },

  data() {
    return {
      messages: [
        {
          userId: 1,
          messageId: 1,
          messageTitle: '向你发来一条心动消息',
          messageContent: '听人说，你也喜欢我，你能做我男朋友吗...',
          messageRedirect: 'https://www.baidu.com',
          messageUpdateTime: '2022-12-06 00:00:00',
          messageType: 1,
          isSaw: 1,
        }
      ],
      cursorPageReq: {
        offset: 0,
        cursor: null,
        pageSize: 10
      },
      cursorPageResp: {
        offset: 0,
        cursor: null,
        isLast: false,
        list: [],
        userId: null,
      },
      totalList: [],
      showList: [],
      pageSize: 20,

      activity: activity
    }
  },
  watch:{



  },
  created() {
    // console.log(this.activity)
    // if (this.login) {
    //   if (this.userId == null) {
    //     this.cursorPageReq.userId = this.$store.state.user.userId
    //   }
    //   this.cursorPageReq.userId = this.userId
    //   this.getActivities()
    // }

  },
  computed: {

    login() {
      return this.$store.state.user != null
    }
  }
  , methods: {

    isMySelf(userId) {
      return this.$store.state.user.userId == userId
    },
    getKey(item) {
      return item.messageId
    },
    async getActivities(cursorPageReq) {
      return await this.$axios.post(`\/message/activity/cursor/list`, cursorPageReq)
      //     .then(res => {
      //   if (res.data.code === 200) {
      //     this.cursorPageResp = res.data.data;
      //     if (this.cursorPageResp.list.length !== 0) {
      //       this.totalList = this.totalList.concat(this.cursorPageResp.list)
      //     }
      //   } else {
      //     this.$st(res.data.data, 'error')
      //   }
      // })

    },
  }

}
</script>


<style scoped>

</style>