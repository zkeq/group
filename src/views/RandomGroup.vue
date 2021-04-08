<template>
    <div title="分组" :page="page">
        <div class="common-container container">
            <!-- <img class="weapp" src="https://app.yunser.com/static/weapp.jpg"> -->
            
            <ui-tabs :value="activeTab" @change="handleTabChange">
                <ui-tab value="tab2" title="快速分组"/>
                <ui-tab value="tab1" title="普通分组"/>
            </ui-tabs>
            <div>
                <div class="form-item" v-if="activeTab === 'tab1'">
                    <ui-text-field v-model="names" label="名称" hintText="输入名称，空格或换行分隔" multiLine :rows="8" :rowsMax="8" />
                </div>

                <div class="form-item" v-if="activeTab === 'tab2'">
                    <div class="form-item">
                        <ui-text-field type="number" v-model.number="peopleNumber" label="人数"/>
                    </div>
                </div>

                <div class="form-item">
                    <ui-radio label="按组数分" name="group" nativeValue="group" v-model="groupBy" class="demo-radio"/> <br/>
                    <ui-radio label="按每组人数分" name="number" nativeValue="number" v-model="groupBy"  class="demo-radio"/> <br/>
                    <ui-radio label="自定义组数和每组人数" name="number" nativeValue="custom" v-model="groupBy"  class="demo-radio"/> <br/>
                </div>

                <div class="form-item" v-if="groupBy === 'group'">
                    <ui-text-field type="number" v-model.number="groupNumber" label="组数"/>
                </div>

                <div class="form-item" v-if="groupBy === 'number'">
                    <ui-text-field v-model.number="num" label="每组数量"/>
                </div>

                <div class="form-item" v-if="groupBy === 'custom'">
                    <!-- <ui-text-field v-model.number="num" label="每组数量"/> -->
                    <div class="help">一行一个数字，行数代表组数，每行数字代表该组的人数</div>
                    <textarea class="form-control" v-model="form.customContent" rows="8"></textarea>
                </div>

                <br/>
                <ui-checkbox v-model="form.isRandom" label="随机" class="demo-checkbox" /> 
            </div>
            <div class="btns">
                <ui-raised-button class="btn" label="分组" primary @click="make"/>
                <ui-raised-button class="btn" label="重新输入" @click="clear"/>
            </div>
            <ul class="group-list">
                <li class="group-item" v-for="group, index in groups">
                    <div class="group-name">第 {{ index + 1 }} 组：</div>
                    <ul class="name-list">
                        <li class="item" v-for="name in group">
                            {{ name }}
                        </li>
                    </ul>
                </li>
            </ul>

            <!-- <yunser-mp-ad keyword="分组" code="33" /> -->
        </div>
    </div>
</template>

