<template>
    <div class="main" ref="movie_body">
        <loading v-if="isLoading" />
        <scroller v-else :handleScroll="handleScroll" :handleTouchEnd="handleTouchEnd">
            <ul>
                <p class="pullDown">{{pullMessage}}</p>
                <li 
                    v-for="item in hotPlayingList"
                    :key="item.id"
                >
                    <div class="pic_show" @tap="handleToDetail(item.id)"><img :src="item.img | setWH('128.180')" alt="电影封面"></div>
                    <div class="info_list">
                        <h2 @tap="handleToDetail(item.id)">{{item.nm}}</h2>
                        <p><span class="grade">观众评&nbsp;{{item.sc}}</span><img v-if="item.version" src="../../assets/3d.png" alt="3d图标" class="movie-logo"></p>
                        <p>主演：{{item.star}}</p>
                        <p>{{item.showInfo}}</p>
                    </div>
                    <div class="btn-pre">
                        购票
                    </div>
                </li>
            </ul>
        </scroller>    
    </div>
</template>

<script>
    export default {
        name: 'HotPlaying',
        data(){
            return{
                hotPlayingList: [],
                pullMessage: '',
                isLoading: true,
                prevCityId: -1, // 记录上一次城市的id
            }
        },
        activated(){
            var cityId = this.$store.state.city.id
            // 判断上一次的城市id是否改变，改变就重新请求数据
            if(this.prevCityId === cityId){ return }
            this.isLoading = true
            this.$http.get('/api/movieOnInfoList?cityId='+cityId)
                .then(resp => {
                    const msg = resp.data.msg;
                    if(msg === 'ok'){
                        this.hotPlayingList = resp.data.data.movieList
                        this.isLoading = false
                        this.prevCityId = cityId
                    }
                })
        },
        methods:{
            handleToDetail(id){
                console.log(id)
            },
            handleScroll(pos){
                if(pos.y > 30){
                    this.pullMessage = '数据加载中，请稍后...'
                }
            },
            handleTouchEnd(pos){
                if(pos.y > 30){
                    var cityId = this.$store.state.city.id
                    this.$http.get('/api/movieOnInfoList?cityId='+cityId)
                        .then(resp => {
                            const msg = resp.data.msg;
                            if(msg === 'ok'){
                                this.pullMessage = '加载完成'
                                setTimeout(() => {
                                    this.hotPlayingList = resp.data.data.movieList
                                    this.pullMessage = ''
                                },1000)
                            }
                        }
                    )
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .main{
        width: 100vw;
        height: 145vw;
        overflow: auto;  
        ul{
            width: 100vw;
            display: flex;
            flex-direction: column;
            .pullDown{
                font-size: 4vw;
                color: #ccc;
                text-align: center;
                padding: 1vw 0;
            } 
            li{
                display: flex;
                align-items: center;
                width: 96vw;
                height: 28vw;
                margin-bottom: 1.5vw; 
                padding: 0 2vw; 
                border-bottom: 0.2vw solid #ecebec; 
                .pic_show{
                    width: 17.1vw;
                    height: 24vw;
                    img{
                        width: 100%;
                        display: block;
                    }
                }
                .info_list{
                    flex: 1;
                    height: 24vw;
                    margin-left: 5vw; 
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    h2{
                        font-size: 4.8vw;
                        font-weight: bold;
                    }
                    p{
                        color: #8c8b8c;
                    }
                    p:nth-of-type(1){
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        .movie-logo{
                            margin-right: 10vw;
                        }
                    }
                    p:nth-of-type(2){
                        overflow: hidden;
                        width: 59vw;
                        text-overflow:ellipsis;
                        white-space:nowrap
                    }
                    .grade{
                        color: #f3b209;
                        font-weight: bold;
                    }
                }
                .btn-pre{
                    width: 15vw;
                    height: 7.5vw;
                    background-color: #ff4b3a;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border: 0.1vw solid #111;
                    color: #fff;
                    border-radius: 1.8vw; 
                }
            }
        }
    }
</style>