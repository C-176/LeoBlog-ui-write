<template>
  <div class="emoji">
    <ul class="emoji-default">
      <li v-for="(item, index) in emojiJson" :key="index"
          @click.stop="chooseEmojiDefault(item)">
        {{ item }}
      </li>
    </ul>
    <div class="emoji-tabs">
      <div class="emoji-tab">
        {{ emojiJson[0] }}
      </div>
    </div>

  </div>
</template>


<script>
export default {
  name: "emoji",
  data() {
    return {
      data: "😀,😁,😂,😃,😄,😅,😆,😉,😊,😋,😎,😍,😘,😗,😙,😚,😇,😐,😑,😶,😏,😣,😥,😮,😯,😪,😫,😴,😌,😛,😜,😝,😒,😓,😔,😕,😲,😷,😖,😞,😟,😤,😢,😭,😦,😧,😨,😬,😰,😱,😳,😵,😡,😠,💘,❤,💓,💔,💕,💖,💗,💙,💚,💛,💜,💝,💞,💟,❣,💪,👈,👉,☝,👆,👇,✌,✋,👌,👍,👎,✊,👊,👋,👏,👐,✍,🍇,🍈,🍉,🍊,🍋,🍌,🍍,🍎,🍏,🍐,🍑,🍒,🍓,🍅,🍆,🌽,🍄,🌰,🍞,🍖,🍗,🍔,🍟,🍕,🍳,🍲,🍱,🍘,🍙,🍚,🍛,🍜,🍝,🍠,🍢,🍣,🍤,🍥,🍡,🍦,🍧,🍨,🍩,🍪,🎂,🍰,🍫,🍬,🍭,🍮,🍯,🍼,☕,🍵,🍶,🍷,🍸,🍹,🍺,🍻,🍴,🌹,🍀,🍎,💰,📱,🌙,🍁,🍂,🍃,🌷,💎,🔪,🔫,🏀,⚽,⚡,👄,👍,🔥,🙈,🙉,🙊,🐵,🐒,🐶,🐕,🐩,🐺,🐱,😺,😸,😹,😻,😼,😽,🙀,😿,😾,🐈,🐯,🐅,🐆,🐴,🐎,🐮,🐂,🐃,🐄,🐷,🐖,🐗,🐽,🐏,🐑,🐐,🐪,🐫,🐘,🐭,🐁,🐀,🐹,🐰,🐇,🐻,🐨,🐼,🐾,🐔,🐓,🐣,🐤,🐥,🐦,🐧,🐸,🐊,🐢,🐍,🐲,🐉,🐳,🐋,🐬,🐟,🐠,🐡,🐙,🐚,🐌,🐛,🐜,🐝,🐞,🦋,😈,👿,👹,👺,💀,☠,👻,👽,👾,💣",
      emojiJson: [],
    }
  },
  methods: {
    chooseEmojiDefault(item) {
      this.$st(item, 'success')
    }
  },


  created() {
    this.emojiJson = this.data.split(",");
  }
}
</script>
<style  scoped>

@mixin scroll-bar($width: 10px) {
  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: #ffffff;
  }
  &::-webkit-scrollbar {
    width: $width;
    height: 10px;
    background-color: #ffffff;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.2);
  }

}

.emoji {
  text-align: left;
  width: 100%;
  height: 100%;
  background: #fff;
  border: 1px solid #dcdfe6;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 12%), 0 0 6px 0 rgb(0 0 0 / 4%);

  .emoji-tabs {
    border-top: 1px solid #DCDFE6;
    background: #f8f8f8;

    .emoji-tab {
      background: #ffffff;
      width: 40px;
      height: 100%;
      padding: 5px 20px;
      overflow: hidden;
      display: inline-block;
      text-align: center;
      line-height: 48px;
      font-size: 30px;
      border: 1px solid #ffffff;
      border-right-color: #DCDFE6;
      border-left-color: #DCDFE6;
    }
  }


  .emoji-default {
    width: calc(100% - 40px);
    height: 202px;
    overflow-y: auto;
    @include scroll-bar();
    padding: 0px 20px;

    li {
      display: inline-block;
      padding: 5px;
      font-size: 24px;
      width: 29px;
      height: 29px;
      overflow: hidden;
      cursor: pointer;
    }

    li:hover {
      background-color: #d5d5d5;
    }
  }
}

</style>
