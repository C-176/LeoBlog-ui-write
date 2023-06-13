<template>
    <div class="w-full mx-auto h-auto text-left flex-clo justify-between items-center ">
        <TabGroup ref="tagGroup" :selectedIndex='index'>
            <!--      <Tab-->
            <!--          v-for="i in [1]"-->
            <!--          as="template"-->
            <!--          key="1"-->
            <!--      >-->
            <!--        <button-->
            <!--            @click="add"-->
            <!--            :class="[-->
            <!--              'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',-->
            <!--              'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',-->
            <!--              selected-->
            <!--                ? 'bg-white shadow'-->
            <!--                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',-->
            <!--            ]"-->
            <!--        >-->
            <!--          新建-->
            <!--        </button>-->

            <!--      </Tab>-->
            <TabList class="flex space-x-2 rounded-xl bg-blue-900/20 p-1 ">
                <Tab
                        v-for="(article,index) in articles"
                        as="template"
                        :key="article.articleId"
                        v-slot="{ selected }"

                >
                    <div class="flex justify-between border-2 space-x-2 rounded-xl items-center w-full">
                        <button
                                @click="select('lbw-'+article.articleId)"
                                @dblclick="dblclick(article.articleId)"
                                :class="[
              'w-5/6 rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 text-center',
              'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
              selected
                ? 'bg-white shadow'
                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white duration-300',
            ]"
                        >{{ article.articleTitle + ' (' + article.articleContent.length + '字)' }}
                        </button>
                        <button
                                @click="del(article.articleId)"
                                :class="[
              'w-1/6 rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 text-center',
              'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                selected
                ? 'bg-white shadow'
                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white duration-300',
            ]"
                        >
                            ✖
                        </button>


                    </div>


                </Tab>
                <Tab
                        as="template"
                >

                    <button
                            @click="addNew"
                            :class="[
              'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
              'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 bg-white shadow'
            ]"
                    >
                        新建
                    </button>


                </Tab>
            </TabList>


        </TabGroup>
        <v-md-editor v-model="text" height="600px "
                     left-toolbar="undo redo clear emoji | h bold italic strikethrough quote | ul ol table hr | link image code | save"
                     :disabled-menus="[]" @copy-code-success="handleCopyCodeSuccess"
                     @upload-image="handleUploadImage"></v-md-editor>
    </div>
  <!--  </div>-->

</template>

<script>
import {decode, encode} from '@/util/AES'
import {Menu, MenuButton, MenuItem, MenuItems, Tab, TabGroup, TabList, TabPanel, TabPanels} from '@headlessui/vue'
import Swal from "sweetalert2";
import axios from "axios";

export default {
    components: {
        Tab,
        TabGroup,
        TabList,
        TabPanel,
        TabPanels,
        Menu,
        MenuButton,
        MenuItem,
        MenuItems,
    },
    watch: {},

    data() {
        return {
            openMenu: false,
            index: 1,
            pre: '',
            text: '',
            key: null,
            articles: [],
            article: null,
            save: true,
            saved: false
        };
    },
    methods: {
        showSaved() {
            this.saved = true;
            setTimeout(() => {
                this.saved = false
            }, 2000)
        },
        dblclick(articleId) {
            Swal.fire({
                allowOutsideClick: false,
                title: "请输入新标题",
                input: 'text',
                inputAttributes: {
                    autocapitalize: 'off'
                },
                confirmButtonText: '保存',
                showCancelButton: true,
                cancelButtonText: '取消',
            }).then((result) => {
                    if (result.value) {
                        this.articles.forEach((article) => {
                            if (article.articleId === articleId) {
                                article.articleTitle = result.value
                            }
                        })
                        this.saveArticle()
                    }
                }
            )
        },
        del(articleId) {
            let index = this.articles.findIndex(item => item.articleId === articleId);
            this.articles.splice(index, 1)
            localStorage.removeItem(encode('lbw-' + articleId))
            this.text = ''
            if (this.article.articleId === articleId) {
                this.article = this.articles[0]
            }
        },
        handleUploadImage(event, insertImage, files) {
            for (let i in files) {
                const formData = new FormData();
                formData.append('file', files[i]);
                this.$axios.post('/upload/file', formData).then(
                    response => {
                        insertImage({
                            url: response.data.data.url,
                            desc: 'desc',
                        })
                    },
                    error => {
                        console.log('请求失败了', error.message)
                    }
                )
            }
        },
        handleCopyCodeSuccess() {
            // this.$st('复制成功', 'success');
        },
        addNew() {
            this.saveArticle()
            this.key = 'lbw-' + new Date().getTime()
            this.text = ''

            let article = {
                articleId: this.key.split('-')[1],
                articleTitle: '双击修改标题',
                articleContent: '',
                articleUpdateTime: new Date().toLocaleString(),
                isArticle: 0
            };

            this.articles.push(article);
            this.article = article;
            // this.$nextTick(() => {
            // 根据key获取对应的tab
            this.select(this.key);

        },
        getArticleList() {
            //从localStorage中获取所有key的前缀为lbw-的数据
            let keys = Object.keys(localStorage).filter(key => decode(key).startsWith('lbw-'));
            keys.forEach(key => {
                let article = JSON.parse(decode(localStorage.getItem(key)));
                this.articles.push(article);
            });

        },
        saveArticle() {
            if (!this.save) {
                return;
            }

            //将数据存储到localStorage中
            this.articles.forEach(article => {
                    if (article.articleId == this.key.split('-')[1]) {
                        article.articleContent = this.text;
                        article.articleUpdateTime = new Date().toLocaleString();
                    }
                },
            )
            this.articles.forEach(item => {
                localStorage.setItem(encode('lbw-' + item.articleId), encode(JSON.stringify(item)));
            });

            // this.pre = this.text
        },
        select(key) {
            this.saveArticle();
            this.key = key;
            this.articles.forEach(article => {
                if (article.articleId === key.split('-')[1]) {
                    this.text = article.articleContent;
                }
            })
            this.index = this.articles.findIndex(article => article.articleId === key.split('-')[1]) + 1;
        }
    },
    mounted() {
        this.getArticleList();
        this.$nextTick(() => {
            if (this.articles.length > 0) {
                this.article = this.articles[0];
                // this.pre = this.article.articleContent;
                this.text = this.article.articleContent;
                this.key = 'lbw-' + this.article.articleId;
            } else {
                this.addNew()
            }

        });

        this.save = true;
        setInterval(this.saveArticle, 10000);
    },
    beforeRouterLeave() {
        this.saveArticle();
        this.save = false
        if (!this.article || this.article.articleContent.trim() === "") return;
        // 检查是否已经存了草稿
        axios.get(`/article/${this.article.articleId}`).then(res => {
            if (res.data.code !== 200) {
                axios.post('/article/add', this.article).then(res => {
                    if (res.data.code === 200) {
                        this.article.articleId = res.data.data
                        this.showSaved()
                    } else {
                        this.$st("保存失败", "error")
                    }
                })
            } else {
                axios.put('/article/update', this.article).then(res => {
                    if (res.data.code !== 200) {
                        this.$st("保存失败", "error")
                    } else {
                        this.showSaved()
                    }

                })
            }

        })


    }
}

</script>
<style scoped>
body {
    height: inherit;
}

</style>
