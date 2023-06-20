<template>
  <myModal :visible="$store.state.chatVisible" :size="'lg'"
           @closeModal="()=>{$store.commit('changeChatVisible',!$store.state.chatVisible)}">
    <audio class="hidden" ref="audio" src="/source/audios/Windows%20Proximity%20Notification.wav"></audio>
    <div class="w-full h-full flex justify-start">
      <div class="w-1/6 lg:w-2/5 h-full overflow-auto">
        <div class="w-4/5  mx-auto my-2  text-sm invisible lg:visible">
          <el-autocomplete
              v-model="state"
              style="width: 100%; border-radius: 10px"
              :fetch-suggestions="querySearch"
              clearable
              popper-class="my-autocomplete"
              placeholder="搜索"
              @select="handleSelect"
              value-key="userNickname"
          />
        </div>
        <div class="w-4/5 mx-auto  justify-start items-center">
          <div v-for="(chat,index) in chats" :key="chat.user.userId"
               :class="{select:isSelected[index]}"
               class=" p-1 w-full rounded-xl  cursor-pointer transition
                border-2 border-white hover:bg-gray-100"
               @click="select(index)">

            <div class="h-full lg:h-4/5 lg:pl-2 mx-auto group flex justify-center lg:justify-start  items-center ">
              <a-badge :count="redPoint[index]" size="small"
                       style="float: left;line-height: 100%">
                <div class="h-full w-full  lg:w-10 lg:h-10 text1-center rounded-full ">
                  <avatar :user-id="chat.user.userId">
                    <user :user-id="chat.user.userId" :visible='showUserCard' :showUserId="showUserId">

                      <a class="relative block">
                        <img alt="profile" :src="p(chat.user.userProfilePhoto)"
                             class="mx-auto object-cover rounded-full h-10 w-10 "/>
                        <span
                            class="absolute w-3 h-3 transform -translate-x-1/2  border-2 border-white rounded-full left-1/2 -bottom-2"
                            :class="{'bg-gray-500':chat.user.userStatus==0,'bg-green-500':chat.user.userStatus==1}">
                        </span>
                      </a>
                    </user>
                  </avatar>
                </div>

              </a-badge>

              <div class="hidden h-16 overflow-hidden w-full  lg:block flex-col items-start p-2 justify-between">
                <div class="font-bold hidden lg:flex w-full text-sm justify-between items-center">
                  <span class="text-sm group-hover:text-indigo-600">{{ chat.user.userNickname }}</span>
                  <span class="text-xs text-gray-400">
                        {{ this.$simpleFormat(chat.record.recordUpdateTime) }}
                      </span>
                </div>
                <div id="uId" style="display: none">{{ chat.user.userId }}</div>
                <div id="content"

                     class=" hidden lg:inline  overflow-hidden text-xs text-gray-400"><span
                    v-html="chat.record.recordContent" class="truncate"></span></div>
              </div>

            </div>
            <hr>
          </div>
        </div>
      </div>


      <div class="w-5/6 lg:w-3/5 -mt-4 h-full flex-col justify-start items-center p-5">
        <div class="min-h-1/8  text-center w-full mx-auto -mt-2  space-y-0 flex-col justify-between items-center ">
          <div @click="()=>{this.$router.push('/user/'+talkTo.user.userId)}"
               class="text-base font-bold h-full min-h-full cursor-pointer">
            {{ talkTo.user.userNickname }}
          </div>
          <div class="">{{ talkTo.user.userPos }}</div>
        </div>
        <div id="chat" ref="chat"
             class="w-full h-2/3 bg-gray-100  rounded-xl p-3 overflow-auto"
             @wheel.capture="scrollRecord">

          <template v-for="(record,index) in talkTo.record" :key="index">
            <div v-if="timeDiff(index,index-1)"
                 class=" w-full h-auto my-1 text-center text-gray-400 text-sm"
                 id="updateTime">
              {{ this.$moments(record.recordUpdateTime) }}
            </div>

            <template v-if="record.userId == $store.state.user.userId">

              <div
                  class="w-full transition duration-300 ease-in flex-1 text-right  mb-1 flex float-right justify-end space-x-0.5  items-start"
                  :key="record.userId">
                <div class="flex-col justify-start items-end space-y-0.5">
                  <!--                      <div class="text-xs text-right">{{ $store.state.user.userNickname }}</div>-->
                  <div
                      class=" w-auto rounded-xl bg-indigo-600 hover:bg-indigo-500 cursor-pointer text-white shadow text-left text-xs p-2"><span
                      v-html="record.recordContent" id="message"></span></div>
                </div>
                <div class="min-w-10 min-h-10 rounded-full">
                  <!--                      <user v-slot="slotP" :user-id="record.userId">-->
                  <a-avatar
                      :src="p($store.state.user.userProfilePhoto)"
                      :style="{ backgroundColor:'#0eb73a', verticalAlign: 'middle' ,float:'right'}"
                      shape="circle"
                      size="middle"
                  >
                    {{ $store.state.user.userNickname }}
                  </a-avatar>
                  <!--                      </user>-->
                </div>


              </div>

            </template>
            <template v-else>
              <div class="w-full  mb-2 flex float-left justify-start  items-start"
                   :key="record.userId">

                <user v-slot="slotP" :user-id="record.userId">
                  <div class="flex justify-start space-x-1 items-start">
                    <div class="min-w-10 min-h-10 rounded-full">

                      <a-avatar
                          :src="p(slotP.photo)"
                          :style="{ backgroundColor:'#0eb73a', verticalAlign: 'middle' ,float:'right'}"
                          shape="circle"
                          size="middle"
                      >
                        {{ slotP.text }}

                      </a-avatar>
                    </div>
                    <div class="flex-col space-y-1 justify-start items-start">
                      <div v-if="talkTo.user.userId == -1"
                           class="text-xs w-auto text-left">{{
                          slotP.text
                        }}
                      </div>
                      <div

                          class="rounded-xl bg-white hover:bg-gray-100 cursor-pointer text-black shadow text-left text-xs p-2"><span
                          v-html="record.recordContent" id="message"></span>
                      </div>
                    </div>
                  </div>
                </user>


              </div>


            </template>
          </template>
        </div>
        <!--            </template>-->

        <!--            <div id="input" ref="input" contenteditable="true"  @keyup.enter="sendMessage"-->
        <!--                 aria-placeholder='请输入文字...'  >{{message}}</div>-->
        <!--            <textarea id="input" ref="input"  v-model="message" @keyup.enter="sendMessage"-->
        <!--                 placeholder='请输入文字...'  />-->
        <Toolbar
            :defaultConfig="toolbarConfig"
            :editor="editor"
            mode="simple"
            class="w-full h-8"
        />
        <div class="w-full relative border-2 h-1/4 bg-gray-100 overflow-auto rounded-xl">

          <Editor
              v-model="message"
              :defaultConfig="editorConfig1"
              mode="simple"
              style="width:100%;height:100%;"
              @onCreated="handleCreated"
              @onFocus="handleFocus"

              @keydown.enter.ctrl.capture.stop="insertNode"
              @keydown.enter.prevent="sendMessage"


          />
          <button
              class="absolute transition duration-300 bg-opacity-30 hover:bg-opacity-100 bottom-2 right-2 p-2 px-4 text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl"
              @click="sendMessage()">

            <!--                  <enter-outlined/>-->
            发送

          </button>
        </div>


      </div>

    </div>
  </myModal>
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
import {SlateTransforms} from '@wangeditor/editor'
import app from "@/main";

