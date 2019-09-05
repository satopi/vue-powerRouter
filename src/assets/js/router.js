import VueRouter from 'vue-router'

import home from '../../components/home.vue'
import admin from '../../components/admin.vue'
import user from '../../components/user.vue'
import login from '../../components/login.vue'
export default new VueRouter({
    routes:[
        {
            path:'/index',component:login,name:'login'
        }
    ]
});

// 动态路由meta定义role
// 常量参数mata
export const powerRouter = [
    {
        path:'/',redirect:'/home',name:'home',component:home,hidden:false,
        children:[
            {path:'/home',name:'admin',component:admin,meta:{role:'admin'}},
            {path:'/home',name:'user',component:user,meta:{role:'user'}}
        ]
    }
]