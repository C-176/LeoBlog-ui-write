<template>
  <bread>个人信息</bread>
  <MyCompostion slider=true>

    <div class="w-full h-full lg:p-5 bg-gray-100 rounded-xl mx-auto ">
      <template v-if="loading">
        <a-skeleton active/>
        <a-skeleton active/>
        <a-skeleton active/>
      </template>

      <template v-else>
        <el-upload
            class="
            border border-gray-100 min-h-20 max-h-56 rounded-xl w-full overflow-hidden"
            method="post"
            name="file"
            :action="action"
            :show-file-list="false"
            :on-success="handleAvatarSuccessBg"
            :before-upload="beforeAvatarUpload"
            :on-error="handleAvatarError"
            :disabled="readonly"
        >

          <img v-if="p(userx.userBgPic) && showBg" id="bg" :src="p(userx.userBgPic)"
               class="w-full  bg-auto"/>
          <el-icon v-else
                   class="avatar-uploader-icon bgUpload">
            <Plus/>
          </el-icon>
        </el-upload>


        <div class="overflow-hidden w-full bg-white  sm:rounded-lg p-10 text-left">


          <div class="flex w-full justify-start  items-center -mt-8">
            <!--            <badge :badge-src=testSrc :size="50"></badge>-->
            <!--          <lottie-player ref="bad" autoplay loop mode="normal" style="width: 50px">-->
            <!--          </lottie-player>-->
            <div class="relative">
              <el-upload
                  class="avatar-uploader flex justify-center items-center w-16 h-16 border border-gray-100 rounded-xl overflow-hidden"
                  method="post"
                  name="file"
                  :action="action"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccessProfile"
                  :before-upload="beforeAvatarUpload"
                  :on-error="handleAvatarError"
                  :disabled="readonly"

              >
                <img v-if="userx.userProfilePhoto && showProfile"
                     @click.stop="()=>{if(changing){showCanvas = true;}}"
                     :src="p(userx.userProfilePhoto)" class="avatar relative rounded-xl w-full"/>

                <el-icon v-else @click.stop="()=>{showCanvas = true;}"
                         class="avatar-uploader-icon flex items-center justify-center">
                  <Plus/>
                </el-icon>
              </el-upload>
              <span class="absolute  w-3 h-3 transform -translate-x-0
             rounded-full left-2/3 -top-4">
                      <badge :badge-src=testSrc :size="50"></badge>
          </span>
            </div>

            <div class="px-4 py-3 sm:px-6 flex-col justify-between items-center">
              <h3 class="text-lg font-medium leading-6 text-gray-900">{{ userx.userNickname }}</h3>
              <div class=" inline-block  mt-1 max-w-2xl text-sm text-gray-500">{{ userx.userIntro }}</div>
            </div>
            <div
                class="w-2/3 h-auto float-right flex items-center justify-around space-x-2 my-2 ring-indigo-200 ring-2 rounded-xl">
              <button v-for="key in keys" :key="key.key"
                      class=" justify-items-end w-full h-full p-1 rounded-xl hover:bg-indigo-500 group hover:text-white  text-center transform duration-500"
                      :class="[
                    activeProject == key.key ? 'bg-indigo-500' : '',
                ]">
                <div class="flex items-center justify-center"
                     :class="{
                  'cursor-not-allowed':changing
                     }"
                     @click="()=>{
                       if(this.changing) return;
                       key.href($router);
                       this.$store.commit('changeProject',key.key)
                     }">
                  <icon class="hidden lg:block" :src="key.iconSrc" :size="20"/>
                  <span class="text-center group-hover:text-white  "
                        :class="[

                    activeProject == key.key ? 'text-white' : 'text-gray-600',
                ]"
                  >{{ key.title }}</span></div>
              </button>
            </div>
          </div>


          <div v-if="activeProject === 'info'" class="border-t border-gray-200">
            <dl>
              <div class="bg-white px-4 py-3 sm:grid  flex items-center  sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">昵称</dt>
                <input v-model="userx.userNickname" :readonly="readonly"
                       class="introInput">
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:grid  flex items-center  sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">性别</dt>
                <select v-model="userx.userSex" :disabled="readonly"
                        class=" introInput w-1/2"
                >
                  <option value="1">
                    男
                  </option>
                  <option value="0">
                    女
                  </option>
                  <option value="2">
                    未知
                  </option>

                </select>
              </div>
              <div class="bg-white px-4 py-3 sm:grid sm:grid-cols-3  flex items-center  sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">生日</dt>
                <!--              <div class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">-->
                <div class="flex justify-start items-center">
                  <el-date-picker
                      :readonly="readonly"
                      v-model="userx.userBirthday"
                      type="date"
                      placeholder="选择日期"
                      :size="size"

                  />
                </div>
                <!--              </div>-->
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:grid flex items-center sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">居住地</dt>
                <input v-model="userx.userPos" :readonly="readonly" class="introInput">
              </div>
              <div class="bg-white px-4 py-3 sm:grid flex items-center  sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">所在行业</dt>
                <input v-model="userx.userIndustry" :readonly="readonly" class="introInput">
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:grid  flex items-center sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">教育经历</dt>
                <input v-model="userx.userEducation" :readonly="readonly" class="introInput">
              </div>
              <div
                  class="bg-white px-4 py-3  flex items-center  sm:grid-cols-3 sm:gap-4 sm:px-6 flex-col justify-start items-center">
                <div class="text-sm font-medium text-gray-500 w-full py-2">个人介绍</div>
                <textarea v-model="userx.userIntro" :readonly="readonly" class="introInput w-full"></textarea>
              </div>


              <button
                  class="button w-full"
                  @click="todo">{{ changing ? '保存' : '修改' }}
              </button>
            </dl>

          </div>


          <router-view v-else class="router-view mt-2" v-slot="{ Component }">
            <keep-alive>
              <component :is="Component"/>
            </keep-alive>
          </router-view>
        </div>


      </template>
    </div>
    <canvas-pic :visible="showCanvas"
                @cancel="showCanvas = false;this.$store.commit('changeBgCover',false)"
                @getImg="url => getImg(url)">
    </canvas-pic>

    <template #slider>
      <activity></activity>
    </template>
  </MyCompostion>

