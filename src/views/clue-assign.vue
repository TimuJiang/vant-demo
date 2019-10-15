<template>
    <m-page class="clue-assign" :left-text="leftText" :has-click-left="isBatch" :back="!isBatch" @click-left="clickLeft">
		<div class="top">
			<!--新线索待分配(999+)-->
			<!--<span>
				<div>新线索待分配(999+)</div>
			</span>-->
			<van-dropdown-menu>
				<van-dropdown-item :title="`新线索待分配(${total > 999 ? '999+' : total})`" ref="item">
					<div class="search-container">
						<van-search v-model="searchValue"
									placeholder="输入手机号/客户姓名"
									shape="round"
									left-icon=""
									right-icon="search"
									@input="changeInputValue"
						></van-search>
					</div>
					<van-button block type="info" @click="search" color="#1B40D6">确认</van-button>
				</van-dropdown-item>
			</van-dropdown-menu>
		</div>
		<!---->
		<div :class="listContainerClass">
			<div style="height: 100%">
				<van-pull-refresh v-model="isLoading" @refresh="onRefresh">
					<van-list
						v-model="loading"
						:finished="finished"
						finished-text="我是有底线的"
						:immediate-check="false"
						@load="loadData"
					>
						<van-checkbox-group v-model="result">
							<div
								v-for="item in list"
								:key="item.pCustomerId"
								class="clue-cell"
							>
								<div :class="checkClass">
									<van-checkbox
										:key="item.pCustomerId"
										:name="item.pCustomerId"
										v-show="isBatch"
									>
										<m-icon slot="icon"
												slot-scope="props"
												:icon-class="!props.checked ? 'icon-RoundedCheckbox-unselected' : 'icon-RoundedCheckbox'"
										/>
									</van-checkbox>
								</div>
								<div class="clue-info">
									<div class="time">
										<span>新商机回流</span>
										<span>1小时前</span>
									</div>
									<div class="customer">
										<span>{{item.pCustomerName}}</span>
										<m-level-icon :level="dicMap[item.pCustomerLevel].dictValue.split('（')[0]"></m-level-icon>
									</div>
									<div class="clue-car">
										意向车型：{{`${item.purposeSeriesName ? `${item.purposeSeriesName} ` : ''}${item.purposeModelName || '暂无信息'}`}}
									</div>
									<div class="create-time">
										商机产生时间：2019/08/29 12:05
									</div>
									<div class="last-time">
										近一个月看车3次，最近一次2019/08/22
									</div>
									<div class="assign" v-show="noBatch">
										<div class="assign-button" @click="() => { showChoose('single', item.pCustomerId) }">分配</div>
									</div>
								</div>
							</div>
						</van-checkbox-group>
					</van-list>
				</van-pull-refresh>
			</div>
		</div>
		<div class="bottom-container" v-if="list.length">
			<div :class="bottomOperationClass" v-show="isBatch">
				<van-checkbox v-model="checkAll" @change="checkAllFuc">
					全选
					<m-icon slot="icon"
							slot-scope="props"
							:icon-class="!props.checked ? 'icon-RoundedCheckbox-unselected' : 'icon-RoundedCheckbox'"
					/>
				</van-checkbox>
			</div>
			<div class="assign-button" @click="clickAssign">{{buttonText}}</div>
		</div>
		<van-action-sheet v-model="salesmanSelectShow" @closed="cancelChoose">
			<div class="choose-title">
				选择被分配人
			</div>
			<div class="choose-salesman">
				<div class="salesman-list">
					<van-radio-group v-model="salesmanSelectValue">
						<van-radio :name="item.loginName" :key="item.loginName" v-for="item in salesmanList">
							{{item.name}}
							<m-icon slot="icon"
									slot-scope="props"
									:icon-class="!props.checked ? 'icon-RoundedCheckbox-unselected' : 'icon-RoundedCheckbox'"
							/>
						</van-radio>
					</van-radio-group>
				</div>
				<div class="choose-buttons">
					<div @click="doAssign">分配</div>
					<div @click="cancelChoose">取消</div>
				</div>
			</div>
		</van-action-sheet>
		<m-loading :show="loadingShow" text="分配中"></m-loading>
	</m-page>
</template>

