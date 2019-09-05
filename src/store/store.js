import Vue from 'vue'
import Vuex from 'vuex'
import { userData }from '../../data/data.js'

Vue.use(Vuex)
export default new Vuex.Store({
    // 存数据
    state:{
        username:sessionStorage.getItem('USERNAME'),
        password:sessionStorage.getItem('PASSWORD'),
        role:sessionStorage.getItem('ROLE'),
        newRouter:[]
    },
    getters:{
        username:state=>state.username,
        password:state=>state.password,
        role:state=>state.role,
        newRouter:state=>state.newRouter
    },
    mutations:{
        // 设置用户名、密码、权限和路由
        SET_USERNAME:(state,username)=>{
            state.username = username;
        },
        SET_PASSWORD:(state,password)=>{
            state.password = password;
        },
        SET_ROLE:(state,role)=>{
            state.role = role;
        },
        SET_NEWROUTER:(state,newRouter)=>{
            state.newRouter = newRouter;
        }
    },
    actions:{
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
        },
        Logout({commit,state}){
            return new Promise((resolve,reject)=>{
                commit('SET_USERNAME','');
                commit('SET_PASSWORD','');
                commit('SET_ROLE','');
                commit('SET_NEWROUTER',[]);
                location.reload();
                sessionStorage.removeItem('USERNAME');
                sessionStorage.removeItem('PASSWORD');
                sessionStorage.removeItem('ROLE');
                resolve();
            }).catch(error => {
                reject(error);
            })
        }
    }
})