</template>

<script>
import {Plus} from '@element-plus/icons-vue'
import {UserOutlined} from '@ant-design/icons-vue';
import canvasPic from "@/components/pub/canvasPic.vue";
import MyCompostion from "@/components/pub/MyCompostion.vue";
import {isEqual} from 'lodash'
import Activity from "@/components/pub/activity.vue";

export default {
  name: 'info',
  components: {
    Activity,
    MyCompostion,
    Plus,
    UserOutlined,
    canvasPic,
  },
  data() {
    return {
      lottie: null,
      testSrc: 'https://assets9.lottiefiles.com/packages/lf20_stozcwgt.json',
      showCanvas: false,
      showBg: true,
      showProfile: true,
      loading: true,
      action: this.baseURL + "/upload/file",
      // imageUrl: '',
      changing: false,
      readonly: true,
      size: 'small',
      userx: {
        userId: '',
        userNickname: '',
        userSex: '',
        userPos: '',
        userIndustry: '',
        userBirthday: '',
        userEducation: '',
        userCertification: '',
        userIntroduction: '',
        userProfilePhoto: '',
        userIntro: '',
        userBgPic: ''
      },
      keys: [{
        key: 'info',
        title: '信息',
        iconSrc: 'bhfjfgqz',
        href: function ($router) {

        }
      }, {
        key: 'article', title: '文章', iconSrc: 'vufjamqa', href: function ($router) {
          $router.push('/back/info/article')
        }
      }, {
        key: 'comment',
        title: '评论',
        iconSrc: 'hpivxauj',
        href: function ($router) {
          $router.push('/back/info/comment')

        }
      }

      ],
      badge: {badgeIcon: '', badgeName: '', badgeDesc: ''},
      badgeVisible: false,

    }
  },

  created() {

    //将this.$store.state.user赋值给user
    this.$axios.get(this.baseURL + '/user/' + this.$store.state.user.userId,).then(res => {
      this.userx = res.data.data
      this.imageUrl = this.userx.userProfilePhoto
    })


  },
  mounted() {

    this.badge = {
      badgeIcon: this.testSrc,
      badgeName: '测试',
      badgeDesc: '测试'
    }

    this.showBadge()

  },

  methods: {
    getImg(url) {
      this.userx.userProfilePhoto = url;
      this.$store.commit('changeBgCover', false);
      this.showCanvas = false;
      this.showProfile = true;
    },

    showBadge() {
      this.$nextTick(() => {

        this.lottie = this.$refs.bad
        if (this.lottie == null) return
        console.log(this.lottie)
        this.badgeVisible = true
        try {
          console.log(this.badge)

          this.lottie.load(this.badge.badgeIcon);
        } catch (e) {
          console.error(e)
        }
      })


    },
    quit() {
      this.showCanvas = false
    },

    todo() {
      if (this.changing) {
        // 检查数据是否变化
        // 比较两个对象是否相等
        // console.log(this.userx.userProfilePhoto,this.$store.state.user.userProfilePhoto)
        // console.log(isEqual(this.userx, this.$store.state.user))
        if (isEqual(this.userx, this.$store.state.user)) {
          this.$st('您未做任何修改', 'warning');
          this.changing = false;
          this.readonly = true;
          this.showBg = true;
          this.showProfile = true;
        } else {
          //修改用户信息
          this.$axios.put('/user/update', this.userx).then(res => {
            if (res.data.code === 200) {
              this.$st('修改成功', 'success');
              this.$store.commit('setUser', this.userx)
              this.changing = false;
              this.readonly = true;
              this.showBg = true;
              this.showProfile = true;
            } else {
              this.$st('修改失败', 'error');
            }
          })
        }
      } else {
        this.changing = true;
        this.readonly = false;
        this.showBg = false;
        this.showProfile = false;
        this.$st('可以修改了', 'success');
      }

    },
    handleAvatarSuccessProfile(res, file) {
      this.userx.userProfilePhoto = res.data.url;
      this.showProfile = true
    },
    handleAvatarSuccessBg(res, file) {
      this.userx.userBgPic = res.url;
      this.showBg = true
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || 'image/png' || 'image/gif' || 'image/bmp' || 'image/webp';
      const isLt2M = file.size / 1024 / 1024 < 2;
      //TODO:bug: Cannot set property lastModifiedDate of #<File> which has only a getter
      if (!isJPG) {
        this.$st('上传头像图片只能是 JPG 格式!', 'error');
      }
      if (!isLt2M) {
        this.$st('上传图片大小不能大于2M', 'error');
      }
      return isJPG && isLt2M;
    },
    handleAvatarError() {
      this.$st("头像上传失败", 'error')
    },

  },
  watch: {
    userx() {
      this.$nextTick(() => {
        this.loading = false
      })
    },
    showCanvas(val) {
      console.log(val)
    },

  },
  computed: {
    activeProject() {
      return this.$store.state.activeProject
    },
  }

}


