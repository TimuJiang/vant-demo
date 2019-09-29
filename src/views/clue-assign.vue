<template>
    <m-page class="clue-assign" :left-text="leftText" :has-click-left="isBatch" :back="!isBatch" @click-left="clickLeft">
		<div class="top">
			<van-dropdown-menu>
				<van-dropdown-item title="新线索待分配(999+)" ref="item">
					<div class="search-container">
						<div>
							<van-field
								placeholder="输入手机号/客户名称"
								left-icon="search"
								v-model="value"
							/>
						</div>
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
						@load="onLoad"
					>
						<van-checkbox-group v-model="result">
							<div
								v-for="(item, index) in list"
								:key="index"
								class="clue-cell"
							>
								<div :class="checkClass">
									<van-checkbox
										:key="item"
										:name="item"
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
										<span>吴彦祖</span>
										<span>H</span>
									</div>
									<div class="clue-car">
										意向车型：博瑞1.8T+6AT(国五)豪华型（博瑞）
									</div>
									<div class="create-time">
										商机产生时间：2019/08/29 12:05
									</div>
									<div class="last-time">
										近一个月看车3次，最近一次2019/08/22
									</div>
									<div class="assign" v-show="noBatch">
										<div class="assign-button" @click="showChoose">分配</div>
									</div>
								</div>
							</div>
						</van-checkbox-group>
					</van-list>
				</van-pull-refresh>
			</div>
		</div>
		<div class="bottom-container">
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
		<!--<div class="assign-list">
			<van-dropdown-menu direction="up">
				<van-dropdown-item v-model="value1" :options="option1" />
			</van-dropdown-menu>
		</div>-->
		<van-action-sheet v-model="salesmanSelectShow" @closed="cancelChoose">
			<div class="choose-title">
				选择被分配人
			</div>
			<div class="choose-salesman">
				<div class="salesman-list">
					<van-radio-group v-model="salesmanSelectValue">
						<van-radio :name="item.value" :key="item.value" v-for="item in salesmanList">
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
	</m-page>
</template>

<script>
	import { Dialog } from 'vant'
    export default {
        name: 'clue-assign',
		data() {
			return {
				value: '',
				value1: 0,
				option1: [
					{ text: '请选择被分配人', value: 0 },
					{ text: '销售1', value: 1 },
					{ text: '销售2', value: 2 }
				],
				list: [],
				checkAll: false,
				loading: false,
				finished: false,
				result: [],
				isBatch: false,
				isLoading: false,
				salesmanSelectShow: false,
				salesmanSelectValue: '',
				salesmanList: [
					{ name: '小A', value: 1 },
					{ name: '小B', value: 2 },
					{ name: '小C', value: 3 },
					{ name: '小D', value: 4 },
					{ name: '小E', value: 5 }
				]
			}
		},
		mounted() {
			this.triggerLoad();
		},
		computed: {
			bottomOperationClass() {
				return {
					'bottom-operation': true,
					'batch-operation': this.isBatch
				}
			},
			listContainerClass() {
				return {
					'list-container': true,
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
				return !this.isBatch;
			},
			clickLeft() {
				return this.isBatch ? this.cancel : () => {}
			},
			buttonText() {
				return this.isBatch ? '请选择被分配人' : '批量分配'
			}
		},
		methods: {
        	clickAssign() {
        		if (this.buttonText === '批量分配') {
					this.isBatch = true;
				} else {
        			this.showChoose();
				}
			},
			showChoose() {
				this.salesmanSelectShow = true;
			},
			doAssign() {
				this.$toast({
					message: '操作成功',
					icon: 'passed',
					mask: true,
					// className: 'clue-assign-fail' 用该class可以显示红色的提示语
				});

				this.cancelChoose();
			},
			cancelChoose() {
				this.salesmanSelectShow = false;
				this.salesmanSelectValue = '';
			},
			triggerLoad() {
				this.loading = true;
				this.onLoad()
			},
			onLoad() {
				// 异步更新数据
				setTimeout(() => {
					for (let i = 0; i < 5; i++) {
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
			},
			search() {
				Dialog.alert({
					message: '开发中...'
				})
			},
			cancel() {
        		this.isBatch = false;
        		this.result = [];
        		this.checkAll = false;
			},
			checkAllFuc(value) {
        		if (value) {
					this.isBatch = true;
        			this.result = this.list;
				} else {
        			this.result = [];
				}
			},
		}

    }
</script>

<style lang="scss" scoped>
	$company-blue: #1B40D6;
	$common-grey: #efeff4;
	.search-container {
		background-color: $common-grey;
		padding: 10px 30px;
		.van-cell {
			border-radius: 5px;
			padding-top: 5px;
			padding-bottom: 5px;
		}
	}

	.list-container {
		position: absolute;
		width: 100%;
		bottom: 50px;
		top: 96px;
		overflow: scroll;
		background-color: $common-grey;
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
				span:last-child {
					display: inline-block;
					height: 15px;
					width: 15px;
					background-color: #07B836;
					border-radius: 2px;
					font-size: 14px;
					text-align: center;
					line-height: 15px;
					color: #FFF;
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
</style>
