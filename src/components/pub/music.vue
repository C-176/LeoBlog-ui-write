<template>
  <audio class="invisible" ref="musicElement">
    <source :src="music.url">
  </audio>

  <!--  <transition name="fade">-->
  <my-modal :visible="$store.state.musicVisible" size="md" @closeModal="closePlayer">


    <div class="flex flex-col w-full h-full">
      <div class="flex p-5 border-b bg-cover backdrop-blur-sm bg-blend-lighten">
        <!--               :style="{backgroundImage: 'url(' + music.cover + ')'}">-->
        <img class='w-20 h-20 object-cover cursor-pointer rounded-full duration-500  shadow-lg'
             alt='User avatar'
             @click="handlePlay"
             :src='music.cover'>
        <div class="flex flex-col justify-around p-2 w-1/3">
                    <span class="text-xs text-gray-700 uppercase font-medium ">
                        正在播放
                    </span>
          <span class="text-sm text-indigo-600 capitalize font-semibold pt-1">
                       {{ music.name }}
                    </span>
          <span class="text-xs text-gray-500  font-medium ">
                        {{ music.artist }}
                    </span>

        </div>
        <div class="w-1/3 h-full flex-col items-center justify-center mr-1">
          <div class="flex w-full h-1/2">
            <button @click="back"
                    class="w-1/3 h-full hover:text-gray-800 text-2xl  text-gray-400 duration-500 transition rounded-full  flex items-center justify-center  focus:outline-none">
              <StepBackwardOutlined/>
            </button>
            <button @click="handlePlay"
                    class="w-1/3 h-full  hover:text-gray-800 text-2xl  text-gray-400 duration-500 transition rounded-full  flex items-center justify-center  focus:outline-none">
              <play-circle-outlined v-if="!playing"/>
              <pause-circle-outlined v-if="playing"/>
            </button>
            <button @click="forward"
                    class="w-1/3 h-full hover:text-gray-800 text-2xl  text-gray-400 duration-500 transition rounded-full flex items-center justify-center  focus:outline-none">
              <StepForwardOutlined/>
            </button>
          </div>
          <div class=" w-full h-1/2 flex justify-center items-center">
            <SoundOutlined class="w-1/4 text-gray-400" />
            <input v-if="musicElement" type="range" class="cursor-pointer  w-3/4 bg-indigo-600"
                   ref="volumeRange" step="1" value="80" min="0" max="100"
                   @input="()=>{musicElement.volume = $refs.volumeRange.value/100}">
            <input v-else type="range" class="cursor-pointer  w-3/4 bg-indigo-600"
                   ref="volumeRange" step="1" value="0" min="0" max="100"></div>
          <!--          <a-slider v-if="musicElement" id="test" class="relative w-full sm:w-1/2 lg:w-7/12 lg:w-4/6 ml-2"-->
          <!--                    ref="volume" v-model:value="musicElement.volume" step="0.001" max="1"-->
          <!--          />-->
          <!--          <a-slider v-else id="test" class="relative w-full sm:w-1/2 lg:w-7/12 lg:w-4/6 ml-2" value="0"-->
          <!--                    ref="volume"/>-->
          <!--            <div id="waveform" class="w-1/2"></div>-->
        </div>
        </div>


      <div class="flex flex-col sm:flex-row items-center p-1  justify-center">

        <a-slider v-if="musicElement" id="test" class="relative w-full sm:w-1/2 lg:w-2/3 "
                  ref="seekbar" v-model:value="musicElement.currentTime" :step="0.5"
                  :tooltipVisible="false"
                  :max="musicElement.duration"/>
        <a-slider v-else id="test" class="relative w-full sm:w-1/2  lg:w-2/3 ml-2" value="0"
                  ref="seekbar"/>
        <div class="flex justify-end w-full sm:w-auto pt-1 sm:pt-0">
            <span class="text-xs text-gray-700 uppercase font-medium pl-2">
                    {{ this.currentTime }} / {{ this.duration }}
                </span>
        </div>


      </div>

      <div class="border-b pb-1 flex justify-between items-center mb-2">
        <span class=" text-base font-semibold uppercase text-gray-700"> 播放列表 </span>
