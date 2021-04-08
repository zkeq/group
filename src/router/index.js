import Vue from 'vue'
import Router from 'vue-router'

// const Home = resolve => require(['@/views/Home'], resolve)
const RandomGroup = resolve => require(['@/views/RandomGroup'], resolve)
// const Error404 = resolve => require(['@/views/error/Error404'], resolve)

Vue.use(Router)

let routes = [
    {
        path: '/',
        component: RandomGroup
    },
    // {
    //     path: '/random/group',
    //     component: RandomGroup
    // },
]

let router = new Router({
    mode: 'hash',
    routes: routes,
    scrollBehavior (to, from, savedPosition) {
        return {
            x: 0,
            y: 0
        }
    }
})

export default router
