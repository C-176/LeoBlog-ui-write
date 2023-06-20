<template>

  <div ref="containerRef" class=" bg-gray-100">
    <el-affix offset="50" position="top"
>
      <!--          <a-affix offset-top="10" :target="this.$refs.containerRef" :style="{ }">-->
      <div>
        <Toolbar
            :defaultConfig="toolbarConfig"
            :editor="editor"
            :mode="mode"
            style="border-bottom: 1px solid #ccc; "
        />
      </div>
      <!--            </a-affix>-->
    </el-affix>
    <textarea
        id="title"
        class=" h-10 border-0  w-full px-2  resize-none outline-none text-left font-bold text-xl"
        v-model="valueTitle" placeholder="请输入标题...（最多100字）"
    />
    <Editor
        style="min-height: 500px;background: #fff;font-size: 14px;outline: none"
        v-model="valueHtml"
        :defaultConfig="editorConfig1"
        :mode="mode"
        @onCreated="handleCreated"
        @click="handleFocus"
    />
  </div>
<!--  <catlog container=".whole"></catlog>-->


</template>


<script>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import {Editor, Toolbar} from '@wangeditor/editor-for-vue'
import {Boot} from '@wangeditor/editor'
import markdownModule from '@wangeditor/plugin-md'
import Swal from "sweetalert2";
import catlog from "@/components/pub/catlog";

Boot.registerModule(markdownModule)
export default {
  name: 'editor',
  components: {Editor, Toolbar, Boot, catlog},
  data() {
    return {
      save: true,
      mode: 'default', // 或 'simple'
      valueTitle: '',
      valueHtml: '',
      article: {
        articleId: 1,
        articleTitle: '文章标题',
        articleContent: '文章内容',
        articlePic: '',
        labels: [
          {labelId: 1, labelName: '标签1'},
        ]
      },
      editor: null,
      toolbarConfig: {},
      editorConfig: {
        maxLength: 100,
        placeholder: '请输入标题(最多100个字)',
      },
      editorConfig1: {
        autoFocus: false,
        MENU_CONF: {
          uploadImage: {
            baseURL: '',
            // 上传图片的配置
            server: "http:localhost:8080/upload/file", // 上传图片的服务器地址
            fieldName: 'file', // 上传图片的字段名

            // 单个文件的最大体积限制，默认为 2M
            maxFileSize: 3 * 1024 * 1024, // 1M


            // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
            allowedFileTypes: [],

            // 自定义上传参数，例如传递验证的 token 等。参数会被添加到 formData 中，一起上传到服务端。
            // meta: {
            //   token: localStorage.getItem('token'),
            // },

            // 将 meta 拼接到 url 参数中，默认 false
            metaWithUrl: false,

            // 自定义增加 http  header
            headers: {
              Authorization: localStorage.getItem('token')
            },
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
                  text: '图片大小不能超过3MB',
                })
              }
              console.log(`${file.name} 上传出错`, err, res)
            },
            // 小于该值就插入 base64 格式（而不上传），默认为 0
            base64LimitSize: 0.5 * 1024 * 1024 // 0.5M
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
          },

          codeSelectLang: {
            // 代码语言
            codeLangs: [
              {text: 'CSS', value: 'css'},
              {text: 'HTML', value: 'html'},
              {text: 'XML', value: 'xml'},
              {text: 'JavaScript', value: 'javascript'},
              {text: 'Java', value: 'java'},
              {text: 'Python', value: 'python'},
              {text: 'PHP', value: 'php'},
              {text: 'Go', value: 'go'},
              {text: 'C', value: 'c'},
              {text: 'C++', value: 'cpp'},
              {text: 'C#', value: 'csharp'},
              {text: 'TypeScript', value: 'typescript'},
              {text: 'JSON', value: 'json'},
              {text: 'Markdown', value: 'markdown'},
              {text: 'Text', value: 'text'},
              // 其他
            ]
          }
        },
        placeholder: '请输入内容',
        // scroll: true,

      },

    }
  },
  props: ['articleId'],

  created() {
    this.editorConfig1.MENU_CONF.uploadImage.server = this.baseURL + '/upload/file'
    this.editorConfig1.MENU_CONF.uploadImage.baseURL = this.baseURL
    this.editorConfig1.MENU_CONF.uploadVideo.server = this.baseURL + '/upload/file'

    // 切换语言 - 'en' 或者 'zh-CN'
    // i18nChangeLanguage('en')
    if (this.articleId != 0) {
      this.$axios.get(this.baseURL + "/article/" + this.articleId).then(res => {
        this.article = res.data.data;
        this.valueTitle = this.article.articleTitle;
        this.valueHtml = this.article.articleContent;
        this.$store.commit('changeValueContent', this.article.articleContent);
        this.$store.commit('changeValueTitle', this.article.articleTitle);
      })
    } else {
      setTimeout(() => {
        this.valueTitle = this.$store.state.valueTitle;
        this.valueHtml = this.$store.state.valueContent;
      }, 500)

    }
    this.autoSave()


  },
  beforeUnmount() {
    this.save = false;
  },
  methods: {
    handleCreated(editor) {

      this.editor = Object.seal(editor)
    },
    changeTitle() {
      this.$store.commit('changeValueTitle', this.valueTitle)
    },
    changeContent() {
      this.$store.commit('changeValueContent', this.valueHtml)
    },
    handleFocus() {
      this.editor.focus()
    },
    autoSave() {

      setInterval(() => {
        if (this.save) {
          this.changeContent();
          this.changeTitle();
        } else {
          clearInterval();
        }
      }, 10000)

    }


  },
  computed: {}


}
</script>

<style scoped>
:deep(p img,p video) {
  width: 80% !important;
  border-radius: 5px !important;
  margin-left: 10% !important;
  box-shadow: 1px 3px 11px #134857;
}

:deep(p img:hover) {
  cursor: pointer;
}

/*#title {*/
/*  overflow-y: hidden;*/
/*  font-size: 18px;*/
/*  outline: none;*/
/*  resize: none;*/
/*  height: 30px;*/
/*  line-height: 30px;*/
/*  width: 100%;*/
/*  border-width: 0;*/
/*  border-bottom: 1px solid #ccc;*/
/*}*/

</style>