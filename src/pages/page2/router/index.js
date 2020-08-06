
let routes = [
    {
        path: "",
        component: () => import("../App.vue"),
        redirect: '/homeOther',
        children:[
            {
                path: 'homeOther',
                name: 'homeOther',
                component: () => import(/* webpackChunkName: "home" */"../home/home.vue"),
                children: [
                    {
                        path: 'detailOther',
                        name: 'detailOther',
                        component: () => import(/* webpackChunkName: "home" */'../home/detail.vue'),
                    }
                ]
            }
        ]
    }
]

export default routes;