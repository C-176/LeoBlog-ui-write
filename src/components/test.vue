<template>


  <div class="shell">

    <div class="info">
      <div class="title">只因你太美</div>
      <div class="singer">坤坤</div>
    </div>
    <div class="volume-box">
      <input type="range" class="volume-range" step="1" v-model="value1" min="0" max="100"
             @input="music.volume = value1/100">
    </div>
    <div class="btn-box">
      <i class="material-icons repeat" @click="handleRepeat()">repeat</i>
      <i class="material-icons favorite active" @click="handleFavorite()">favorite</i>
      <i class="material-icons volume" @click="handleVolume()">volume_up</i>
    </div>
    <div class="music-box">
      <input type="range" class="seekbar" step="1" value="0" min="0" max="100" @input="handleSeekBar()">


    </div>
  </div>

</template>

<script setup>
import {ref} from 'vue'
import {onMounted} from "vue";

onMounted(() => {
  setTimeout(() => {
    music = document.querySelector('.music-element')
    playBtn = document.querySelector('.play')
    seekbar = document.querySelector('.seekbar')
    currentTime = document.querySelector('.current-time')
    duration = document.querySelector('.duration')
    volIcon = document.querySelector('.volume');
    volBox = document.querySelector('.volume-box');
    volumeRange = document.querySelector('.volume-range');
    volumeDown = document.querySelector('.volume-down');
    volumeUp = document.querySelector('.volume-up');
    // 爱心点击变色
    favIcon = document.querySelector('.favorite')
    // 循环播放
    repIcon = document.querySelector('.repeat')
    if (music) {
      // 每当音乐的播放时间更新时
      music.addEventListener('timeupdate', function () {
        // 将音乐当前播放时间格式化为分钟和秒，并在HTML中显示出来
        var cs = parseInt(music.currentTime % 60)
        var cm = parseInt((music.currentTime / 60) % 60)
        currentTime.innerHTML = cm + ':' + cs
      }, false)
      // 当音乐元素的元数据加载完毕时
      music.onloadeddata = function () {
        // 设置进度条最大值为音乐总时长
        seekbar.max = music.duration// 将音乐总时长格式化为分钟和秒，并在HTML中显示出来
        var ds = parseInt(music.duration % 60)
        var dm = parseInt((music.duration / 60) % 60)
        duration.innerHTML = dm + ':' + ds
      }
// 当音乐当前播放时间更新时
      music.ontimeupdate = function () {
        // 将进度条的值设为当前播放时间，以实现进度条随着音乐播放而动态更新
        seekbar.value = music.currentTime
      }
      // 为音量减小按钮和音量增加按钮分别添加 click 事件监听器，
// 调用 handleVolumeDown 和 handleVolumeUp 函数
      volumeDown.addEventListener('click', handleVolumeDown);
      volumeUp.addEventListener('click', handleVolumeUp);
    }
  }, 1000)

})
let music = ref(null)
let playBtn = ref(null)
let seekbar = ref(null)
let currentTime = ref(null)
let duration = ref(null)
let value1 = ref(80)


function handlePlay() {
  // 如果音乐处于暂停状态
  if (music.paused) {
    // 播放音乐，更改按钮样式为暂停图标
    music.play();
    playBtn.className = 'pause'
    playBtn.innerHTML = '<i class="material-icons">pause</i>'
  } else {
    // 暂停音乐，更改按钮样式为播放图标
    music.pause();
    playBtn.className = 'play'
    playBtn.innerHTML = '<i class="material-icons">play_arrow</i>'
  }
  // 当音乐播放完毕时
  music.addEventListener('ended', function () {
    // 更改按钮样式为播放图标，并将音乐当前时间重置为0
    playBtn.className = 'play'
    playBtn.innerHTML = '<i class="material-icons">play_arrow</i>'
    music.currentTime = 0
  });
}


// 定义处理进度条拖动的函数
var handleSeekBar = function () {
  // 将音乐当前播放时间设为进度条的值，以实现通过拖动进度条控制音乐播放进度
  music.currentTime = seekbar.value
}


let favIcon = ref(null)
let repIcon = ref(null)

function handleFavorite() {
  favIcon.classList.toggle('active');
}



function handleRepeat() {
  if (music.loop == true) {
    music.loop = false
    repIcon.classList.toggle('active')
  } else {
    music.loop = true
    repIcon.classList.toggle('active')
  }
}

// 获取 HTML 中的音量图标、音量控制器、音量滑动条、音量减小按钮和音量增加按钮


let volIcon = ref(null)
let volBox = ref(null)
let volumeRange = ref(null)
let volumeDown = ref(null)
let volumeUp = ref(null)


// 处理音量控制器的函数
function handleVolume() {
  // 切换音量图标和音量控制器的 class 属性
  volIcon.classList.toggle('active');
  volBox.classList.toggle('active');
}


// 处理音量减小的函数
function handleVolumeDown() {
  // 将音量滑动条的值减少 20
  volumeRange.value = Number(volumeRange.value) - 20;
  // 将音乐的音量设置为音量滑动条的值除以 100
  music.volume = volumeRange.value / 100;
}

// 处理音量增加的函数
function handleVolumeUp() {
  // 将音量滑动条的值增加 20
  volumeRange.value = Number(volumeRange.value) + 20;
  // 将音乐的音量设置为音量滑动条的值除以 100
  music.volume = volumeRange.value / 100;
}

</script>

<style scoped>

</style>