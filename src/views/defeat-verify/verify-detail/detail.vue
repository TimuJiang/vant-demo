<template lang="pug">
	m-page.detail
		.container
			div
				van-pull-refresh(v-model="isLoading" @refresh="onRefresh")
					van-list(
						v-model="loading"
						:finished="finished"
						:finished-text="list.length === 0 ? '-暂无数据-' : '-我是有底线的-'"
						:immediate-check="false"
						@load="loadData"
					)
						div
							.cell(
								v-for="(item, index) in list"
								:key="index"
							)
								.customer
									span {{item.pCustomerName}}
									span {{dicMap[item.pCustomerLevel].dictValue.split('（')[0]}}
									span
								.car 意向车型：{{`${item.purposeSeriesName ? `${item.purposeSeriesName} ` : ''}${item.purposeModelName || '暂无信息'}`}}
								.reseon 战败原因：{{item.defeatReason || ''}}
								.operation
									.operation-button(@click="() => { goToOperation('reject', item.id) }") 驳回
									.operation-button(@click="() => { goToOperation('pass', item.id) }") 通过
									.operation-button(@click="() => { goToOperation('assign', item.id) }") 分配
</template>

<script>
    export default {
        name: 'detail',
		created() {
        	this.param.salesConsultant = this.$route.params.id
		},
		mounted() {
        	this.triggerLoad()
		},
		data() {
			return {
				loading: false,
				finished: false,
				list: [],
				param: {
					pageNum: 1,
					pageSize: 10,
					salesConsultant: ''
				},
				isLoading: false
			}
		},
		computed: {
			api() {
				return this.$api.clueCustomer
			},
			dicMap() {
				return this.$store.state.dicMap
			}
		},
		methods: {
        	goToOperation(type, id) {
        		this.$router.push(`${this.$route.params.id}/verify-operation/${type}/id/${id}`);
			},
			triggerLoad() {
				this.loading = true
				this.loadData()
			},
			loadData() {
				this.api.queryForDefeatNotAudit(this.param).then((data) => {
					if (data.length > 0) {
						// console.log('data', data)
						for (let item of data) {
							this.list.push(item)
						}
						this.param.pageNum++
					} else {
						this.finished = true
					}
				}).catch((error) => {
					this.finished = true
					this.$dialog.alert({
						message: error.message
					})
				}).finally(() => {
					this.loading = false
				})
			},
			onRefresh() {
				setTimeout(() => {
					this.$toast('刷新成功');
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
		position: absolute;
		top: 46px;
		bottom: 0;
		width: 100%;
		background-color: $common-grey;
		overflow: scroll;
	}
	.cell {
		margin-bottom: 10px;
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
		&:last-child {
			margin-bottom: 0!important;
		}
	}
</style>
