<template lang="pug">
	m-page.list.try-car
			.head
				van-tabs(v-model="active" title-active-color="#1B40D6" title-inactive-color="#333" @click="clickTab")
					van-tab(title="全部" name="all")
					van-tab(title="待试驾" name="TEST_DRIVER")
					van-tab(title="试驾中" name="DRIVERING")
					van-tab(title="已完成" name="FINISH")
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
					// | 2019年9月
				.list-container
					div(style="height: 100%")
						van-pull-refresh(v-model="isLoading" @refresh="onRefresh" loading-text=" ")
							van-list(
								v-model="loading"
								:finished="finished"
								:finished-text="list.length === 0 ? '-暂无数据-' : '我是有底线的'"
								:immediate-check="false"
								@load="loadData"
							)
								div
									.cell(
										v-for="(item, index) in list"
										:key="index"
									)
										.info(@click="() => { if (isManager || item.driveStatus.name === 'FINISH') goToDetail(item.id) }")
											div
												span.name {{item.pCustomerName}}
												span.time {{item[mapInfo.driveStatusTime[item.driveStatus.name]]}}
											.car 试驾车型：{{`${item.purposeSeriesName || ''}-${item.purposeModelName || ''}`}}
										.operation(v-if="!isManager")
											div
												// van-icon(name="phone-o" :color="companyBlue")
												m-icon(icon-class="icon-telephone")
												span 电话
											div
												// van-icon(name="comment-o" :color="companyBlue")
												m-icon(icon-class="icon-message")
												span 短信
											div(@click="() => { cancel(item.id) }" v-if="item.driveStatus.name === 'TEST_DRIVER'")
												// van-icon(name="close" color="red")
												m-icon(icon-class="icon-cancel2")
												span 取消
											div(@click="() => { goToDetail(item.id) }" v-if="(item.driveStatus.name === 'TEST_DRIVER') || (item.driveStatus.name === 'DRIVERING')")
												// van-icon(name="logistics" :color="companyBlue" )
												m-icon(icon-class="icon-testdrive")
												span {{item.driveStatus.name === 'TEST_DRIVER' ? '试驾' : '结束'}}
										.status(:class="{'finished': item.driveStatus.name === 'FINISH'}") {{mapInfo.driveStatusIconText[item.driveStatus.name]}}
</template>

<script>
	import Vue from 'vue'
	import moment from 'moment'
	import { Tab, Tabs, Dialog, DatetimePicker } from 'vant'
	Vue.use(Tab).use(Tabs).use(DatetimePicker)

    export default {
        name: 'list',
		mounted() {
			this.triggerLoad()
		},
		data() {
			return {
				active: '',
				loading: false,
				finished: false,
				list: [],
				param: {
					pageNum: 1,
					pageSize: 10,
					driveStatus: '',
					time: ''
				},
				isLoading: false,
				mapInfo: {
					driveStatusIconText: {
						'TEST_DRIVER': '待',
						'DRIVERING': '中',
						'FINISH': '完'
					},
					driveStatusTime: {
						'TEST_DRIVER': 'createTime',
						'DRIVERING': 'driveDate',
						'FINISH': 'endDriveDate'
					}
				},
				currentDate: new Date(),
				confirmDate: new Date(), // 只有点击确认才会改变这个值 取消选择日期的时候返回到该值
				companyBlue: '#1B40D6'
			}
		},
		computed: {
			isManager() {
				return this.$store.getters.isManager
			},
        	currentDateFormat() {
				let year = this.confirmDate.getFullYear();
				let month = this.confirmDate.getMonth() + 1;
				return `${year}年${month}月`;
			},
			api() {
        		return this.$api.testDrive;
			}
		},
		methods: {
        	goToDetail(id) {
        		this.$router.push(`try-car/detail/${id}`)
			},
        	toggleTimePicker() {
				this.$refs.timePicker.toggle()
			},
        	dateConfirm(value) {
				this.confirmDate = value
				this.changeData('time', moment(value).format('YYYY-MM'))
				this.toggleTimePicker()
			},
			dateCancel() {
        		this.currentDate = this.confirmDate
				this.toggleTimePicker()
			},
			clickTab(name, title) {
				this.changeData('driveStatus', name)
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
				this.loadData()
			},
			changeData(type, value) {
				this.loading = true
				this.finished = false
				this.list = []// 切换时间或者类型时清空列表
        		this.param.pageNum = 1
				if (type && value) {
					this.param[type] = value === 'all' ? '' : value;
				}
        		this.loadData()
			},
			loadData() {
				this.api.query(this.param).then((data) => {
					if (data.length > 0) {
						// console.log('data', data)
						for (let item of data) {
							this.list.push(item)
						}
						this.param.pageNum++
					} else {
						this.finished = true;
					}
				}).catch((error) => {
					this.finished = true
					this.$dialog.alert({
						message: error.message
					})
				}).finally(() => {
					this.loading = false;
					this.isLoading = false;
				})
			},
			onLoad() { // 模拟数据
				// 异步更新数据
				setTimeout(() => {
					for (let i = 0; i < 10; i++) {
						this.list.push(this.list.length + 1);
					}
					// 加载状态结束
					this.loading = false;

					// 数据全部加载完成
					if (this.list.length >= 20) {
						this.finished = true;
					}
				}, 500);
			},
			onRefresh() {
				setTimeout(() => {
					this.$toast('刷新成功');
					this.isLoading = false;
				}, 500);
				// this.changeData()
			},
			cancel(id) {
				Dialog.confirm({
					message: '确定取消试驾单吗？'
				}).then(() => {
					this.api.updateStatus(id).then(() => {
						this.changeData();
					}).catch((error) => {
						this.$dialog.alert({
							message: error.message
						})
					})
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
			svg.m-icon {
				font-size: 18px;
			}
			.cell {
				margin-bottom: 10px;
				position: relative;
				background-color: #fff;
				border-radius: 5px;
				font-size: 16px;
				&:last-child {
					margin-bottom: 0!important;
				}
				.status {
					position: absolute;
					right: 0;
					top: 0;
					height: 24px;
					width: 24px;
					text-align: center;
					line-height: 24px;
					background-color: $company-blue;
					color: white;
					border-top-right-radius: 5px;
					border-bottom-left-radius: 5px;
					font-size: 13px;
					&.finished {
						background-color: #07B836;
					}
				}
				.info {
					padding: 20px 20px 20px 15px;
					.name {
						font-weight: bold;
					}
					.time {
						font-size: 13px;
						color: #999;
						float: right;
						padding-right: 20px;
					}
					.car {
						color: #666;
						font-size: 14px;
					}
				}
				.operation {
					padding: 6.5px 0;
					border-top: 1px solid $common-grey;
					display: flex;
					font-size: 14px;
					>div {
						box-sizing: border-box;
						width: 25%;
						line-height: 30px;
						border-right: 1px solid $common-grey;
						display: flex;
						align-items: center;
						justify-content: center;
						> span {
							padding-left: 5px;
						}
						&:nth-child(4) {
							border-right-width: 0;
						}
					}
				}
			}
		}
	}
</style>

<style>
	.try-car .time-choose .van-dropdown-menu {
		height: unset;
		background-color: transparent;
	}
	.try-car .time-choose .van-dropdown-menu__title {
		font-size: 12px;
		padding-left: 1px;
	}
	.try-car .head .van-tabs__line {
		background-color: #1B40D6;
	}
	.try-car .operation .van-icon {
		font-size: 17px;
	}
	.try-car .van-pull-refresh {
		min-height: 100%;
	}
</style>
