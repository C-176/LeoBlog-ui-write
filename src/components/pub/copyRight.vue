<template>
  <div class="w-1/4 overscroll-contain bg-gray-50 overflow-y-auto  rounded-xl pb-20 fixed flex-col justify-start items-center space-y-2">

  <a-carousel autoplay :dots="false" effect="fade">

      <div>
        <a-row :gutter="16">
          <a-col :span="24" >
            <a-statistic-countdown class="text-xl" title="距离过年还有" :value="deadline" format="D 天 H 时 m 分 s 秒"/>
          </a-col>
        </a-row>
      </div>
      <div>
        <a-comment>
          <template #author><a>Youtube</a></template>
          <template #avatar>
            <a-avatar
                src="https://tse4-mm.cn.bing.net/th/id/OIP-C.Y9COKMQqkN_C_i0LHHqwDAHaFP?w=221&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                alt="Han Solo"/>
          </template>
          <template #content>
            <p>
              我很庆幸，在互联网战场上遇到的是推特和脸书，而不是LeoBlog，因为它的体验效果远在我们之上。
            </p>
          </template>

        </a-comment>
      </div>
      <div>
        <a-comment>
          <template #author><a>海绵宝宝</a></template>
          <template #avatar>
            <a-avatar
                src="https://tse4-mm.cn.bing.net/th/id/OIP-C.nQbX4992Y7diUq0T-LETNAHaHa?w=182&h=182&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                alt="Han Solo"/>
          </template>
          <template #content>
            <p>只有LeoBlog的用户才配享用蟹堡王的顶级彩色蟹堡。
            </p>

          </template>

        </a-comment>
      </div>
      <div>
        <a-comment>
          <template #author><a>孙笑川</a></template>
          <template #avatar>
            <a-avatar
                src="https://tse3-mm.cn.bing.net/th/id/OIP-C.1g1zF6Ye5nFmRhRD4r4ITgHaJ4?w=128&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                alt="Han Solo"/>
          </template>
          <template #content>
            <p>如果面对的是LeoBlog，我在棺材里也不得不爬出来注册一个账户。
            </p>

          </template>

        </a-comment>
      </div>
      <div>
        <a-comment>
          <template #author><a>宇将军</a></template>
          <template #avatar>
            <a-avatar
                src="https://ts1.cn.mm.bing.net/th?id=OIP-C.Dl0LTUZvv_Xxi5umOYx2zAHaE7&w=156&h=185&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
                alt="Han Solo"/>
          </template>
          <template #content>
            <p>我愿意把宇宙的命名改为L开头，如果上帝不同意的话，我会狠狠地踹他的屁股。
            </p>

          </template>

        </a-comment>
      </div>
      <div>
        <a-row>
          <a-col :span="12">
            <a-statistic title="在线用户" :value="93" class="mr-5"/>
          </a-col>
          <a-col :span="12">
            <a-statistic title="总注册用户" :precision="0" :value="112"/>
          </a-col>
        </a-row>
      </div>
    </a-carousel>
    <div >
      @2021-2022 LeoBlog©版权所有<br>
      <a href="https://beian.miit.gov.cn/" class="text-xs" >豫ICP备2022025200号</a>

    </div>
  </div>
</template>


<script>
export default {
  name: "copyRight",
  data() {
    return {
      deadline: Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30, // Moment is also OK

    };
  },
  methods: {
    onFinish() {

    },
  },
  mounted() {
    //过年倒计时
    this.deadline = Date.parse("2024-01-22 00:00:00");
  },
}
</script>


<style scoped>


p {
  text-align: left;
}

/* For demo */
.ant-carousel :deep(.slick-slide) {
  text-align: center;
  height: 160px;
  /*line-height: 160px;*/
  /*background: #364d79;*/
  overflow: hidden;
}

.ant-carousel :deep(.slick-slide h3) {
  color: #fff;
}
:deep(.ant-comment-content-detail p){
  font-size: 0.8rem !important;
}
</style>