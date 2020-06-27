<template>
    <div class="detail" v-if="iid">
        <detail-nav-bar @myEvent="jump" ref="navBar"></detail-nav-bar>
		<success v-show="showSuccess"></success>
        <scroll :probe="probe" ref="scroll" @scroll="scroll">
            <template>
                <detail-swiper :topImages="topImages"></detail-swiper>
                <detail-base-info :goodsInfo="goodsInfo"></detail-base-info>
                <detail-shop-Info :shopInfo="shopInfo"></detail-shop-Info>
                <detail-info :info="info" @loadEnd="loadEnd"></detail-info>
                <detail-item-params :itemParams="itemParams" ref="params"></detail-item-params>
                <detail-rate :rate="rate" ref="rate"></detail-rate>
                <goods-list :list="recommend" @loadEnd="loadEnd" ref="recommend"></goods-list>
            </template>
        </scroll>
        <detail-bottom @addShop='addShop'></detail-bottom>
        <back-top v-show="isShowBackTop" @click.native="backTop"></back-top>
    </div>
</template>

<script>
    import DetailNavBar from "./detailNavBar/DetailNavBar";
    import DetailSwiper from "./detailSwiper/DetailSwiper";
    import DetailBaseInfo from "./detailBaseInfo/DetailBaseInfo";
    import DetailShopInfo from "./detailShopInfo/DetailShopInfo";
    import DetailInfo from "./detailInfo/DetailInfo";
    import DetailItemParams from "./detailItemParams/DetailItemParams";
    import DetailRate from "./detailRate/DetailRate";
    import GoodsList from "components/content/goods/GoodsList";
    import DetailBottom from "./detailBottomBar/DetailBottomBar";
	import Success from "./detailCart/success.vue"

    import {backTopMixin} from "components/commen/utils/mixins.js"
    import {getDetail,GoodsInfo,getRecommend} from "network/detail.js"
	
	import {mapState, mapMutations} from 'vuex'
    export default {
        name: "Detail",
        data(){
            return {
                iid: 0,
                timer: null,
                topImages: [],
                goodsInfo: {},
                shopInfo: {},
                info: {},
                itemParams: {},
                rate: {},
                recommend: [],
                themeTopYs: [0],
                probe: 3,
                currentIndex: 0,
                y: 0,
				shopCart: {},
				showSuccess: false
            }
        },
        components: {
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailShopInfo,
            DetailInfo,
            DetailItemParams,
            DetailRate,
            GoodsList,
            DetailBottom,
			Success
        },
        methods: {
            //每张图片加载结束执行  加上防抖操作  刷新可滑动尺寸
            loadEnd(){
                clearTimeout(this.timer)
                this.timer = setTimeout(()=>{
					if(this.$refs.scroll){
						this.$refs.scroll.fresh()
					}
					//向themeTopYs添加位置信息
                    this.themeTopYs = [0]
                    this.themeTopYs.push(this.$refs.params.$el.offsetTop)
                    this.themeTopYs.push(this.$refs.rate.$el.offsetTop)
                    this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
                    this.themeTopYs.push(Number.MAX_VALUE)
                },200)
            },
            // 请求网路数据
            getDgetDetail(iid){
                getDetail(iid).then(msg=>{
                    this.topImages = msg.data.result.itemInfo.topImages
                    this.goodsInfo = new GoodsInfo(msg.data.result.itemInfo, msg.data.result.columns, msg.data.result.shopInfo.services)
                    this.shopInfo = msg.data.result.shopInfo
                    this.info = msg.data.result.detailInfo
                    this.itemParams = msg.data.result.itemParams
                    if(msg.data.result.rate.cRate>0){
                        this.rate = msg.data.result.rate.list[0]
                    }
                })
            },
            getRecommend(){
                getRecommend().then(msg=>{
                    this.recommend = msg.data.data.list
                })
            },

            //跳转对应的位置
            jump(index){
                this.$refs.scroll.backTop(0,-this.themeTopYs[index],200)
            },
            //滚轮在滚动时
            scroll(position){
                this.y = -position.y
                for(let i = 0; i<this.themeTopYs.length-1; i++){
                    if(this.currentIndex!==i && (this.y>=this.themeTopYs[i] && this.y<this.themeTopYs[i+1])){
                        this.currentIndex=i
                        this.$refs.navBar.currentIndex = this.currentIndex
                    }
                }

                if(this.y > 1000){
                    this.isShowBackTop = true
                }else {
                    this.isShowBackTop = false
                }
            },
			// 点击加入购物车
			addShop(){
				this.shopCart.image = this.topImages[0],
				this.shopCart.title = this.goodsInfo.title
				this.shopCart.desc = this.goodsInfo.desc
				this.shopCart.price = this.goodsInfo.price
				this.shopCart.iid = this.iid
				this.shopCart.is_checked = true
				this.cartList(this.shopCart)
				
				setTimeout(()=>{
					this.showSuccess = true
					
				},0)
				setTimeout(()=>{
					this.showSuccess = false
				},1000)
				
			},
			...mapMutations(['cartList'])
			
        },
		computed:{
			...mapState(["listShop"])
		},
        mixins: [backTopMixin],
        created() {
            this.iid = this.$route.params.iid
            this.getDgetDetail(this.$route.params.iid)
            this.getRecommend(this.recommend)
        },
        mounted() {

        }
    }
</script>

<style scoped lang="less">
    .detail{
        position: relative;
        height: 100vh;
        background-color: #fff;
        z-index: 3;
    }
</style>