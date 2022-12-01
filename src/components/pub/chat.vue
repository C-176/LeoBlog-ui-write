<template>
  <transition name="fade">
    <div v-show="$store.state.chatVisible" class="whole">
      <audio ref="audio" hidden src="/source/audios/Windows%20Proximity%20Notification.wav"></audio>
      <a-tooltip id="close" style="position: fixed;top: 100px;right: 10px" title="关闭">
        <a-button shape="circle" size="large" style="position: absolute;top: 10px;right: 10px"
                  type="dashed"
                  @click="$store.commit('changeChatVisible',!$store.state.chatVisible)">
          <template #icon>
            <close-outlined/>
          </template>
        </a-button>
      </a-tooltip>
      <div class="chatWindow">
        <div class="logo">
          <img id="logo" :src="logoSrc" alt="">
        </div>

        <div class="chat">
          <div id="list">
            <!--            <a-input-search-->
            <!--                v-model:value="key"-->
            <!--                placeholder="搜索用户"-->
            <!--                style="width: 80%;padding:10px"-->
            <!--                @search="onSearch"-->
            <!--            />-->
            <el-autocomplete
                style="width: 80%;padding: 0 10px"
                v-model="state"
                :fetch-suggestions="querySearch"
                clearable
                class="inline-input w-50"
                popper-class="my-autocomplete"
                placeholder="搜索用户"
                @select="handleSelect"
                value-key="userNickname"
            />

            <div v-for="(chat,index) in chats" :key="chat.user.userId"
                 :class="{select:isSelected[index]}" class="user"
                 @click="select(index)">
              <div class="up">{{ this.$moments(chat.record.recordUpdateTime) }}</div>
              <div class="down">
                <a-badge :count="redPoint[index]" size="small" style="float: left;line-height: 100%">
                  <user :user="chat.user">
                    <a-avatar :class="{online:chat.user.userStatus}"
                              :src="p(chat.user.userProfilePhoto)"
                              :style="{backgroundColor:'#067061'}"
                              size="middle">
                      {{ chat.user.userNickname }}
                    </a-avatar>
                  </user>
                </a-badge>

                <div class="right">
                  <div id="uname">
                    <!--                    <router-link :to="'/user/'+chat.user.userId"> {{-->
                    <!--                        chat.user.userNickname-->
                    <!--                      }}-->
                    <!--                    </router-link>-->
                    {{ chat.user.userNickname }}
                  </div>
                  <div id="uId" style="display: none">{{ chat.user.userId }}</div>
                  <div id="content"><span v-html="chat.record.recordContent"></span></div>
                </div>

              </div>
            </div>
          </div>

          <div v-loading="$loading" class="chatMessage">
            <div class="userIntro">
              <div class="uname">
<!--                <router-link :to="'/user/'+talkTo.user.userId"> {{-->
<!--                    talkTo.user.userNickname-->
<!--                  }}-->
                {{talkTo.user.userNickname}}
