<template>
    <div>
        <div class="mask" v-if="follow.visible" @click="openAd"></div>
        <ui-drawer class="drawer-box" right :docked="false" :open="open" @close="closeAd()">
            <ui-appbar title="验证">
                <ui-icon-button icon="close" @click="closeAd" slot="left" />
                <ui-icon-button icon="check" @click="followOk" slot="right" />
            </ui-appbar>
            <div class="body">
                <ui-text-field v-model="follow.code" label="验证码" />
                <br>
                <img class="folllow" src="http://webcdn.yunser.com/@yunser-mp/mp.jpg">
                <div class="followTip">专注公众号，回复「<span class="strong">{{ keyword }}</span>」获取验证码</div>
            </div>
        </ui-drawer>
    </div>
</template>

<script>
    /* eslint-disable */
    // v 1.0.1
    export default {
        data() {
            return {
                open: false,
                follow: {
                    visible: false,
                    code: ''
                },
            }
        },
        props: {
            keyword: {
                type: String,
                default: ''
            },
            code: {
                type: String,
                default: ''
            },
            page: {
                type: Object,
                default: function () {
                    return {
                        title: '云设'
                    }
                }
            },
            backable: {
                type: Boolean,
                default: false
            }
        },
        mounted() {
            console.log('this.keyword', this.keyword)
            // this.embed = this.$route.query.embed || false
            // const followFlag = this.$storage.get('followFlag', '')
            //     if (followFlag) {
            //         this._start()
            //     } else {
                    
            //     }
            console.log('?', !!this.$storage.get(`followFlag-${this.keyword}`, ''))
            this.follow.visible = !this.$storage.get(`followFlag-${this.keyword}`, '')
        },
        methods: {
            openAd() {
                this.open = true
            },
            closeAd() {
                this.open = false
            },
            toggleFollow() {
                this.follow.visible = !this.follow.visible
            },
            toggleFollow() {
                this.follow.visible = !this.follow.visible
            },
            followOk() {
                console.log('this.keyword2', `followFlag-${this.keyword}`)
                if (this.follow.code !== this.code) {
                    this.$message({
                        type: 'danger',
                        text: '验证码不正确'
                    })
                    return
                }
                this.follow.visible = false
                this.$storage.set(`followFlag-${this.keyword}`, '1')
                // this._start()
                this.open = false
            },
        }
    }
</script>

<style lang="scss" scoped>
.strong {
    color: #f00;
    font-weight: bold;
}
.mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    /* background-color: rgba(201, 100, 100, 0); */
    z-index: 100;
}
.folllow {
    max-width: 80%;
    margin-bottom: 8px;
}
.followTip {
    text-align: center;
    color: #666;
}
.drawer-box {
    z-index: 10000000;
    width: 400px;
    max-width: 300px;
    .body {
        position: absolute;
        top: 56px;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 16px;
        overflow: auto;
    }
    .content {
        width: 100%;
        height: 320px;
        padding: 16px;
    }
}
</style>

<style lang="scss">
.ui-message {
    z-index: 100000000000;
}

</style>
