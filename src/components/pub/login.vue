<template>
  <div class="main">
    <div class="right">
      <form action="javascript:void(0)">
        <h3>{{ login ? "用户名/邮箱" : "用户名" }}</h3>
        <input v-model="userName" autocomplete="off" autofocus name="userName">
        <template v-if="!login">
          <h3>邮箱</h3>
          <input v-model="userEmail" autocomplete="off" id="userEmail" type="email">
        </template>
        <h3>密码</h3>
        <input v-model="userPassword" autocomplete="new-password" required type="password">
        <template v-if="login">
          <h3>验证码</h3>
          <input v-model="captcha" name="captcha" placeholder="" type="text" autocomplete="off">
          <a-tooltip>
            <template #title>刷新验证码</template>
            <a>
              <img id="codeImg" :src="captchaUrl" :style="{marginTop: 10+'px',borderRadius:5+'px'}" alt="" @click="refreshCaptCha"></a>
          </a-tooltip>
        </template>
        <template v-else>
          <h3>确认密码</h3>
          <input v-model="reUserPassword" autocomplete="of" id="reUserPassword" required type="password">
        </template>

        <div v-if="login" id="login">
          <input v-model="rememberMe" name="rememberMe" type="checkbox">
          <span>记住密码</span>
          <a class="changePwd" @click="changePwd">忘记密码</a>
          <a class="changePwd" @click="alertTest">测试用户</a>
        </div>
        <button class="login1" @click="LR">{{ login ? "登陆" : "注册" }}</button>



      </form>
    </div>

  </div>

</template>

<script>
import Swal from 'sweetalert2'
import axios from "axios";
import {decode, encode} from '@/util/AES'


export default {
  name: 'login',
  // props:[''],
  data() {
    return {
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

    }
  },
  created() {
    //记住密码  恢复密码
    let uname = localStorage.getItem(encode('userName'))
    let upwd = localStorage.getItem(encode('userPassword'))
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
    login(val, oldVal) {
      if (val == false) {
        this.userName = ''
        this.userPassword = ''
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
            userName: this.userName,
            userPassword: this.userPassword,
            captcha: this.captcha,
          }).then(res => {
            if (res.data.code === 200) {
              if (this.rememberMe) {
                // 向localStorage中存储Md5加密后的用户名和密码
                localStorage.setItem(encode('userName'), encode(this.userName))
                localStorage.setItem(encode('userPassword'), encode(this.userPassword))
              }
              this.$st("登陆成功", "success")
              let map = res.data.data
              let token = map.token
              let user = map.user

              // 将token存到localStorage中
              // console.log("将token存到localStorage中： " + token)
              this.$store.commit("setToken", token)
              this.$store.commit("setUser", user)
              this.$router.push('/home')
              resolve(res)
            } else {
              this.$sa(res.data.data, 'error')
              this.refreshCaptCha()
              reject(res)
            }
          })
        } else {
          // console.log(this.userPassword, this.reUserPassword)
          //密码不能为空
          if (this.userPassword.trim() === '' || this.reUserPassword.trim() === '') {
            this.$sa("密码不能为空", 'error')
            return
          }
          //验证两次密码是否一致
          if (this.userPassword !== this.reUserPassword) {
            this.$sa("两次密码不一致", "error")
            return;
          }
          //密码不够六位
          if (this.userPassword.length < 6) {
            this.$sa("密码不够六位", "error")
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
                      this.$store.commit('setToken', res.data.data.token)

                      resolve(res.data.code)
                    } else {
                      this.$st(res.data.data, 'error')
                      reject(res.data)
                    }
                  })
                }
              })
            }
          })

        }
      })
    },

    refreshCaptCha() {
      // console.log(localStorage.getItem("token"));
      this.captchaUrl = this.baseURL + "/user/getCaptcha?time=" + new Date().getTime() + '&token=' + localStorage.getItem("token")
    },
    changePwd() {
      this.$sa("请联系管理员修改密码\n微信: RTX1999", "warning")
    },


  }

}
</script>

<style scoped>
.main {
  background: rgba(44, 62, 80, 0.2);
  width: 400px;
  padding: 10px;
  border-radius: 15px;
}

#login {
  /*position: relative;*/
  /*padding: 10px 35px 0 35px;*/
  height: 40px;
  width: 330px;
  /* padding-left: 35px; */
  text-align: center;
  margin: 0 auto;
  /*background: #7c929c;*/
}

#login input {
  float: left;
  display: inline-block;
  height: 20px;
  line-height: 40px;
  width: 20px;
  margin-top: 10px;
}

.login1 {
  margin: auto;
}

#login span {
  float: left;
  display: inline-block;
  height: 40px;
  width: 80px;
  line-height: 40px;
  margin-left: 5px;
}

#login .changePwd:hover {
  /*background-color: #7c929c;*/
  color: #fff !important;
  transition: background-color 0.2s;
}

#login .changePwd {
  /* padding-top: 10px; */
  float: right;
  width: 80px;
  margin-top: 5px;
  height: 30px;
  /*margin-left: 210px;*/
  line-height: 30px;
  border-radius: 10px;
}

.right form h3 {
  margin: auto;
  height: 35px;
  width: 300px;
  text-align: center;
  line-height: 35px;
  color: #134857;
  /* color: #339fd5; */
  font-weight: 600;
  font-size: 18px;
}

.right form input {
  color: #d8e3e7;
  height: 35px;
  margin-bottom: 10px;
  width: 330px;
  border-radius: 5px;
  text-align: center;
  font-size: 18px;
  border-width: 0;
  font-weight: 600;
  border-bottom: #5cb3cc57 solid 5px;
  transition: background-color 0.2s;
  /* background: #134857; */
  background: #11334475;
}

.right form input:hover {
  background-color: rgb(43 86 113);
  transition: all 0.2s;
  outline: none;
}

.login1 {
  /*position: relative;*/
  /* bottom: -35px; */
  /* right: -162px; */
  display: block;
  height: 40px;
  width: 70px;
  background-color: #134857;

  border-width: 0;

  color: #d8e3e7;
  border-radius: 20px;
  font-size: 18px;
  font-weight: 600;
}


.right .login1:hover {
  background-color: #132c33;
  transition: background-color 0.5s;
}
</style>