</script>


<style scoped>

/*.avatar-uploader-icon .el-upload {*/
/*  border: 1px dashed var(--el-border-color);*/
/*  border-radius: 6px;*/
/*  cursor: pointer;*/
/*  position: relative;*/
/*  overflow: hidden;*/
/*  transition: var(--el-transition-duration-fast);*/
/*}*/

/*.profileUpload .el-upload:hover {*/
/*  border-color: var(--el-color-primary);*/
/*}*/

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  /*width: 178px;*/
  /*height: 178px;*/
  text-align: center;
}


:deep(.profileUpload.el-input) {
  height: 40px;
  width: 80%;
  font-size: 15px;
  border-width: 0;
  outline: none;
}

:deep(.el-input__wrapper) {
  border-radius: 10px;
  background: transparent;
  border-width: 0;
  outline: none;
  /*padding: 0;*/
}

.cell {
  height: 30px;
  padding: 3px 0;
  box-sizing: border-box;
}

#uname {
  font-weight: 600;
  height: 50px;
  line-height: 50px;
  margin: 10px 20px 0 20px;
  float: left;
  font-size: 20px
}

.cell .text {
  width: 24px;
  height: 24px;
  display: block;
  margin: 0 auto;
  line-height: 24px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50%;
}

.cell.current .text {
  background: #2ce751;
  color: #fff;
}

:deep(.el-date-editor.el-input) {
  height: 40px;
  width: 100%;
  font-size: 15px;
  background: transparent;
  border-radius: 10px;
  border-width: 0;
  /*margin-top: 0.5rem;*/

}


:deep(.ant-select) {
  width: 80%;
  height: 40px;
  background: #d6d6d6;
  border-radius: 10px;
}


:deep(.bg .el-icon ) {
  width: 100%;
  height: 250px;
  background: #ecf0f2;
  border-radius: 10px;
}

:deep(.el-upload) {
  /*width: 100%;*/
}

:deep(.head .el-icon) {
  width: 150px;
  height: 150px;
  background: #d5d5d5;
}


</style>