<template>

  <div style="text-align: center ;" class="w-full">
    <img style="border-radius: 50%; width:120px;height: 120px" :src="avatarURL" >
    <el-button type="text" @click="editAvatar">修改头像</el-button>
  </div>
<!--  <template v-show="editAvatarDialog">-->
    <el-dialog title="修改头像"  width="40%">
      <el-row type="flex" justify="center">
        <div class="cropper">
          <vueCropper
              ref="cropper"
              :img="option.img"
              :outputSize="option.size"
              :outputType="option.outputType"
              :info="option.info"
              :full="option.full"
              :canMove="option.canMove"
              :canMoveBox="option.canMoveBox"
              :original="option.original"
              :autoCrop="option.autoCrop"
              :autoCropWidth="option.autoCropWidth"
              :autoCropHeight="option.autoCropHeight"
              :fixedBox="option.fixedBox"
              @realTime="realTime"
          ></vueCropper>
        </div>
        <div class="previewBox">
          <div :style="previews.div" class="preview">
            <img :src="previews.url" :style="previews.img">
          </div>
          <el-row type="flex" justify="center">
            <el-upload
                action=""
                :show-file-list="false"
                :auto-upload="false"
                :on-change="uploadImg"
            >
              <el-button size="mini" type="primary"
              > 更换头像
              </el-button>
            </el-upload>
          </el-row>
          <br>
          <el-row>
            <el-button icon="el-icon-plus" circle size="mini"
                       @click="changeScale(1)"></el-button>
            <el-button icon="el-icon-minus" circle size="mini"
                       @click="changeScale(-1)"></el-button>
            <el-button icon="el-icon-download" circle size="mini"
                       @click="down('blob')"></el-button>
            <el-button icon="el-icon-refresh-left" circle size="mini"
                       @click="rotateLeft"></el-button>
            <el-button icon="el-icon-refresh-right" circle size="mini"
                       @click="rotateRight"></el-button>
          </el-row>
        </div>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editAvatarDialog = false">取 消</el-button>
        <el-button type="primary" @click="saveEditAvatar">确 定</el-button>
    </span>
    </el-dialog>
  </template>
<!--</template>-->

<script>
import VueCropper from 'vue-cropper'
export default {
  components: {VueCropper},
data(){
    return  {
      avatarURL: '/source/images/index/1.jpg',
      editAvatarDialog: false,
      previews: {},
      option: {
        img: '', // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 1, // 剪切后的图片质量（0.1-1）
        full: true, // 输出原图比例截图 props名full
        outputType: 'png', // 裁剪生成额图片的格式
        canMove: true,  // 能否拖动图片
        original: false,  // 上传图片是否显示原始宽高
        canMoveBox: true,  // 能否拖动截图框
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 150,
        autoCropHeight: 150,
        fixedBox: true // 截图框固定大小
      },
    }
},methods:{
    editAvatar() {
      this.editAvatarDialog = true
      this.option.img = this.avatarURL
    },
    // 保存头像修改
    saveEditAvatar() {
      this.editAvatarDialog = false
      this.finish('blob')
    },
// 放大/缩小
    changeScale(num) {
      num = num || 1;
      this.$refs.cropper.changeScale(num);
    },
// 左旋转
    rotateLeft() {
      this.$refs.cropper.rotateLeft();
    },
// 右旋转
    rotateRight() {
      this.$refs.cropper.rotateRight();
    },
// 保存上传图片
    finish(type) {
      if (type === 'blob') {
        this.$refs.cropper.getCropBlob((data) => {
          this.avatarURL = window.URL.createObjectURL(data)
          //访问接口保存到数据库写这儿!
        })
      } else {
        this.$refs.cropper.getCropData((data) => {
          //访问接口保存到数据库写这儿!
        })
      }
    },
// 实时预览函数
    realTime(data) {
      this.previews = data
    },
// 下载图片
    down(type) {
      var aLink = document.createElement('a')
      aLink.download = 'author-img'
      if (type === 'blob') {
        this.$refs.cropper.getCropBlob((data) => {
          aLink.href = window.URL.createObjectURL(data)
          aLink.click()
        })
      } else {
        this.$refs.cropper.getCropData((data) => {
          aLink.href = data;
          aLink.click()
        })
      }
    },
// 更换头像--上传本地图片
    uploadImg(file) {
      var _this = this;
      var reader = new FileReader();
      reader.onload = (e) => {
        let data;
        if (typeof e.target.result === 'object') {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]))
        } else {
          data = e.target.result
        }
        _this.option.img = data
      }
      // 转化为base64
      // reader.readAsDataURL(file.raw)
      // 转化为blob
      reader.readAsArrayBuffer(file.raw);
    },
  }
}
</script>

<style scoped>
.previewBox {
  text-align: center;
  margin-left: 60px;
}

.preview {
  width: 150px;
  height: 150px;
  margin: 0px auto 20px auto;
  border-radius: 50%;
  border: 1px solid #ccc;
  background-color: #ccc;
  overflow: hidden;
}

.cropper {
  width: 260px;
  height: 260px;
}
</style>