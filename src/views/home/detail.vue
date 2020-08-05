<template>
    <div>
        <div class="base">我就是详情页</div>
        <div class="title">主页传给我的id:{{id}}</div>
        <div class="title">主页传给我的type:{{type}}</div>
        <div class="title">
            <span>测试Elementui是否生效：</span>
            <el-time-select
                v-model="date"
                size="small"
                :picker-options="{
                    start: '08:30',
                    step: '00:15',
                    end: '18:30'
                }"
                placeholder="选择时间">
            </el-time-select>
        </div>
        <div class="title">
            <span>测试lodash是否生效：</span>
            <span>{{res}}</span>
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
            date: null,
            res: null
        };
    },
    watch: {},
    computed: {},
    methods: {
        handleBack() {
            this.$router.push({name: 'home'});
        }
    },
    created() {
        let {id, type} = this.$route.query;
        this.id = id;
        this.type = type;
        this.res = JSON.stringify(_.defaults({ 'a': 1 }, { 'a': 3, 'b': 2 }));
    },
    mounted() {}
};
</script>
<style scoped lang="less">
    @import '../../style/style.less';
</style>