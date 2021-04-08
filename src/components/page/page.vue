<template>
    <ui-page :title="title || page.title" :page="page" :backable="backable" ref="page">
        <div slot="drawer">
            <div class="header">
                <img class="logo" src="/static/img/rand.svg">
            </div>
            <ui-list @itemClick="toggle()">
                <!-- <ui-list-item title="首页" to="/">
                    <ui-icon slot="left" value="home"/>
                </ui-list-item>
                <ui-list-item title="学习" href="https://edu.yunser.com/" target="_blank">
                    <ui-icon slot="left" value="link"/>
                </ui-list-item>
                <ui-list-item title="关于" href="https://project.yunser.com/products/c187f450725511e98aed6f15c76c270d" target="_blank">
                    <ui-icon slot="left" value="info"/>
                </ui-list-item> -->
            </ui-list>
        </div>
        <slot></slot>
    </ui-page>
</template>

<script>
    export default {
        data() {
            return {
                open: false,
                docked: true
            }
        },
        props: {
            title: {
                type: String,
                default: ''
            },
            name: {
                type: String,
                default: 'default'
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
        methods: {
            toggle() {
                console.log(this.$refs.page)
            }
        }
    }
</script>

<style lang="scss" scoped>
.header {
    padding: 40px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}
.logo {
    display: block;
    width: 80px;
    margin: 0 auto;
}
</style>