<template>
    <div class="cart">
		<cart-navbar :shopCount="listShop.length"></cart-navbar>
		<scroll :probe="probe" ref="scroll" @scroll="scroll">
			<template>
				<div class="all" v-for="(item, index) in listShop">
					<div class="svg" :class="{active_avg: item.is_checked}" @click="check(index,$event)">
						<img src="~assets/imgs/cart/success.svg" @load="load">
					</div>
					<div class="show">
						<img :src="item.image" alt="">
						<section>
							<p>{{item.title}}</p>
							<p>{{item.desc}}</p>
							<p>
								<span>{{item.price}}</span>
								<span>x{{item.count}}</span>
							</p>
						</section>
					</div>
				</div>
				<div class="allSelect leftSelect"  @click="select">
					全选
				</div>
				<div class="allSelect rightSelect"  @click="noSelect">
					全不选
				</div>
			</template>
		</scroll>
    </div>
</template>

<script>
	import {mapState, mapMutations} from 'vuex'
	import CartNavbar from "./cartNavbar/CartNavbar.vue"
    export default {
        name: "Cart",
		data(){
			return {
				probe: 3,
				boolean: true
			}
		},
			
		methods:{
			...mapMutations(['cartList','checked','allChecked','noChecked']),
			
			scroll(){
			},
			load(){
				this.$refs.scroll.fresh()
			},
			check(index,e){
				this.$nextTick(()=>{
					this.checked({index:index})
					this.$forceUpdate()
				})
			},
			select(){
				this.allChecked()
				this.$forceUpdate()
			},
			noSelect(){
				this.noChecked()
				this.$forceUpdate()
			}
			
		},
		computed:{
			...mapState(["listShop"])
		},
		components:{
			CartNavbar
		}
    }
</script>

<style scoped lang="less">
	.cart{
		position: relative;
		height: 100vh;
		.all{
			display: flex;
			height: 15vh;
			padding: 10px 8px;
			border-bottom: 5px solid #ddd;
			.svg{
				width: 15px;
				height: 15px;
				margin-top: 6vh;
				background-color: #fff;
				border: 2px solid #ddd;
				border-radius: 50%;
				img{
					width: 15px;
					height: 15px;
				}
			}
			.active_avg{
				background-color: #E14934;
				border: 2px solid #E14934;
			}
			.show{
				display: flex;
				img{
					height: 15vh;
					border-radius: 10px;
					margin:0 10px;
				}
				section{
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					p{
						width: 60vw;
						height: 4vh;
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
						&:nth-child(2){
							font-size: 0.75rem;
							color: #555;
						}
						&:nth-child(3){
							span:nth-child(1){
								color: #F0612B;
							}
							span:nth-child(2){
								float: right;
							}
						}
					}
				}
			}
		}
		.allSelect{
			width: 20vw;
			height: 5vh;
			background-color: #E14934;
			color: #FFFFFF;
			font-size: 18px;
			font-weight: 500;
			line-height: 5vh;
			text-align: center;
			border-radius: 5px;
		}
		.leftSelect{
			float: left;
		}
		.rightSelect{
			float: right;
		}
	}
</style>