// Boot.use(ctrlEnterModule)
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
      showUserId: -2,
      showUserCard: false,
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
      toDown: true,
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
      connecting: false,
    }

  },

  created() {
    this.editorConfig1.MENU_CONF.uploadImage.server = this.baseURL + '/upload/file'
    this.editorConfig1.MENU_CONF.uploadVideo.server = this.baseURL + '/upload/file'
    this.getUsers();

    this.logoSrc = this.baseURL + '/source/images/logoTest.png'
    this.$nextTick(() => {
      this.redPoint = new Array(this.chats.length).fill(0)
      this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight
    })


    setInterval(() => {
      if (!this.ws || this.ws.readyState !== 1) {
        this.ws = this.connectSocket()
      }
    }, 3 * 1000)


  },
  mounted() {
    setTimeout(() => {
      this.$refs.chat.scrollTop = 10
      this.$refs.chat.addEventListener("scroll", this.scrollRecord)
    }, 500)
  },

  watch: {

    talkTo: {
      handler() {
        this.$nextTick(() => {
          if (this.toDown) {
            this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight
            this.toDown = false
          }


          this.$loading = false
          //给所有img标签添加点击事件
          let imgs = document.querySelectorAll('#chat #message img')
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


  },
  computed: {
    ...mapState(['addChat', 'chatVisible']),
    logined() {
      return this.$store.state.user != null
    },

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
      if (this.$refs.chat.scrollTop <= 5) {
        this.loadingRecord()
      }
    },


    getUsers() {
      // this.getChatList(this.$store.state.user.userId)
      this.$axios.get(this.baseURL + '/chat/list/' + this.$store.state.user.userId).then(res => {
        if (res.data.code === 200) {
          this.chats = res.data.data;
          this.chats.forEach(chat => {
            if (chat.record == null) {
              chat.record = {
                userId: -1,
                receiverId: -1,
                recordContent: '暂无消息记录，去找Ryker小助手聊聊吧！',
                recordUpdateTime: new Date().getTime(),
              }
            }
          })
          // console.log(this.chats)
          // TODO:这一段干啥的。。。
          // if (this.chats.length === 1) {
          //   this.chats[1].record = {
          //     userId: this.chats[0].user.userId,
          //     receiverId: this.chats[0].user.userId,
          //     recordContent: 'hello',
          //     recordUpdateTime: '2021-05-01 12:00:00',
          //   }
          // }
          // }
          var Ryker = [
            {
              user: {
                userId: 1,
                userNickname: 'Ryker小助手',
                userProfilePhoto: `${app.config.globalProperties.baseURL}/source/images/favicon.ico`,
                userStatus: 1,
              },
              record: {
                userId: 0,
                receiverId: 0,
                recordContent: '我是Ryker，有什么问题可以问我哦！',
                recordUpdateTime: new Date().getTime(),
              }
            }
          ]
          this.chats = Ryker.concat(this.chats)
          this.saveChatList(this.$store.state.user.userId, this.chats)

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
              this.$nextTick(() => {
                this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight
              })
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
      this.toDown = true

      this.talkTo.user = this.chats[index].user
      // 选中好友状态
      let isSelected = new Array(this.isSelected.length).fill(false)
      isSelected[index] = true
      this.isSelected = isSelected
      // 清空未读消息数
      this.redPoint[index] = 0

      //更新聊天记录
      //TODO:从localstorage中获取聊天记录
      this.talkTo.record = this.getChatRecord(this.$store.state.user.userId, this.talkTo.user.userId)
      if (this.talkTo.user.userId != 1) {
        this.$axios.get(this.baseURL + '/chat/connect/' + this.$store.state.user.userId + '/' + this.talkTo.user.userId).then(res => {
          if (res.data.code === 200) {
            this.currentPage = res.data.data.current;
            this.pages = res.data.data.pages;
            this.talkTo.record = res.data.data.records;
            this.talkTo.record.forEach(record => {
              record.recordContent = this.replaceURL(record.recordContent)
            })
            this.saveChatRecord(this.$store.state.user.userId, this.talkTo.user.userId, this.talkTo.record)

          } else {
            this.$st(res.data.data, "error")
          }
        })
      }
      this.editor.focus()
    }
    ,
    saveChatRecord(userId, talkToId, record) {
      let key = 'chatRecord#' + userId + '#' + talkToId
      let value = JSON.stringify(record)
      localStorage.setItem(key, value)
    },
    addAndSaveChatRecord(userId, talkToId, record) {
      var recordList = this.getChatRecord(userId, talkToId);
      recordList.push(record)
      this.saveChatRecord(userId, talkToId, recordList);
    },
    getChatRecord(userId, talkToId) {
      let key = 'chatRecord#' + userId + '#' + talkToId
      let value = localStorage.getItem(key)
      if (value === null) {
        return []
      }
      return JSON.parse(value)
    }
    ,
    saveChatList(userId, chats) {
      let key = 'chatList#' + userId
      let value = JSON.stringify(chats)
      localStorage.setItem(key, value)
    }

    , getChatList(userId) {
      let key = 'chatList#' + userId
      let value = localStorage.getItem(key)
      if (value === null) {
        return null
      }
      return JSON.parse(value)
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
      if (this.connecting || (this.ws != null && this.ws.readyState === 1)) return
      this.connecting = true;
      this.$store.commit('initSocket')
      let ws = this.$store.state.socket
      ws.onopen = this.onOpen
      // 收到消息
      ws.onmessage = this.onMessage
      // 关闭webSocket
      ws.onclose = this.onClose
      this.connecting = false;
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
    insertNode() {
      console.log('insertNode')
      this.editor.insertBreak()
    },

    sendMessage() {
      // console.log('sendMessage')
      // return;
      this.insertNode()
      this.$nextTick(() => {


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
          "recordContent": msg,
          "recordUpdateTime": new Date(),
          "isSaw": 0
        }

        this.toDown = true
        // if (this.ws.readyState !== 1) {
        //     this.ws = this.connectSocket()
        //     this.$nextTick(() => {
        //         this.sendMessage()
        //         return
        //     })
        // }

        try {
          this.ws.send(JSON.stringify(data))
        } catch (e) {
          // console.log(e)
          this.$st("连接失败，请刷新页面重试", 'error')
        }
        let d = {
          recordContent: this.replaceURL(msg),
          recordUpdateTime: new Date().getTime(),
          userId: this.$store.state.user.userId,
          receiverId: this.talkTo.user.userId
        }
        this.talkTo.record.push(d)
        if (this.talkTo.user.userId === 1) {
          this.addAndSaveChatRecord(d.userId, d.receiverId, d)
        }
        try {
          this.editor.clear()
          this.editor.focus()
        } catch (e) {
          console.error('清空编辑器出现问题，如可以正常使用，不必理会')
        }
      })
    },
    onMessage(event) {
      this.toDown = true
      let data = JSON.parse(event.data);
      // console.log(data)

      if (data.type === 1) {
        this.$st(data.recordContent, 'info')
        if (data.recordContent.indexOf(" 已上线") !== -1) {
          let index = data.recordContent.indexOf(" 已上线")
          let userName = data.recordContent.substring(0, index)
          let index2 = this.chats.findIndex(item => item.user.userNickname == userName)
          if (index2 !== -1) {
            this.chats[index2].user.userStatus = 1
          }
        }
      } else if (data.type === 2) {
        this.$st(data.recordContent, 'info')
        if (data.recordContent.indexOf(" 已下线") !== -1) {
          let index = data.recordContent.indexOf(" 已下线")
          let userName = data.recordContent.substring(0, index)
          let index2 = this.chats.findIndex(item => item.user.userNickname === userName)
          if (index2 !== -1) {
            this.chats[index2].user.userStatus = 0
          }
        }
      } else {
        const userId = data.userId;
        const receiverId = data.receiverId;
        if (userId === 1) {
          this.addAndSaveChatRecord(receiverId, userId, {
            recordContent: data.recordContent,
            recordUpdateTime: data.recordUpdateTime,
            userId: userId,
            receiverId: receiverId,
            recordId: new Date().getTime()
          })
          // return

        }
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
            recordContent: this.replaceURL(data.recordContent),
            recordUpdateTime: new Date().getTime(),
            userId: data.userId,
            receiverId: data.receiverId
          })
          if (data.userId !== 1) this.saveChatRecord(data.userId, data.receiverId, this.talkTo.record)
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
      //将data.recordContent中的img标签的src属性提取出来
      // let imgReg = /<img.*?(?:>|\/>)/gi;
      let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
      let arr = src.match(srcReg);
      if (arr != null) {
        if (arr[0] != null && arr[0] != undefined) {
          //将arr[0]的‘/source’前的字符串截取出来
          let index = arr[0].indexOf("/source")
          if (index !== -1) {
            let imgSrc = arr[0].substring(5, index)
            //将data.recordContent中的img标签的src属性替换为imgSrc
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


:deep(p img) {
  max-height: 200px !important;
  border-radius: 5px;
}

:deep(.chatting video) {
  width: 50% !important;
  border-radius: 5px;
}


:deep(.my-autocomplete) {
  font-size: 12px !important;
}


:deep(p img:hover) {
  cursor: pointer !important;
}


.select {
  background: #f3f4f6;

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

:deep(p) {
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