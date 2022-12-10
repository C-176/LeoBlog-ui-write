<template>
  <!--  <div style="margin-bottom: 10px;margin: 0 auto;">-->
  <!--    <input type="file" onchange="onChange(this.files[0])">-->
  <!--  </div>-->
  <div class="mx-auto w-2/3 h-1/2 mt-14 rounded-xl bg-gray-100 flex-col justify-center items-center">
    <div class="w-full h-2/3 p-2 space-x-2 flex justify-center items-center overflow-hidden">
      <div id="contant"  class="w-4/5 h-full  overflow-hidden" >
      <canvas id="cvs" class="w-full h-full" @wheel="rollImg" @mousedown="handleMouseDown" @mouseup="isMoving=false"
              @mousemove="handleMouseMove"></canvas></div>
      <canvas id="clipCvs" class="w-1/5 h-1/2" ></canvas>
    </div>
    <div class="w-full h-1/3 p-2 flex justify-center space-x-2 items-center">
      <button id="download" class="rounded-xl bg-indigo-600 p-3 hover:bg-indigo-500 text-white text-sm" @click="downloadPic">下载图片</button>
      <button id="download" class="rounded-xl bg-indigo-600 p-3  hover:bg-indigo-500 text-white text-sm" @click="downloadPic">下载图片</button>
    </div>
  </div>

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
      isMoving: false,
      contant:null,

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
        // this.contant = document.getElementById('contant')

        //获取contant的宽高
        // let contantWidth = this.contant.offsetWidth
        // let contantHeight = this.contant.offsetHeight
        // console.log(contantWidth,contantHeight)
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
    rollImg(e) {
      this.size += e.deltaY / 10
      // let transform = this.cvs.style.transform
      // let zoom = transform.indexOf("scale") != -1 ? +transform.split("(")[1].split(")")[0] : 1
      // zoom += e.wheelDelta / 1200
      // if (zoom > 0.1 && zoom < 2) {
      //   this.cvs.style.transform = "scale(" + zoom + ")"
      // }
    }


  }
}
</script>

<style scoped>

</style>