<script>
	import Vue from 'vue'
	import { Search } from 'vant'

	Vue.use(Search)
    export default {
        name: 'clue-assign',
		data() {
			return {
				loadingShow: false,
				searchValue: '',
				option1: [
					{ text: '请选择被分配人', value: 0 },
					{ text: '销售1', value: 1 },
					{ text: '销售2', value: 2 }
				],
				list: [],
				total: 0,
				assignType: '',
				defaultParam: {
					pageNum: 1,
					pageSize: 10
				},
				singleId: '',
				param: null,
				checkAll: false,
				loading: false,
				finished: false,
				result: [],
				isBatch: false,
				isLoading: false,
				salesmanSelectShow: false,
				salesmanSelectValue: '',
				salesmanList: []
			}
		},
		mounted() {
			this.triggerLoad()
			this.initSaleManList()
		},
		computed: {
			dicMap() {
				return this.$store.state.dicMap
			},
			api() {
				return this.$api.clueCustomer
			},
			bottomOperationClass() {
				return {
					'bottom-operation': true,
					'batch-operation': this.isBatch
				}
			},
			listContainerClass() {
				return {
					'list-container': true,
					'empty-list': this.list.length === 0
				}
			},
			checkClass() {
				return {
					'check-container': true,
					'show': this.isBatch
				}
			},
			leftText() {
				return this.isBatch ? '取消' : '返回'
			},
			noBatch() {
				return !this.isBatch
			},
			clickLeft() {
				return this.isBatch ? this.cancel : () => {}
			},
			buttonText() {
				return this.isBatch ? '请选择被分配人' : '批量分配'
			}
		},
		methods: {
			initSaleManList() {
				this.api.queryUserList().then((data) => {
					this.salesmanList = data
				}).catch((error) => {
					this.$dialog.alert({
						message: error.message
					})
				})
			},
        	clickAssign() {
				if (this.buttonText === '批量分配') {
					this.isBatch = true
				} else {
        			this.showChoose('batch')
				}
			},
			showChoose(type, id) {
				this.salesmanSelectShow = true
				if (type === 'single') {
					this.singleId = Number(id)
				}

				this.assignType = type
			},
			doAssign() {
				let param = {
					salesConsultant: this.salesmanSelectValue
				}
				if (this.assignType === 'single') {
					param.pCustomerIds = [this.singleId].toString()
				} else {
					param.pCustomerIds = this.result.map((item) => {
						console.log('item', item)
						return Number(item)
					}).toString()
				}
				console.log('param', param)
				this.loadingShow = true
				this.api.distributionCustomer(param).then(() => {
					this.triggerLoad()
					this.result = []
					this.checkAll = false;
					this.$toast({
						message: '分配成功',
						icon: 'passed',
						mask: true
						// className: 'clue-assign-fail' 用该class可以显示红色的提示语
					})
				}).catch(({ message }) => {
					this.$toast({
						message: message || '分配失败',
						icon: 'passed',
						mask: true,
						className: 'clue-assign-fail'
					});
				}).finally(() => {
					this.loadingShow = false
					this.cancelChoose()
				})
			},
			changeInputValue(value) {
				let trimValue = value.trim()
				if (trimValue) {
					if (!isNaN(trimValue) || trimValue === '0') {
						this.changeParam('mobileNo', trimValue)
					} else {
						this.changeParam('pCustomerName', trimValue)
					}
				} else {
					this.changeParam()
				}
			},
			changeParam(key, value) {
				let newParam = {
					...this.defaultParam
				}
				delete newParam.mobileNo
				delete newParam.pCustomerName
				newParam[key] = value
				this.defaultParam = newParam
			},
			cancelChoose() {
				this.salesmanSelectShow = false
				this.salesmanSelectValue = ''
			},
			triggerLoad() {
				this.param = { ...this.defaultParam }
				this.loading = true
				this.finished = false
				this.list = []
				this.loadData()
			},
			loadData() {
				this.api.queryForDistribution(this.param).then((res) => {
					let { data, total } = res
					this.total = total
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
				}, 500);
			},
			search() {
				this.triggerLoad()
				this.$refs.item.toggle()
			},
			cancel() {
        		this.isBatch = false;
        		this.result = [];
        		this.checkAll = false;
			},
			checkAllFuc(value) {
        		if (value) {
					this.isBatch = true
        			this.result = this.list.map(item => {
        				return item.pCustomerId
					})
				} else {
        			this.result = []
				}
			},
		}

    }
</script>

