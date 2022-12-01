import {createRouter, createWebHistory} from 'vue-router'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


const routes = [
    {path: '/', redirect: '/home/index'},

    {path: '/test', component: () => import('@/components/test')},
    {path: '/index', component: () => import('@/components/index')},
    {path: '/user', component: () => import('@/components/pub/user')},
    {path: '/LR', component: () => import('@/components/LR')},
    {
        path: '/home', component: () => import('@/components/home'), redirect: '/home/index',
        children: [
            {path: '/write/:articleId', component: () => import('@/components/front/write')},
            {path: '/home/index', name: 'index', component: () => import('@/components/front/index_main')},
            {path: '/home/article', component: () => import('@/components/front/articles')},
            {path: '/home/picture', component: () => import('@/components/front/pictures')},
            {path: '/home/about/bigs', component: () => import('@/components/front/about')},
            {path: '/home/about/team', component: () => import('@/components/front/team')},
            {path: '/home/video/:add', component: () => import('@/components/pub/video')},
            {path: '/back/info', component: () => import('@/components/back/info')},
            {path: '/back/articles', component: () => import('@/components/back/articles')},
            {path: '/back/scripts', component: () => import('@/components/back/scripts')},
            {path: '/back/comments', component: () => import('@/components/back/comments')},
            {path: '/back/pictures', component: () => import('@/components/back/pictures')},
            {path: '/back/security', component: () => import('@/components/back/security')},
            {
                path: '/search/:key', name: 'search', component: () => import('@/components/front/search'), meta: {
                    keepAlive: false,
                    title: '搜索'
                }
            },
            {path: '/article/:articleId', component: () => import('@/components/front/articleShowing')},

        ]

    },
    {path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/components/pub/404')},
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
    NProgress.start()
    to.meta.keepAlive = !to.path.includes('/search');
    to.meta.transition = 'fade'
    if (to.path == '/index') {
        next()
        return
    }
    if (to.path.includes('/LR')) {
        store.commit('changeLogin', true)
        store.commit('changeIndex', false)
        next()
    } else {
        let token = localStorage.getItem("token")
        let user = store.state.user
        if (token == null || token.trim() == '' || token == undefined || user == null || user == undefined) {
            next('/LR')
        } else {
            next()
        }
    }
    if (to.path.includes('/back')) {
        store.commit('changeShell', true)
    } else {
        store.commit('changeShell', false)
    }
},)
router.afterEach(() => {
    NProgress.done()
})

export default router