<!--                </router-link>-->
              </div>
              <div class="address">{{ talkTo.user.userPos }}</div>
            </div>

            <div id="chat" ref="chat" class="chatting" @wheel.once="scrollRecord">
              <template v-if="showLoading">
                <div class="loading" style="text-align: center;">
                  <a-spin/>
                </div>

              </template>
              <template v-for="(record,index) in talkTo.record" :key="index">
                <div v-if="timeDiff(index,index-1)" id="updateTime">
                  {{ this.$moments(record.recordUpdateTime) }}
                </div>
                <template v-if="record.userId == $store.state.user.userId">


                  <div id="myBox" :key="record.userId">
                    <user v-slot="slotP" :user-id="record.userId">
                      <a-avatar
                          :src="p(slotP.photo)"
                          :style="{ backgroundColor:'#0eb73a', verticalAlign: 'middle' ,float:'right'}"
                          shape="circle"
                          size="middle"
                      >
                        {{ slotP.text }}
                      </a-avatar>
                    </user>
                    <a-dropdown :trigger="['contextmenu']">

                      <div id="myMessage"><span v-html="record.recordContent"></span></div>

                      <template #overlay>
                        <a-menu>
                          <a-menu-item key="1" @click="deleteRecord(record.recordId)">删除
                          </a-menu-item>
                          <a-menu-item key="3" @click="deleteRecord(record.recordId)">撤回
                          </a-menu-item>
                        </a-menu>
                      </template>
                    </a-dropdown>
                  </div>

                </template>
                <template v-else>
                  <div id="yourBox" :key="record.userId">
                    <user v-slot="slotP" :user-id="record.userId">
                      <a-avatar
                          :src="p(slotP.photo)"
                          :style="{ backgroundColor: '#067061'  ,verticalAlign: 'middle' ,float:'left'}"
                          shape="circle"
                          size="middle"
                      >
                        {{ slotP.text }}
                      </a-avatar>
                    </user>

                    <a-dropdown :trigger="['contextmenu']">
                      <div id="yourMessage"><span v-html="record.recordContent"></span></div>


                      <template #overlay>
                        <a-menu>
                          <a-menu-item key="2">回复</a-menu-item>
                        </a-menu>
                      </template>
                    </a-dropdown>
                  </div>


                </template>
              </template>
            </div>


            <!--            <div id="input" ref="input" contenteditable="true"  @keyup.enter="sendMessage"-->
            <!--                 aria-placeholder='请输入文字...'  >{{message}}</div>-->
            <!--            <textarea id="input" ref="input"  v-model="message" @keyup.enter="sendMessage"-->
            <!--                 placeholder='请输入文字...'  />-->
            <Toolbar
                :defaultConfig="toolbarConfig"
                :editor="editor"
                mode="simple"
                style="margin-top: 0px;height: 20px;padding: 0;"
            />
            <div id="input" contentEditable="false">

              <Editor
                  v-model="message"
                  :defaultConfig="editorConfig1"
                  mode="simple"
                  style="width:100%;margin-top: -12px;"
                  @onCreated="handleCreated"
                  @onFocus="handleFocus"

                  @keydown.enter.native="send"


              />
              <a-button id="enter" :loading="submitting" shape="round"
                        @click="sendMessage()">
                <template #icon>
                  <!--                  <enter-outlined/>-->
                  发送
                </template>
              </a-button>
            </div>


          </div>
        </div>

      </div>

    </div>

  </transition>
  <!--  显示放大图片的组件-->
  <big-img :visible="photoVisible" :url="bigImgUrl" @closeClick="()=>{photoVisible=false}"></big-img>
</template>

<script>
import {CloseOutlined, EnterOutlined} from '@ant-design/icons-vue';
import user from "@/components/pub/user";
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import {Editor, Toolbar} from '@wangeditor/editor-for-vue'
import Swal from "sweetalert2";
import {Boot} from '@wangeditor/editor'
import ctrlEnterModule from '@wangeditor/plugin-ctrl-enter'
import {mapState} from "vuex";
import bigImg from "@/components/pub/bigImg";

