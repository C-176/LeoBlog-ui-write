<template>
  <!--  <div class="catalog-card invisible lg:visible" v-if="titles.length>0">-->
  <div
      class="w-1/4 text-left bg-gray-50 p-3 invisible lg:visible overscroll-contain overflow-y-auto h-screen rounded-xl pb-20 fixed flex-col justify-start items-center space-y-2">

    <div class="flex justify-between items-center text-xl italic text-left ">
      <div>
        <span class="text-gray-500">目录</span>
      </div>
      <div class="w-2/3">
        <!--      // 增加一条进度条-->
        <div class="duration-1000 border-b-4 border-indigo-600 transition-all"
             :class="{
        'w-0':progress===0,
        'w-1/4':progress>0&&progress<25,
        'w-1/2':progress>=25&&progress<50,
        'w-3/4':progress>=50&&progress<75,
        'w-full':progress>=75,
      }"></div>
      </div>
      <span class="text-indigo-600 ">{{ progress }}%</span>
    </div>

    <div class="flex-col justify-center items-center space-y-1">
      <div
          v-for="title in titles"
          :key="title.id"
          @click="scrollToView(title.scrollTop+180)"
          :class="{'text-indigo-600 font-bold bg-white':
                    currentTitle.id == title.id }"
          :style="{ marginLeft: title.level * 20 + 'px' }"
          v-show="title.isVisible"
          :title="title.rawName"
          class="cursor-pointer transition duration-300  hover:text-indigo-600 hover:font-bold rounded-xl hover:bg-white p-1"
      >
        {{ title.name }}
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "catlog",
  data() {
    return {
      titles: [],
      currentTitle: {},
      progress: 0,
      scrollTop: 0,
      scrollHeight: 0,
      clientHeight: 0,
    };
  },
  mounted() {
    setTimeout(() => {
      this.getTitles();
      // this.$nextTick(() => {
      // 监听滚动事件并更新样式
      window.addEventListener("scroll", this.handleScroll);
      // });
    }, 1000);


  },
  beforeRouteLeave() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.progress =
          parseInt(
              // (window.scrollY / document.documentElement.scrollHeight) *
              (window.scrollY / (document.documentElement.scrollHeight - document.documentElement.clientHeight)) *
              100
          );


      let visibleTitles = [];

      for (let i = this.titles.length - 1; i >= 0; i--) {
        const title = this.titles[i];
        if (title.scrollTop <= window.scrollY) {
          if (this.currentTitle.id === title.id) return;

          Object.assign(this.currentTitle, title);

          // 展开节点
          this.setChildrenVisible(title, true);
          visibleTitles.push(title);

          // 展开父节点
          let parent = title.parent;
          while (parent) {
            this.setChildrenVisible(parent, true);
            visibleTitles.push(parent);
            parent = parent.parent;
          }

          // 折叠其余节点
          for (const t of this.titles) {
            if (!visibleTitles.includes(t)) {
              this.setChildrenVisible(t, false);
            }
          }

          return;
        }
      }

    },
    // 获取目录的标题
    getTitles() {

      let titles = [];
      let levels = ["h1", "h2", "h3", "h4"];


      let articleElement = document.querySelector(this.container);

      if (!articleElement) {
        this.titles = titles;
        return
      }

      let elements = Array.from(articleElement.querySelectorAll("*"));

      // 调整标签等级
      let tagNames = new Set(
          elements.map((el) => el.tagName.toLowerCase())
      );
      for (let i = levels.length - 1; i >= 0; i--) {
        if (!tagNames.has(levels[i])) {
          levels.splice(i, 1);
        }
      }

      let serialNumbers = levels.map(() => 0);
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        let tagName = element.tagName.toLowerCase();
        let level = levels.indexOf(tagName);
        if (level == -1) continue;

        let id = tagName + "-" + element.innerText + "-" + i;
        let node = {
          id,
          level,
          parent: null,
          children: [],
          rawName: element.innerText,
          scrollTop: element.offsetTop,
        };

        if (titles.length > 0) {
          let lastNode = titles.at(-1);

          // 遇到子标题
          if (lastNode.level < node.level) {
            node.parent = lastNode;
            lastNode.children.push(node);
          }
          // 遇到上一级标题
          else if (lastNode.level > node.level) {
            serialNumbers.fill(0, level + 1);
            let parent = lastNode.parent;
            while (parent) {
              if (parent.level < node.level) {
                parent.children.push(node);
                node.parent = parent;
                break;
              }
              parent = parent.parent;
            }
          }
          // 遇到平级
          else if (lastNode.parent) {
            node.parent = lastNode.parent;
            lastNode.parent.children.push(node);
          }
        }

        serialNumbers[level] += 1;
        let serialNumber = serialNumbers.slice(0, level + 1).join(".");

        node.isVisible = node.parent == null;
        // node.name = serialNumber + ". " + element.innerText;
        node.name = element.innerText;
        titles.push(node);
      }

      this.titles = titles;
    },


    // 设置子节点的可见性
    setChildrenVisible(title, isVisible) {
      for (const child of title.children) {
        child.isVisible = isVisible;
      }
    },

    // 滚动到指定的位置
    scrollToView(scrollTop) {
      window.scrollTo({top: scrollTop, behavior: "smooth"});
    },

  },
  props: {
    container: {
      type: String,
      default: "body",
    },
  },
};
</script>

<style scoped>


</style>
