<template>
    <div class="navbar">
        <van-nav-bar
            :title="title"
        />
    </div>
</template>

<script>
    import Vue from 'vue'
    import { NavBar } from 'vant';
    Vue.use(NavBar);
    export default {
        name: 'navbar',
        props: {
            title:{
                type: String,
                default: '喵喵电影'
            }
        },

    }
</script>

<style lang="scss">
    .navbar{
        .van-nav-bar{
            background-color: #f44; 
        }
        .van-nav-bar__title{
            color: #fff;
        }
    }
</style>

