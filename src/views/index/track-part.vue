<template lang='pug'>
	.track-part
		.group-title 商机中心
		van-grid
			van-grid-item(v-for="item in _types" :key="item.type" :to="`/potential-customer/${item.type}`")
				.grid__number 99
				.grid__text(:class="item.type") {{item.type}}类

</template>

<script>
	import { POTENTIAL_CUSTOMER } from 'config/types.config'
	export default {
		name: 'track-part',
		created() {
			this._types = POTENTIAL_CUSTOMER
		}
	}
</script>
<style lang="scss" scoped>
	.track-part {
		padding-top: 40px;
		background: #FFFFFF;
		.group-title {
			padding: 10px 20px;
		}
		.grid__number {
			font-size: 24px;
			color: #333333;
			font-weight: 500;
		}

		.grid__text {
			font-size: 12px;
			color: #FFFFFF;
			width: 35px;
			height: 14px;
			line-height: 16px;
			background: #FCB27C;
			border-radius: 2px;
			text-align: center;
		}
		.A,.B,.C {
			background: #07B836;
		}
		.N,.F {
			background: #FF3B30;
		}
		.O {
			background: #979797;
		}
	}
</style>
