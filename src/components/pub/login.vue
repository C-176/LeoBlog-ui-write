<template>
  <div class="w-full h-screen  flex justify-center items-center" v-if="!forgetPwd">
    <div class="w-2/3 lg:w-1/3  p-5 rounded-xl mx-auto">

      <div class="w-full space-y-2 flex-col justify-around items-center">
        <img :src="logoSrc" @click="$router.push('/index')"
             class="w-1/2 mx-auto mb-2 cursor-pointer hover:border-2 border-gray-100">
        <h1 class="text-3xl font-bold mx-auto w-full text-center">{{ login ? "登陆您的账户" : "注册您的账户" }}</h1>

        <input v-model="userName"
               class="input"
               :placeholder="login ? '用户名/邮箱' : '用户名' " autocomplete="off" autofocus name="userName">
        <template v-if="!login">
          <input v-model="userEmail" class="input" placeholder="邮箱" autocomplete="off" id="userEmail">
        </template>
        <!--        <input v-model="userPassword" class="input" placeholder="密码" autocomplete="new-password" required-->
        <!--               type="password">-->


        <div class=" relative ">
          <!--          <label for="with-indications" class="text-gray-700">-->
          <!--            Password-->
          <!--            <span class="text-red-500 required-dot">-->
          <!--            *-->
          <!--        </span>-->
          <!--          </label>-->
          <input type="password" v-model="userPassword" id="with-indications" class=" input " placeholder="密码"/>

          <template v-if="userPassword.trim() == '' || userPassword.trim().length<6">
            <div
                class="grid w-full px-2 h-1 grid-cols-12 gap-4 mt-3">
              <div class="h-full col-span-3 bg-red-500 rounded">
              </div>
              <div class="h-full col-span-3 bg-red-500 rounded">
              </div>
              <div class="h-full col-span-3 bg-red-500 rounded">
              </div>
              <div class="h-full col-span-3 bg-red-500 rounded dark:bg-dark-1">
              </div>
            </div>
            <div class="mt-2 pl-5  text-red-500 text-left">
              密码长度至少6位
            </div>
          </template>
          <template v-else>
            <div
                class="grid w-full px-2 h-1 grid-cols-12 gap-4 mt-3">
              <div class="h-full col-span-3 bg-green-500 rounded">
              </div>
              <div class="h-full col-span-3 bg-green-500 rounded">
              </div>
              <div class="h-full col-span-3 bg-green-500 rounded">
              </div>
              <div class="h-full col-span-3 bg-gray-200 rounded dark:bg-dark-1">
              </div>
            </div>

          </template>

        </div>


        <template v-if="login">
          <input v-model="captcha" @keyup.enter="LR" class="input" placeholder="验证码" autocomplete="off">
          <img id="codeImg" class="block w-1/3  border-1 border-gray-100 cursor-pointer mx-auto my-2 "
               :src="captchaUrl"
               @click="refreshCaptCha">

        </template>
        <template v-else>
          <input v-model="reUserPassword" class="input" placeholder="确认密码" autocomplete="of" id="reUserPassword"
                 required type="password">
        </template>

        <div v-if="login" class=" flex h-8 w-full justify-between items-center" id="login">
          <div class="cursor-pointer flex justify-center items-center space-x-2">
            <!--            <input v-model="rememberMe" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"-->
            <!--                   type="checkbox">-->
            <input type="radio" @click="rememberMe = !rememberMe" :checked="rememberMe" name="radio-2"
                   class="radio radio-primary"/>
            <span @click="rememberMe = !rememberMe">记住密码</span></div>
          <div class="text-indigo-500 px-2 py-1 rounded-xl cursor-pointer hover:bg-gray-100" @click="alertTest">
            测试用户
          </div>
          <div class="text-indigo-500 px-2 py-1 rounded-xl cursor-pointer hover:bg-gray-100 " @click="forgetPwd=true">
            忘记密码?
          </div>

        </div>
        <button class="button w-full"
                @click="LR">{{ login ? "登陆" : "注册" }}
        </button>
        <div>
          <span class="text-gray-500">{{ login ? "没有账号?" : "已有账号?" }}</span>
          <span class="text-indigo-500 cursor-pointer hover:text-indigo-600"
                @click="$store.commit('changeLogin',!login)">{{ login ? "注册" : "登陆" }}</span>
        </div>

      </div>

    </div>
  </div>
  <my-modal :size="'md'"  :visible="forgetPwd" @closeModal="forgetPwd = false">

