<template>
    <div class="city">
        <div class="city_list">
            <loading v-if="isLoading" />
            <scroller v-else ref="city_list">
                <div>
                    <div class="city_hot">
                        <h2>热门城市</h2>
                        <ul>
                            <li v-for="item in hotCities" :key="item.id" @tap="handleToChangeCity(item.nm,item.id)">{{item.nm}}</li>
                        </ul>
                    </div>
                    <div class="city_sort" ref="city_sort">
                        <div class="city_model" v-for="item in cityLists" :key="item.index">
                            <h2>{{item.index}}</h2>
                            <ul>
                                <li v-for="child in item.list" :key="child.id" @tap="handleToChangeCity(child.nm,child.id)">{{child.nm}}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </scroller>
        </div>
        <div class="city_index">
            <ul>
                <li v-for="(item,index) in cityLists" :key="item.index" @touchstart="handleToIndex(index)">{{item.index}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'City',
        data(){
            return{
                cityLists: [],
                hotCities: [],
                isLoading: true  
            }
        },
        mounted(){
            // 通过第一次获取的城市数据存储到本地，不用每次去发送ajax请求，节省资源
            var cityLists = window.localStorage.getItem('cityLists')
            var hotCities = window.localStorage.getItem('hotCities')
            if(cityLists && hotCities){
                this.cityLists = JSON.parse(cityLists)
                this.hotCities = JSON.parse(hotCities)
                this.isLoading = false
            }else{
                this.$http.get('/api/cityList')
                .then(resp => {
                    const msg = resp.data.msg;
                    if(msg === 'ok'){
                        let cities = resp.data.data.cities
                        // 映射数组
                        let {cityLists,hotCities} = this.formatCityList(cities)
                        this.cityLists = cityLists
                        this.hotCities = hotCities
                        window.localStorage.setItem('cityLists',JSON.stringify(cityLists))
                        window.localStorage.setItem('hotCities',JSON.stringify(hotCities))
                        this.isLoading = false
                    }
                })
                .catch(error => {
                    console.log(error)
                })
            }
        },
        methods:{
            // 格式化cityList
            formatCityList(cities){
                // 城市列表
                let cityLists = []
                // 热门城市
                let hotCities = []

                // 筛选出对应索引的城市
                for(var i = 0; i < cities.length; i++){
                    let firstletter = cities[i].py.slice(0,1).toUpperCase()
                    if(toJudge(firstletter)){ // 新添加的index(索引)
                        cityLists.push({ index: firstletter, list: [{ nm: cities[i].nm, id: cities[i].id }]})
                    }else{ // 原来的index(索引)则进行对应索引城市的添加
                        for(var j = 0; j < cityLists.length; j++){
                            if(cityLists[j].index === firstletter){
                                cityLists[j].list.push({ nm: cities[i].nm, id: cities[i].id })
                            }
                        }
                    }
                }
                
                // 索引排序，从A-Z
                cityLists.sort((a,b) => {
                    if(a.index > b.index){
                        return 1
                    }else if(a.index < b.index){
                        return -1
                    }else{
                        return 0
                    }
                })

                // 判断是否为首次添加索引
                function toJudge(firstletter){
                    for(var i = 0; i < cityLists.length; i++){
                        // 判断索引和第一个字母是否相等
                        if(cityLists[i].index === firstletter){
                            return false
                        }
                    }
                    return true
                }
                
                // 筛选出热门城市
                for(var i = 0; i < cities.length; i++){
                    if(cities[i].isHot === 1){
                        hotCities.push(cities[i])
                    }
                }
                return {cityLists,hotCities}
            },
            // 点击索引跳转到对应位置
            handleToIndex(index){
                var h2 = this.$refs.city_sort.getElementsByTagName('h2')
                // 使用了全局注册的scroller组件，导致写的原生的索引定位失效了
                // this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop - 105
                this.$refs.city_list.handleToScrollTop(-h2[index].offsetTop - 5)
            },
            // 切换城市
            handleToChangeCity(nm,id){
                // 切换城市
                this.$store.commit('city/CITY_INFO',{ nm, id })
                window.localStorage.setItem('cityNm',nm)
                window.localStorage.setItem('cityId',id)
                this.$router.push({path: '/movie/hotplaying'})
            }
        },
    }
</script>

<style lang="scss">
    .city{
        width: 100vw;
        display: flex;
        .city_list{
            width: 94vw;
            height: 145vw;
            overflow: auto;
            background-color: #fff4f2; 
            .city_hot{
                h2{
                    background-color: #f1eff1;
                    height: 8vw;
                    line-height: 8vw; 
                    font-size: 4.5vw;
                    padding-left: 4vw;
                    margin-top: 5vw;
                }
                ul{
                    width: 86vw;
                    display: flex;
                    flex-wrap: wrap;
                    padding: 5vw 4vw 2vw 4vw;
                    li{
                        width: 20vw;
                        height: 4vw;
                        line-height: 4vw;
                        padding: 2vw;
                        text-align: center;
                        margin-right: 6.4vw; 
                        margin-bottom: 3vw; 
                        border: 0.2vw solid #eee8e8;
                    }
                    li:nth-of-type(3n){
                        margin-right: 0;
                    }
                }
            }
            .city_sort{
                .city_model{
                    background-color: #fff4f2; 
                    h2{
                        background-color: #f1eff1;
                        height: 8vw;
                        line-height: 8vw; 
                        font-size: 4.5vw;
                        padding-left: 4vw;
                    }
                    ul{
                        width: 86vw;
                        display: flex; 
                        flex-direction: column;
                        padding: 4vw 4vw 0 4vw;
                        li{
                            margin-bottom: 4vw; 
                        }
                    }
                }
            }
        }
        .city_index{
            flex: 1;
            font-size: 4.5vw;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 10vw; 
            background-color: #fff;
        }
    }
</style>

