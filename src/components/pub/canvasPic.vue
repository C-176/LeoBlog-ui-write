<template>
  <MyModal size="lg" :visible="visible" @closeModal="()=>{$emit('cancel')}">
    <div
        class=" bg-white text-left  mx-auto  w-full lg:w-1/2n flex-col justify-center items-center  p-2  lg:rounded-xl">
      <div class="w-full h-auto  p-2 space-y-2 lg:space-x-2 lg:flex justify-around items-end">
        <div id="contant" class="min-w-4/5">
          <canvas id="cvs" class="w-full shadow-lg rounded-xl"
                  @wheel="rollImg" @mousedown="handleMouseDown" @mouseup="isMoving=false"
                  @mousemove="handleMouseMove"
          ></canvas>
        </div>
        <canvas id="clipCvs" class="w-28 h-1/2 shadow-lg rounded-xl"></canvas>
      </div>

      <div class="w-full h-auto relative p-2 flex-col justify-center space-y-2 items-center">
        <div class=" flex justify-center h-10 space-x-2 items-center">
          <span class=" p-2 h-full text-xs text-gray-400">提示:滑动滚轮缩放选择区域</span>
          <input ref="upload"
                 type="file"
                 class="rounded-xl w-1/3 cursor-pointer bg-indigo-400 p-1 hover:bg-indigo-500 text-white text-sm"
                 @change="onChange($event.target.files[0])"/>
        </div>
        <div class=" flex justify-around space-x-2 items-center">

          <button class="rounded-xl bg-indigo-600 p-3 w-1/3 hover:bg-indigo-500 text-white text-sm"
                  @click="()=>{$emit('cancel')}">取消
          </button>
          <button ref="ok" class="rounded-xl bg-indigo-600 p-3 w-1/3 hover:bg-indigo-500 text-white text-sm"
                  @click="uploadProfile();">确定
          </button>
        </div>
      </div>
    </div>
  </MyModal>

</template>

<script>

import MyModal from "@/components/pub/myModal.vue";

export default {
  name: "canvasPic",
  components: {MyModal},
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  Components: {MyModal},

  data() {
    return {
      files: null,
      cvs: null,
      clipCvs: null,
      download: null,
      ctx: null,
      clipCtx: null,
      img: new Image(),
      size: 150,
      maxW: 600,
      maxH: 400,
      p: {left: 0, top: 0, stepX: 0, stepY: 0},
      isMoving: false,
      contant: null,

    }
  },
  mounted() {
    this.contant = document.getElementById('contant')
    this.cvs = document.getElementById('cvs')
    this.clipCvs = document.getElementById('clipCvs')
    this.download = document.getElementById('download')
    this.ctx = this.cvs.getContext('2d')
    this.clipCtx = this.clipCvs.getContext('2d')

    this.onInit('/source/images/index/1.jpg')
    // this.$refs.upload.click()
  },
  methods: {
    onChange(file) {
      this.onInit(URL.createObjectURL(file))
    },
    onInit(src) {
      this.clipCvs.width = this.clipCvs.height = this.size
      this.img.src = src
      this.img.onload = () => {
        let width = this.img.width
        let height = this.img.height
        if (width > this.maxW) {
          height = this.maxW / width * height
          width = this.maxW
        }
        if (height > this.maxH) {
          width = this.maxH / height * width
          height = this.maxH
        }
        this.cvs.width = width
        this.cvs.height = height

        this.render(width / 2 - this.size / 2, height / 2 - this.size / 2)

      }
    },
    // 渲染裁剪前canvas
    render(left = 0, top = 0) {
      var index = 0
      // if (this.cvs.height === this.maxH) {
      //   index = (this.maxW - this.cvs.width) / 2
      // }
      this.ctx.clearRect(index, 0, this.cvs.width, this.cvs.height)
      // 将this.img画到this.ctx上，缩放到this.cvs的宽高
      this.ctx.drawImage(this.img, index, 0, this.cvs.width, this.cvs.height)
      if (left < 0) {
        left = 0
      }
      if (left > this.cvs.width - this.size) {
        left = this.cvs.width - this.size
      }
      if (top < 0) {
        top = 0
      }
      if (top > this.cvs.height - this.size) {
        top = this.cvs.height - this.size
      }
      this.clipPic(this.ctx.getImageData(left, top, this.size, this.size))
      this.ctx.beginPath()
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'
      this.ctx.fillRect(left, top, this.size, this.size)
      this.p.left = left
      this.p.top = top
    },
    // 裁剪图片，并显示在右侧
    clipPic(data) {
      this.clipCtx.clearRect(0, 0, this.clipCvs.width, this.clipCvs.height)
      this.clipCtx.putImageData(data, 0, 0)
    },
    handleMouseDown(e) {
      this.p.stepX = e.pageX - this.p.left
      this.p.stepY = e.pageY - this.p.top
      this.isMoving = true
    },
    handleMouseMove(e) {
      if (this.isMoving) {
        this.render(e.pageX - this.p.stepX, e.pageY - this.p.stepY)
      }


    },
    uploadProfile() {
      this.$refs.ok.classList.add('animate-ping')

      // 将canvas转化为图片
      const res = this.clipCvs.toDataURL('image/png')
      // 将res转化为二进制
      const arr = res.split(',')
      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }

      // 转化为文件
      const file = new File([u8arr], 'clip.png', {type: 'image/png'})
      file.lastModifiedDate = new Date()
      const formData = new FormData();
      formData.append('file', file);
      this.$axios.post('/upload/file', formData).then(res => {
        var data = res.data.url
        this.$refs.ok.classList.remove('animate-ping')
        this.$emit('getImg', data)
      })

    },
    rollImg(e) {
      this.size -= e.deltaY / 10
      if (this.size < 50) {
        this.size = 50
      }
      if (this.size > 200) {
        this.size = 200
      }
      this.onInit(this.img.src)
    }


  }
}
</script>

<style scoped>

</style>