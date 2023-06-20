import {createRouter, createWebHistory} from 'vue-router'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


const routes = [

    {path: '/canvas', component: () => import('@/components/pub/canvasPic.vue')},
    {path: '/canv', component: () => import('@/components/pub/canv')},

    {path: '/test', component: () => import('@/components/test')},

    {path: '/user', component: () => import('@/components/pub/user')},
    {path: '/userProfile', component: () => import('@/components/pub/userProfile.vue')},
    // {path: '/tag', component: () => import('@/components/pub/tag')},

    {
        path: '/home', component: () => import('@/components/home'), redirect: '/home/index',
        children: [
            {path: '/', redirect: '/index'},
            {path: '/LR', component: () => import('@/components/LR')},
            {path: '/editorMe', component: () => import('@/components/pub/editorMe.vue')},
            {path: '/account', component: () => import('@/components/pub/account.vue')},
            {path: '/index', component: () => import('@/components/index')},
            {path: '/write/:articleId', component: () => import('@/components/front/write')},
            {path: '/editor/new', component: () => import('@/components/pub/editorMe')},
            {path: '/home/index', name: 'index', component: () => import('@/components/front/index_main')},
            {path: '/home/article', component: () => import('@/components/front/articles')},
            {path: '/home/picture', component: () => import('@/components/front/pictures.vue')},
            {path: '/about/bigs', component: () => import('@/components/front/bigs')},
            {path: '/home/tips', component: () => import('@/components/front/cards')},
            {path: '/about/team', component: () => import('@/components/front/team')},
            {path: '/about/contact', component: () => import('@/components/front/contact')},
            {path: '/about/privacy', component: () => import('@/components/front/privacy')},
            {path: '/about/join', component: () => import('@/components/front/join')},
            {path: '/video/:add', component: () => import('@/components/pub/video')},
            {
                path: '/back/info', component: () => import('@/components/back/info'), children: [

                    {path: '/back/info/article', component: () => import('@/components/back/info-articles.vue')},
                    {path: '/back/info/comment', component: () => import('@/components/back/info-comments.vue')},
                    {path: '/back/info/picture', component: () => import('@/components/front/pictures.vue')},

                ]
            },
            {path: '/back/articles', component: () => import('@/components/back/articles')},
            {path: '/back/scripts', component: () => import('@/components/back/scripts')},
            {path: '/back/comments', component: () => import('@/components/back/comments')},
            {path: '/back/pictures', component: () => import('@/components/front/pictures.vue')},
            {path: '/back/security', component: () => import('@/components/back/security')},
            {
                path: '/search/:key', name: 'search', component: () => import('@/components/front/search'), meta: {
                    keepAlive: false,
                    title: '搜索'
                }
            },
            {path: '/badgeShow', component: () => import('@/components/pub/badgeShow.vue')},
            {path: '/article/:articleId', component: () => import('@/components/front/articleShowing')},
            {path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/components/pub/404')},
        ]

    },

]

const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
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
            //获取from的滚动条位置
            if (from.meta.keepAlive) {
                from.meta.savedPosition = document.body.scrollTop;
            }
            return {x: 0, y: to.meta.savedPosition || 0}
        }

    }
})
router.beforeEach((to, from, next) => {
    //将页面设置为缓存
    NProgress.configure({showSpinner: false});
    NProgress.start();
    to.meta.keepAlive = !to.path.includes('/search');
    to.meta.transition = 'fade'
    if (to.path == '/index') {
        store.commit('changeShell', false)
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