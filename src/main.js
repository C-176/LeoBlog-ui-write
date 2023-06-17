import {createApp} from 'vue'
import App from './App.vue'
import './tailwind.css'
import axios from 'axios'
import router from "@/router";
import store from '@/store';
import Swal from "sweetalert2";
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import '/public/static/css/daemon.css'
import '/public/static/css/loading.css'
import '/public/static/css/compiled.css'
// import '/public/static/js/three.min'
// import '/public/static/js/vanta.halo.min'
// import '/public/static/js/vanta.fog.min'
// import '/public/static/js/vanta.net.min'
import 'element-plus/theme-chalk/dark/css-vars.css'
import bread from "@/components/pub/bread";
import bigImg from "@/components/pub/bigImg";
import user from "@/components/pub/user"
import loader from "@/components/pub/loader";


import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import Prism from 'prismjs';
import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index';
import '@kangc/v-md-editor/lib/plugins/emoji/emoji.css';
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';

VueMarkdownEditor.use(vuepressTheme, {Prism}).use(createCopyCodePlugin()).use(createEmojiPlugin());

import icon from '@/components/pub/icon'


// VueMarkdownEditor

// 第一步导入默认图片
import IMG_SRC from '/source/images/index/1.jpg'


//全局注册一个a函数
const app = createApp(App)
app.config.globalProperties.$sa = (msg, icon) => {
    Swal.fire({
        title: msg,
        // text: 'This is a sweet alert',
        icon: icon,
        confirmButtonText: '确定',

    })
}
app.config.globalProperties.$st = (title, icon) => {

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        width: 300,
        showConfirmButton: false,
        timer: 2000
    })

    Toast.fire({
        icon,
        title
    })
}
//1.开发 2.生产
let env = 1
let host = ''
if (env === 1) {
    host = 'localhost'
    app.config.globalProperties.baseURL = 'http://localhost:8080'
    axios.defaults.baseURL = 'http://localhost:8080'
} else if (env === 2) {
    host = '49.235.100.240'
    app.config.globalProperties.baseURL = 'http://' + host + '/api'
    axios.defaults.baseURL = 'http://' + host + '/api'
}
app.config.globalProperties.$host = host
axios.interceptors.response.use(res => {
        if (res.data.code === 401) {
            app.config.globalProperties.$st('请先登录', 'error')
        }
        // 给res添加cors
        // res.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
        return res
    }
)
axios.interceptors.request.use(config => {
        const token = localStorage.getItem('token')
        if (token) config.headers['Authorization'] = token
        return config
    }
)

app.config.globalProperties.$axios = axios

app.config.globalProperties.$moments = (stamp, format = '', short = false) => {
    let date = new Date(stamp)
    let Y = date.getFullYear()
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
    let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
    let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours())
    let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
    let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    var result;

    if (format === '') result = Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s
    else result = format.replace('Y', Y).replace('M', M).replace('D', D).replace('h', h).replace('m', m).replace('s', s)
    if (short) result = (new Date().getTime() - date.getTime() > 1000 * 60 * 60 * 24 ? Y + '/' + M + '/' + D : '') + ' ' + h + ':' + m
    return result
}
app.config.globalProperties.p = (pic) => {
    if (pic == '') return pic
    if (pic) {
        return pic.startsWith('http') ? pic : app.config.globalProperties.baseURL + pic
    } else {
        return ''
        // return IMG_SRC
    }
}

app.config.globalProperties.$imgOnerror = e => {
    let img = e.srcElement
    img.src = IMG_SRC
    img.onerror = null
}

import bgCover from "@/components/pub/BgCover.vue";
import badge from "@/components/pub/badge.vue";
import myModal from "@/components/pub/myModal.vue";

app.use(router).use(store).use(ElementPlus).use(Antd).use(VueMarkdownEditor).component('loader', loader)
    .component('bread', bread).component('bgCover', bgCover)
    .component('icon', icon)
    .component('user', user)
    .component('bigImg', bigImg)
    .component('badge', badge)
    .component('myModal', myModal)


app.mount('#app')

export default app