
let routes = [
    {
        path: "",
        component: () => import("./App.vue"),
        redirect: '/home',
        children:[
            {
                path: 'home',
                name: 'home',
                component: () => import(/* webpackChunkName: "home" */"@/views/home/home.vue"),
                children: [
                    {
                        path: 'detail',
                        name: 'detail',
                        component: () => import(/* webpackChunkName: "home" */'@/views/home/detail.vue'),
                    }
                ]
            }
        ]
    }
]

export default routes;