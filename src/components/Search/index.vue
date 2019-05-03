<template>
    <div class="search">
        <div class="search_input_wrapper">
            <input type="text" v-model="message">
            <img src="../../assets/iconfont/m-search.png" alt="搜索图标" class="search-logo">
        </div>
        <div class="search_result">
            <h3>电影/电视剧/综艺</h3>
            <ul>
                <li v-for="item in moviesList" :key="item.id">
                    <div class="img">
                        <img :src="item.img | setWH('128.180')" alt="电影封面">
                    </div>
                    <div class="info">
                        <p><span>{{item.nm}}</span><span>{{item.sc}}</span></p>
                        <p>{{item.enm}}</p>
                        <p>{{item.cat}}</p>
                        <p>{{item.rt}}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Search',
        data(){
            return{
                message: '',
                moviesList: []
            }
        },
        methods:{
            // 处理axios多次请求(防抖)
            cancelRequest(){
                if(typeof this.source ==='function'){
                    this.source('终止请求'); //取消请求
                }
            }
        },
        watch:{
            message(newVal){
                var cityId = this.$store.state.city.id
                this.cancelRequest()
                this.$http.get('/api/searchList?cityId='+cityId+'&kw='+newVal,{
                    cancelToken: new this.$http.CancelToken((c) => {
                        this.source = c;
                    })
                })
                    .then(resp => {
                        let msg = resp.data.msg
                        let movies = resp.data.data.movies
                        if(msg && movies){
                            this.moviesList = resp.data.data.movies.list
                        }
                    })
                    .catch(error => {
                        if (this.$http.isCancel(err)) {
                            console.log('Rquest canceled', err.message); // 请求如果被取消，这里是返回取消的message
                        } else {
                            console.log(error);
                        }
                    })

            }
        }
    }
</script>

<style lang="scss" scoped>
    .search{
        height: 145vw;
        overflow: auto;
        .search_input_wrapper{
            width: 100vw;
            height: 10vw;
            background-color: #f5f4f6;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 0.1vw solid #edebed; 
            input{
                width: 86vw;
                height: 8vw;
                padding-left: 10vw; 
                position: relative;
                border-radius: 2vw; 
                border: 0.1vw solid #edebed; 
                background-color: #fff;
            }
            .search-logo{
                position: absolute;
                top: 25vw;
                left: 5vw;
            }
        }
        .search_result{
            h3{
                height: 10vw;
                line-height: 10vw;
                color: #a49a9e;
                margin-left: 3vw; 
                border-bottom: 0.1vw solid #edebed; 
            }
            ul{
                display: flex;
                flex-direction: column;
                li{
                    width: 94vw;
                    height: 28vw;
                    padding: 0 3vw;
                    display: flex;
                    align-items: center;
                    .img{
                        width: 17.1vw;
                        height: 24vw;
                        img{
                            width: 100%;
                            display: block;
                        }
                    }
                    .info{
                        flex: 1;
                        height: 24vw;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        margin-left: 4vw; 
                        p{
                            color: #8c8b8c;
                        }
                        p:nth-of-type(1){
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            color: #000;
                            span:nth-of-type(1){
                                font-size: 4.5vw;
                                font-weight: bold;
                            }
                            span:nth-of-type(2){
                                color: #eda876;
                            }
                        }
                    }
                }
            }
        }
    }
</style>