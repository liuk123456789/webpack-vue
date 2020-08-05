<template>
    <div>
        <div class="base">我就是详情页</div>
        <div class="title">主页传给我的id:{{id}}</div>
        <div class="title">主页传给我的type:{{type}}</div>
        <div class="title">
            <el-select v-model="value" placeholder="请选择" size="small">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </div>
        <button class="button_default marign_top_one" @click="handleBack">点我返回主页</button>
        <div>
            <img :src="require('@/assets/images/step_three.png')" alt="">
        </div>
        <div class="test_url"></div>
    </div>
</template>

<script>
export default {
    components: {},
    props: {},
    data() {
        return {
            value: 1
        };
    },
    watch: {},
    computed: {
        options() {
            return [{
                value: '1',
                label: '吃'
            }, {
                value: '2',
                label: '喝'
            }, {
                value: '3',
                label: '拉'
            }, {
                value: '4',
                label: '撒'
            }]
        }
    },
    methods: {
        handleBack() {
            this.$router.push({name: 'home'});
        }
    },
    created() {
        let {id, type} = this.$route.query;
        this.id = id;
        this.type = type;
    },
    mounted() {}
};
</script>
<style scoped lang="less">
    @import '../../style/style.less';
</style>