<script>
    /* eslint-disable */
    import shuffle from '../util/shuffle'

    export default {
        data () {
            return {
                names: '小明\n小红\n小青\n小李\n小白\n小黄',
                groupNumber: null,
                groups: [],
                // peopleNumber: 10,
                peopleNumber: null,
                groupBy: 'group',
                // groupBy: 'custom',
                num: null,
                form: {
                    customContent: ``,
                    isRandom: true,
                },
                page: {
                    menu: [
                        // {
                        //     type: 'icon',
                        //     icon: 'help',
                        //     href: 'https://project.yunser.com/products/4fe108505a1d11e982887f5221e49d12',
                        //     target: '_blank',
                        //     title: '帮助'
                        // }
                    ]
                },
                activeTab: 'tab2'
            }
        },
        mounted () {
            // this.debug()
        },
        methods: {
            debug() {
                this.peopleNumber = 8
                this.groupNumber = 2
                this.groupBy = 'custom'
                this.make()
                // this.min = 1
                // this.max = 10
                // this.num = 4
                this.make()
            },
            make() {
                let arr
                if (this.activeTab === 'tab1') {
                    if (!this.names) {
                        this.$message({
                            type: 'danger',
                            text: '请输入名称'
                        })
                        return
                    }
                    arr = this.names.split(/\s+/).filter(item => item)
                    if (arr.length < 2) {
                        this.$message({
                            type: 'danger',
                            text: '名称至少两个'
                        })
                        return
                    }
                } else {
                    if (!this.peopleNumber) {
                        this.$message({
                            type: 'danger',
                            text: '请输入人数'
                        })
                        return
                    }
                    arr = []
                    for (let i = 0; i < this.peopleNumber; i++) {
                        arr.push('' + (i + 1))
                    }
                    console.log('arr', arr)
                }
                if (!this.groupNumber) {
                    this.groupNumber = 2
                    // this.$message({
                    //     type: 'danger',
                    //     text: '请输入组数'
                    // })
                    // return
                }
                let groupNum
                let oneGroupNum
                if (this.groupBy === 'group') {
                    if (this.groupNumber < 2) {
                        this.$message({
                            type: 'danger',
                            text: '分组数至少是两组'
                        })
                        return
                    }
                    if (arr.length < this.groupNumber) {
                        this.$message({
                            type: 'danger',
                            text: '分组数必须小于人数'
                        })
                        return
                    }
                    groupNum = this.groupNumber
                    oneGroupNum = Math.ceil(arr.length / groupNum)
                } else if (this.groupBy === 'number') {
                    if (!this.num) {
                        this.$message({
                            type: 'danger',
                            text: '请输入每组数量'
                        })
                        return
                    }
                    groupNum = Math.ceil(arr.length / this.num)
                    oneGroupNum = this.num
                } else {
                    console.log('啦啦啦11')
                    if (!this.form.customContent) {
                        this.$message({
                            type: 'danger',
                            text: '请输入自定义内容'
                        })
                        return
                    }
                }

                let sortedArr = arr
                if (this.form.isRandom) {
                    sortedArr = shuffle(arr)
                }
                let groups = []
                console.log('groupNum', groupNum)
                console.log('oneGroupNum', oneGroupNum)
                if (this.groupBy === 'group') {
                    for (let i = 0; i < sortedArr.length; i++) {
                        // let groupNum
                        let idx = i % groupNum
                        console.log('idx', idx)
                        if (!groups[idx]) {
                            groups[idx] = []
                        }
                        groups[idx].push(sortedArr[i])
                    }
                } else if (this.groupBy === 'number') {
                    for (let i = 0; i < sortedArr.length; i++) {
                        let idx = Math.floor(i / oneGroupNum)
                        if (!groups[idx]) {
                            groups[idx] = []
                        }
                        groups[idx].push(sortedArr[i])
                    }
                } else {
                    console.log('啦啦啦2')
                    let nums = this.form.customContent.split('\n').filter(item => item).map(item => parseInt(item))
                    console.log('nums', nums)
                    let peopleIndex = 0
                    let groupIndex = 0
                    for (let item of nums) {
                        groups[groupIndex] = []
                        for (let i = 0; i< item; i++) {
                            groups[groupIndex].push(sortedArr[peopleIndex])
                            peopleIndex++
                        }
                        groupIndex++
                    }

                }
                console.log('groups', groups)
                this.groups = groups
            },
            clear() {
                this.names = ''
                this.groupNumber = null
                this.num = null
                this.peopleNumber = null
                this.groups = []
            },
            handleTabChange (val) {
                this.activeTab = val
            },
        }
    }
</script>

<style lang="scss" scoped>
.weapp {
    display: block;
    width: 480px;
    max-width: 100%;
    /* width: 100%;
    max-width: 480px; */
    margin: 0 auto 32px auto;
}
.form-control {
    display: block;
    width: 100%;
    max-width: 400px;
    // height: 33px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42;
    color: #55595c;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 2px;
    outline: none;
    margin-bottom: 16px;
}

    .container {
        max-width: 400px;
    }
    .group-list {
        .group-item {}
        .group-name {}
        .name-list {
            display: flex;
        }
        .item {
            margin-right: 16px;
            margin-bottom: 16px;
        }
    }
    .btns {
        margin-bottom: 16px;
        .btn {
            margin-right: 8px;
        }
    }
</style>
