<template lang="pug">
	m-page.order-list
		.head
			van-tabs(v-model="active" title-active-color="#1B40D6" title-inactive-color="#333")
				van-tab(title="全部")
				van-tab(title="未审核")
				van-tab(title="已审核")
				van-tab(title="已开票")
				van-tab(title="已交车")
		.container
			.time-choose
				van-dropdown-menu(v-if="true")
					van-dropdown-item(
						:title="currentDateFormat"
						ref="timePicker"
					)
						van-datetime-picker(
							v-model="currentDate"
							type="year-month"
							:formatter="formatter"
							@confirm="dateConfirm"
							@cancel="dateCancel"
						)
			.list-container
				div
					van-pull-refresh(v-model="isLoading" @refresh="onRefresh")
						van-list(
							v-model="loading"
							:finished="finished"
							finished-text="我是有底线的"
							:immediate-check="false"
							@load="onLoad"
						)
							div
								.cell(
									v-for="(item, index) in list"
									:key="index"
								)
									.order-info
										span.order-id 销售单号：1234567
										span(:style="{color: getStatusColor(item.status)}").order-status {{getStatusText(item.status)}}
									.info
										div
											span.name 霍元甲
										.car 试驾车型：2018款博越运动款运动款...
									.operation
										span.price 成交价：20万 定金：5万
										.operation-button(v-if="item.status === 1" @click="commonCancel") 作废
										.operation-button(v-if="item.status === 1") 修改
										.operation-button(v-if="item.status === 2" @click="goToInvoice") 开票
										.operation-button(v-if="item.status === 3" @click="goToDelivery") 交车
</template>

<script>
	import Vue from 'vue'
	import { Tab, Tabs, Dialog, DatetimePicker } from 'vant'
	Vue.use(Tab).use(Tabs).use(DatetimePicker)

	export default {
		name: 'list',
		mounted() {
			this.triggerLoad();
		},
		data() {
			return {
				active: 0,
				loading: false,
				isLoading:false,
				finished: false,
				list: [
					{
						status: 1
					},
					{
						status: 2
					},
					{
						status: 3
					},
					{
						status: 4
					}
				],
				currentDate: new Date(),
				confirmDate: new Date(), // 只有点击确认才会改变这个值 取消选择日期的时候返回到该值
				companyBlue: '#1B40D6'
			}
		},
		computed: {
			currentDateFormat() {
				let year = this.confirmDate.getFullYear();
				let month = this.confirmDate.getMonth() + 1;
				return `${year}年${month}月`;
			}
		},
		methods: {
			goToInvoice() {
				this.$router.push('order/invoice/2')
			},
			goToDelivery() {
				this.$router.push('order/delivery/2')
			},
			toggleTimePicker() {
				this.$refs.timePicker.toggle();
			},
			dateConfirm(value) {
				this.confirmDate = value;
				this.toggleTimePicker();
			},
			dateCancel() {
				this.currentDate = this.confirmDate
				this.toggleTimePicker();
			},
			formatter(type, value) {
				if (type === 'year') {
					return `${value}年`;
				} else if (type === 'month') {
					return `${value}月`
				}
				return value;
			},
			triggerLoad() {
				this.loading = true;
				this.onLoad()
			},
			onLoad() {
				// 异步更新数据
				setTimeout(() => {
					// 加载状态结束
					this.loading = false;

					// 数据全部加载完成
					this.finished = true;
				}, 500);
			},
			onRefresh() {
				setTimeout(() => {
					this.$toast('刷新成功');
					this.isLoading = false;
				}, 500);
			},
			getStatusText(status) {
				switch (status) {
					case 1:
						return '未审核';
					case 2:
						return '已审核';
					case 3:
						return '已开票';
					case 4:
						return '已交车';
					default:
						return ''
				}
			},
			getStatusColor(status) {
				switch (status) {
					case 1:
						return '#FF3B30';
					case 2:
						return '#F29D00';
					case 3:
						return '#07B836';
					case 4:
						return '#07B836';
					default:
						return ''
				}
			},
			commonCancel() {
				// 1.销售经理取消审核 2.销售顾问作废
				Dialog.confirm({
					message: '确认要作废销售订单DS1909000020吗?'
				}).then(() => {
					// on confirm
				}).catch(() => {
					// on cancel
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	$company-blue: #1B40D6;
	$common-grey: #efeff4;
	$top-dis: 30px;
	.container {
		position: fixed;
		width: 100%;
		top: 90px;
		bottom: 0;
		background-color: $common-grey;
		> div {
			padding: 0 15px;
			box-sizing: border-box;
		}
		.time-choose {
			width: 100%;
			height: $top-dis;
			display: flex;
			align-items: center;
			padding-left: 16px;
		}
		.list-container {
			position: absolute;
			width: 100%;
			top: $top-dis;
			bottom: 0;
			overflow: scroll;
			.cell {
				margin-bottom: 10px;
				position: relative;
				background-color: #fff;
				border-radius: 5px;
				font-size: 16px;
				padding: 0 15px;
				> div {
					padding: 10px 0;
				}
				.order-info {
					font-size: 12px;
					.order-id {

					}
					.order-status {
						float: right;
						color: #F29D00;
					}
				}
				.info {
					border-top: 1px solid $common-grey;
					.name {
						font-weight: bold;

					}
					.car {
						color: #666;
						font-size: 14px;
					}
				}
				.operation {
					overflow: hidden;
					position: relative;
					min-height: 48px;
					box-sizing: border-box;
					.price {
						display: inline-block;
						font-size: 12px;
						position: absolute;
						left: 0;
						bottom: 10px;
						max-width: 45%;
					}
					.operation-button {
						width: 65px;
						height: 26px;
						color: $company-blue;
						line-height: 26px;
						text-align: center;
						float: right;
						border: 1px solid $company-blue;
						border-radius: 5px;
						margin-left: 10px;
					}
				}
				&:last-child {
					margin-bottom: 0!important;
				}
			}
		}
	}
</style>

<style>
	.order-list .time-choose .van-dropdown-menu {
		height: unset;
		background-color: transparent;
	}
	.order-list .time-choose .van-dropdown-menu__title {
		font-size: 12px;
		padding-left: 1px;
	}
	.order-list .head .van-tabs__line {
		background-color: #1B40D6;
	}
	.order-list .operation .van-icon {
		font-size: 17px;
	}
</style>