Boot.registerModule(ctrlEnterModule)
export default {
  name: 'chat',
  components: {
    CloseOutlined,
    EnterOutlined,
    user,
    Editor, Toolbar,
    bigImg

  },
  data() {
    return {
      showLoading: false,
      currentPage: 1,
      pageSize: 50,
      pages: 0,
      loadingTime: new Date().getTime(),

      submitting: false,
      logoSrc: '',
      key: '',
      count: 1,
      talkTo: {
        user: {
          userId: '',
          userNickname: '',
          userAddress: '',
        },
        record: [{
          recordId: -1,
          userId: -1,
          receiverId: -1,
          recordContent: '聊天记录加载中...',
          recordUpdateTime: '2021-05-01 12:00:00',
        }]
      },
      chats: [
        //     {
        //   user: {
        //     userId: 1,
        //     userStatus: 0,
        //     userNickname: 'LeoBlog',
        //     userProfilePhoto: 'http://localhost:8080/source/images/default_pic.png',
        //     userAddress: '江苏南京',
        //     userIntro: 'LeoBlog',
        //   },
        //   record: {
        //     userId: 1,
        //     receiverId: 1,
        //     recordContent: 'hello',
        //     recordUpdateTime: '2021-05-01 12:00:00',
        //   }
        // }
      ],
      record: {
        userId: 1,
        receiverId: 1,
        recordContent: 'hello',
        recordUpdateTime: '2021-05-01 12:00:00',
      },
      photoVisible: false,
      bigImgUrl: "",
      chatter: null,
      isSelected: [],
      redPoint: [],
      ws: null,
      message: '',
      editor: null,
      editorConfig1: {
        MENU_CONF: {
          uploadImage: {
            // 上传图片的配置
            server: "http:localhost:8080/upload/file", // 上传图片的服务器地址
            fieldName: 'file', // 上传图片的字段名
            // 单个文件的最大体积限制，默认为 2M
            maxFileSize: 10 * 1024 * 1024, // 1M
            // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
            allowedFileTypes: ['image/*'],
            // 小于该值就插入 base64 格式（而不上传），默认为 0
            base64LimitSize: 0.5 * 1024 * 1024, // 2M
          },
          uploadVideo: {
            server: "http:localhost:8080/upload/file", // 上传图片的服务器地址
            fieldName: 'file', // 上传图片的字段名
            // 自定义上传参数，例如传递验证的 token 等。参数会被添加到 formData 中，一起上传到服务端。
            meta: {
              token: localStorage.getItem('token'),
            },
            // 自定义增加 http  header
            headers: {
              Authorization: localStorage.getItem('token')
            },
            // // 跨域是否传递 cookie ，默认为 false
            // withCredentials: true,
            // 单个文件的最大体积限制，默认为 10M
            maxFileSize: 10 * 1024 * 1024, // 10M

            // 超时时间，默认为 30 秒
            timeout: 30 * 1000, // 15 秒
            // 单个文件上传失败
            onFailed(file, res) {
              console.log(`${file.name} 上传失败`, res)
            },
            onSuccess(file, res) {
              console.log(`${file.name} 上传成功`, res)
            },
            // 上传错误，或者触发 timeout 超时
            onError(file, err, res) {
              if (err.message.includes('MB')) {
                Swal.fire({
                  icon: 'warning',
                  text: '视频大小不能超过10MB',
                })
              }
              console.log(`${file.name} 上传出错`, err, res)

            },

          }
        }
      },
      toolbarConfig: {
        toolbarKeys: [
          'emotion', '|',
          'uploadImage', '|',
          'uploadVideo', '|',
        ]
      },
      state: '',
    }

  },

  created() {
    this.editorConfig1.MENU_CONF.uploadImage.server = this.baseURL + '/upload/file'
    this.editorConfig1.MENU_CONF.uploadVideo.server = this.baseURL + '/upload/file'
    this.getUsers();
    // setInterval(() => {
    //   this.getUsers()
    // }, 10000)
    this.logoSrc = this.baseURL + '/source/images/logoC.png'
    this.$nextTick(() => {
      this.redPoint = new Array(this.chats.length).fill(0)
      this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight


    })


    this.ws = this.connectSocket()
    setTimeout(() => {
      this.$refs.chat.addEventListener("scroll", this.scrollRecord)
    }, 1000)

  },
  watch: {
    talkTo: {
      handler() {
        this.$nextTick(() => {
          // this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight
          this.$loading = false
          //给所有img标签添加点击事件
          let imgs = document.querySelectorAll('#chat #myMessage img, #chat #yourMessage img')
          if (imgs.length != 0) {
            imgs.forEach((item) => {
              item.addEventListener('click', () => {
                this.photoVisible = true
                this.bigImgUrl = item.src
              })
            })
          }
        })
      },
      deep: true
    },
    chats: {
      handler() {
        this.$nextTick(() => {
          this.select(1)
          this.getStatus()
        })
      },
      deep: true
    },
    addChat(val) {
      if (val != -1) {
        //查找是否有该用户
        let index = this.chats.findIndex(item => item.user.userId == val)
        if (index != -1) {
          this.select(index)
          return
        }
        this.getUsers()
        this.$nextTick(() => {
          // this.talkTo = this.chats[this.chats.length - 1]
          let index = this.chats.findIndex(item => item.user.userId == val)
          if (index != -1) {
            this.select(index)
            return
          } else {
            console.log('没找到要聊天的用户')
          }
        })
        this.$store.commit('changeAddChat', -1)
      }


    },

    // message(val) {
    //   if (val == '' || val == '<p><br></p>') {
    //     this.editor.focus()
    //   }
    // },


  },
  computed: {
    ...mapState(['addChat', 'chatVisible'])
  },

  methods: {
    querySearch(queryString, cb) {
      let results = null;
      if (this.state.trim() == '') {
        // 返回chats中每个元素的user对象
        let users = this.chats.map(item => item.user)
        results = users
      } else {
        let users = this.chats.map(item => item.user)
        results = users.filter((item) => {
          return item.userNickname.indexOf(this.state.trim()) > -1
        })
        if (results.length == 0) {
          results = {userNickname: '没有该用户'}
        }
      }

      // 调用 callback 返回建议列表的数据
      cb(results);
    },


    handleSelect(item) {
      this.select(this.chats.findIndex(i => i.user.userNickname == item.userNickname))
      this.state = ''
    },

    handleFocus() {
      this.editor.focus()
    },
    handleCreated(editor) {
      this.editor = Object.seal(editor)
      this.editor.focus()
      // console.log(this.editor.getAllMenuKeys());
    },
    getStatus() {
      const ids = this.chats.map(chat => chat.user.userId);
      this.$axios.post(this.baseURL + "/net/list/status", {
        ids: ids
      }).then(res => {
        if (res.data.code === 200) {
          this.chats.forEach((chat, index) => {
            chat.user.userStatus = res.data.data[index];
          })
        } else {
          this.$st(res.data.data, 'error')
        }
      })
    },
    scrollRecord() {
      if (this.$refs.chat.scrollTop == 0) {
        this.loadingRecord()
      }
    },


    getUsers() {
      this.$axios.get(this.baseURL + '/chat/list/' + this.$store.state.user.userId).then(res => {
        if (res.data.code === 200) {
          if (res.data.data == "暂无聊天对象") {
            this.$st("暂无聊天对象，快去找人聊天吧", "info");
          } else {
            this.chats = res.data.data;
            this.chats.forEach(chat => {
              if (chat.record == null) {
                chat.record = {
                  userId: -1,
                  receiverId: -1,
                  recordContent: '暂无消息记录',
                  recordUpdateTime: new Date().getTime(),
                }
              }
            })
            // console.log(this.chats)
            if (this.chats.length === 1) {
              this.chats[1].record = {
                userId: this.chats[0].user.userId,
                receiverId: this.chats[0].user.userId,
                recordContent: 'hello',
                recordUpdateTime: '2021-05-01 12:00:00',
              }
            }
          }

          this.$nextTick(() => {
            if (!this.isSelected[0]) {
              this.talkTo.user = this.chats[1].user;
              let isSelected = []
              for (let i = 0; i < this.chats.length; i++) {
                if (this.chats[i].user.userId === this.talkTo.user.userId) {
                  isSelected.push(true)
                } else {
                  isSelected.push(false)
                }
              }
              this.isSelected = isSelected
            }


          })

        } else {
          this.$st("获取聊天对象失败", "error");
        }


      })
    },
    onSearch() {
      let x = this.key.trim()
      if (x !== '') {
        //遍历chats，选出user.userNickname中包含key的
        let a = []
        for (let i = 0; i < this.chats.length; i++) {
          if (this.chats[i].user.userNickname.indexOf(x) !== -1) {
            a.push(this.chats[i])
          }
        }

        if (a.length === 0) {
          this.$st("未查到相关用户", 'error')
        } else {
          let b = []
          for (let i = 0; i < this.chats.length; i++) {
            if (this.chats[i].user.userNickname.indexOf(x) === -1) {
              b.push(this.chats[i])
            }
          }
          this.chats = a.concat(b)
          this.select(0)
          this.key = ''
        }
      }
    }
    ,
    loadingRecord() {
      if (new Date().getTime() - this.loadingTime < 3000) {
        return
      }

      this.currentPage++;
      if (this.currentPage <= this.pages) {
        this.showLoading = true
        //更新聊天记录
        this.$axios.get(this.baseURL + '/chat/record/list/' + this.$store.state.user.userId + '/' + this.talkTo.user.userId + '/' + this.currentPage + '/' + this.pageSize).then(res => {
          if (res.data.code === 200) {
            this.currentPage = res.data.data.current;
            this.pages = res.data.data.pages;
            const record = res.data.data.records;
            record.forEach(record => {
              record.recordContent = this.replaceURL(record.recordContent)
            })
            this.talkTo.record = record.concat(this.talkTo.record)
          } else {
            this.$st(res.data.data, "error")
          }
        })
        this.loadingTime = new Date().getTime()
        this.$nextTick(() => {
          setTimeout(() => {
            this.$refs.chat.scrollTop = 10
            this.showLoading = false
          }, 500)
        })
      }


      this.editor.focus()

    },
    select(index) {

      this.talkTo.user = this.chats[index].user

      let isSelected = []
      for (let i = 0; i < this.chats.length; i++) {
        if (this.chats[i].user.userId === this.talkTo.user.userId) {
          isSelected.push(true)
        } else {
          isSelected.push(false)
        }
      }
      this.isSelected = isSelected
      this.redPoint[index] = 0
      //更新聊天记录
      this.$axios.get(this.baseURL + '/chat/connect/' + this.$store.state.user.userId + '/' + this.talkTo.user.userId).then(res => {
        if (res.data.code === 200) {
          this.currentPage = res.data.data.current;
          this.pages = res.data.data.pages;
          this.talkTo.record = res.data.data.records;
          this.talkTo.record.forEach(record => {
            record.recordContent = this.replaceURL(record.recordContent)
          })

        } else {
          this.$st(res.data.data, "error")
        }
      })
      this.editor.focus()
      console.log(this.talkTo.user.userNickname)
    }
    ,

    timeDiff(index1, index2) {
      if (index1 === 0) {
        return true
      }
      let time1 = this.talkTo.record[index1].recordUpdateTime
      let time2 = this.talkTo.record[index2].recordUpdateTime
      //将time转化为日期类型
      let date1 = new Date(time1)
      let date2 = new Date(time2)
      //获取两个日期的时间戳
      let diff = date1.getTime() - date2.getTime()
      //如果差值大于10分钟，打印时间差
      return (diff / 60000) > 10
    },

    connectSocket() {
      this.$store.commit('initSocket')
      let ws = this.$store.state.socket
      ws.onopen = this.onOpen
      // 收到消息
      ws.onmessage = this.onMessage
      // 关闭webSocket
      ws.onclose = this.onClose
      return ws;
    },
    /* 压缩base64图片，怎么压缩base64是题外话，这里不赘述 */
    compress(base64, rate, callback) {
      //处理缩放，转格式
      var _img = new Image();
      _img.src = base64;
      _img.onload = function () {
        var _canvas = document.createElement("canvas");
        var w = this.width / rate;
        var h = this.height / rate;
        _canvas.setAttribute("width", w);
        _canvas.setAttribute("height", h);
        _canvas.getContext("2d").drawImage(this, 0, 0, w, h);
        var base64 = _canvas.toDataURL("image/jpeg");
        _canvas.toBlob(function (blob) {
          if (blob.size > 1334) {        //如果还大，继续压缩
            this.compress(base64, rate, callback);
          } else {
            callback(base64);
          }
        }, "image/jpeg");
      }
    },
    send() {
      //监听ctrl+enter
      if (event.ctrlKey && event.keyCode === 13) {
        // this.message += '<p><br></p>'
        // console.log(this.message)
        return
      } else {
        // console.log(this.message)
        this.sendMessage()
      }
    },
    sendMessage() {
      let msg = this.message.replaceAll('<p><br></p>', '').trim()
      if (msg === '' || msg === '<p><br></p>') {
        this.$st("消息不能为空", 'error')
        return
      }
      // this.message += '<p><br></p>'

      this.submitting = true
      // console.log(msg.length)
      let data = {
        "userId": this.$store.state.user.userId,
        "receiverId": this.talkTo.user.userId,
        "message": msg,
        "update_time": new Date(),
      }

      // if (this.ws.readyState !== 1) {
      //   this.ws = this.connectSocket()
      //   this.$nextTick(() => {
      //     console.log(this.ws.readyState)
      //   })
      // }
      if (this.ws.readyState !== 1) {
        this.ws = this.connectSocket()
        this.$nextTick(() => {
          this.sendMessage()
          return
        })
      }

      try {
        this.ws.send(JSON.stringify(data))
      } catch (e) {
        // console.log(e)
        this.$st("连接失败，请刷新页面重试", 'error')
      }

      // this.$st("发送成功", 'success')
      // this.select(this.chats.findIndex(item => item.user.userId === this.talkTo.user.userId))
      // this.record.recordContent = this.replaceURL(msg)
      // this.record.recordUpdateTime = new Date().getTime()
      // this.record.userId = this.$store.state.user.userId
      // this.record.receiverId = this.talkTo.user.userId
      this.talkTo.record.push({
        recordContent: this.replaceURL(msg),
        recordUpdateTime: new Date().getTime(),
        userId: this.$store.state.user.userId,
        receiverId: this.talkTo.user.userId
      })
      this.$nextTick(() => {
        this.submitting = false
        this.editor.clear()
        this.$nextTick(() => {
          this.editor.focus()
        })
      })
    },
    onMessage(event) {
      let data = JSON.parse(event.data);
      // console.log(data)

      if (data.type === 1) {
        this.$st(data.message, 'info')
        if (data.message.indexOf("已连接") !== -1) {
          let index = data.message.indexOf("已连接")
          let userName = data.message.substring(0, index)
          let index2 = this.chats.findIndex(item => item.user.userNickname == userName)
          if (index2 !== -1) {
            this.chats[index2].user.userStatus = 1
          }
        }
      } else if (data.type === 2) {
        this.$st(data.message, 'info')
        if (data.message.indexOf("已断开连接") !== -1) {
          let index = data.message.indexOf("已断开连接")
          let userName = data.message.substring(0, index)
          let index2 = this.chats.findIndex(item => item.user.userNickname == userName)
          if (index2 !== -1) {
            this.chats[index2].user.userStatus = 0
          }
        }
      } else {
        const userId = data.userId;
        const receiverId = data.receiverId;
        if (this.$store.state.chatVisible == false) {
          this.$store.commit('changeChatPoint', this.$store.state.chatPoint + 1)
          //查找是否有该用户
          let index = this.chats.findIndex(item => item.user.userId == userId)
          if (index == -1 && receiverId != -1) {
            this.getUsers()
            // this.$nextTick(() => {
            //   // this.talkTo = this.chats[this.chats.length - 1]
            //   let index = this.chats.findIndex(item => item.user.userId == val)
            //   if (index != -1) {
            //     this.select(index)
            //     return
            //   } else {
            //     console.log('没找到要聊天的用户')
            //   }
            // })
          }


        } else {
          this.$store.commit('changeChatPoint', 0)
          let index = this.chats.findIndex(item => item.user.userId == userId)
          if (index == -1 && receiverId != -1) {
            this.getUsers()
          }
        }


        if ((userId == this.talkTo.user.userId && receiverId == this.$store.state.user.userId) || (this.talkTo.user.userId == -1 && data.receiverId == -1 && this.$store.state.user.userId != userId)) {
          //如果是当前聊天对象发来的消息
          // this.select(this.chats.findIndex(item => item.user.userId === this.talkTo.user.userId))
          this.talkTo.record.push({
            recordContent: this.replaceURL(data.message),
            recordUpdateTime: new Date().getTime(),
            userId: data.userId,
            receiverId: data.receiverId
          })
        } else {
          if (receiverId == -1 && this.$store.state.user.userId != userId) {
            if (this.redPoint[0] == undefined) {
              this.redPoint[0] = 1
            } else {
              this.redPoint[0]++
            }
          } else {
            this.chats.forEach((item, index) => {
              if (item.user.userId === userId) {
                if (this.redPoint[index] == undefined) {
                  this.redPoint[index] = 1
                } else {
                  this.redPoint[index]++
                }
              }
            })
          }

        }
        if (userId != this.$store.state.user.userId) {
          //提示音效
          this.$refs.audio.play()
        }

      }
    },
    replaceURL(src) {
      //将data.message中的img标签的src属性提取出来
      // let imgReg = /<img.*?(?:>|\/>)/gi;
      let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
      let arr = src.match(srcReg);
      if (arr != null) {
        if (arr[0] != null && arr[0] != undefined) {
          //将arr[0]的‘/source’前的字符串截取出来
          let index = arr[0].indexOf("/source")
          if (index !== -1) {
            let imgSrc = arr[0].substring(5, index)
            //将data.message中的img标签的src属性替换为imgSrc
            // console.log(arr[0], arr[0].replace(imgSrc, this.baseURL))
            src = src.replace(arr[0], arr[0].replace(imgSrc, this.baseURL))
          }
        }
      }
      // console.log(src)
      return src
    },
    clearPageInfo() {
      this.currentPage = 1
    }
    ,
    onOpen() {
      // this.$st("连接成功", 'success')
    }
    ,
    onClose(e) {
      console.log('websocket 断开: ' + e.code + ' ' + e.reason)
    }
    ,
    deleteRecord(recordId) {
      if (recordId == undefined) {
        this.select(this.chats.findIndex(item => item.user.userId === this.talkTo.user.userId))
        this.$message.info("请执行二次删除")
        return
      }
      this.$axios.delete(this.baseURL + '/chat/record/' + recordId).then(res => {
        if (res.data.code === 200) {
          // this.$st("删除成功", 'success')
          this.talkTo.record = this.talkTo.record.filter(item => item.recordId !== recordId)
        } else {
          this.$st(res.data.data, "error")
        }
      })


    }
  }

}


