<template>
  <div class="catalog-card invisible md:visible" v-if="titles.length>0">
    <div class="catalog-card-header">
      <div>
        <!--                <span-->
        <!--                ><font-awesome-icon-->
        <!--                    :icon="['fas', 'bars-staggered']"-->
        <!--                    class="catalog-icon"-->
        <!--                /></span>-->
        <span>目录</span>
      </div>
      <span class="progress">{{ progress }}</span>
    </div>

    <div class="catalog-content">
      <div
          v-for="title in titles"
          :key="title.id"
          @click="scrollToView(title.scrollTop+180)"
          :class="[
                    'catalog-item',
                    currentTitle.id == title.id ? 'active' : 'not-active',
                ]"
          :style="{ marginLeft: title.level * 20 + 'px' }"
          v-show="title.isVisible"
          :title="title.rawName"
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
      progress: 0+ "%",
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
              (window.scrollY /( document.documentElement.scrollHeight-document.documentElement.clientHeight)) *
              100
          ) + "%";


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
        node.name =  element.innerText;
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
.catalog-card {
  /*background: #fdfdfd;*/
  border-radius: 2px;
  /*box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.05);*/
  padding: 0 24px;
  width: 14%;
  position: fixed;
  top: 100px;
  left: 2%;
  box-sizing: border-box;
  text-align: left;
  border: 1px solid #e8e8e8;
}

.catalog-card-header {
  text-align: left !important;
  /*margin-bottom: 5px;*/
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.catalog-icon {
  font-size: 18px;
  margin-right: 10px;
  /*color: dodgerblue;*/
}

.catalog-card-header div > span {
  font-size: 100%;
  color: #4c4948;
}

.progress {
  color: #a9a9a9;
  /*font-style: bold;*/
  font-size: 100%;
}

.catalog-content {
  max-height: calc(100vh - 120px);
  overflow: auto;
  margin-right: -20px;
  padding-right: 16px;
}

.catalog-item {
  color: #666261;
  /*margin: 5px 0;*/
  line-height: 20px;
  cursor: pointer;
  /*transition: all 0.2s ease-in-out;*/
  font-size: 12px;
  padding: 2px 6px;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;

}

.active {
  background-color: #fdfdfd;
  color: #111111;
  border-radius: 3px;
}

.not-active:hover, .active:hover {
  background-color: #fdfdfd;
  color: #111111;
  border-radius: 3px;
}
</style>
