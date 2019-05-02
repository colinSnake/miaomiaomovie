<template>
    <div class="tabbar">
        <van-tabbar
            v-model="active"
            active-color="#f44"
        >
            <van-tabbar-item 
                v-for="item in tabbars"
                :key="item.id"
                @click="handleChange(item.path)"
            >
                <span>{{item.title}}</span>
                <template slot="icon" slot-scope="props">
                    <img :src="props.active ? item.active : item.normal">
                </template>
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
    import Vue from 'vue'
    import { Tabbar, TabbarItem } from 'vant'
    Vue.use(Tabbar).use(TabbarItem)
    export default {
        name: 'tabbar',
        data() {
            return {
                active: 0,
                tabbars: [
                    {
                        id: 1,
                        title: '电影',
                        path: '/movie',
                        normal: require('../../assets/iconfont/movie.png'),
                        active: require('../../assets/iconfont/movie-selected.png')
                    },
                    {
                        id: 2,
                        title: '影院',
                        path: '/cinema',
                        normal: require('../../assets/iconfont/cinema.png'),
                        active: require('../../assets/iconfont/cinema-selected.png')
                    },
                    {
                        id: 3,
                        title: '我的',
                        path: '/mine',
                        normal: require('../../assets/iconfont/mine.png'),
                        active: require('../../assets/iconfont/mine-selected.png')
                    },
                ]
            }
        },
        created(){
            const routePath = this.$route.path
            this.setActive(routePath)
        },
        methods:{
            handleChange(path){
                this.$router.push(path)
            },
            setActive(path){
                this.tabbars.forEach((item,index) => {
                    if(item.path === path){
                        this.active = index;
                        return false
                    }
                })
            }
        }
    }
</script>

<style>

</style>

