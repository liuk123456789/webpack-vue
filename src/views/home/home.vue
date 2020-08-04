<template>
    <div>
        <button @click="handleDetail" class="button_default">点我跳转详情页面</button>
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
            this.$router.push({name: 'detail', query: {id: 1, type: 'examine'}});
        }
    },
    created() {
    },
    mounted() {}
};
</script>
<style scoped lang="less">
    @import '../../style/style.less';
</style>