<template>
    <div>
        <div class="stepper">
            <div class="btn minus" @click="minus">-</div>
            <input class="input" v-model.number="value" type="number" />
            <div class="btn add" @click="add">+</div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        props: {
            value: {
                type: Number,
                default: 0
            },
        },
        methods: {
            minus() {
                let value = parseInt(this.value)
                if (value > 1) {
                    this.value = parseInt(this.value) - 1
                    // console.log(this.$refs.page)
                    this.$emit('input', this.value)
                }
            },
            add() {
                console.log('this.value', this.value, 3, '3')
                this.value = parseInt(this.value) + 1
                // console.log(this.$refs.page)
                this.$emit('input', this.value)
            }
        }
    }
</script>

<style lang="scss" scoped>
.stepper {
    display: flex;
    align-items: center;
    .btn {
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        border-radius: 8px;
        border: 1px solid #000;
        cursor: pointer;
    }
    .minus {}
    .add {}
    .input {
        width: 32px;
        border: none;
        outline: none;
        margin: 0 8px;
        text-align: center;
    }
}
</style>