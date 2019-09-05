<template>
    <main>
        这是管理员
        <div @click="loginOut()">退出</div>
    </main>
</template>

<script>
    import {mapGetters} from 'vuex';
    export default{
        name:'admin',
        data(){
            return{

            }
        },
        computed:{
            ...mapGetters([
                'newRouter'
            ])
        },
        methods:{
            loginOut(){
                this.$store.dispatch('Logout')
                .then(()=>{
                    this.$router.push({path:'/index'});
                })
                .catch(err =>{
                    this.$message.error(err);
                })
            }
        }
    }
</script>