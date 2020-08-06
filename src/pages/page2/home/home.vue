<template>
    <div>
        <div>
            <a href="main.html">我要去home页</a>
        </div>
        <button @click="handleDetail" class="button_default">点我跳转详情页面(other)</button>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    components: {},
    props: {},
    data() {
        return {
        };
    },
    watch: {},
    computed: {},
    methods: {
        handleDetail() {
            this.$router.push({name: 'detailOther', query: {id: 1, type: 'examine'}});
        }
    },
    created() {
    },
    mounted() {}
};
</script>
<style scoped lang="less">
    @import '../style/style.less';
</style>