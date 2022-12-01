<template>

  <div ref="tar" class="whole text-left">
    <template v-if="loading">
      <a-skeleton active/>
      <a-skeleton active/>
      <a-skeleton active/>
    </template>

    <template v-else>

      <el-empty v-if="articleList.length===0">
        <template #description>
          <span>暂无文章</span>
        </template>
        <a-button shape="round" @click="$router.push('/write/0')">点击进行创作</a-button>
      </el-empty>
      <!--      文章展示-->
<!--      <div class="Article" v-for="(article,index) in myArticles" :key="article.articleId">-->

<!--        <div v-if="article.articlePic==null || article.articlePic!=''" class="img">-->
<!--          <el-image-->
<!--              style="height: 100%"-->
<!--              :src="p(article.articlePic)"-->
<!--              :preview-src-list="[p(article.articlePic)]"-->
<!--              hide-on-click-modal-->
<!--              close-on-press-escape-->
<!--              fit="cover"-->
<!--          />-->
<!--        </div>-->

<!--        <div class="right"-->
<!--             :class="{isFull:article.articlePic==null || article.articlePic==''}">-->
<!--          <div class="at"><a href="javascript:void(0)">-->
<!--            <router-link :to="'/article/'+article.articleId"><span class="iconfont"-->
<!--                                                                   v-html="'&#xe630;'+article.articleTitle"></span>-->
<!--            </router-link>-->
<!--          </a>-->
<!--          </div>-->

<!--          <div class="author"><span class="iconfont">&#xe6fb;</span> 更新时间: {{ article.articleUpdateDate }}-->
<!--          </div>-->
<!--          <div class="comment"><span v-html="article.articleContent"></span></div>-->

<!--          <div class="toolbar">-->
<!--            <a class="like" @click="deleteArticle(article.articleId)">删除<span class="iconfont">&#xe611;</span> </a>-->
<!--            <a class="reply" @click="modifyArticle(article.articleId)">修改<span class="iconfont">&#xe615;</span> </a>-->
<!--            <a class="collect" @click="shareArticle(article.articleId)">分享<span class="iconfont">&#xe73a;</span> </a>-->
<!--            <a class="share">其他<span class="iconfont">&#xe63e;</span> </a>-->
<!--          </div>-->
<!--        </div>-->
<!--        <a-divider style="height: 2px; background-color: #afb2b2"/>-->
<!--      </div>-->
      <div class="lg:flex lg:items-center lg:justify-between" v-for="(article,index) in myArticles" :key="article.articleId">
        <div class="min-w-0 flex-1">
          <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">{{article.articleTitle}}</h2>
          <div class="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
<!--            <div class="mt-2 flex items-center text-sm text-gray-500">-->
<!--              <BriefcaseIcon class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />-->
<!--              Full-time-->
<!--            </div>-->
<!--            <div class="mt-2 flex items-center text-sm text-gray-500">-->
<!--              <MapPinIcon class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />-->
<!--              Remote-->
<!--            </div>-->
<!--            <div class="mt-2 flex items-center text-sm text-gray-500">-->
<!--              <CurrencyDollarIcon class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />-->
<!--              $120k &ndash; $140k-->
<!--            </div>-->
            <div class="mt-2 flex items-center text-sm text-gray-500">
              <CalendarIcon class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
              {{article.articleUpdateDate}}
            </div>
          </div>
        </div>
        <div class="mt-5 flex lg:mt-0 lg:ml-4">
      <span class="hidden sm:block">
        <button type="button" class="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <PencilIcon class="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
          编辑
        </button>
      </span>

          <span class="ml-3 hidden sm:block">
        <button type="button" class="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <LinkIcon class="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
          查看
        </button>
      </span>

          <span class="sm:ml-3">
        <button type="button" class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <CheckIcon class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          删除
        </button>
      </span>

          <!-- Dropdown -->
          <Menu as="div" class="relative ml-3 sm:hidden">
            <MenuButton class="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              More
              <ChevronDownIcon class="-mr-1 ml-2 h-5 w-5 text-gray-500" aria-hidden="true" />
            </MenuButton>

            <transition enter-active-class="transition ease-out duration-200" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
              <MenuItems class="absolute right-0 z-10 mt-2 -mr-1 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <MenuItem v-slot="{ active }">
                  <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Edit</a>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">View</a>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
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
  <a-back-top/>

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
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'

export default {
  name: 'articles',
  components: {

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

.toolbar {
  width: 100%;
  height: 10%;
  text-align: center;

}

.toolbar a {
  font-size: 13px;
  color: #8590a6;
  float: left;
  display: block;
  width: 25%;
  height: 100%;
  line-height: calc(200%);
  margin-top: 10px;
  border-radius: 5px;
}

.toolbar a:hover {
  background-color: #edf3f4;
  transition: all 0.3s;

}

.whole {
  margin-left: calc(22.5%);
  background: #fff;
  width: 55%;
  border-radius: 5px;
  margin-top: 60px;
  padding: 10px;
}

.whole > div {
  width: 100%;
}

.whole .Article {
  position: relative;
  border-radius: 5px;
  height: 250px;
  margin: 20px 0;
}

.whole .Article .img {
  float: left;
  margin: 40px 10px;
  height: 67%;
  width: 25%;
  border-radius: 10px;
  /*box-shadow: 1px 3px 11px #134857;*/
  overflow: hidden;
}

.Article .img img {
  height: 100%;
  width: 100%;
}

.right {
  float: left;
  height: 100%;
  width: 70%;
  padding: 0 0 0 10px;
}

.right .at {
  width: 100%;
  height: 15%;
  line-height: 30px;
  font-size: 15px;
  text-align: left;
  -webkit-mask-image: -webkit-linear-gradient(right, rgba(0, 0, 0, 0) 5%, rgba(0, 0, 0, 1) 10%);

}

.right .at a {
  display: block;
  color: #132c33;
  height: 100%;
  width: 100%;
  font-weight: 600;
}

.right .author {

  height: 10%;
  line-height: 25px;
  font-size: 13px;
  color: #8590a6;
  text-align: left;
}

.right .comment {
  height: 60%;
  width: 100%;
  font-size: 13px;
  overflow: hidden;
  text-align: left;
  color: #8590a6;
  line-height: 25px;
  margin-top: -2px;
  -webkit-mask-image: -webkit-linear-gradient(bottom, rgba(0, 0, 0, 0) 5%, rgba(0, 0, 0, 1) 10%);
}

.isFull {
  width: 80%;
  margin-left: 10%;

}
</style>