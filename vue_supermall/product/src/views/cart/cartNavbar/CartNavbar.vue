<template>
	<div class="navbar">
		<nav-bar>
		    <template #middle><span>购物车({{shopCount}})</span></template>
		</nav-bar>
	</div>
</template>

<script>
	export default {
		name: "CartNavber",
		props: {
			shopCount: {
				type: Number
			}
		}
	}
</script>

<style scoped lang="less">
	.navbar{
		background-color: pink;
		text-align: center;
		font-size: 16px;
		color: #FFFFFF;
	}
</style>
