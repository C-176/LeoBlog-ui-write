<template>
  <bread>我的文章</bread>
  <MyCompostion>
    <div class="w-full h-full mx-auto">
      <div ref="tar" class="text-left w-full h-full scroll-auto  ">
        <template v-if="loading">
          <!--      <a-skeleton active/>-->
          <!--      <a-skeleton active/>-->
          <!--      <a-skeleton active/>-->
          <loader></loader>
        </template>

        <template v-else>

          <el-empty v-if="articleList.length===0">
            <template #description>
              <span>暂无文章</span>
            </template>
            <button class="button w-full" @click="$router.push('/write/0')">点击进行创作</button>
          </el-empty>

          <div class="lg:flex lg:items-center bg-gray-100 w-full lg:rounded-xl p-4 my-2 lg:justify-between"
               v-for="(article,index) in myArticles" :key="article.articleId">
            <div class="min-w-0 flex-1">
              <h2 @click="$router.push('/article/'+article.articleId)"
                  :title="article.articleTitle.replaceAll('<p>','').replaceAll('</p>','').replaceAll('<br>','')"
                  class="text-base cursor-pointer hover:text-gray-600 font-bold leading-5 text-gray-900 sm:truncate sm:text-base sm:tracking-tight">
                {{ article.articleTitle.replaceAll('<p>','').replaceAll('</p>','').replaceAll('<br>','') }}
              </h2>
              <div class="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">

                <div class="mt-2 flex items-center text-sm text-gray-500">
                  <CalendarIcon class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true"/>
                  {{ article.articleUpdateDate }}
                </div>
              </div>
            </div>
            <div class="mt-5 flex lg:mt-0 space-x-2 lg:ml-4">
           <span class="ml-3 sm:block">
        <button type="button"
                @click="$router.push('/article/'+article.articleId)"
                class="inline-flex  items-center space-x-2  rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <icon src="tyounuzx" size="24"></icon>
          <span>查看</span>
        </button>
      </span>

              <span class="sm:block ml-3">
        <button type="button" @click="$router.push('/write/'+article.articleId)"
                class="inline-flex  items-center space-x-2   rounded-md border border-gray-300 bg-white px-4 py-2
                text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <icon src="wloilxuq" size="24"></icon>
          <span>编辑</span>
        </button>
      </span>
              <span class="sm:ml-3">
        <button type="button" @click="deleteArticle(article.articleId)"
                class="inline-flex items-center space-x-2 rounded-md border border-gray-300 bg-white px-4 py-2
                text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <icon src="kfzfxczd" size="24"></icon>
          <span>删除</span>
        </button>
      </span>

            </div>
          </div>
          <el-pagination
              v-model:currentPage="currentPage"
              v-model:page-size="pageSize"
              :page-sizes="pageSizes"
              :small="small"
              :disabled="disabled"
              :background="background"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              :default-current-page="defaultCurrentPage"
              :page-count="pageCount"
              :hide-on-single-page="hideOnSinglePage"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
          />
        </template>
      </div>
    </div>
  </MyCompostion>

</template>

<script>
import Swal from 'sweetalert2'

import {
  BriefcaseIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  LinkIcon,
  MapPinIcon,
  PencilIcon,
} from '@heroicons/vue/20/solid'
import {Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/vue'
import MyCompostion from "@/components/pub/MyCompostion.vue";

export default {
  name: 'articles',
  components: {
    MyCompostion,

    BriefcaseIcon,
    CalendarIcon,
    CheckIcon,
    ChevronDownIcon,
    CurrencyDollarIcon,
    LinkIcon,
    MapPinIcon,
    PencilIcon,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
  },
  // props: [],
  data() {
    return {
      loading: true,
      articleList: [
        //     {
        //   articleId: 1,
        //   userId: 1,
        //   articleTitle: '测试标题',
        //   articleContent: '测试内容',
        //   articlePic: '',
        //   author: '作者',
        //   articleUpdateDate: '2020-05-27 15:36:05'
        // }

      ],
      currentPage: 1,
      pageSize: 20,
      pageSizes: [20, 50, 100, 200],
      small: false,
      disabled: false,
      background: false,
      total: 30,
      defaultCurrentPage: 1,
      pageCount: 1,
      hideOnSinglePage: true,

    }
  },
  computed: {
    myArticles() {
      this.articles = this.articleList
      //根据articleList中每个article的userId获取user信息
      this.articleList.forEach((item, index) => {
        this.articleList[index].articleUpdateDate = this.$moments(this.articleList[index].articleUpdateDate)
        this.$axios.get("/user/" + item.userId).then((res) => {
          if (res.data.data != null) {
            this.articles[index].author = res.data.data.userName
          }
        })
      })
      return this.articles
    }
  }
  ,
  created() {
    this.loading = true
    //获取articleList
    this.getArticles()

  },
  watch: {
    myArticles() {
      this.$nextTick(() => {
        this.loading = false
      })
    }
  },
  methods: {
    getArticles() {
      this.$axios.get('/article/list/user/' + this.$store.state.user.userId + '/' + this.currentPage + '/' + this.pageSize).then((res) => {
        let map = res.data.data
        this.articleList = map.records
        this.total = map.total
        this.pageCount = map.pages
        this.pageSize = map.size
        this.currentPage = map.current

      })
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val
      this.currentPage = 1
      this.getArticles()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val
      this.getArticles()
    },
    deleteArticle(articleId) {
      //弹窗提示删除文章
      Swal.fire({
        title: '要删除这篇文章吗?',
        text: "删除之后就恢复不了啊!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }).then((result) => {
        if (result.value) {
          this.$axios.delete('/article/' + articleId).then((res) => {
                console.log(res.data)
                if (res.data.code !== 200) {
                  this.$sa(res.data.msg, 'error')
                  return;
                }
                this.$st("删除成功", 'success')
                this.getArticles()
              }
          )
        }
      })

    },
    shareArticle(articleId) {
      this.$st("分享成功", 'success')
    },
    modifyArticle(articleId) {
      this.$router.push('/write/' + articleId)
    }


  },


}


</script>

<style scoped>
:deep(.ant-back-top) {
  display: block !important;
}

:deep(.el-pagination) {
  width: 100%;
}

.iconfont {
  /*font-size: 20px;*/
}

:deep(.at p) {
  display: inline-block !important;
}

</style>