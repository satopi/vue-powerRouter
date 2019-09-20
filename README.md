本实例主要实现在 **登录** 时根据 **用户权限** 跳转至 **相应页面**，共有两个角色：**admin  user**，密码均为**123**
 
#### demo:https://github.com/satopi/vue-powerRouter

####  **admin** 拥有管理员权限，跳转至管理员页面
 
####  **user** 拥有普通用户权限，跳转至普通用户页面

![nu1uM6.gif](https://s2.ax1x.com/2019/09/05/nu1uM6.gif)

## 重点

### 动态路由的关键在于router配置的==meta字段==和==vuex状态共存==

#### src/assets/js/router.js

```
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
```
### 从页面中获取用户名和密码并验证后存进session和state

#### src/components/login.vue methods部分代码

```
 methods:{
    login(data){
        this.$store.dispatch('Logins',data)
        .then(res=>{
            this.$router.push({path:'/'})
        })
        .catch(()=>{})
    }
}
```
#### src/store/store.js actions部分代码

```
Logins({commit},info){
    return new Promise((resolve,reject)=>{
        let data = {};
        // 获取所有用户信息
        // arr.map(function (item,index){})更新数组，不改变原数组，使用return操作输出，会循环数组每一项，并在回调函数中操作
        userData.map(function (item){
            if(info.username == item.username || info.password == item.password ){
                // 把用户名进行存储
                commit('SET_USERNAME',item.username);
                // 存入session
                sessionStorage.setItem('USERNAME',item.username);
                commit('SET_PASSWORD',item.password);
                sessionStorage.setItem('PASSWORD',item.password);
                commit('SET_ROLE',item.role)
                sessionStorage.setItem('ROLE',item.role);
                return data={username:item.username,role:item.role}
            }else{
                return data;
            }
        })
        // 返回数据
        resolve(data);
    }).catch(error => {
        // 返回错误
        reject(error);
    })
},
Roles({commit},newRouter){
    return new Promise((resolve,reject)=>{
        // 存储最新路由
        commit('SET_NEWROUTER',newRouter);
        resolve(newRouter);
    }).catch(error=>{
        reject(error);
    })
}
```
### 根据权限进行路由过滤，跳转至相应页面，此处涉及router的[导航守卫](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html)
### to: Route: 即将要进入的目标 路由对象
### from: Route: 当前导航正要离开的路由
### next: Function: 一定要调用该方法来 resolve 这个钩子。
#### main.js

```
router.beforeEach((to,from,next)=>{
  // console.log(to);
  if(store.getters.role){
    if(store.getters.newRouter.length != 0){
      next();
    }else{
      let newRouter
      let newChildren = powerRouter[0].children.filter(route => {
        if(route.meta){
          if(route.meta.role == store.getters.role){
            return true
          }
            return false
        }else{
          return true
        }
      })
      newRouter = powerRouter
      newRouter[0].children = newChildren
      // 添加动态路由
      router.addRoutes(newRouter)
      store.dispatch('Roles',newRouter)
      .then(res => {
        // ...为ES6中的扩展运算符，即把to这个对象打散，相当于next(to.path)
        next({...to})
      })
      .catch(()=>{

      })
    }
  }else{
    // 在to.path中有/index时跳转到该路由，否则跳到登录页面
    if(['/index'].indexOf(to.path) != -1){
      next()
    }else{
      next('/index')
    }
  }
})
```
#### src/components/home.vue 部分代码

```
<template v-for="item in newRouter[0].children" v-if="!item.hidden">
    <main>
        <router-view></router-view>
    </main>
</template>

<script>
    ......
    computed:{
        ...mapGetters([
            'newRouter'
        ])
    }
    .....
</script>
```

### mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性，关于Getter的核心概念可参考[这里](https://www.jianshu.com/p/1ff1282d7483)
