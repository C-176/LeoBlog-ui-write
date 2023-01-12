<template>
  <div id="player" style="display: none"></div>
  <transition name="fade">

    <!-- component -->
    <div v-show="showPlayer"
         class="fixed text-left z-50 md:inset-0 mx-auto md:mt-16 w-full h-screen flex justify-center items-center md:w-screen md:h-5/6 p-2  md:rounded-xl">

      <div class='relative flex w-full md:w-1/2  bg-white shadow-md rounded-lg overflow-hidden mx-auto'>
        <a-tooltip id="close" class="absolute top-2 right-2" title="关闭">
          <button class="rounded-xl z-50 text-white h-8 w-8 text-center bg-indigo-600 hover:bg-indigo-500"
                  @click="closePlayer">
            ✖
          </button>
        </a-tooltip>
        <div class="flex flex-col w-full">
          <div class="flex p-5 border-b">
            <img class='w-20 h-20 object-cover rounded-xl' alt='User avatar'
                 :src='music.cover'>
            <div class="flex flex-col justify-around p-2 w-full">
                    <span class="text-xs text-gray-700 uppercase font-medium ">
                        正在播放
                    </span>
              <span class="text-sm text-indigo-600 capitalize font-semibold pt-1">
                       {{ music.name }}
                    </span>
              <span class="text-xs text-gray-500  font-medium ">
                        {{ music.artist }}
                    </span>
              <!--            <div class="flex justify-end">-->
              <!--              <img class="w-5 cursor-pointer" src="https://www.iconpacks.net/icons/2/free-favourite-icon-2765-thumb.png" />-->
              <!--              <img class="w-5 cursor-pointer mx-2" src="https://www.iconpacks.net/icons/2/free-favourite-icon-2765-thumb.png" />-->
              <!--              <img class="w-5 cursor-pointer" src="https://www.iconpacks.net/icons/2/free-favourite-icon-2765-thumb.png" />-->
              <!--            </div>-->
            </div>
          </div>

          <div class="flex flex-col sm:flex-row items-center p-2 md:p-5">
            <div class="flex items-center">
              <div class="flex space-x-3 p-2">
                <button @click="this.ap.skipBack()"
                        class="focus:outline-none">
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2"
                       stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="19 20 9 12 19 4 19 20"></polygon>
                    <line x1="5" y1="19" x2="5" y2="5"></line>
                  </svg>
                </button>
                <button @click="toggle"
                        class=" hover:bg-gray-200 duration-300 transition rounded-full w-10 h-10 flex items-center justify-center pl-0.5 ring-1 ring-indigo-400 focus:outline-none">
                  <icon src="xddtsyvc" trigger="click"></icon>
                </button>
                <button @click="this.ap.skipForward()"
                        class="focus:outline-none">
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2"
                       stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="5 4 15 12 5 20 5 4"></polygon>
                    <line x1="19" y1="5" x2="19" y2="19"></line>
                  </svg>
                </button>
              </div>
            </div>
            <div class="relative w-full sm:w-1/2 md:w-7/12 lg:w-4/6 ml-2">
              <div class="bg-indigo-300 h-2 w-full rounded-lg"></div>
              <div class="bg-indigo-500 h-2 w-1/2 rounded-lg absolute top-0"></div>

            </div>
            <div class="flex justify-end w-full sm:w-auto pt-1 sm:pt-0">
<span class="text-xs text-gray-700 uppercase font-medium pl-2">
                    {{ this.currTime }}/04:00
                </span>
            </div>

          </div>

          <div class="flex flex-col p-5">
            <div class="border-b pb-1 flex justify-between items-center mb-2">
              <span class=" text-base font-semibold uppercase text-gray-700"> 播放列表 </span>
              <img class="w-4 cursor-pointer"
                   src="https://p.kindpng.com/picc/s/152-1529312_filter-ios-filter-icon-png-transparent-png.png"/>
            </div>

            <div v-for="(music,index) in audio" :key="music.name"
                 @click="this.ap.list.switch(index)"
                 class="flex border-b py-3 cursor-pointer hover:shadow-md px-2 ">
              <img class='w-10 h-10 object-cover rounded-lg' alt='User avatar' :src="music.cover">
              <div class="flex flex-col px-2 w-full">
                        <span class="text-sm text-indigo-600 capitalize font-semibold pt-1">
                        {{ music.name }}
                        </span>
                <span class="text-xs text-gray-500  font-medium ">
                            {{ music.artist }}
                        </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import 'APlayer/dist/APlayer.min.css';
import APlayer from 'aplayer';
import music from "./music.vue";

export default {
  name: "music",
  props: ['showPlayer'],
  emits: ['closePlayer'],
  data() {
    return {
      // showPlayer:false,
      player: null,
      ap: null,
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
      }]
    };
  },
  computed: {
    currTime() {
      if (this.ap) {
        return this.player.textContent
        // return this.player
      } else {
        return '00:00'
      }
    }
  },
  watch: {
    showPlayer(val) {
      console.log(val)
    }

  },

  mounted() {
    this.ap = new APlayer({
      container: document.getElementById('player'),
      fixed: true,
      // mini: false,
      autoplay: false,
      theme: '#FADFA3',
      loop: 'all',
      order: 'random',
      preload: 'auto',
      volume: 0.7,
      mutex: true,
      listFolded: false,
      listMaxHeight: 90,
      // lrcType: 1,
      audio: this.audio,
    });
    this.player = document.querySelector(".aplayer-ptime");

  },
  methods: {

    closePlayer() {
      this.$emit('closePlayer')
    },

    secondToTime(e) {
      var t = Math.floor(e / 3600), n = Math.floor((e - 3600 * t) / 60),
          i = Math.floor(e - 3600 * t - 60 * n);
      return (t > 0 ? [t, n, i] : [n, i]).map(function (e) {
        return e < 10 ? "0" + e : "" + e
      }).join(":")
    },
    toggle() {
      this.ap.toggle();
      // if(this.ap.audio.paused)
    },
    getMusic() {
      //
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
    }
  }

}
</script>

<style scoped>

</style>