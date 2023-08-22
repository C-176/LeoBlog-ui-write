<template>

  <div id="cursorDiv" ref="cursorDiv"

       class="w-full relative flex justify-center overscroll-contain
             overflow-x-hidden  rounded-xl p-3 overflow-auto  max-h-80"
  >
    <div
        :class="{'hidden':isLoading == 0,
        'top-0':isLoading == -1,'bottom-0':isLoading == 1}"
        class="flex  w-full z-20 absolute items-center justify-center transition-all duration-500">
      <button class="inline-flex text-center justify-center w-full items-center p-2 shadow-2xl
            text-indigo-600 text-sm backdrop-blur-sm cursor-not-allowed" disabled="">
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg"
             fill="none"
             viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>

      </button>
    </div>

    <div ref="listItem" class="flex-col  w-full items-center space-y-3 " v-if="$store.state.user != null">
      <slot v-bind:list="list">

      </slot>
    </div>

  </div>

  <div class="w-full relative  h-1/4 bg-gray-100  rounded-xl">
    <div
        @click="loadingLast"
        :class="{'hidden':!hasNewMessage,'visible':hasNewMessage,
                            }"
        class="-top-20 right-20 flex cursor-pointer  w-full z-40 absolute items-center justify-end transition-all duration-500">
      <div
          class="animate-bounce bg-white dark:bg-slate-800 p-2 w-8 h-8 ring-1 ring-slate-900/5 dark:ring-slate-200/20
                                shadow-lg rounded-full flex items-center justify-center">
        <svg class="w-6 h-6 text-violet-500" fill="none" stroke-linecap="round" stroke-linejoin="round"
             stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </div>
  </div>


</template>

<script>

import {mapState} from "vuex";