</script>

<style scoped>
#updateTime {
  display: inline-block;
  width: 100%;
  font-size: 12px;
}


.whole {
  z-index: 110 !important;
  position: fixed;
  top: 60px;
  background: #fff;
  height: 630px !important;
  width: 65%;
  border-radius: 10px !important;
  /*margin-top: 60px;*/
  margin-left: calc(17.5%) !important;

}

.chatWindow {
  width: 100%;
  height: 100%;
  border-radius: 0 30px 30px 0;

}

.online {
  border: 2px #0eb63a solid;
}

#enter {
  color: #7c929c;
  border-color: #7c929c;
  position: absolute;
  margin-left: -100px;
  margin-top: calc(4%);
}

/*#editor—wrapper p{*/
/*  margin:0;*/
/*}*/
/*#toolbar-container { border-bottom: 1px solid #ccc; }*/
/*#editor-container { height: 500px; }*/
:deep( #input p) {
  margin: 3px !important;
}

#enter:hover {
  background: #eaeef0;
}

.logo::before {
  display: inline-block;
  content: "";
  height: 100%;
  vertical-align: middle;
}

.logo {
  width: 20%;
  height: 8%;
  text-align: left;
  font-size: 14px;
  font-weight: 600;
  padding-left: 30px;
}

#logo {
  width: 100%;
  height: 100%;

}

