<template lang="pug">
	m-page.niche-follow
		.head(:class="{ 'isOvertime': active === 3}")
			van-tabs(v-model="active" title-active-color="#1B40D6" title-inactive-color="#333" @change="changeTab")
				van-tab(:title="`今日(${homePageData.todayCount || '-'})`")
				van-tab(:title="`明日(${homePageData.tomorrowCount || '-'})`")
				van-tab(:title="`更多(${homePageData.moreCount || '-'})`")
				van-tab(:title="`超时(${homePageData.timeOutCount || '-'})`" class="red")
		.container
			div(style="height: 100%")
				van-pull-refresh(v-model="isLoading" @refresh="onRefresh")
					van-list(
						v-model="loading"
						:finished="finished"
						:finished-text="list.length === 0 && !loading ? '-暂无数据' : ''"
						:immediate-check="false"
						@load="loadData"
					)
						.cell(
							v-for="(item, index) in list"
							:key="index"
						)
							.customer
								span {{item.pCustomerName}}
								span {{dicMap[item.pCustomerLevel].dictValue.split('（')[0]}}
								span {{item.remainingFollowUpMinutes}}分钟前
							.car 意向车型：{{`${item.purposeSeriesName ? `${item.purposeSeriesName} ` : ''}${item.purposeModelName || '暂无信息'}`}}
							.latest-follow 最新跟进：{{item.latestRecord}}
							.operation
								.operation-button(@click="() => { goToCustomer(item.id) }") 记录
								.operation-button 短信
								.operation-button 电话
</template>

<script>
	import moment from 'moment'
    export default {
        name: 'niche-follow',
		props: {
        	type: {
        		default: ''
			}
		},
		mounted() {
        	this.active = parseInt(this.type) - 1
			this.changeData()
		},
		computed: {
        	api() {
				return this.$api.clueCustomer
			},
			homePageData() {
				return this.$store.state.homePageData
			},
			dicMap() {
        		return this.$store.state.dicMap
			}
		},
		data() {
			return {
				active: 0,
				list: [],
				param: {},
				defaultParam: {
					pageNum: 1,
					pageSize: 20
				},
				formatter: 'YYYY-MM-DD',
				startTime: ' 00:00:00',
				endTime: ' 23:59:59',
				loading: false,
				isLoading: false,
				finished: true // 要分页时改成true
			}
		},
		methods: {
			changeTab() {
				this.changeData()
			},
			changeData() {
				let newParam = {
					// ...this.defaultParam
				}
				let dateStr = ''
				switch (this.active) {
					case 0: // 今日
						dateStr = moment().format(this.formatter)
						newParam.startTime = `${dateStr}${this.startTime}`
						newParam.endTime = `${dateStr}${this.endTime}`
						break
					case 1: // 明日
						dateStr = moment().add(1, 'days').format(this.formatter)
						newParam.startTime = `${dateStr}${this.startTime}`
						newParam.endTime = `${dateStr}${this.endTime}`
						break
					case 2: // 更多
						dateStr = moment().add(2, 'days').format(this.formatter)
						newParam.startTime = `${dateStr}${this.startTime}`
						newParam.endTime = ''
						break
					case 3: // 超时
						newParam.timeoutFlag = '2'
						break
					default:
						break
				}
				this.param = newParam
				this.loading = true
				/* this.finished = false */ // 要分页时取消该注释
				this.list = []

				this.loadData()
			},
			loadData() {
				this.api.query(this.param).then((data) => {
					if (data.length > 0) {
						// console.log('data', data)
						for (let item of data) {
							this.list.push(item)
						}
						// this.param.pageNum++ // 要分页时取消该注释
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
				})
			},
			triggerLoad() {
				this.loading = true
				this.loadData()
			},
			goToCustomer(id) {
				this.$router.push(`/customer/${id}/edit`)
			},
			onRefresh() {
				setTimeout(() => {
					this.$toast('刷新成功')
					this.isLoading = false;
				}, 500)
			}
		}
    }
</script>

<style lang="scss" scoped>
	$company-blue: #1B40D6;
	$common-grey: #efeff4;
	.container {
		position: fixed;
		width: 100%;
		top: 90px;
		bottom: 0;
		background-color: $common-grey;
		overflow: scroll;
		.empty-list-tip {
			color: #969799;
			font-size: 14px;
			line-height: 50px;
			text-align: center;
		}
		.cell {
			margin-top: 10px;
			padding: 15px;
			background-color: #fff;
			.customer {
				display: flex;
				align-items: center;
				position: relative;
				margin-bottom: 10px;
				span:first-child {
					font-weight: bold;
					margin-right: 3px;
				}
				span:nth-child(2) {
					display: inline-block;
					height: 15px;
					width: 15px;
					background-color: #07B836;
					border-radius: 2px;
					font-size: 14px;
					text-align: center;
					line-height: 15px;
					color: #FFF;
					margin-left: 5px;
				}
				span:last-child {
					position: absolute;
					right: 0;
					font-size: 13px;
					color: #999;
				}
			}
			.operation {
				overflow: hidden;
				padding-top: 15px;
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
		}
	}
</style>

<style>
	.niche-follow .head .van-tabs__line {
		background-color: #1B40D6;
	}
	.niche-follow .head.isOvertime .van-tabs__line {
		background-color: red;
	}
	.niche-follow .head .van-tabs .van-tab:nth-child(4) {
		color: red!important;
	}
	.niche-follow .van-pull-refresh {
		min-height: 100%;
	}
</style>
