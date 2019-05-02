<template>
    <div class="main">
        <ul>
            <li 
                v-for="item in SoonToPlayList"
                :key="item.id"
            >
                <div class="pic_show"><img :src="item.img | setWH('128.180')" alt="电影封面"></div>
                <div class="info_list">
                    <h2>{{item.nm}}</h2>
                    <p><span class="person">{{item.wish}}</span>人想看</p>
                    <p>主演：{{item.star}}</p>
                    <p>{{item.rt}}上映</p>
                </div>
                <div class="btn-pre">
                    预售
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'SoonToPlay',
        data(){
            return{
                SoonToPlayList: []
            }
        },
        created(){
            this.$http.get('/api/movieComingList?cityId=10')
                .then(resp => {
                    const msg = resp.data.msg;
                    if(msg === 'ok'){
                        this.SoonToPlayList = resp.data.data.comingList
                        console.log(this.SoonToPlayList)
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
                    p:nth-of-type(2){
                        overflow: hidden;
                        width: 60vw;
                        text-overflow:ellipsis;
                        white-space:nowrap
                    }
                }
                .btn-pre{
                    width: 15vw;
                    height: 7.5vw;
                    background-color: #3499ef;
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