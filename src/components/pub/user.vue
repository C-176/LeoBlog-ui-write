<template>
<!--  <a-popover>-->
<!--    <template #title>-->
<!--    <div class="p-4 bg-white shadow-lg rounded-2xl w-80 dark:bg-gray-800">-->
<!--      <div class="flex flex-row items-start gap-4">-->
<!--        <img :src="p(userx.userProfilePhoto)" class="rounded-lg w-28 h-28"/>-->
<!--        <div class="flex flex-col justify-between w-full h-28">-->
<!--          <div>-->
<!--            <p class="text-xl font-medium text-gray-800 dark:text-white">-->
<!--              {{userx.userNickname}}-->
<!--            </p>-->
<!--            <p class="text-xs text-gray-400">-->
<!--              {{userx.userIntro}}-->
<!--            </p>-->
<!--          </div>-->
<!--&lt;!&ndash;          <div class="w-full p-2 bg-blue-100 rounded-lg dark:bg-white">&ndash;&gt;-->
<!--&lt;!&ndash;            <div class="flex items-center justify-between text-xs text-gray-400 dark:text-black">&ndash;&gt;-->
<!--&lt;!&ndash;              <p class="flex flex-col">&ndash;&gt;-->
<!--&lt;!&ndash;                Articles&ndash;&gt;-->
<!--&lt;!&ndash;                <span class="font-bold text-black dark:text-indigo-500">&ndash;&gt;-->
<!--&lt;!&ndash;                            34&ndash;&gt;-->
<!--&lt;!&ndash;                        </span>&ndash;&gt;-->
<!--&lt;!&ndash;              </p>&ndash;&gt;-->
<!--&lt;!&ndash;              <p class="flex flex-col">&ndash;&gt;-->
<!--&lt;!&ndash;                Followers&ndash;&gt;-->
<!--&lt;!&ndash;                <span class="font-bold text-black dark:text-indigo-500">&ndash;&gt;-->
<!--&lt;!&ndash;                            455&ndash;&gt;-->
<!--&lt;!&ndash;                        </span>&ndash;&gt;-->
<!--&lt;!&ndash;              </p>&ndash;&gt;-->
<!--&lt;!&ndash;              <p class="flex flex-col">&ndash;&gt;-->
<!--&lt;!&ndash;                Rating&ndash;&gt;-->
<!--&lt;!&ndash;                <span class="font-bold text-black dark:text-indigo-500">&ndash;&gt;-->
<!--&lt;!&ndash;                            9.3&ndash;&gt;-->
<!--&lt;!&ndash;                        </span>&ndash;&gt;-->
<!--&lt;!&ndash;              </p>&ndash;&gt;-->
<!--&lt;!&ndash;            </div>&ndash;&gt;-->
<!--&lt;!&ndash;          </div>&ndash;&gt;-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="flex items-center justify-between gap-4 mt-6">-->
<!--        <button type="button" @click="talk" class="w-1/2 px-4 py-2 text-base bg-white border rounded-xl text-grey-500 hover:bg-gray-200 ">-->
<!--          私信-->
<!--        </button>-->
<!--        <button type="button" @click="follow" class="w-1/2 px-4 py-2 text-base text-white bg-indigo-600 border rounded-xl hover:bg-indigo-500 ">-->
<!--          关注-->
<!--        </button>-->
<!--      </div>-->
<!--    </div>-->




<!--&lt;!&ndash;      &ndash;&gt;-->
<!--&lt;!&ndash;      <a-card hoverable style="width: 300px;">&ndash;&gt;-->
<!--&lt;!&ndash;        <template #cover>&ndash;&gt;-->
<!--&lt;!&ndash;          <img&ndash;&gt;-->
<!--&lt;!&ndash;              alt="pic"&ndash;&gt;-->
<!--&lt;!&ndash;              :src="p(userx.userBgPic)"&ndash;&gt;-->
<!--&lt;!&ndash;              style="width: 100%;"&ndash;&gt;-->
<!--&lt;!&ndash;          />&ndash;&gt;-->
<!--&lt;!&ndash;        </template>&ndash;&gt;-->
<!--&lt;!&ndash;        <template #actions>&ndash;&gt;-->
<!--&lt;!&ndash;          <plus-outlined key="setting"/>&ndash;&gt;-->
<!--&lt;!&ndash;          <message-outlined key="edit" @click="talk"/>&ndash;&gt;-->
<!--&lt;!&ndash;          <ellipsis-outlined key="ellipsis"/>&ndash;&gt;-->
<!--&lt;!&ndash;        </template>&ndash;&gt;-->
<!--&lt;!&ndash;        <a-card-meta :description="userx.userCertification" :title="userx.userNickname">&ndash;&gt;-->
<!--&lt;!&ndash;          <template #avatar>&ndash;&gt;-->
<!--&lt;!&ndash;            <a-avatar :src="p(userx.userProfilePhoto)"&ndash;&gt;-->
<!--&lt;!&ndash;                      :style="{backgroundColor:'#067061'}"&ndash;&gt;-->
<!--&lt;!&ndash;            >{{ userx.userNickname }}&ndash;&gt;-->
<!--&lt;!&ndash;            </a-avatar>&ndash;&gt;-->
<!--&lt;!&ndash;          </template>&ndash;&gt;-->
<!--&lt;!&ndash;        </a-card-meta>&ndash;&gt;-->
<!--&lt;!&ndash;      </a-card>&ndash;&gt;-->
<!--    </template>-->
<!--    -->
<!--  </a-popover>-->
  <slot  :photo="userx.userProfilePhoto" :text="userx.userNickname"></slot>