.chat {
  height: 90%;
  width: 100%;
}

#list, .chatMessage {
  float: left;
}

#list {
  width: 40%;
  height: 100%;
  overflow: auto;
}

.user {
  width: 80%;
  height: 11%;
  background: #ecf0f2;

  margin: 10px auto;
  padding: 2px 10px;
  border-radius: 10px;
  transition: all 0.3s;
  border: 2px solid #fdfdfd;

}

.user:hover {
  cursor: pointer;
  border: 2px solid #838ea4;
}


.user .up {
  height: 20%;
  text-align: right;
  font-size: 10px;
  color: #0f6674;
  padding-right: 5px;

}

.user .down {
  margin-top: 5px;
  height: 75%;
}


.right {
  float: left;
  margin-left: 20px;
  width: 70%;
  height: 100%;
}

.right #uname {
  font-size: 14px;
  font-weight: 600;
  height: 50%;
  /*background: #00ff80;*/
}

.right #content {
  font-size: 12px;
  height: 40%;
  /*height: 12px;*/
  /*background: #cf0f0f;*/
  /* 内容溢出隐藏 */
  overflow: hidden;
  /* 设置文本不换行 */
  white-space: nowrap;
  /* 元素溢出省略号 */
  text-overflow: ellipsis;
  color: #7c929c;
}

