<template>
    <div class="movie">
        <navbar title="喵喵电影" />
        <div class="main">
            <div class="nav">
                <ul class="second-nav" ref="menu">
                    <router-link tag="li" to="/movie/city">
                        <span>{{ $store.state.city.nm }}</span>
                        <span class="normal"><img src="../../assets/iconfont/m-downarrow.png" alt="下箭头"></span>
                        <span class="active"><img src="../../assets/iconfont/m-downarrow-selected.png" alt="下箭头"></span>
                    </router-link>
                    <router-link tag="li" to="/movie/hotplaying">正在热播</router-link>
                    <router-link tag="li" to="/movie/soontoplay">即将上映</router-link>
                    <router-link tag="li" to="/movie/search"><img src="../../assets/iconfont/search.png" alt="搜索" class="search"></router-link>
                </ul>
            </div>
            <keep-alive>
                <router-view />
            </keep-alive>
        </div>
        <tabbar />
    </div>
</template>

<script>
    import Navbar from '../../components/Navbar'
    import Tabbar from '../../components/Tabbar'
    import { location } from '../../components/JS' 
    export default {
        name: 'movie',
        data(){
            return{

            }
        },
        components:{
            navbar: Navbar,
            tabbar: Tabbar,
        },
        mounted(){
            setTimeout(() => {
                this.$http.get('/api/getLocation')
                .then(resp => {
                    const msg = resp.data.msg
                    if(msg === 'ok'){
                        var nm = resp.data.data.nm
                        var id = resp.data.data.id
                        // 如果定位是当前所在城市，则不必在显示定位弹窗
                        if(this.$store.state.city.id == id) { return }
                        // 显示地图定位的弹窗
                        location({
                            title: '定位',
                            content: nm,
                            cancle: '取消',
                            ok: '切换城市',
                            handleOk(){
                                window.localStorage.setItem('cityNm',nm)
                                window.localStorage.setItem('cityId',id)
                                window.location.reload()
                            }
                        })
                    }
                })
            },2000)
        }
    }
</script>

<style lang="scss">
    .movie{
        .main{
            .nav{
                display: flex;
                height: 11vw;
                width: 100vw;
                ul{
                    display: flex;
                    justify-content: space-around;
                    height: 11vw;
                    width: 100vw;
                    border-bottom: 0.3vw solid #f3ebe9; 
                    li{

                        width: 25%;
                        height: 10vw;
                        color: #111;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        span{
                            margin-right: 0.3vw; 
                        }
                        #location{
                            border: none;
                            height: 100%;
                        }
                        img.search{
                            width: 24px;
                            display: block;
                        }
                        .normal{
                            display: block;
                        }
                        .active{
                            display: none;
                        }
                    }
                    .router-link-active{
                        color: #f44;
                        border-bottom: 1vw solid #f44;
                        .normal{
                            display: none;
                        }
                        .active{
                            display: block;
                        }
                    }
                }
            }
        }
    }
</style>
