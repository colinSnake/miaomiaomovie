<template>
    <div class="wrapper" ref="wrapper">
        <slot></slot>
    </div>
</template>

<script>
    import Bscroll from 'better-scroll'
    export default {
        name: 'Scroller',
        props:{
            handleScroll:{
                type: Function,
                default: function(){}
            },
            handleTouchEnd:{
                type: Function,
                default: function(){}
            }
        },
        mounted(){
            var scroll = new Bscroll(this.$refs.wrapper,{
                tap: true, // 点击事件（滑动不触发，点击触发）
                probeType: 1, // 滚动的时候会派发scroll事件，会截流
            })
            this.scroll = scroll
            scroll.on('scroll',(pos) => {
                this.handleScroll(pos)
            })
            scroll.on('touchEnd',(pos) => {
                this.handleTouchEnd(pos)
            })        
        },
        methods:{
            // 跳转到对应索引位置
            handleToScrollTop(y){
                // 两个参数x轴和y轴
                this.scroll.scrollTo(0,y)
            }
        }
    }
</script>

<style scoped>
    .wrapper{
        height: 100%;
    }
</style>

