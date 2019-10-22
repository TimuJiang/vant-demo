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
				p.content.remark {{(item.remark || item.defeatReason) || ''}}
				m-audio-play
		.bottom-row(v-if="!isManager")
			a.button-item(href="tel:18626855792")
				m-icon(icon-class="icon-telephone")
				.label 电话
			a.button-item(href="sms:18626855792")
				m-icon(icon-class="icon-message")
				.label 短信
			.button-item(@click="goToOrder" :class="{'disabled': orderDisabled}")
				m-icon(icon-class="icon-order")
				.label 转订单
			.button-item(@click="cancelOrDefeat" :class="{'disabled': defeatOrCancelDisabled}")
				m-icon(icon-class="icon-cancel1")
				.label {{defeatOrCancel}}
			van-button.record-button(type="info" color="#1B40D6" @click="() => { $router.push(`/customer/${$route.params.id}/edit`) }") 记录
		.bottom-row(v-if="isManager && customer.pCustomerStatus === '51080007'")
			.manager-button(@click="() => { goToOperation('assign') }") 分配
			.manager-button(@click="() => { goToOperation('pass') }") 通过
			.manager-button(@click="() => { goToOperation('reject') }") 驳回
		van-action-sheet(v-model="actionShow" :actions="cancelOptionEnum" @select="onSelect")
		m-loading(:show="loadingShow" text="")
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
		data() {
			return {
				actionShow: false,
				loadingShow: false,
				defeatDisabledStatusList: ['51080015', '51080007', '51080010', '51080025'], // 战败 战败待审 已转订单 已报终端 的潜客战败按钮置灰
				orderDisabledList: ['51080010', '51080025'] // 已转订单 已报终端的潜客转订单按钮置灰
			}
		},
		methods: {
			cancelOrDefeat() {
				if (this.defeatOrCancel === '战败') {
					this.$router.push(`/defeat-verify/verify-operation/defeat/id/${this.$route.params.id}`)
				} else {
					this.actionShow = true
				}
			},
			goToOrder() {
				this.$router.push(`/order/order-detail/-1/t/edit/customerId/${this.$route.params.id}`)
			},
			goToOperation(type) {
				this.$router.push(`/defeat-verify/verify-operation/${type}/id/${this.$route.params.id}`);
			},
			onSelect(item) {
				this.loadingShow = true
				this.$api.clueCustomer.cancelCustomer({
					pCustomerId: this.customer.id,
					cancelOption: item.value
				}).then(() => {
					this.$toast('作废成功')
					this.$router.back()
				}).catch(({ message }) => {
					this.$dialog.alert({
						message: message || '作废失败'
					})
				}).finally(() => {
					this.actionShow = false
					this.loadingShow = false
				})
			}
		},
		computed: {
			cancelOptionEnum() {
				return this.$store.getters.enums.CancelOptionEnum.map((item) => {
					return {
						name: item.disName,
						value: item.name
					}
				})
			},
			c() {
				return this.customer
			},
			records() {
				return this.customer.followVos ? [...this.customer.followVos].reverse() : []
			},
			isManager() {
				return this.$store.getters.isManager
			},
			artificialNum() {
				let artificialNum = 0
				this.records.forEach((item) => {
					if (item.createdType.disName === '人工') {
						artificialNum++
					}
				})
				return artificialNum
			},
			defeatOrCancel() {
				// 51200035
				if (this.records.length === 0) {
					return '作废'
				} else { // 人工记录数大于1的时候按钮为战败
					return this.artificialNum <= 1 ? '作废' : '战败'
				}
			},
			defeatOrCancelDisabled() { // 无记录 或者 无人工记录 或者 战败 战败待审 已转订单 已报终端 的潜客战败按钮置灰
				return this.records.length === 0 || this.artificialNum === 0 || (this.defeatDisabledStatusList.indexOf(this.customer.pCustomerStatus) !== -1)
			},
			orderDisabled() {
				return (this.orderDisabledList.indexOf(this.customer.pCustomerStatus) !== -1)
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
			z-index: 999;
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
				&.disabled {
					opacity: 0.3;
					pointer-events: none;
				}
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
	.follow-record .van-action-sheet {
		z-index: 20122!important;
	}
</style>