<!--      <div class="p-4 sm:p-7">-->
<!--        <div class="text-center">-->
<!--          <h1 class="block text-2xl font-bold text-gray-800 dark:text-white">忘记密码?</h1>-->
<!--          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">-->
<!--            又想起来了?-->
<!--            <a class="text-indigo-600 decoration-2 hover:underline font-medium" @click="forgetPwd = false">-->
<!--              去登陆-->
<!--            </a>-->
<!--          </p>-->
<!--        </div>-->

          <div class="grid gap-y-4">
            <div>
              <label for="email" class="block text-sm font-bold ml-1 mb-2 dark:text-white">邮箱</label>
              <div class="relative">
                <input type="email" v-model="forgetEmail" id="email" name="email"
                       class="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-indigo-600 focus:ring-indigo-600 shadow-sm"
                       required aria-describedby="email-error">
              </div>
              <label for="userPassword" class="block text-sm font-bold ml-1 mb-2 dark:text-white">新密码</label>
              <div class="relative">
                <input type="password" v-model="userPassword" id="userPassword"
                       class="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-indigo-600 focus:ring-indigo-600 shadow-sm"
                       required aria-describedby="email-error">
              </div>
              <label for="reUserPassword" class="block text-sm font-bold ml-1 mb-2 dark:text-white">确认密码</label>
              <div class="relative">
                <input type="password" v-model="reUserPassword" id="reUserPassword"
                       class="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-indigo-600 focus:ring-indigo-600 shadow-sm"
                       required aria-describedby="email-error">
              </div>
              <p class="hidden text-xs text-red-600 mt-2" id="email-error">请输入有效邮箱</p>
            </div>
            <button @click="changePwd"
                    class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-indigo-600 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-base dark:focus:ring-offset-gray-800">
              重置密码
            </button>
          </div>
  </my-modal>

</template>

<script>
import Swal from 'sweetalert2'
import axios from "axios";
import {decode, encode} from '@/util/AES'
import bgCover from "@/components/pub/BgCover";
import MyModal from "@/components/pub/myModal.vue";


