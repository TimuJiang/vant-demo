<template lang='pug'>
	.manager-summary-part
		.manager-summary-part__title 商机管理系统
		van-row(:class="{ 'is-manager': isManager }").manager-summary-part__content
			.content-title(v-if="isManager") 今日业绩
			van-col(:span="colNum" @click="() => { this.$router.push(isManager ? '/order' : '/niche-follow/1') }")
				.number-cell {{isManager ? homePageData.terminalCount || 0 : homePageData.notFollowUpCount || 0}}
				.name-cell {{isManager ? '终端数' : '未跟进'}}
			van-col.van-hairline--left(:span="colNum" @click="() => { this.$router.push(isManager ? '/order' : '/niche-follow/4') }")
				.number-cell {{isManager ? homePageData.orderCount || 0 : homePageData.timeOutNotFollowUpCount || 0}}
				.name-cell {{isManager ? '订单数' : '过期未跟进'}}
			van-col.van-hairline--left(:span="colNum" v-if="isManagerOrPhoneSpecialist" @click="() => { this.$router.push(isManager ? '/potential-customer/H/saleLoginName/-1' : '/clue-assign') }")
				.number-cell(:class="{ 'red': isManager }") {{isManager ? homePageData.businessOppotunityCount || 0 : homePageData.unallocated || 0}}
				.name-cell {{isManager ? '商机数' : '未分配'}}
</template>

<script>
	export default {
		name: 'manager-summary-part',
		props: {
			isManager: Boolean
		},
		computed: {
			homePageData() {
				return this.$store.state.homePageData
			},
			isManagerOrPhoneSpecialist() {
				return this.isManager || this.$store.getters.isPhoneSpecialist
			},
			colNum() {
				return this.isManagerOrPhoneSpecialist ? '8' : '12'
			}
		}
	}
</script>
<style lang="scss" scoped>
	.manager-summary-part {
		background: url("~assets/home/home_bg.png") no-repeat center;
		height: 100px;
		overflow: visible;
		position: relative;
		box-sizing: border-box;
		&__title {
			text-align: center;
			font-size: 18px;
			color: #FFFFFF;
			padding-top: 10px;
		}
		&__content {
			z-index: 1;
			height: 76px;
			left: 16px;
			right: 16px;
			top: 60px;
			text-align: center;
			position: absolute;
			background: #FFFFFF;
			border-radius: 6px;
			font-size: 12px;
			color: #333333;
			box-shadow: 0 3px 4px 0 rgba(25, 92, 195, 0.3);
			&.is-manager {
				height: 106px;
			}
			.content-title {
				height: 30px;
				line-height: 30px;
				text-align: center;
				font-size: 16px;
				box-sizing: border-box;
				border-bottom: 1px solid #efeff4
			}
			.number-cell {
				font-size: 30px;
				color: #333333;
				font-weight: 500;
				margin-top: 12px;
				&.red {
					color: red;
				}
			}
		}
	}
</style>
<style>
	.manager-summary-part .van-hairline--left::after {
		top: -15%;
		bottom: -15%;
	}
</style>
