import Vue from 'vue';
import App from './App.vue';
import routes from './routes';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import _ from 'lodash';

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(ElementUI);

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