export default {
  name: 'login',
  // props:[''],
  components: {
    MyModal,
    bgCover,
  },
  data() {
    return {
      forgetEmail: '',
      forgetPwd: false,
      message: 'test',
      userName: '',
      name: 'userName',
      userPassword: '',
      captcha: '',
      rememberMe: true,
      captchaUrl: this.baseURL + "/user/getCaptcha",
      reUserPassword: '',
      userEmail: '',
      userPhone: '',
      leftTime: 0,
      logoSrc: '',

    }
  },
  created() {
    this.logoSrc = '/source/images/logoTest.png'
    //记住密码  恢复密码
    let uname = localStorage.getItem(encode('lb_userName'))
    let upwd = localStorage.getItem(encode('lb_userPassword'))
    if (uname && upwd) {
      this.userName = decode(uname)
      this.userPassword = decode(upwd)
      this.rememberMe = true
    }

  },
  computed: {
    login() {
      return this.$store.state.login;
    }
  },
  watch: {
    login(val) {
      if (!val) {
        this.userName = ''
        this.userPassword = ''
      }
    },
    forgetPwd(val) {
      if (val) {
        this.$store.commit('changeBgCover', true)
        // console.log(this.$store.state.bgCover)
      } else {
        this.$store.commit('changeBgCover', false)
      }
    }

  },
  methods: {
    alertTest() {
      Swal.fire({
        title: '测试用户',
        text: '用户名：test1 密码：111111',
        icon: 'info',
        confirmButtonText: '确定'
      })
    },

    LR() {
      return new Promise((resolve, reject) => {
        if (this.login) {
          axios.post("/user/login", {
            userName: this.userName.includes('@') ? '' : this.userName,
            userEmail: this.userName.includes('@') ? this.userName : '',
            userPassword: this.userPassword,
            captcha: this.captcha,
          }).then(res => {
            if (res.data.code === 200) {
              if (this.rememberMe) {
                // 向localStorage中存储Md5加密后的用户名和密码
                localStorage.setItem(encode('lb_userName'), encode(this.userName))
                localStorage.setItem(encode('lb_userPassword'), encode(this.userPassword))
              }
              // this.$st("登陆成功", "success")
              let map = res.data.data
              let token = map.accessToken
              let refreshToken = map.refreshToken
              let user = map.user
              this.refreshCaptCha()

              // 将token存到localStorage中
              // console.log("将token存到localStorage中： " + token)
              this.$store.commit("setAccessToken", token)
              this.$store.commit("setRefreshToken", refreshToken)
              this.$store.commit("setUser", user)
              this.$router.push('/home/article')
              resolve(res)
            } else {
              this.$st(res.data.data, 'error')
              this.refreshCaptCha()
              reject(res)
            }
          })
        } else {
          // console.log(this.userPassword, this.reUserPassword)
          //密码不能为空
          if (this.userPassword.trim() === '' || this.reUserPassword.trim() === '') {
            this.$st("密码不能为空", 'error')
            return
          }
          //验证两次密码是否一致
          if (this.userPassword !== this.reUserPassword) {
            this.$st("两次密码不一致", "error")
            return;
          }
          //密码不够六位
          if (this.userPassword.length < 6) {
            this.$st("密码不够六位", "error")
            return;
          }
          this.$axios.get("/user/confirm/email/" + this.userEmail);
          Swal.fire({
            showConfirmButton: false,
            allowOutsideClick: false,
            title: '正在向 ' + this.userEmail + ' 发送验证邮件',
            // html: '将在 <strong></strong> 毫秒内发送完成',
            timer: 3000,
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
              Swal.fire({
                allowOutsideClick: false,
                title: "验证邮件已发送，请输入验证码",
                input: 'text',
                inputAttributes: {
                  autocapitalize: 'off'
                },
                confirmButtonText: '注册',
                showCancelButton: true,
                cancelButtonText: '取消',
              }).then((result) => {
                if (result.value) {
                  axios.post("/user/register", {
                    userName: this.userName,
                    userPassword: this.userPassword,
                    userEmail: this.userEmail,
                    captcha: result.value
                  }).then(res => {
                    if (res.data.code === 200) {
                      this.$store.commit('changeLR', true)
                      this.$st("注册成功，已定向到登陆页面，请登录", "success")
                      this.$store.commit('changeLogin', true);
                      resolve(res.data.code)
                    } else {
                      this.$st(res.data.data, 'error')
                      reject(res.data)
                    }
                  })
                } else {
                  this.$st("验证码不可为空", 'error')
                }
              })
            }
          })

        }
      })
    },

    refreshCaptCha() {
      // console.log(localStorage.getItem("token"));
      this.captchaUrl = this.baseURL + "/user/getCaptcha?time=" + new Date().getTime()
    },
    changePwd() {
      if (this.forgetEmail.trim().length == 0) {
        this.$st("邮箱不能为空", 'error')
        return
      }
      //密码不能为空
      if (this.userPassword.trim() === '' || this.reUserPassword.trim() === '') {
        this.$st("密码不能为空", 'error')
        return
      }
      //验证两次密码是否一致
      if (this.userPassword !== this.reUserPassword) {
        this.$st("两次密码不一致", "error")
        return;
      }
      //密码不够六位
      if (this.userPassword.length < 6) {
        this.$st("密码不够六位", "error")
        return;
      }

      this.$axios.get("/user/confirm/email/" + this.forgetEmail);
      Swal.fire({
        showConfirmButton: false,
        allowOutsideClick: false,
        title: '正在向 ' + this.forgetEmail + ' 发送验证邮件',
        // html: '将在 <strong></strong> 毫秒内发送完成',
        timer: 3000,
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          Swal.fire({
            allowOutsideClick: false,
            title: "验证邮件已发送，请输入验证码",
            input: 'text',
            inputAttributes: {
              autocapitalize: 'off'
            },
            confirmButtonText: '重置密码',
            showCancelButton: true,
            cancelButtonText: '取消',
          }).then((result) => {
            console.log(result)
            axios.post("/user/changePwd", {
              userPassword: this.userPassword,
              // userNewPassword: this.userPassword,
              userEmail: this.forgetEmail,
              captcha: result.value
            }).then(res => {
              if (res.data.code === 200) {
                this.forgetPwd = false
                this.$sa("密码修改成功，请登录", "success")
                this.$store.commit('changeLogin', true);


                resolve(res.data.code)
              } else {
                this.$st(res.data.data, 'error')
                reject(res.data)
              }
            })

          })
        }
      })
    },


  }

}
</script>