.right #uname::before {
  display: inline-block;
  content: "";
  height: 100%;
  vertical-align: middle;
}


.right #uname, .right #content {

  width: 100%;


  /*line-height: 25px;*/
  text-align: left;
}


.chatMessage {
  width: 50%;

  height: 100%;
  padding: 10px;
  /*margin-left: 30px;*/

}

:deep(p img) {
  width: 100% !important;
  border-radius: 5px;
}
:deep(.chatting video){
  width: 100% !important;
  border-radius: 5px;
}



.chatMessage .userIntro {
  width: 100%;
  height: 10%;
  text-align: center;
  margin-top: -50px;
}

.userIntro .uname, .userIntro .address {
  /*width: 20%;*/
  height: 50%;
  margin: 0 auto;
  text-align: center;
  font-size: 14px;
}

.userIntro .uname {
  font-size: 16px;
  font-weight: 600;
}

:deep(.my-autocomplete){
  font-size: 12px !important;
}

.userIntro .address {

}

.chatting {
  height: 80%;
  width: 100%;
  background: #ecf0f2;
  /*margin: 10px 0;*/
  border-radius: 20px;
  padding: 10px 10px;
  overflow: auto;
  /*transition: all .3s;*/

}

#input {
  margin-top: 20px;
  width: 100%;
  height: 17%;
  /*background: #848fa5;*/
  border-radius: 10px;
  text-align: left;
  line-height: 20px;
  font-size: 14px;
  padding-top: 10px;
  border: 1px solid #838ea4;
  overflow: auto;
  resize: none;
  outline: none;
}

