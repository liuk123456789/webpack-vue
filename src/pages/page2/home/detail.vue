<template>
    <div>
        <div class="base">我就是详情页</div>
        <div class="title">主页传给我的id:{{id}}</div>
        <div class="title">主页传给我的type:{{type}}</div>
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
        return {};
    },
    watch: {},
    computed: {},
    methods: {
        handleBack() {
            this.$router.push({name: 'homeOther'});
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
    @import '../style/style.less';
</style>