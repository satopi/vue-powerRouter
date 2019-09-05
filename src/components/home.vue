<template v-for="item in newRouter[0].children" v-if="!item.hidden">
    <main>
        <router-view></router-view>
    </main>
</template>

<script>
    import {mapGetters} from 'vuex';
    export default{
        name:'home',
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