<style lang="scss" scoped>
	$company-blue: #1B40D6;
	$common-grey: #efeff4;
	.clue-assign {
		.top {
			height: 50px;
			line-height: 50px;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #1B40D6;
			> span {
				display: inline-block;
				position: relative;
				box-sizing: border-box;
				max-width: 100%;
				padding: 0 8px;
				font-size: 15px;
				line-height: 18px;
				> div {
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}
		}
	}
	.search-container {
		background-color: $common-grey;
		padding: 10px 0;
	}

	.list-container {
		position: absolute;
		width: 100%;
		bottom: 50px;
		top: 96px;
		overflow: scroll;
		background-color: $common-grey;
		&.empty-list {
			bottom: 0
		}
		.clue-cell {
			display: flex;
			align-items: center;
			padding: 10px 15px;
			position: relative;
			.check-container {
				visibility: hidden;
				padding-right: 0;
				transition: padding .5s;
				width: 0;
				&.show {
					padding-right: 15px;
					width: auto;
					visibility: visible;
				}
			}
			&:last-child {
				padding-bottom: 0!important;
			}
		}
		.clue-info {
			background-color: #fff;
			height: 100%;
			flex-grow: 1;
			padding: 15px;
			border-radius: 5px;
			.time {
				padding-bottom: 10px;
				font-size: 13px;
				span:last-child {
					float: right;
					color: $company-blue;
				}
			}
			.customer {
				display: flex;
				align-items: center;
				span:first-child {
					font-weight: bold;
					margin-right: 3px;
				}
			}
			.create-time {

			}
			.last-time {
				margin: 5px 0;
				font-size: 13px;
				color: #666;
			}
			.assign {
				overflow: hidden;
				.assign-button {
					width: 60px;
					height: 30px;
					background-color: $company-blue;
					color: #fff;
					line-height: 30px;
					text-align: center;
					float: right;
					border-radius: 5px;
				}
			}
		}
	}

	@keyframes base_show {
		0% {width: 0; opacity: 0}
		100%{width: 95px; opacity: 1}
	}

	.bottom-container {
		width: 100%;
		// border-top: 1px solid #efeff4;
		position: fixed;
		bottom: 0;
		height: 50px;
		display: flex;
		.bottom-operation {
			display: flex;
			width: 0;
			height: 100%;
			justify-content: center;
			// transition: width .5s;
			&.batch-operation {
				// animation: base_show .5s;
				width: 95px;
			}
		}
		.assign-button {
			line-height: 50px;
			text-align: center;
			background-color: $company-blue;
			color: white;
			font-weight: bold;
			flex: 1;
		}
	}
	.choose-title {
		height: 44px;
		line-height: 44px;
		text-align: center;
		background-color: rgba(255,255,255,0.82);
	}
	.choose-salesman {
		padding: 0 15px 10px;
		background-color: #fff;
		.choose-buttons {
			> div {
				line-height: 50px;
				height: 50px;
				text-align: center;
				margin-top: 10px;
				border-radius: 6px;
				color: #fff;
				&:first-child {
					background-color: $company-blue;
				}
				&:last-child {
					background-color: #FF3B30;
				}
			}
		}
	}
</style>

<style>
	.clue-assign .top .van-dropdown-menu__title {
		color: #1B40D6;
	}
	.clue-assign .top .van-dropdown-menu__title--active {
		color: #1989fa;
	}
	.clue-assign .top .van-dropdown-item__content {
		background-color: transparent;
	}
	.clue-assign .bottom-operation .van-hairline--top-bottom::after {
		border-width: 0;
	}
	.clue-assign .bottom-operation .van-checkbox__label {
		margin-left: 16px;
		font-size: 14px;
	}
	.clue-assign .choose-salesman .salesman-list .van-radio {
		height: 40px;
		border-bottom: 1px solid #efeff4;
	}
	.clue-assign .van-action-sheet {
		background-color: transparent;
	}
	/* 操作失败时显示红色的提示语 */
	.clue-assign-fail {
		color: #FF3B30!important;
	}
	.clue-assign .van-pull-refresh {
		min-height: 100%;
	}
	.clue-assign .salesman-list .van-radio__label {
		margin-left: 12px;
	}

	.clue-assign .search-container .van-search {
		padding: 0!important;
		width: 70%;
		margin: 0 auto;
		background: transparent!important;
	}

	.clue-assign .search-container .van-search .van-cell {
		padding: 3px 8px 3px 0!important;
	}

	.clue-assign .search-container .van-search .van-search__content {
		padding-left: 20px;
	}
	.clue-assign .search-container .van-search .van-search__content .van-field__control {
		font-size: 12px;
	}
</style>
