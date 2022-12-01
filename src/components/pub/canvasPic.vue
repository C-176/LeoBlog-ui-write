<template>
  <div style="margin-bottom: 10px">
    <input type="file" onchange="onChange(this.files[0])">
  </div>
  <canvas id="cvs" @mousedown="handleMouseDown" @mouseup="isMoving=false" @mousemove="handleMouseMove"></canvas>
  <canvas id="clipCvs" @wheel="scrollWheel"></canvas>
  <button id="download" @click="downloadPic">下载图片</button>

</template>

<script>
export default {
  name: "canvasPic",

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
      maxW: 400,
      p: {left: 0, top: 0, stepX: 0, stepY: 0},
      isMoving:false,

    }
  },
  mounted() {
    this.cvs = document.getElementById('cvs')
    this.clipCvs = document.getElementById('clipCvs')
    this.download = document.getElementById('download')
    this.ctx = this.cvs.getContext('2d')
    this.clipCtx = this.clipCvs.getContext('2d')

    this.onInit('/source/images/zip/1.jpg')
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
        this.cvs.width = width
        this.cvs.height = height
        this.render(width / 2 - this.size / 2, height / 2 - this.size / 2)
      }
    },
    // 渲染裁剪前canvas
    render(left = 0, top = 0) {
      this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height)
      this.ctx.drawImage(this.img, 0, 0, this.cvs.width, this.cvs.height)
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
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
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
    async downloadPic() {
      const res = await fetch(this.clipCvs.toDataURL('image/png'))
      const blob = await res.blob()
      const a = document.createElement('a')
      a.setAttribute('download', 'clip.png')
      a.href = URL.createObjectURL(blob)
      a.click()

    },
    scrollWheel(e){
      alert(e)
    }


  }
}
</script>

<style scoped>

</style>