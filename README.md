## LeoBlog-ui-write
![](https://img.shields.io/badge/LICENSE-Apache2.0-green.svg)
[![](https://img.shields.io/badge/BLOG-@LeoBlog-red.svg)](http://www.leoblog.icu)


### 项目介绍

LeoBlog-ui-write是一个基于Vue.js的前端项目，是LeoBlog的前端部分，后端部分请移步[LeoBlog](
https://github.com/C-176/LeoBlog-back)。本项目使用vue3选项式API + tailwindcss +
vite构建，使用axios进行数据请求，使用vue-router进行路由管理，使用vuex进行状态管理，使用tailwindcss进行样式管理，使用vite进行项目构建。本项目已经适配移动端。

### 功能列表
* 用户注册和登录：用户可以通过注册和登录功能进行身份验证和授权，以便于进行博客发布和管理等操作。
* 博客发布和管理：用户可以通过博客发布和管理功能进行博客的发布和管理，包括博客的增删改查等操作。
* 博客评论和管理：用户可以通过博客评论和管理功能进行博客评论的发布和管理，包括博客评论的增删改查等操作。
* 在线音乐播放：用户可以通过在线音乐播放功能进行音乐的播放，包括音乐的播放、暂停、上一首、下一首等操作。
* 在线私聊：用户可以通过在线私聊功能进行私聊，包括私聊的发送、接收等操作。
* 在线聊天室：用户可以通过在线聊天室功能进行聊天，包括聊天的发送、接收等操作。
* 集成鱼聪明AI：用户可以通过集成鱼聪明AI功能进行聊天，包括聊天的发送、接收等操作。

### 项目结构

```
LeoBlog-ui-write
├─ .gitignore
├─ index.html
├─ README.md
├─ babel.config.js
├─ package-lock.json
├─ package.json
├─ jsconfig.json
├─ tailwind.config.js
├─ vite.config.js
├─ public
│    ├─ favicon.ico
│    └─ source
│           └─ audios
│           └─images
├─ src
│    ├─ App.vue
│    ├─ main.js
│    ├─ tailwind.css
│    ├─ router
│    │    └─ index.js
│    ├─ store
│    │    └─ index.js
│    │    └─ actions.js
│    │    └─ mutations.js
|    ├─ components
│    │    └─ back
│    │    └─ front
│    │    └─ pub
│    └─ util
```

### 项目技术栈

- Vue.js
- Vue Router
- Vuex
- Vite
- Tailwind CSS
- Axios

### 项目运行

```
git clone https://github.com/C-176/LeoBlog-ui-write.git
cd LeoBlog-ui-write
npm install
npm run dev
```

### 项目预览

[LeoBlog](http://www.leoblog.icu)

### 项目截图

![img.png](http://49.235.100.240/api/source/temp/img.png)
![img_1.png](http://49.235.100.240/api/source/temp/img_1.png)
![img_2.png](http://49.235.100.240/api/source/temp/img_2.png)
![img_3.png](http://49.235.100.240/api/source/temp/img_3.png)
![img_4.png](http://49.235.100.240/api/source/temp/img_4.png)
![img_5.png](http://49.235.100.240/api/source/temp/img_5.png)
![img_6.png](http://49.235.100.240/api/source/temp/img_6.png)
![img_7.png](http://49.235.100.240/api/source/temp/img_7.png)

### 项目部署

```
npm run build
```

### 项目总结

本项目已经适配移动端。

### 项目作者

- [C-176](https://github.com/C-176)

### 项目致谢

- Vue.js
- Tailwind CSS
- Vite


