<template>
    <div class="mine">
        <navbar title="我的喵喵" />
        <tabbar />
    </div>
</template>

<script>
    import Navbar from '../../components/Navbar'
    import Tabbar from '../../components/Tabbar'
    export default {
        name: 'mine',
        data(){
            return{

            }
        },
        components:{
            navbar: Navbar,
            tabbar: Tabbar
        }
    }
</script>

<style>

</style>
