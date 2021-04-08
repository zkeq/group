<template>
    <div :key="text">
        <!-- {{ text }} -->
        <div class="asd" ref="asd"></div> 
    </div>
</template>

<script>
    /* eslint-disable */
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
        },
        mounted() {
            katex.render(this.text, this.$refs.asd, {
                throwOnError: true
            })
        },
        destroyed() {
            // this.clipboard.destroy()
        },
        methods: {
        },
        watch: {
            text() {
                console.log('change')
                // katex.render(this.text, this.$refs.asd, {
                //     throwOnError: false
                // })
            }
        }
    }
</script>

<style lang="scss" scoped>
.asd {
    font-size: 32px;
}
</style>
