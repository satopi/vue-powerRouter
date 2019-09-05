<template>
    <main>
        <div>
            <form action="">
                <span>用户名：</span>
                <input type="text" placeholder="请输入用户名" id="user" v-model="userInfo.username">
                <br/>
                <span>密&nbsp&nbsp&nbsp码：</span>
                <input type="password" placeholder="请输入密码" id="pwd" v-model="userInfo.password">
                <input type="submit" @click="login(userInfo)" value="登录" class="login">
            </form>
        </div>
    </main>
</template>

<script>
    export default{
        name:'login',
        data(){
            return{
                userInfo:{
                    username:'',
                    password:''
                }
            }
        },
        methods:{
            login(data){
                this.$store.dispatch('Logins',data)
                .then(res=>{
                    this.$router.push({path:'/'})
                })
                .catch(()=>{})
            }
        }
    }
</script>

<style scoped>
   *{
        padding: 0;
        margin: 0;
        text-decoration: none;
    }
    div{
        width: 300px;
        padding: 20px 10px;
        border: 1px solid skyblue;
        border-radius: 20px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .login{
        margin-left: 60px;
        margin-top:15px;
        width:100px;
        background: deepskyblue;
        color:white;
        border: 1px solid deepskyblue;
        padding: 5px 0;
        border-radius:99px;
    }
    form{
        margin-left: 50px;
    }
    #user{
        margin-bottom:10px;
        border:none;
        border-bottom: 1px solid black;
    }
    #pwd{
        border:none;
        border-bottom: 1px solid black;
    }
    input{
        outline:none;
    }
</style>