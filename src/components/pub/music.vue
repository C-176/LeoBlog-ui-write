<template>
  <div id="player" style=""></div>
</template>

<script>
import 'APlayer/dist/APlayer.min.css';
import APlayer from 'aplayer';

export default {
  name: "music",
  data() {
    return {
      ap: null,
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
  },
  methods: {
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