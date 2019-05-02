<template>
    <div>
        <navbar title="喵喵影院" />
        <tabbar />
    </div>
</template>

<script>
    import Navbar from '../../components/Navbar'
    import Tabbar from '../../components/Tabbar'
    export default {
        name: 'cinema',
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
