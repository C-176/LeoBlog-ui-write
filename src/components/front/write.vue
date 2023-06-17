<template>

  <bread>创作</bread>

  <MyCompostion >

    <div class="w-full mx-auto  lg:rounded-xl p-2 bg-gray-100 text-left ">
      <editor class="editor" :articleId="$route.params.articleId"></editor>
      <div class="labels">
        <Divider orientation="left">标签</Divider>
        <div>
          <Tag class="flex-col items-center" :color="getColor()" closable v-for="label in article.labels"
               :key="label.labelId">
            {{ label.labelName }}
          </Tag>
          <el-autocomplete
              v-model="state"
              :fetch-suggestions="querySearch"
              clearable
              class="inline-input w-50"
              placeholder="+"
              @select="handleSelect"
              value-key="labelName"
          />

        </div>

      </div>
      <Divider orientation="left">封面添加</Divider>
      <div class="cover">
        <el-upload
            class="avatar-uploader"
            method="post"
            name="file"
            :action="action"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :on-error="handleAvatarError"
        >
          <img v-if="imgUrl!=null && imgUrl != ''" :src="p(imgUrl)" class="avatar"/>
          <el-icon v-else class="avatar-uploader-icon">
            <Plus/>
          </el-icon>
        </el-upload>
      </div>
      <!--    <el-affix position="bottom" target=".editor" :offset="10">-->


      <div class="flex -w-full justify-end items-center h-14  space-x-2">
        <div
            class="bg-gray-200 hover:cursor-pointer hover:bg-gray-300 transition  text-black text-medium rounded-xl px-2 py-1"
            @click.once="saveAsScript">
          <span>保存草稿</span>
        </div>
        <div
            class=" bg-gray-200 hover:cursor-pointer hover:bg-gray-300 transition  text-black text-medium rounded-xl px-2 py-1"
            @click.once="saveAsArticle">
          <span>发布文章</span>
        </div>

      </div>


      <!--    </el-affix>-->

    </div>
  </MyCompostion>


</template>


<script>
import {Divider, Tag} from 'ant-design-vue';
import {Plus} from '@element-plus/icons-vue'

import h from "@/components/pub/header";
import editor from "@/components/pub/editor";
import MyCompostion from "@/components/pub/MyCompostion.vue";


export default {
  name: 'write',
  components: {MyCompostion, h, editor, Divider, Tag, Plus},
  data() {
    return {
      state: '',
      imgUrl: '',
      labels: [],
      color: [
        'magenta',
        'red',
        'volcano',
        'orange',
        'gold',
        'lime',
        'green',
        'cyan',
        'blue',
        'geekblue',
        'purple'
      ],
      action: this.baseURL + "/upload/file",
      article: {
        articleId: -1,
        articleTitle: '',
        articleContent: '',
        articleUpdateDate: '',
        articlePic: '',
        isArticle: 0,
        labels: [{
          labelId: -1,
          labelName: '示例标签'
        }],
        user: {
          userId: -1,
          userNickname: '',
          userProfilePhoto: '',
        },


      }


    }
  },
  created() {
    if (this.$route.params.articleId != 0) {
      this.$axios.get(this.baseURL + "/article/" + this.$route.params.articleId).then(res => {
        this.article = res.data.data;
        this.imgUrl = this.article.articlePic;
      })
    } else {
      this.imgUrl = '';
      this.labels = [];
    }

    this.$axios.get(this.baseURL + "/label/list").then(res => {
      this.labels = res.data.data;
    })


  },
  methods: {
    getColor() {
      return this.color[Math.floor(Math.random() * this.color.length)]
    },
    handleAvatarSuccess(res, file) {
      this.imgUrl = res.data.url;
      this.article.articlePic = this.imgUrl;
      this.$st("背景图片上传成功", 'success')
    },
    beforeAvatarUpload(file) {
      // 是否是图片
      const isJPG = file.type === 'image/jpeg' || 'image/png' || 'image/gif' || 'image/bmp' || 'image/webp';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$st('上传头像图片只能是 JPG 格式!', 'error');
      }
      if (!isLt2M) {
        this.$st('上传图片大小不能大于2M', 'error');
      }
      return isJPG && isLt2M;
    },
    handleAvatarError() {
      this.$st("背景图片上传失败", 'error')
    },
    querySearch(queryString, cb) {
      const results = this.state.trim() != '' ? this.labels.filter(item => {
        return item.labelName.indexOf(this.state.trim()) > -1
      }) : this.labels;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },

    handleSelect(item) {
      //判断是否已经存在
      var flag = false;
      if (this.article.labels.length > 0) {
        this.article.labels.forEach(label => {
          if (label.labelId === item.labelId) {
            this.$st("标签已存在", 'error')
            this.state = '';
            flag = true;
          }
        })
      }
      if (!flag) {
        this.article.labels.push({labelId: item.labelId, labelName: item.labelName})
        //剔除labelId为-1的标签
        this.article.labels = this.article.labels.filter(item => item.labelId != -1)
        this.state = '';
      }

    },
    save(isArticle) {
      this.article.articleContent = this.$store.state.valueContent;
      this.article.articleTitle = this.$store.state.valueTitle;
      this.$nextTick(() => {
        //内容和标题不可为空
        if (this.article.articleTitle.trim() == '' || this.article.articleContent.trim() == ''
            || this.article.articleTitle.trim() == '<p><br></p>' || this.article.articleContent.trim() == '<p><br></p>') {
          this.$st("标题和内容不可为空", 'error')
          return;
        }
      })

      this.article.articleUpdateDate = new Date();
      this.article.isArticle = isArticle;
      this.article.labels = this.article.labels.filter(item => item.labelId != -1)
      if (this.article.articlePic == null) {
        this.article.articlePic = '';
      }
      if (this.article.articleTitle.trim() === '') {
        this.article.articleTitle = '无题'
      }

      this.$axios.put(this.baseURL + "/article/update", this.article).then(res => {
        if (res.data.code === 200) {
          this.$st("发布成功", 'success')
          this.$store.commit('changeValueTitle', '');
          this.$store.commit('changeValueContent', '');

          this.$router.replace({path: '/article/' + res.data.data})
        } else {
          this.$st("发布失败", 'error')
        }
      })
    },
    saveAsScript() {
      this.save(0)
    },
    saveAsArticle() {
      this.save(1)
    },

  },

}

</script>

<style scoped>

.tools {
  width: 100%;
  height: 50px;
  /*line-height: 50px;*/
  margin-top: 5px;
}

.tools .left {
  /*width: 50%;*/
  height: 100%;
  float: right;
}

.tools .left div {
  background: #edf3f4;
  width: 80px;
  height: 30px;
  border-radius: 10px;
  float: right;
  line-height: 30px;
  text-align: center;
  margin: 0 10px;
  z-index: 2;
}


.tools .left div:hover {
  cursor: pointer;
  background-color: #fff;
  transition: all 0.3s;

}


.cover {
  /*margin-top: 20px;*/
  /*margin-bottom: 20px;*/
  width: 192px;
  height: 108px;
  border-radius: 10px;
}

.cover img, .cover .avatar-uploader-icon {
  width: 192px;
  height: 108px;
  border-radius: 10px;
  border: 2px dashed #dcdfe6;
}

:deep(.el-autocomplete) {
  height: 12px;
  width: 100px;
  line-height: 12px;
  font-size: 12px !important;
  border: 1px dashed #fff;
  outline: none;
}
</style>