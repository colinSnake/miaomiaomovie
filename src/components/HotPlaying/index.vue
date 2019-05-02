<template>
    <div class="main">
        <ul>
            <li 
                v-for="item in hotPlayingList"
                :key="item.id"
            >
                <div class="pic_show"><img :src="item.img | setWH('128.180')" alt="电影封面"></div>
                <div class="info_list">
                    <h2>{{item.nm}}</h2>
                    <p>观众评 <span class="grade">{{item.sc}}</span><img src="../../assets/3d.png" alt="3d图标" class="movie-logo"></p>
                    <p>主演：{{item.star}}</p>
                    <p>{{item.showInfo}}</p>
                </div>
                <div class="btn-pre">
                    购票
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'HotPlaying',
        data(){
            return{
                hotPlayingList: []
            }
        },
        created(){
            this.$http.get('/api/movieOnInfoList?cityId=10')
                .then(resp => {
                    const msg = resp.data.msg;
                    if(msg === 'ok'){
                        this.hotPlayingList = resp.data.data.movieList
                        console.log(hotPlayingList)
                    }
                })
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
                        .movie-logo{
                            margin-left: 15vw; 
                        }
                    }
                    p:nth-of-type(2){
                        overflow: hidden;
                        width: 60vw;
                        text-overflow:ellipsis;
                        white-space:nowrap
                    }
                    .grade{
                        color: #f3b209;
                        font-weight: bold;
                        margin-left: 2vw; 
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