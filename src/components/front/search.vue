<template>
  <MyCompostion>
    <div class="mx-auto w-full relative  bg-white lg:rounded-xl  mb-2">
        <el-tabs type="border-card" class="demo-tabs  rounded-xl" :model-value="tag" @tab-change="b">
            <el-tab-pane label="标题" name="title"></el-tab-pane>
            <el-tab-pane label="内容" name="content"></el-tab-pane>
            <el-tab-pane label="标签" name="label"></el-tab-pane>
            <el-tab-pane label="分类" name="sort"></el-tab-pane>

            <div class="w-full ">
                <article-show :article-list="articleList"></article-show>
            </div>
        </el-tabs>
        <el-pagination
                class="bg-white w-full flex justify-center items-center space-x-2"
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
    </div>
  </MyCompostion>
</template>

<script>
import articleShow from "@/components/pub/articleShow";
import MyCompostion from "@/components/pub/MyCompostion.vue";

export default {
    name: "articles",
    components: {
      MyCompostion,
        articleShow
    },
    data() {
        return {
            labelId: 1,
            method: null,
            key: "",
            tag: 'title',
            articleList: [],
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

        };
    },
    created() {
        this.key = this.$route.params.key;
        // console.log(this.key);
        if (this.key.trim() === '') {
            console.log("key为空");
            this.$router.push({url: '/home/article'})
        }
        this.method = this.getArticlesByKey
        this.method(this.key);
    }, methods: {
        b(name) {
            this.tag = name
            if (name === 'title') {
                this.method = this.getArticlesByKey
            } else if (name === 'content') {
                this.method = this.getArticlesByContent
            } else if (name === 'label') {
                this.method = this.getArticlesByLabel
            } else if (name === 'sort') {
                this.method = this.getArticlesBySort
            }
            // this.$st(name, 'success')
            this.method(this.key)
        },
        getArticlesDefault() {
            this.$axios.get('/article/list/' + this.currentPage + '/' + this.pageSize).then((res) => {
                let map = res.data.data
                this.articleList = map.records

                this.articleList.forEach(x => {
                    x.author = {
                        userNickname: 'admin',
                        userProfilePhoto: 'https://gitee.com/zhengyongjie/blog/raw/master/src/assets/img/author.jpg'
                    }
                })
                this.total = map.total
                this.pageCount = map.pages
                this.pageSize = map.size
                this.currentPage = map.current
            })
        },
        getArticlesByKey(key) {
            this.$axios.get('/article/list/keyword/' + key + '/' + this.currentPage + '/' + this.pageSize).then((res) => {
                let map = res.data.data
                this.articleList = map.records
                this.articleList.forEach(x => {
                    x.author = {
                        userNickname: 'admin',
                        userProfilePhoto: 'https://gitee.com/zhengyongjie/blog/raw/master/src/assets/img/author.jpg'
                    }
                })
                this.total = map.total
                this.pageCount = map.pages
                this.pageSize = map.size
                this.currentPage = map.current
            })
        },
        getArticlesByContent(content) {
            this.$axios.get('/article/list/content/' + content + '/' + this.currentPage + '/' + this.pageSize).then((res) => {
                let map = res.data.data
                this.articleList = map.records
                this.articleList.forEach(x => {
                    x.author = {
                        userNickname: 'admin',
                        userProfilePhoto: 'https://gitee.com/zhengyongjie/blog/raw/master/src/assets/img/author.jpg'
                    }
                })

                this.total = map.total
                this.pageCount = map.pages
                this.pageSize = map.size
                this.currentPage = map.current
            })
        },
        getArticlesByLabel(key) {
            //查询title和content包含关键字的所有文章，展示出来，并将其标签列举出来
            //监听标签点击事件，点击标签后，列举出该标签下的文章
            const labelId = this.labelId
            if (this.articleList.length === 0) return;
            this.$axios.post('/article/list/label/' + labelId + '/' + this.currentPage + '/' + this.pageSize,
                {
                    ids: this.articleList.map(item => item.articleId)
                }
            ).then((res) => {
                let map = res.data.data
                this.articleList = map.records
                this.articleList.forEach(x => {
                    x.author = {
                        userNickname: 'admin',
                        userProfilePhoto: 'https://gitee.com/zhengyongjie/blog/raw/master/src/assets/img/author.jpg'
                    }
                })
                this.total = map.total
                this.pageCount = map.pages
                this.pageSize = map.size
                this.currentPage = map.current
            })
        },
        getArticlesBySort(key) {
            this.$axios.get('/article/list/sort/' + key + '/' + this.currentPage + '/' + this.pageSize).then((res) => {
                let map = res.data.data
                this.articleList = map.records
                this.articleList.forEach(x => {
                    x.author = {
                        userNickname: 'admin',
                        userProfilePhoto: 'https://gitee.com/zhengyongjie/blog/raw/master/src/assets/img/author.jpg'
                    }
                })
                this.total = map.total
                this.pageCount = map.pages
                this.pageSize = map.size
                this.currentPage = map.current
            })
        },
        handleSizeChange(val) {
            this.pageSize = val
            this.currentPage = 1
            // this.getArticlesDefault()
            this.method(this.key)

        },
        handleCurrentChange(val) {
            this.currentPage = val
            // this.getArticlesDefault()
            this.method(this.key)
        },
    },

}
</script>
<style scoped>


</style>