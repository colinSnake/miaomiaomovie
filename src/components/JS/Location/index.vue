<template>
    <div class="location">
        <h2>{{ title }}</h2>
        <p>{{ content }}</p>
        <div class="handle">
            <p @touchstart="handleCancle">{{ cancle }}</p>
            <p @touchstart="handleOk">{{ ok }}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Location'
    }
</script>

<style lang="scss" scoped>
    .location{
        width: 40vw;
        height: 26vw;
        background-color: #fff;
        box-shadow: 0.4vw 0.4vw 0.4vw 0.4vw #ccc;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        border-radius: 0.7vw; 
        h2{
            width: 100%;
            font-size: 5vw;
            text-align: center;
            font-weight: bold;
        }
        >p{
            text-align: center;
            margin: 3vw 0; 
            color: #f44;
        }
        .handle{
            display: flex;
            p{
                width: 20vw;
                height: 8vw;
                line-height: 8vw;
                border-top: 0.1vw solid #ccc; 
                text-align: center;
            }
            p:nth-of-type(1){
                border-right: 0.1vw solid #ccc; 
            }
        }
    }

</style>

