import {createRouter, createWebHistory} from 'vue-router'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


const routes = [
    {path: '/', redirect: '/index'},
    {path: '/canvas', component: () => import('@/components/pub/canvasPic.vue')},
    {path: '/canv', component: () => import('@/components/pub/canv')},
    {path: '/avatar', component: () => import('@/components/pub/avator')},
    {path: '/dialog', component: () => import('@/components/pub/searchDialog')},


    {path: '/test', component: () => import('@/components/test')},

    {path: '/user', component: () => import('@/components/pub/user')},
    {path: '/LR', component: () => import('@/components/LR')},
    {
        path: '/home', component: () => import('@/components/home'), redirect: '/home/index',
        children: [
            {path: '/editorMe', component: () => import('@/components/pub/editorMe.vue')},
            {path: '/index', component: () => import('@/components/index')},
            {path: '/write/:articleId', component: () => import('@/components/front/write')},
            {path: '/editor/new', component: () => import('@/components/pub/editorMe')},
            {path: '/home/index', name: 'index', component: () => import('@/components/front/index_main')},
            {path: '/home/article', component: () => import('@/components/front/articles')},
            {path: '/home/picture', component: () => import('@/components/front/pictures')},
            {path: '/about/bigs', component: () => import('@/components/front/bigs')},
            {path: '/home/tips', component: () => import('@/components/front/cards')},
            {path: '/about/team', component: () => import('@/components/front/team')},
            {path: '/about/contact', component: () => import('@/components/front/contact')},
            {path: '/about/privacy', component: () => import('@/components/front/privacy')},
            {path: '/about/join', component: () => import('@/components/front/join')},
            {path: '/video/:add', component: () => import('@/components/pub/video')},
            {path: '/back/info', component: () => import('@/components/back/info')},
            {path: '/back/articles', component: () => import('@/components/back/articles')},
            {path: '/back/scripts', component: () => import('@/components/back/scripts')},
            {path: '/back/comments', component: () => import('@/components/back/comments')},
            {path: '/back/pictures', component: () => import('@/components/back/pictures')},
            {path: '/back/security', component: () => import('@/components/back/security')},
            {
                path: '/search/:key', name: 'search', component: () => import('@/components/front/search'), meta: {
                    keepAlive: false,
                    title: '??????'
                }
            },
            {path: '/article/:articleId', component: () => import('@/components/front/articleShowing')},
            {path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/components/pub/404')},
        ]

    },

]

const router = createRouter({
    // 4. ??????????????? history ???????????????????????????????????????????????????????????? hash ?????????
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from) {
        // console.log(to, from)


        if (to.hash) {
            return {
                el: to.hash,
                behavior: 'smooth'
            }
        } else {
            //??????from??????????????????
            if (from.meta.keepAlive) {
                from.meta.savedPosition = document.body.scrollTop;
            }
            return {x: 0, y: to.meta.savedPosition || 0}
        }

    }
})
router.beforeEach((to, from, next) => {
    //????????????????????????
    NProgress.start()
    to.meta.keepAlive = !to.path.includes('/search');
    to.meta.transition = 'fade'
    if (to.path == '/index') {
        next()
        return
    }
    if (to.path.includes('/LR')) {
        store.commit('changeIndex', false)
        next()
    }
    let token = localStorage.getItem("token")
    let user = store.state.user
    if (to.path.includes('/home/index')) {
        if (token == null || token.trim() == '' || token == undefined || user == null || user == undefined) {
            next('/home/article')
        } else {
            next()
        }
    }

    if (to.path.includes('/back')) {
        if (token == null || token.trim() == '' || token == undefined || user == null || user == undefined) {
            next('/LR')
        } else {
            next()
        }


        store.commit('changeShell', true)
    } else {
        store.commit('changeShell', false)
    }
    next()
},)
router.afterEach(() => {
    NProgress.done()
})

export default router