#input div {
  float: left;
}

#myMessage, #yourMessage {
  font-size: 13px;
  line-height: 25px;
  border-radius: 12px;
  padding: 5px 10px;
  max-width: 80%;
  text-align: left;
  word-break: break-all;

  /*margin-top: 10px;*/
}

:deep(p img:hover) {
  cursor: pointer !important;
}

#myBox {
  max-width: 60%;
  margin-left: 40%;
  float: right;
  margin-bottom: 10px;
}

#yourBox {
  max-width: 60%;
  margin-right: 40%;
  float: left;
  margin-bottom: 10px;
}

#myMessage {
  float: right;
  background: #134857;
  color: #fff;
  box-shadow: 1px 1px 3px #134857;
  margin-right: 10px;

}

#yourMessage {
  float: left;
  color: #000;
  background: #fdfdfd;
  box-shadow: 1px 1px 3px #d8e3e7;
  margin-left: 10px;


}


.select {
  /*width: 80%;*/
  /*height: 12%;*/
  border: 2px solid #838ea4;
  /*background: #838ea4;*/

}

:deep(.ant-btn-dashed:hover) {
  color: #eaeef0 !important;
  transition: all .2s;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

:deep(.chat p) {
  padding: 0 !important;
  margin-bottom: 0 !important;
}

:deep(#input img) {
  width: 30% !important;
}

/*滚动条样式*/
::-webkit-scrollbar {

}


</style>