<!--        <img class="w-4 cursor-pointer"-->
<!--             src="https://p.kindpng.com/picc/s/152-1529312_filter-ios-filter-icon-png-transparent-png.png"/>-->
      </div>
      <div class="overflow-x-hidden overflow-y-scroll">
        <div class="flex flex-col p-3 max-h-1/2 ">
          <div v-for="(music,index) in audio" :key="music.name"
               @click="to(index)"
               :class="{
                 'bg-gray-100': index === currentIndex,
               }"
               class="flex border-b py-3 cursor-pointer hover:shadow-md hover:bg-gray-100 rounded-xl px-2 transition duration-300 ">
            <img class='w-10 h-10 object-cover rounded-lg' alt='User avatar' :src="music.cover">
            <div class="flex flex-col px-2 w-full">
                        <span class="text-sm text-indigo-600 capitalize font-semibold pt-1">
                        {{ music.name }}
                        </span>
              <span class="text-xs text-gray-500  font-medium ">
                            {{ music.artist }}
                        </span>
            </div>
            <!--            <button @click="getMusic">xxxx</button>-->
          </div>

        </div>
      </div>
    </div>
  </my-modal>
</template>

<script>


import {
  PlayCircleOutlined,
  PauseCircleOutlined,
  StepForwardOutlined,
  StepBackwardOutlined, SoundOutlined
} from '@ant-design/icons-vue';
import MyModal from "@/components/pub/myModal.vue";

