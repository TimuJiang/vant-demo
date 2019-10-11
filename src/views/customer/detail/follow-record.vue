<template lang='pug'>
	.follow-record
		van-steps(
			direction="vertical"
			active-icon="like"
			active-color="#1B40D6"
			:active="-1")
			van-step.record-item(v-for="i in 20" :key="i")
				p.dateTime 2019-07-12 12:40  跟进人
				p.content 跟进记录：跟进内容跟进内容
		.bottom-row
			a.button-item(href="tel:18626855792")
				van-icon(name="phone-o" color="#1B40D6" size="22px")
				.label 电话
			a.button-item(href="sms:18626855792")
				van-icon(name="chat-o" color="#1B40D6"  size="22px")
				.label 短信
			.button-item
				van-icon(name="balance-pay" color="#1B40D6"  size="22px")
				.label 转订单
			.button-item
				van-icon(name="delete" color="#1B40D6"  size="22px")
				.label 作废
			van-button.record-button(type="info" color="#1B40D6") 记录
</template>

<script>
	import Vue from 'vue'
	import VolumeItem from '../follow-record/volume-item'
	import { Step, Steps } from 'vant'

	Vue.use(Step).use(Steps)
	export default {
		name: 'follow-record',
		components: { VolumeItem }
	}
</script>
<style lang="scss" scoped>
	.follow-record {
		padding-left: 20px;
		padding-top: 20px;
		position: absolute;
		left: 0;
		right: 0;
		top: 100px;
		bottom: 0;
		overflow: auto;
		padding-bottom: 50px;
		.record-item {
			i.van-step__circle {
				width: 8px;
				height: 8px;
				background-color: #969799;
				border-radius: 50%;
			}
		}
		.dateTime {
			font-size: 12px;
			color: #666666;
			margin: 0;
		}
		.content {
			font-size: 16px;
			color: #333333;
			margin: 5px 0;
		}
		.bottom-row {
			background: #ffffff;
			z-index: 9999;
			display: flex;
			position: fixed;
			bottom: -1px;
			left: 0;
			right: 0;
			height: 49px;
			border-top: 1px solid #1B40D6;
			.button-item {
				display: block;
				height: 100%;
				flex: 1;
				text-align: center;
				padding-top: 5px;
				line-height: 14px;
				.label {
					display: block;
					font-size: 12px;
					color: #666666;
				}
			}
			.record-button {
				flex: 2.5;
				height: 100%;
			}
		}
	}
</style>

<style>
	.follow-record .van-step__circle {
		width: 8px;
		height: 8px;
	}
</style>
