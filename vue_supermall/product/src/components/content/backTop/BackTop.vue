<template>
    <div class="backTop">
        <img src="~assets/imgs/home/top.png" alt="">
    </div>
</template>

<script>
    export default {
        name: "BackTop"
    }
</script>

<style scoped lang="less">
    .backTop{
        position: fixed;
        bottom: 90px;
        right: 15px;
        z-index: 100;
        img{
            width: 45px;
        }
    }
</style>