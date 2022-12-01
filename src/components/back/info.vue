<template>
  <bread>个人信息</bread>
  <div class="whole">
    <template v-if="loading">
      <a-skeleton active/>
      <a-skeleton active/>
      <a-skeleton active/>
    </template>

    <template v-else>
      <div class="pic">
        <div class="bg">
          <el-upload
              class="avatar-uploader"
              method="post"
              name="file"
              :action="action"
              :show-file-list="false"
              :on-success="handleAvatarSuccessBg"
              :before-upload="beforeAvatarUpload"
              :on-error="handleAvatarError"
              :disabled="readonly"
          >
            <img v-if="p(userx.userBgPic) && showBg" id="bg" :src="p(userx.userBgPic)" class="avatar"/>
            <el-icon v-else class="avatar-uploader-icon bgUpload">
              <Plus/>
            </el-icon>
          </el-upload>
        </div>
        <div class="head">
          <el-upload
              class="avatar-uploader"
              method="post"
              name="file"
              :action="action"
              :show-file-list="false"
              :on-success="handleAvatarSuccessProfile"
              :before-upload="beforeAvatarUpload"
              :on-error="handleAvatarError"
              :disabled="readonly"

          >
            <!--/*            <img  :src="p(userx.userProfilePhoto) " class="avatar" style="height: 150px;width: 150px;"/>*/-->
            <a-avatar
                v-if="userx.userProfilePhoto && showProfile"
                :src="p(userx.userProfilePhoto)"
                :style="{ backgroundColor: '#067061'  ,verticalAlign: 'middle',height: '150px',width: '150px'}"
                shape="square"
            >
              {{ userx.userNickname }}
            </a-avatar>
            <el-icon v-else class="avatar-uploader-icon profileUpload">
              <Plus/>
            </el-icon>
          </el-upload>
        </div>
        <label>
          <span class="iconfont" id="uname">&#xe656; 用户名 </span>
          <input class="name" :class="{readonly:readonly}" :readonly="readonly" v-model="userx.userNickname"/></label>
      </div>


      <div class="comment">
        <div class="q"><span class="iconfont">&#xe642;</span> 性别</div>
        <div class="s"><label>
          <input v-if="readonly" :value="userx.userSex == 0?'女':'男'" :class="{readonly:readonly}" readonly="true"/>
          <template v-else>
            <a-select :value="userx.userSex == 0?'女':'男'" :bordered="false"
                      @change='handleSexChange'  >

              <a-select-option value="1">
                <template #prefix>
                  <user-outlined type="user"/>
                </template>
                男
              </a-select-option>
              <a-select-option value="0">
                <template #prefix>
                  <user-outlined type="user"/>
                </template>
                女
              </a-select-option>
            </a-select>
          </template>

        </label></div>

      </div>
      <div class="comment">
        <div class="q"><span class="iconfont">&#xe63d;</span> 居住地</div>
        <div class="s"><label>
          <input v-model="userx.userPos" :class="{readonly:readonly}" :readonly="readonly">
        </label></div>

      </div>
      <div class="comment">
        <div class="q"><span class="iconfont">&#xe73b;</span> 所在行业</div>
        <div class="s"><label>
          <input :class="{readonly:readonly}" :readonly="readonly"
                 v-model="userx.userIndustry">
        </label></div>
      </div>
      <div class="comment">
        <div class="q"><span class="iconfont">&#xe80f;</span> 生日</div>
        <div class="s"><label>
          <el-date-picker
              :readonly="readonly"
              v-model="userx.userBirthday"
              type="date"
              placeholder="选择日期"
              :size="size"
              :class="{readonly:readonly}"
          />
        </label>


        </div>
      </div>
      <div class="comment">
        <div class="q"><span class="iconfont">&#xe624;</span> 教育经历</div>
        <div class="s"><label>
          <input :class="{readonly:readonly}" :readonly="readonly" v-model="userx.userEducation">
        </label></div>
      </div>
      <div class="comment">
        <div class="q"><span class="iconfont">&#xe7c0;</span> 个人认证</div>
        <div class="s"><label>
          <input name="userCertification" :class="{readonly:readonly}" :readonly="readonly"
                 v-model="userx.userCertification">
        </label></div>
      </div>
      <div class="comment">
        <div class="q"><span class="iconfont">&#xe78b;</span> 个人简介</div>
        <div class="s"><label>
          <input class="userIntroduction" name="userIntroduction" :class="{readonly:readonly}" :readonly="readonly"
                 v-model="userx.userIntro">
        </label></div>
      </div>
      <a class="change" @click="todo">{{ mode }}</a>
    </template>
  </div>

</template>

<script>
import {Plus} from '@element-plus/icons-vue'
import {UserOutlined} from '@ant-design/icons-vue';

