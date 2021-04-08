<template>
    <div class="result" v-if="text">
        <pre class="content">{{ text }}</pre>
        <div class="btns">
            <ui-raised-button class="btn btn-copy" label="复制" v-if="copyable" />
        </div>
    </div>
</template>

<script>
    const ClipboardJS = window.ClipboardJS

    export default {
        data() {
            return {
            }
        },
        props: {
            text: {
                type: String,
                default: ''
            },
            copyable: {
                type: Boolean,
                default: false
            }
        },
        mounted() {
            this.clipboard = new ClipboardJS('.btn-copy', {
                target(trigger) {
                    return trigger
                },
                text: trigger => {
                    return this.text
                }
            })
            this.clipboard.on('success', e => {
                this.$message({
                    type: 'success',
                    text: '已复制'
                })
                e.clearSelection()
            })
            this.clipboard.on('error', e => {
                console.error('Action:', e.action)
                console.error('Trigger:', e.trigger)
            })
        },
        destroyed() {
            this.clipboard.destroy()
        },
        methods: {
        }
    }
</script>

<style lang="scss" scoped>
.result {
    max-width: 400px;
    padding: 16px;
    // font-size: 20px;
    background-color: #fff;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.117647), 0 1px 4px rgba(0, 0, 0, 0.117647);
}
.btns {
    .btn {
        margin-top: 16px;
        margin-right: 8px;
    }
}
pre {
    font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,微软雅黑,Arial,sans-serif;
}
</style>
