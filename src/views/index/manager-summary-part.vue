<template lang='pug'>
	.manager-summary-part
		.manager-summary-part__title 商机管理系统
		van-row.manager-summary-part__content
			van-col(span="8")
				.number-cell 67
				.name-cell 终端数
			van-col.van-hairline--left(span="8")
				.number-cell 23
				.name-cell 订单数
			van-col.van-hairline--left(span="8")
				.number-cell 99
				.name-cell 潜客数
</template>

<script>
	export default {
		name: 'manager-summary-part'
	}
</script>
<style lang="scss" scoped>
	.manager-summary-part {
		background-image: linear-gradient(130deg, rgb(24, 119, 255) 0%, #195dff 78%);
		height: 90px;
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
			height: 76px;
			left: 16px;
			right: 16px;
			top: 50px;
			text-align: center;
			position: absolute;
			background: #FFFFFF;
			border-radius: 6px;
			font-size: 12px;
			color: #333333;
			box-shadow: 0 3px 4px 0 rgba(25, 92, 195, 0.3) ;
			.number-cell {
				font-size: 30px;
				color: #333333;
				font-weight: 500;
				margin-top: 12px;
			}
		}
	}
</style>
