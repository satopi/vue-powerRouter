import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueRouter from 'vue-router'
import router from './assets/js/router.js'
import store from './store/store.js'
import { powerRouter }from './assets/js/router.js'

Vue.prototype.$http = axios
Vue.use(VueRouter)

// router.beforeEach导航守卫
// to: Route: 即将要进入的目标 路由对象
// from: Route: 当前导航正要离开的路由
// next: Function: 一定要调用该方法来 resolve 这个钩子。next()必须使用
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

new Vue({
  el: '#app',
  store,
  render: h => h(App),
  router
})