</template>

<script>
import {EllipsisOutlined, MessageOutlined, PlusOutlined} from '@ant-design/icons-vue';

export default {
  name: "user",
  props: ["user", "userId"],
  components: {
    PlusOutlined,
    MessageOutlined,
    EllipsisOutlined,
  }, data() {
    return {
      userx: {},
    }
  },
  methods: {
    follow() {
      this.$st('你没有资格关注别人\n因为你长的太丑', 'error')
    },
    talk() {
      this.$axios.get(this.baseURL + '/chat/connect/' + this.$store.state.user.userId + '/' + this.userx.userId).then(res => {
        if (res.data.code === 200) {
          this.$store.commit('changeAddChat', this.userx.userId);
          this.$store.commit('changeChatVisible', true)

        } else {
          this.$st(res.data.data, "error")
        }
      })

    },
  },
  watch: {
    userx: {
      handler: function (val, oldVal) {
        this.userx = val
      },
      deep: true
    }
  },
  beforeMount() {
    if (this.user == undefined && this.userId != null && this.userId != undefined) {
      // this.$store.dispatch('getUserById', this.userId).then(res =>
      //     //获取promise中的信息
      //     console.log(res)
      // )
      // console.log(this.userx)
      if (this.userId == -1) {
        this.userx = this.$store.state.user
        return
      }
      this.$axios.get(this.baseURL + '/user/' + this.userId).then(res => {
        if (res.data.code === 200) {
          this.userx = res.data.data
        } else {
          // console.log(res.data.data, this.userId)
          this.$st(res.data.data, "error")
        }
      })
    } else {
      this.userx = this.user
    }

  }

}
</script>

<style scoped>
:deep(.ant-popover-inner-content) {
  padding: 0 !important;
}

/*body {*/
/*  display: flex;*/
/*  justify-content: center;*/
/*  align-items: center;*/
/*  min-height: 100vh;*/
/*  background: linear-gradient(45deg, #fbda61, #ff5acd);*/
/*}*/

.card {
  position: relative;
  width: 300px;
  height: 180px;
  /* height: 450px; */
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 35px 80px rgba(0, 0, 0, 0.15);
  transition: all 0.5s;
}

.card:hover {
  height: 450px;
  transition: height 2s !important;
}

.imgBx {
  position: absolute;
  left: 50%;
  top: -50px;
  transform: translateX(-50%);
  width: 150px;
  height: 150px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.35);
  overflow: hidden;
  transition: all 0.5s;
}

.card:hover .imgBx {
  width: 250px;
  height: 250px;
}

.imgBx img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: #066f60;
}

.card .content {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  overflow: hidden;
}

.card .content .details {
  padding: 40px;
  text-align: center;
  width: 100%;
  transition: all 0.5s;
  transform: translateY(150px);
}

.card:hover .content .details {
  transform: translateY(0px);
}

.card .content .details h2 {
  font-size: 1.25em;
  font-weight: 600;
  color: #555;
  line-height: 1.2em;
}

.card .content .details h2 span {
  font-size: 0.75em;
  font-weight: 500;
  opacity: 0.5;
}

.card .content .details .data {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
}

.card .content .details .data h3 {
  font-size: 1em;
  color: #555;
  line-height: 1.2em;
  font-weight: 600;
}

.card .content .details .data h3 span {
  font-size: 0.85em;
  font-weight: 400;
  opacity: 0.5;
}

.card .content .details .actionBtn {
  display: flex;
  justify-content: space-between;
}

.card .content .details .actionBtn button {
  padding: 10px 30px;
  border-radius: 5px;
  border: none;
  outline: none;
  font-size: 1em;
  font-weight: 500;
  background: #ff5f95;
  color: #fff;
  cursor: pointer;
}

.card .content .details .actionBtn button:nth-child(2) {
  border: 1px solid #999;
  color: #999;
  background: #fff;
}
</style>