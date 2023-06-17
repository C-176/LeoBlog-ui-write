<template>
  <bread>安全中心</bread>
  <my-compostion>
    <div
        class="mx-auto text-center flex-col justify-around items-center w-full  bg-gray-100 rounded-xl">

      <a-carousel arrows :dots="showDots" effect="fade" ref="carousel">
        <div>
          <a-descriptions title="安全信息" layout="vertical" class="text-center" bordered>

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
            <div class="flex-col justify-between space-y-1 w-2/3 mx-auto items-center">
              <input class="input" v-model="user.userPhone" placeholder="请输入手机号"/>
              <input v-model="phoneCaptcha" class="input" placeholder="请输入验证码"/>
            </div>
            <div class=" space-x-1 w-2/3 mt-1 mx-auto ">
              <button :disabled="phoneDisabled" class="button " @click="phoneCoder">
                获取验证码
              </button>
              <button class="button " @click="changePhone">保存</button>
            </div>

          </a-card>
        </div>
        <div>
          <a-card title="修改邮箱">

            <div class="flex-col justify-between space-y-1 w-2/3 mx-auto items-center">
              <input class="input" v-model="userEmail" placeholder="请输入邮箱"/>
              <input v-model="emailCaptcha" class="input" placeholder="请输入验证码"/>
            </div>
            <div class=" space-x-1 w-2/3 mt-1 mx-auto ">
              <button :disabled="emailDisabled" class="button " @click="emailCoder">
                获取验证码
              </button>
              <button class="button " @click="changeEmail">保存</button>
            </div>

          </a-card>


        </div>
        <div>
          <a-card title="修改密码">

            <div class="flex-col justify-between space-y-1 w-2/3 mx-auto items-center">
              <input class="input" v-model="passwordOld" placeholder="请输入原密码"/>
              <input class="input" v-model="password" placeholder="请输入新密码"/>
              <input v-model="passwordConfirm" class="input" placeholder="请再次输入新密码"/>
            </div>
            <div class=" space-x-1 w-2/3 mt-1 mx-auto ">

              <button class="button " @click="changePassword">保存</button>
            </div>


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
      <button class="w-2/3 button" @click="move">
        {{ modify ? '取消' : '修改' }}
      </button>

    </div>
  </my-compostion>

</template>

<script>
import {LeftCircleOutlined, RightCircleOutlined} from '@ant-design/icons-vue';
import MyCompostion from "@/components/pub/MyCompostion.vue";

export default {
  name: 'security',
  components: {
    MyCompostion,
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

:deep(.ant-card-grid-hoverable:hover) {
  cursor: pointer;
}

</style>