export default {
  name: "music",
  components: {
    MyModal,
    PlayCircleOutlined,
    PauseCircleOutlined,
    StepForwardOutlined,
    StepBackwardOutlined,
    SoundOutlined
  },
  props: ['showPlayer'],
  emits: ['closePlayer'],
  data() {
    return {
      // showPlayer:false,
      musicElement: null,
      seekbar: null,
      volumeRange: null,
      position: 0,
      playing: false,
      music: {
        name: 'Brooklyn',
        artist: 'The Midnight',
        url: '/source/audios/Brooklyn - The Midnight.mp3',
        cover: 'http://p1.music.126.net/X0ZUXOrUi2H42Hsr5Bi5MA==/109951165111559735.jpg?param=130y130',
      }
      ,
      audio: [{
        name: 'Brooklyn',
        artist: 'The Midnight',
        url: '/source/audios/Brooklyn - The Midnight.mp3',
        cover: 'http://p1.music.126.net/X0ZUXOrUi2H42Hsr5Bi5MA==/109951165111559735.jpg?param=130y130',
        // theme: '#ebd0c2'
      }, {
        name: 'Lost Boy',
        artist: 'The Midnight',
        url: '/source/audios/Lost Boy - The Midnight.mp3',
        cover: 'http://p1.music.126.net/X0ZUXOrUi2H42Hsr5Bi5MA==/109951165111559735.jpg?param=130y130',
        // theme: '#ebd0c2'
      },
        {
          name: 'Los Angeles',
          artist: 'The Midnight',
          url: '/source/audios/Los Angeles - The Midnight.mp3',
          cover: 'http://p1.music.126.net/X0ZUXOrUi2H42Hsr5Bi5MA==/109951165111559735.jpg?param=130y130',
          // theme: '#ebd0c2'
        }, {
          name: 'Sunset',
          artist: 'The Midnight',
          url: '/source/audios/Sunset - The Midnight.mp3',
          cover: 'http://p1.music.126.net/X0ZUXOrUi2H42Hsr5Bi5MA==/109951165111559735.jpg?param=130y130',
          // theme: '#ebd0c2'
        },
        {
          name: 'stranger_think',
          artist: 'C418',
          url: '/source/audios/stranger_think - C418.mp3',
          cover: 'http://p1.music.126.net/X0ZUXOrUi2H42Hsr5Bi5MA==/109951165111559735.jpg?param=130y130',
          // theme: '#ebd0c2'
        },


      ],
      currentTime: '00:00',
      duration: '00:00',
      currentIndex: 0,
    };
  },
  computed: {},
  watch: {},


  mounted() {

    setTimeout(() => {
      this.music = this.audio[0];
      this.musicElement = this.$refs.musicElement
      this.duration = this.secondToTime(this.musicElement.duration)
      this.seekbar = this.$refs.seekbar
      this.volumeRange = this.$refs.volumeRange
      // 每当音乐的播放时间更新时
      this.musicElement.addEventListener('timeupdate', () => {
        // 将音乐当前播放时间格式化为分钟和秒，并在HTML中显示出来
        var cs = parseInt(this.musicElement.currentTime % 60)
        var cm = parseInt((this.musicElement.currentTime / 60) % 60)
        cs = cs < 10 ? '0' + cs : cs
        cm = cm < 10 ? '0' + cm : cm
        this.currentTime = cm + ':' + cs
        if (this.currentTime == this.duration) {
          this.forward()
        }
      }, false)
      // this.musicElement.addEventListener('loaded', () => {
      //   // 设置进度条最大值为音乐总时长
      //   this.seekbar.max = this.musicElement.duration// 将音乐总时长格式化为分钟和秒，并在HTML中显示出来
      //   console.log(this.musicElement.duration, 'duration')
      //   var ds = parseInt(this.musicElement.duration % 60)
      //   var dm = parseInt((this.musicElement.duration / 60) % 60)
      //   console.log(ds, dm, 'dsdm')
      //   ds = ds < 10 ? '0' + ds : ds
      //   dm = dm < 10 ? '0' + dm : dm
      //   this.duration = dm + ':' + ds
      // }, false)
      // this.musicElement.onloadeddata = () => {
      //   // 设置进度条最大值为音乐总时长
      //   this.seekbar.max = this.musicElement.duration// 将音乐总时长格式化为分钟和秒，并在HTML中显示出来
      //   console.log(this.musicElement.duration, 'duration')
      //   var ds = parseInt(this.musicElement.duration % 60)
      //   var dm = parseInt((this.musicElement.duration / 60) % 60)
      //   console.log(ds, dm, 'dsdm')
      //   ds = ds<10?'0'+ds:ds
      //   dm = dm<10?'0'+dm:dm
      //   this.duration = dm + ':' + ds
      // }
      // var wavesurfer = WaveSurfer.create({
      //   container: '#waveform',
      //   waveColor: 'violet',
      //   progressColor: 'purple'
      // });
      // wavesurfer.load(this.music.url);
    }, 1000)


  }
  ,
  methods: {
    play() {
      this.musicElement.src = this.music.url;
      setTimeout(() => {
        this.$nextTick(() => {
          this.duration = this.secondToTime(this.musicElement.duration)
          this.musicElement.play();
          this.playing = true
        })
      }, 1000)
    },
    to(index) {
      this.music = this.audio[index];
      this.currentIndex = index;
      this.play()
    },
    back() {
      this.position = this.position == 0 ? this.audio.length - 1 : this.position - 1;
      this.music = this.audio[this.position];
      this.play()
    }
    ,
    forward() {
      this.position = this.position == this.audio.length - 1 ? 0 : this.position + 1;
      this.music = this.audio[this.position];
      this.play()
    }
    ,
    closePlayer() {
      this.$store.commit('changeMusicVisible', false)
    }
    ,

    secondToTime(e) {
      var t = Math.floor(e / 3600), n = Math.floor((e - 3600 * t) / 60),
          i = Math.floor(e - 3600 * t - 60 * n);
      return (t > 0 ? [t, n, i] : [n, i]).map(function (e) {
        return e < 10 ? "0" + e : "" + e
      }).join(":")
    }
    ,
    handlePlay() {
      // 如果音乐处于暂停状态
      if (this.musicElement.paused) {
        // 播放音乐，更改按钮样式为暂停图标
        this.musicElement.play();
        this.playing = true
      } else {
        // 暂停音乐，更改按钮样式为播放图标
        this.musicElement.pause();
        this.playing = false
      }

    }
    ,
    // // 定义处理进度条拖动的函数
    // handleSeekBar() {
    //   // 将音乐当前播放时间设为进度条的值，以实现通过拖动进度条控制音乐播放进度
    //   this.musicElement.currentTime = this.seekbar.value
    // },

// 处理音量减小的函数
    handleVolumeDown() {
      // 将音量滑动条的值减少 20
      volumeRange.value = Number(volumeRange.value) - 20;
      // 将音乐的音量设置为音量滑动条的值除以 100
      this.musicElement.volume = volumeRange.value / 100;
    }
    ,

// 处理音量增加的函数
    handleVolumeUp() {
      // 将音量滑动条的值增加 20
      volumeRange.value = Number(volumeRange.value) + 20;
      // 将音乐的音量设置为音量滑动条的值除以 100
      this.musicElement.volume = volumeRange.value / 100;
    }
    ,

    getMusic() {
      // //
      // this.$axios.post('http://music.163.com/api/search/pc',{
      //   params: {
      //     s: '海阔天空',
      //     offset: 1,
      //     limit: 1,
      //     type: 1
      //   }
      // }
      // ).then(res => {
      //   console.log(res.data.result)
      //   let name = res.data.result.songs[0].name;
      //   let artist = res.data.result.songs[0].artists[0].name;
      //   let url = res.data.result.songs[0].mp3Url;
      //   let cover = res.data.result.songs[0].album.picUrl;
      //   let lrc ='';
      //   // let lrc = res.data.result.songs[0].lyric;
      //   this.$axios.get('http://music.163.com/api/song/media', {
      //     params: {
      //       id: res.data.result.songs[0].id,
      //       // lv: -1,
      //       // kv: -1,
      //       // tv: -1
      //     },
      //     headers: {
      //       'Access-Control-Allow-Origin': '*',
      //     }
      //   }).then(res => {
      //     console.log(res.data.lrc.lyric)
      //     lrc = res.data.lrc.lyric;
      //     // this.ap = new APlayer({
      //     //   container: document.getElementById('player'),
      //     //   fixed: true,
      //     //   autoplay: true,
      //     //   audio: [
      //     //     {
      //     //       name: name,
      //     //       artist: artist,
      //     //       url: url,
      //     //       cover: cover,
      //     //       lrc: lrc
      //     //     }
      //     //   ]
      //     // });
      //   })
      //   this.audio = {
      //     name: name,
      //     artist: artist,
      //     url: url,
      //     cover: cover,
      //     lrc: lrc
      //   }
      // })

      // POST http://music.163.com/api/search/pc
      //     BODY s:PAPISM offset:0 limit:1 type:1
      this.$axios.post('https://music.163.com/weapi/cloudsearch/get/web?csrf_token=6b5ba7488f659f36b5b21dd4403be079', {
            encSecKey: "5ef64c823d6679236229971fc57a468ea523b2722e4ac6399a97e8e3852646e98ec08789cd5cda3f596c163858ffed08fc12fa2122ca92d103ea340f73f29e70ca695bff81a468b72630dc02ca09953198474a4d691ceb14a1ee342d5d9e4731494b769dd7411c55390540ad8ae37ae92ac0f876c2d99432dd3b6338e8fbc04e",
            params: "lzeAZ6ZHuQYxvym8FQIvOI6gl/ok2VA0dz5rmgVgrJS+c7x2aZF+WKOFMDse1wWAd1y1VpKMk+AAQru6Y213D0/eo/6UyX7SwOI+7aNu+mAQZo8J8dtIJuJeo1VaMl89uQ0gA+DTOSGoixjuLu44kEqcVgbrX710BY3E5Kq6DRVle/uMpymGEvtAppUxF2ITc+YVyQ2JjruzYRBC2zb4H1EAnF/DKQ5RJzugRVszwSmYorSJDGCE3hJJkuzgHZ4W0ayFijPsH4mfzQhwwQMso4JD+S64rgGk7Y84gTol12hWBLayol+RUft8TP1y4WIF9yQxAX+kwaerlbybjTBGSSTgPQ7LLQUHbn/fj89V7pRrRNHg+9Jur5zAlIqYFW5F"
          }
      ).then(res => {
        console.log(res.data)
        // let name = res.data.result.songs[0].name;
        // let artist = res.data.result.songs[0].artists[0].name;
        // let url = res.data.result.songs[0].mp3Url;
        // let cover = res.data.result.songs[0].album.picUrl;
        // let lrc ='';
        // // let lrc = res.data.result.songs[0].lyric;
        // this.$axios.get('http://music.163.com/api/song/media', {
        //   params: {
        //     id: res.data.result.songs[0].id,
        //     // lv: -1,
        //     // kv: -1,
        //     // tv: -1
        //   },
        //   headers: {
        //     'Access-Control-Allow-Origin': '*',
        //   }
        // }).then(res => {
        //   console.log(res.data.lrc.lyric)
        //   lrc = res.data.lrc.lyric;
        //   // this.ap = new APlayer({
        //   //   container: document.getElementById('player'),
        //   //   fixed: true,
        //   //   autoplay: true,
        //   //   audio: [
        //   //     {
        //   //       name: name,
        //   //       artist: artist,
        //   //       url: url,
        //   //       cover: cover,
        //   //       lrc: lrc
        //   //     }
        //   //   ]
        //   // });
        // })
        // this.audio = {
        //   name: name,
        //   artist: artist,
        //   url: url,
        //   cover: cover,
        //   lrc: lrc
        // }
      })
    }
  }

}
</script>

<style scoped>

</style>