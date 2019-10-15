<template lang='pug'>
	.follow-record
		.no-record(v-if="records.length === 0") -暂无记录-
		van-steps(
			v-else
			direction="vertical"
			active-icon="like"
			active-color="#1B40D6"
			:active="-1")
			van-step.record-item(v-for="(item, index) in records" :key="item.id")
				p.dateTime {{item.createTime}}  {{item.foBy || '-'}}
				p.content {{index === 0 ? '最新记录' : '跟进记录'}}：{{item.incident.disName}}
				p.content.remark {{item.remark || ''}}
		.bottom-row(v-if="!isManager")
			a.button-item(href="tel:18626855792")
				m-icon(icon-class="icon-telephone")
				.label 电话
			a.button-item(href="sms:18626855792")
				m-icon(icon-class="icon-message")
				.label 短信
			.button-item(@click="goToOrder")
				m-icon(icon-class="icon-order")
				.label 转订单
			.button-item(@click="() => { cancelOrDefeat(records.length > 0 ? '战败' : '作废') }")
				m-icon(icon-class="icon-cancel1")
				.label {{records.length > 0 ? '战败' : '作废'}}
			van-button.record-button(type="info" color="#1B40D6" @click="() => { $router.push(`/customer/${$route.params.id}/edit`) }") 记录
		.bottom-row(v-else)
			.manager-button(@click="() => { goToOperation('assign') }") 分配
			.manager-button(@click="() => { goToOperation('pass') }") 通过
			.manager-button(@click="() => { goToOperation('reject') }") 驳回
</template>

<script>
	import Vue from 'vue'
	import VolumeItem from '../follow-record/volume-item'
	import { Step, Steps } from 'vant'

	Vue.use(Step).use(Steps)
	export default {
		name: 'follow-record',
		components: { VolumeItem },
		props: {
			customer: Object
		},
		methods: {
			cancelOrDefeat(type) {
				if (type === '战败') {
					this.$router.push(`/defeat-verify/verify-operation/defeat/id/${this.$route.params.id}`)
				} else {

				}
			},
			goToOrder() {
				this.$router.push(`/order/order-detail/-1/t/edit/customerId/${this.$route.params.id}`)
			},
			goToOperation(type) {
				this.$router.push(`/defeat-verify/verify-operation/${type}/id/${this.$route.params.id}`);
			}
		},
		computed: {
			c() {
				return this.customer
			},
			records() {
				return this.customer.followVos ? [...this.customer.followVos].reverse() : []
			},
			isManager() {
				return this.$store.getters.isManager
			}
		}
	}
</script>
<style lang="scss" scoped>
	.follow-record {
		.no-record {
			color: #969799;
			font-size: 14px;
			line-height: 50px;
			text-align: center;
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
		}
		padding-left: 20px;
		padding-top: 20px;
		position: absolute;
		left: 0;
		right: 0;
		top: 90px;
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
			&.remark {
				font-size: 14px;
				color: #969799;
			}
		}
		.bottom-row {
			background: #ffffff;
			z-index: 9999;
			display: flex;
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			height: 50px;
			border-top: 1px solid #efeff4;
			box-sizing: border-box;
			.manager-button {
				height: 100%;
				line-height: 50px;
				text-align: center;
				width: 33%;
				position: relative;
				&:last-child {
					width: 34%;
					background-color: #1B40D6;
					color: #fff;
				}
				&:first-child {
					&::after {
						content: ' ';
						width: 1px;
						position: absolute;
						right: 0;
						background-color: rgba(0,0,0,0.12);
						top: 5px;
						bottom: 5px;
					}
				}
			}
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
	.follow-record .button-item .m-icon {
		vertical-align: unset;
		font-size: 22px;
	}
</style>