export default {
  name: 'cursorDiv',
  props: {
    loadData: {
      type: Function,
      required: true
    },
    getKey: {
      type: Function,
      required: true
    },
    loadFromUp: {
      type: Boolean,
      default: true
    },

  },
  data() {
    return {
      rollSize: 10,
      isLoading: 0,
      hasNewMessage: false,
      cursorPageReq: {
        cursor: null,
        pageSize: 20,
        offset: 0,
      },
      list: [],
      totalList: [],
      lastLoadingTime: new Date().getTime(),
      cursorPageResp: {
        cursor: null,
        isLast: false,
        offset: 0,
        list: []
      },
      isActionExecuted: false,
    }

  },
  watch: {
    activityBufferList: {
      handler(val) {
        // this.hasNewMessage = true
        if (val.length > 0) {
          this.hasNewMessage = true
          const data = val[0]
          this.addActivity(data)
          // this.loadingLast()
          this.$store.commit('deleteFromActivityBuffer', data)
        }
        // console.log(this.hasNewMessage)
      },
      deep: true
    },


    list: {
      handler(val) {
        if (val.length == 0) {
          this.isLoading = 0
        }
      },
      deep: true
    }
  },

  async created() {
    let res = await this.loadData(this.cursorPageReq)
    this.cursorPageResp = res.data.data;
    this.list = this.cursorPageResp.list;
    this.totalList = this.cursorPageResp.list;
    this.isLoading = 0;
    this.cursorPageReq.cursor = this.cursorPageResp.cursor;
  },
  mounted() {
    this.$refs.cursorDiv.addEventListener('scroll', this.handleScroll, true);
  },
  beforeUnmount() {
    this.$refs.cursorDiv.removeEventListener('scroll', this.handleScroll);
  },

  computed: {
    ...mapState(['activityBufferList']),
    lastest() {
      let record = this.list;
      let totalRecord = this.totalList;
      let length = record.length;
      let totalLen = totalRecord.length;
      if (length == 0 || totalLen == 0) {
        return true
      }
      // 如果record最后一个 和 totalRecord最后一个相同，说明已经加载完毕
      if (length > 0 && totalLen > 0) {
        return this.getKey(record[length - 1]) === this.getKey(totalRecord[totalLen - 1]);
      }
      return false
    },

  },

  methods: {
    addActivity(data) {
      this.totalList.concat(data)
    },
    handleScroll(e) {
      if (this.isLoading !== 0) return
      if (e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight) {
        this.scrollToBottom();
      } else if (e.target.scrollTop <= 0) {
        this.scrollToTop();
      }
    }
    ,
    async scrollToTop() {
      this.isLoading = -1;
      await this.move(-1);
    },
    async scrollToBottom() {
      this.isLoading = 1;
      // 到顶的话，根据游标去请求数据
      await this.move(1);

    },
    getScrollPosition(element) {
      // 获取父元素
      const parentElement = element.parentNode
      // 计算滚动距离
      // 返回结果
      return parentElement.scrollTop +
          element.getBoundingClientRect().top -
          parentElement.getBoundingClientRect().top -
          parseInt(getComputedStyle(parentElement).borderTopWidth) -
          parseInt(getComputedStyle(parentElement).paddingTop)
    },
    async move(forward) {
      let now = new Date().getTime()
      if (now - this.lastLoadingTime < 1000) {
        this.isLoading = 0
        return
      }
      this.lastLoadingTime = now
      // forward 1 向下，-1 向上
      let totalSize = this.totalList.length;
      let size = this.list.length;
      var recordId = this.getKey(this.list[forward === 1 ? size - 1 : 0])
      if (forward === -1) {
        if (!this.cursorPageResp.isLast) {
          let res = await this.loadData(this.cursorPageReq)
          this.cursorPageResp = res.data.data;
          // 更新游标
          this.cursorPageReq.cursor = this.cursorPageResp.cursor;
          this.cursorPageReq.offset = this.cursorPageResp.offset;
          let tempData = this.cursorPageResp.list
          if (tempData.length !== 0) {

            if (this.getKey(tempData[tempData.length - 1]) < this.getKey(this.list[0])) {
              this.totalList = tempData.concat(this.totalList)
            }
          }
        }
        // 如果我想往上看，先判断，现在看到的数据是不是最旧的
        // 如果是最旧的，没有了，因为已经加载过最旧的数据
        if (this.getKey(this.list[0]) === this.getKey(this.totalList[0]) && this.isLast) {
          this.isLoading = 0;
          return;
        }
        // 如果不是最旧的，滚动加载数据
        let index = -1;
        for (let i = 0; i < this.totalList.length; i++) {
          if (this.getKey(this.totalList[i]) === this.getKey(this.list[0])) {
            index = i;
            break;
          }
        }
        let start = index - this.rollSize;
        let end = index;
        if (start < 0) {
          start = 0;
        }
        // 计算新加载的数据
        let newChats = this.totalList.slice(start, end);
        let newLen = newChats.length;
        if (size >= this.cursorPageReq.pageSize) {
          // 把原数据删掉一部分
          this.list = newChats.concat(this.list.slice(0, size - newLen));
        } else {
          this.list = newChats.concat(this.list);
        }

      } else if (forward === 1) {
        // 如果我想往下看，先判断，现在看到的数据是不是最新的
        // 如果是最新的，没有了
        if (this.getKey(this.list[size - 1]) === this.getKey(this.totalList[totalSize - 1])) {
          this.isLoading = 0;
          return;
        }
        // 如果不是最新的，滚动加载数据
        let index = -1;
        for (let i = 0; i < this.totalList.length; i++) {
          if (this.getKey(this.totalList[i]) === this.getKey(this.list[size - 1])) {
            index = i;
            break;
          }
        }
        let start = index + 1;
        let end = index + this.rollSize + 1;
        if (end > totalSize) {
          end = totalSize;
        }
        // 计算新加载的数据
        let newChats = this.totalList.slice(start, end);
        let newLen = newChats.length;
        if (size >= this.cursorPageReq.pageSize) {
          // 把原数据删掉一部分
          this.list = this.list.slice(newLen, size).concat(newChats);
        } else {
          this.list = this.list.concat(newChats);
        }
      }
      await this.$nextTick(() => {
        const findIndex = this.list.findIndex(item => this.getKey(item) === recordId);
        this.$refs.cursorDiv.scrollTop = this.getScrollPosition(this.$refs.listItem.children[findIndex]);
      })
      this.isLoading = 0;
    },
    loadingLast() {
      let start = this.totalList.length - this.cursorPageReq.pageSize;
      if (start < 0) {
        start = 0;
      }
      this.list = this.totalList.slice(start, this.totalList.length);
      this.hasNewMessage = false
    },


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


  }

}


</script>

<style scoped>
</style>