export default {
  name: 'info',
  components: {
    Plus,
    UserOutlined
  },
  data() {
    return {
      showBg: true,
      showProfile: true,
      loading: true,
      action: this.baseURL + "/upload/file",
      // imageUrl: '',
      mode: '修改',
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
    }
  },
  computed: {},
  created() {
    //将this.$store.state.user赋值给user
    this.$axios.get(this.baseURL + '/user/' + this.$store.state.user.userId,).then(res => {
      this.userx = res.data.data
      this.imageUrl = this.userx.userProfilePhoto
    })

  },

  methods: {
    handleSexChange(e){
      this.userx.userSex = e
    },
    todo() {
      if (this.mode === '保存') {
        // 检查数据是否变化
        if (this.userx.userNickname == this.$store.state.user.userNickname &&
            this.userx.userSex === this.$store.state.user.userSex &&
            this.userx.userPos === this.$store.state.user.userPos &&
            this.userx.userIndustry === this.$store.state.user.userIndustry &&
            this.userx.userBirthday === this.$store.state.user.userBirthday &&
            this.userx.userEducation === this.$store.state.user.userEducation &&
            this.userx.userCertification === this.$store.state.user.userCertification &&
            this.userx.userIntroduction === this.$store.state.user.userIntroduction &&
            this.userx.userProfilePhoto === this.$store.state.user.userProfilePhoto &&
            this.userx.userBgPic === this.$store.state.user.userBgPic) {
          this.$st('您未做任何修改', 'warning');
          this.mode = '修改';
          this.readonly = true;
          this.showBg = true;
          this.showProfile = true;
        } else {
          //修改用户信息
          this.$axios.put('/user/update', this.userx).then(res => {
            if (res.data.code === 200) {
              this.$st('修改成功', 'success');
              this.$store.commit('setUser', this.userx)
              this.mode = '修改';
              this.readonly = true;
              this.showBg = true;
              this.showProfile = true;
            } else {
              this.$st('修改失败', 'error');
            }
          })
        }
      } else {
        this.mode = '保存';
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
      this.userx.userBgPic = res.data.url;
      this.showBg = true
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || 'image/png' || 'image/gif' || 'image/bmp' || 'image/webp';
      const isLt2M = file.size / 1024 / 1024 < 2;

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
    }
  },

}


</script>


<style scoped>

:deep(.avatar-uploader,.el-upload) {
  height: 100%;
  width: 100%;
}

.profileUpload .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.bgUpload .avatar {
  width: 100%;
  height: 100%;
  display: block;
}

:deep(.bgUpload) {
  width: 100%;
  height: 250px;
  /*display: block;*/
}

.bg {
  height: 250px;
  width: 100%;
  overflow: hidden;
}

.bg img {
  width: 100%;
  height: 100%;
}

.avatar-uploader-icon .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

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

:deep(.readonly) {
  background-color: #f5f5f5 !important;
}

.whole {
  margin-top: 60px;
  margin-left: calc(17.5%);
  width: 65%;
  /*height: 100vh;*/
  background-color: #fff;
  border-radius: 2px;
  margin-bottom: 20px;
  /*box-shadow: 3px 1px 11px #869d9d;*/
}

.whole .pic {
  height: 250px;
  width: 100%;
  margin-bottom: 100px; /*margin-top: 100px;*/
}

.whole .pic .head img {
  border-radius: 10px;
  border: 5px solid #fff;
}

/*.whole img {*/
/*  width: 100%;*/
/*  height: 100%;*/
/*}*/

.whole .pic .head {
  float: left;
  position: relative;
  top: -75px;
  height: 150px;
  background: #89a0a0;
  width: 150px;
  margin: 0 20px;
  border-radius: 10px;
  line-height: 150px;
  overflow: hidden;
  color: #134857;
  border-color: #fff;
}

.whole .pic .name {
  float: left;
  height: 50px;
  width: 50%;
  /*background-color: #0086b3;*/
  margin-left: 10px;
  padding-left: 10px;
  text-align: left;
  /*padding-bottom: 40px;*/
  color: #134857;
  font-size: 20px;
  font-weight: 600;
  line-height: 50px;
}

.name {
  margin-top: 10px;
}

:deep(.el-date-editor.el-input) {
  height: 40px;
  width: 80%;
  font-size: 15px;
  background: #d5d5d5;
  border-radius: 10px;

}

.whole .comment {
  width: 80%;
  height: 60px;
  margin-left: 20%;
  color: #134857;
}

:deep(.ant-select) {
  width: 80%;
  height: 40px;
  background: #d6d6d6;
  border-radius: 10px;
}

.comment .q, .comment .s {
  float: left;
  height: 100%;
  font-size: 15px;
  line-height: 60px;
  padding-left: 20px;
  border-bottom: 1px solid rgba(134, 157, 157, 0.23);
}

.comment .q {
  width: 20%;
  text-align: left;
  font-weight: 600;
}

.comment .s {
  text-align: left;
  width: 40%;
  margin-right: 300px;
  padding-left: 20px;
}

.s select {
  height: 40px;
  width: 15%;
  font-size: 15px;
  color: #134857;
  line-height: 40px;
  border: none;
  margin: 10px 0 10px 20px;
}


label input {
  height: 40px;
  width: 80%;
  font-size: 15px;
  color: #134857;
  line-height: 40px;

  padding-left: 20px;
  border-radius: 10px;
  background: rgba(17, 17, 17, 0.17);
  outline: none;
  border: 1px solid #dde0e7;
  transition: all 0.3s;
}

.whole .change {
  display: block;
  height: 40px;
  width: 64px;
  background: rgba(17, 17, 17, 0.17);
  position: relative;
  bottom: 500px;
  left: 90%;
  line-height: 40px;
  text-align: center;
  border-radius: 5px;
  color: #134857;
  font-size: 20px;
  font-weight: 600;
}

:deep(.bg .el-icon ) {
  width: 100%;
  height: 250px;
  background: #ecf0f2;
  border-radius: 10px;
}

:deep(.el-upload) {
  width: 100%;
}

:deep(.head .el-icon) {
  width: 150px;
  height: 150px;
  background: #d5d5d5;
}


</style>