import page from './page'
import appList from './app-list'
import result from './result'
import latex from './latex'
import stepper from './stepper'
import mpFollowAd from './mp-follow-ad'

export default {
    install: function (Vue) {
        Vue.component('my-page', page)
        Vue.component('app-list', appList)
        Vue.component('result', result)
        Vue.component('latex', latex)
        Vue.component('stepper', stepper)
        Vue.component('yunser-mp-ad', mpFollowAd)
    }
}
