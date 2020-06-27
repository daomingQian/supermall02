<template>
    <div class="bottomBar">
        <ul class="left">
            <li>
                <img src="~assets/imgs/detail/server.png" alt="">
                <p>客服</p>
            </li>
            <li>
                <img src="~assets/imgs/detail/shop.png" alt="">
                <p>店铺</p>
            </li>
            <li>
                <img src="~assets/imgs/detail/collect.png" alt="">
                <p>收藏</p>
            </li>
        </ul>
        <div class="middle" @click="addShop">
            加入购物车
        </div>
        <div class="right">
            购买
        </div>
    </div>
</template>

<script>
    export default {
        name: "DetailBottomBar",
        methods: {
            addShop(){
				this.$emit("addShop")
            }
        }
    }
</script>

<style scoped lang="less">
    .bottomBar{
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: space-between;
        height: 65px;
        .left{
            width: 50%;
            display: flex;
            li{
                text-align: center;
                img{
                    width: 40%;
                    margin-top: 10px;
                }
            }
        }
        .middle,.right{
            width: 25%;
            height: 100%;
            text-align: center;
            line-height: 65px;
        }
        .middle{
            background-color: #FEDD0E;
        }
        .right{
            float: right;
            background-color: #F57395;
            color: #fff;
        }
    }
</style>