<template>
  <a-popover>


    <template #content>
      <!--      <div class="card">-->
      <!--        <div class="imgBx">-->
      <!--          <img :src="p(userx.userProfilePhoto)" :alt="userx.userNickname">-->
      <!--&lt;!&ndash;          <a-avatar&ndash;&gt;-->
      <!--&lt;!&ndash;              shape="circle"&ndash;&gt;-->
      <!--&lt;!&ndash;              size="middle"&ndash;&gt;-->
      <!--&lt;!&ndash;              :src="p(userx.userProfilePhoto)"&ndash;&gt;-->
      <!--&lt;!&ndash;              :style="{ backgroundColor: '#067061'  ,verticalAlign: 'middle' ,float:'left'}"&ndash;&gt;-->
      <!--&lt;!&ndash;          >&ndash;&gt;-->
      <!--&lt;!&ndash;            {{ userx.userNickname }}&ndash;&gt;-->
      <!--&lt;!&ndash;          </a-avatar>&ndash;&gt;-->
      <!--        </div>-->
      <!--        <div class="content">-->
      <!--          <div class="details">-->
      <!--            <h2>{{userx.userNickname}}<br><span>{{ userx.userPos }}</span></h2>-->
      <!--            <div class="data">-->
      <!--              <h3>342<br><span>Posts</span></h3>-->
      <!--              <h3>120k<br><span>Followers</span></h3>-->
      <!--              <h3>285<br><span>Following</span></h3>-->
      <!--            </div>-->
      <!--            <div class="actionBtn">-->
      <!--              <button>关注</button>-->
      <!--              <button>私信</button>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
      <a-card hoverable style="width: 300px;">
        <template #cover>
          <img
              alt="pic"
              :src="p(userx.userBgPic)"
              style="width: 100%;"
          />
        </template>
        <template #actions>
          <plus-outlined key="setting"/>
          <message-outlined key="edit" @click="talk"/>
          <ellipsis-outlined key="ellipsis"/>
        </template>
        <a-card-meta :description="userx.userCertification" :title="userx.userNickname">
          <template #avatar>
            <a-avatar :src="p(userx.userProfilePhoto)"
                      :style="{backgroundColor:'#067061'}"
            >{{ userx.userNickname }}
            </a-avatar>
          </template>
        </a-card-meta>
      </a-card>
    </template>
    <slot :photo="userx.userProfilePhoto" :text="userx.userNickname"></slot>
  </a-popover>
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