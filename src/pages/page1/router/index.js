
let routes = [
    {
        path: "",
        component: () => import("../App.vue"),
        redirect: '/home',
        children:[
            {
                path: 'home',
                name: 'home',
                component: () => import(/* webpackChunkName: "page-home" */"../home/home.vue"),
                children: [
                    {
                        path: 'detail',
                        name: 'detail',
                        component: () => import(/* webpackChunkName: "page-home" */'../home/detail.vue'),
                    }
                ]
            }
        ]
    }
]

export default routes;