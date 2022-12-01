<template>
  <bread>安全</bread>
  <div class="whole">

    <div class="custom-slick-arrow" @click="move">
      {{ modify ? '取消' : '修改' }}
    </div>
    <a-carousel arrows :dots="showDots" effect="fade" ref="carousel" >
      <div>
        <a-descriptions title="安全信息" layout="vertical" bordered>
          <a-descriptions-item label="用户名">{{ user.userName }}</a-descriptions-item>
          <a-descriptions-item label="手机号">{{ user.userPhone }}</a-descriptions-item>
          <a-descriptions-item label="邮箱">{{ user.userEmail }}</a-descriptions-item>
          <a-descriptions-item label="密码">******</a-descriptions-item>
          <a-descriptions-item label="注册时间" :span="2">{{
              this.$moments(user.userRegisterDate)
            }}
          </a-descriptions-item>
          <a-descriptions-item label="账号状态" :span="3">
            <a-badge status="processing" text="Running"/>
          </a-descriptions-item>
        </a-descriptions>
      </div>

      <div>
        <a-card title="修改手机号">
          <a-form :form="form">
            <a-form-item label="手机号">
              <a-input v-model:value="user.userPhone" placeholder="请输入手机号"/>
            </a-form-item>
            <a-form-item label="验证码">
              <a-input v-model:value="phoneCaptcha" placeholder="请输入验证码"/>
            </a-form-item>
            <a-form-item>
              <a-button :disabled="phoneDisabled" shape="round" style="margin-left: 10px" @click="phoneCoder">
                获取验证码
              </a-button>
            </a-form-item>
            <a-form-item>
              <a-button shape="round" @click="changePhone">保存</a-button>
            </a-form-item>
          </a-form>
        </a-card>
      </div>
      <div>
        <a-card title="修改邮箱">
          <a-form>
            <a-form-item label="邮箱">
              <a-input v-model:value="userEmail" placeholder="请输入邮箱"/>
            </a-form-item>
            <a-form-item label="验证码">
              <a-input v-model:value="emailCaptcha" placeholder="请输入验证码"/>
            </a-form-item>
            <a-form-item>
              <a-button :disabled="emailDisabled" :loading="loading"
                        shape="round" style="margin-left: 10px" @click="emailCoder">
                获取验证码
              </a-button>

            </a-form-item>
            <a-form-item>

              <a-button shape="round" @click="changeEmail">保存</a-button>
            </a-form-item>
          </a-form>
        </a-card>


      </div>
      <div>
        <a-card title="修改密码">
          <a-form :form="form">
            <a-form-item label="原密码">
              <a-input v-model:value="passwordOld" placeholder="请输入原密码"/>
            </a-form-item>
            <a-form-item label="新密码">
              <a-input v-model:value="password" placeholder="请输入新密码"/>
            </a-form-item>
            <a-form-item label="确认密码">
              <a-input v-model:value="passwordConfirm" placeholder="请再次输入新密码"/>
            </a-form-item>
            <a-form-item>
              <a-button shape="round" @click="changePassword">保存</a-button>
            </a-form-item>
          </a-form>
        </a-card>
      </div>

      <div>
        <a-card title="安全信息">
          <a-card-grid style="width: 50%; text-align: center" @click="$refs.carousel.goTo(1)">修改手机号</a-card-grid>
          <a-card-grid style="width: 50%; text-align: center" @click="$refs.carousel.goTo(2)">修改邮箱</a-card-grid>
          <a-card-grid style="width: 50%; text-align: center" @click="$refs.carousel.goTo(3)">修改密码</a-card-grid>
        </a-card>
      </div>

    </a-carousel>

  </div>

</template>

<script>
import {LeftCircleOutlined, RightCircleOutlined} from '@ant-design/icons-vue';

