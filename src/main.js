import Vue from 'vue';
import App from './App.vue';
import routes from './routes';
import VueRouter from 'vue-router';

Vue.config.productionTip = false;
Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'hash',
    routes
})
new Vue({
    router,
    render: h => h(App)
}).$mount("#app")

if (module && module.hot) {
    module.hot.accept()
}
