<template lang='pug'>
	.track-part(:class="{ 'is-manager': isManager }")
		.group-title 商机中心
		.center-line
			van-grid
				van-grid-item(v-for="item in _types" :key="item.type" :to="`/potential-customer/${item.type}/saleLoginName/-1`" v-if="!(!isManager && item.type === 'cancelled')")
					.grid__number {{homePageData[`${item.type.toLowerCase()}Count`] || 0}}
					.grid__text(:class="item.type") {{item.type === 'cancelled' ? item.name : `${item.type}类`}}

</template>

<script>
	import { POTENTIAL_CUSTOMER } from 'config/types.config'
	export default {
		name: 'track-part',
		props: {
			isManager: Boolean
		},
		computed: {
			homePageData() {
				return this.$store.state.homePageData
			}
		},
		created() {
			this._types = POTENTIAL_CUSTOMER
		},
		methods: {
			getCount(type) {
				return this.homePageData[`${type.toLowerCase()}Count`]
			}
		}
	}
</script>
<style lang="scss" scoped>
	.track-part {
		padding-top: 40px;
		background: #FFFFFF;
		&.is-manager {
			padding-top: 70px;
		}
		.group-title {
			padding: 10px 20px;
			font-weight: bold;
		}
		.grid__number {
			font-size: 24px;
			color: #333333;
			font-weight: 500;
		}

		.grid__text {
			font-size: 12px;
			color: #FFFFFF;
			min-width: 35px;
			height: 14px;
			line-height: 16px;
			border-radius: 2px;
			text-align: center;
		}
		.A,.B,.C {
			background: #FCB27C;
		}
		.N,.F {
			background: #07B836;
		}
		.H {
			background: #FF3B30;
		}
		.O, .cancelled {
			background: #979797;
		}
		.cancelled {
			padding: 0 3px
		}
		.center-line {
			position: relative;
			&::after {
				content: '';
				position: absolute;
				top: 50%;
				left: 20px;
				right: 20px;
				height: 1px;
				background-color: #efeff4;
			}
		}
	}
</style>
<style>
	.track-part .van-hairline--top::after {
		border-width: 0;
	}
	.track-part .van-grid-item__content::after {
		border-bottom-width: 0;
		top: 5%;
		bottom: 5%;
	}
</style>