export default {
  name: 'security',
  components: {
    LeftCircleOutlined,
    RightCircleOutlined,
  },
  data() {
    return {
      loading: false,
      phoneCaptcha: '',
      emailCaptcha: '',
      emailDisabled: false,
      phoneDisabled: false,
      sendPhone: false,
      sendEmail: false,
      modify: false,
      showDots: false,
      userEmail: '',
      passwordOld: '',
      password: '',
      passwordConfirm: '',
      layout: {
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 16,
        },
      },
      user: {},
      form: {
        userPhone: '',
        userEmail: '',
        userPassword: '',
      }

    }
  },
  created() {
    this.getUser()

  },
  methods: {
    move() {
      if (!this.modify) {
        this.$refs.carousel.goTo(4)
        this.modify = true
      } else {
        this.$refs.carousel.goTo(0)
        this.modify = false

      }
    },
    phoneCoder() {
      //验证空白
      if (this.user.userPhone === '') {
        this.$st('手机号不能为空', 'error')
        return
      }
      //验证手机号格式
      if (!(/^1[3456789]\d{9}$/.test(this.user.userPhone))) {
        this.$st('手机号格式不正确', 'error')
        return
      }
      //发送验证码
      this.loading = true
      this.$axios.get('/user/confirm/phone/' + this.user.userPhone).then(res => {
        if (res.data.code === 200) {
          this.$st('验证码已发送', 'success')
          this.sendPhone = true
          this.phoneDisabled = true
          setTimeout(() => {
            this.loading = false
            this.emailDisabled = false
          }, 60000)
        } else {
          this.$st('验证码发送失败', 'error')
          this.sendPhone = false
          this.loading = false
        }
      })


    },
    changePhone() {
      if (this.user.userPhone.trim() === '' || this.phoneCaptcha.trim() === '') {
        this.$st('手机号和验证码不能为空', 'error')
        return
      }
      //验证手机号格式
      if (!(/^1[3456789]\d{9}$/.test(this.user.userPhone))) {
        this.$st('手机号格式不正确', 'error')
        return
      }
      if (!this.sendPhone) {
        this.$st('请先获取验证码', 'error')
        return
      }
      this.$axios.put('/user/security/' + this.$store.state.user.userId, {
        userPhone: this.user.userPhone,
        captcha: this.phoneCaptcha
      }).then(res => {
        if (res.data.code === 200) {
          this.$st(res.data.data, 'success')
          this.getUser()
          this.move()
        } else {
          this.$st(res.data.data, 'error')
        }
      })


    },
    getUser() {
      this.$axios.get('/user/security/' + this.$store.state.user.userId).then(res => {
        if (res.data.code === 200) {
          this.user = res.data.data
        } else {
          this.$st('获取用户信息失败', 'error')
        }
      })
    },

    emailCoder() {

      //邮箱空白验证
      if (this.userEmail === '') {
        this.$st('邮箱不能为空', 'error')
        return
      }
      //邮箱格式验证


      //发送验证码
      this.loading = true
      this.$axios.get('/user/confirm/email/' + this.userEmail).then(res => {
        if (res.data.code === 200) {
          this.$st('验证码已发送', 'success')
          this.sendEmail = true
          this.emailDisabled = true
          setTimeout(() => {
            this.loading = false
            this.emailDisabled = false
          }, 60000)
        } else {
          this.$st('验证码发送失败', 'error')
          this.sendEmail = false
          this.loading = false
        }

      })

    },
    changeEmail() {
      if (this.emailCaptcha === '' || this.userEmail.trim() === '') {
        this.$st('验证码和邮箱不能为空', 'error')
        return
      }
      // if(!this.$reg.email.test(this.userEmail)){
      //   this.$st('邮箱格式不正确', 'error')
      //   return
      // }
      if (!this.sendEmail) {
        this.$st('请先获取验证码', 'error')
        return
      }
      this.$axios.put('/user/security/' + this.$store.state.user.userId, {
        userEmail: this.userEmail,
        captcha: this.emailCaptcha
      }).then(res => {
        if (res.data.code === 200) {
          this.$st(res.data.data, 'success')
          this.getUser()
          this.move()
        } else {
          this.$st(res.data.data, 'error')
        }
      })


    },
    changePassword() {
      //密码不可为空
      if (this.passwordOld.trim() === '' || this.password.trim() === '' || this.passwordConfirm.trim() === '') {
        this.$st('密码不可为空', 'error')
        return
      }
      if (this.password !== this.passwordConfirm) {
        this.$st('两次密码不一致', 'error')
        return
      }
      if (this.passwordOld !== this.user.userPassword) {
        this.$st('原密码错误', 'error')
        return
      }
      if (this.password === this.passwordOld) {
        this.$st('新密码不能与原密码相同', 'error')
        return
      }
      this.$axios.put('/user/security/' + this.$store.state.user.userId, {
        userPassword: this.password
      }).then(res => {
        if (res.data.code === 200) {
          this.$st(res.data.data, 'success')
          this.getUser()
          this.move()
        } else {
          this.$st(res.data.data, 'error')
        }
      })

    }
  }
}

</script>


<style scoped>
.whole {
  margin-left: calc(22.5%);
  margin-top: 60px;
  height: 500px;

}

.custom-slick-arrow {
  position: relative;
  left: calc(50% - 25px);
  top: 420px;
  z-index: 1;
  width: 50px;
  height: 30px;
  color: #111 !important;
  font-size: 14px;
  line-height: 30px;
  border-radius: 5px;
  background: #ecf0f2;
  transition: all 0.3s;
}
.custom-slick-arrow:hover {
  cursor: pointer;
  background: #bdc3c7;
}

.ant-form {
  width: 60% !important;
  margin: 0 auto;
}


/*!* For demo *!*/

.ant-carousel :deep(.slick-arrow.custom-slick-arrow) {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: #ecf0f2;
  opacity: 0.3;
  z-index: 1;
}

.ant-carousel :deep(.custom-slick-arrow:before) {
  display: none;
}

.ant-carousel :deep(.custom-slick-arrow:hover) {
  opacity: 0.5;
}

:deep(.ant-card-grid-hoverable:hover){
  cursor: pointer;
}

</style>