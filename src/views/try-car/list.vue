<template lang="pug">
	m-page.list.try-car
			.head
				van-tabs(v-model="active" title-active-color="#1B40D6" title-inactive-color="#333")
					van-tab(title="全部")
					van-tab(title="待试驾")
					van-tab(title="试驾中")
					van-tab(title="已完成")
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
					div
						van-pull-refresh(v-model="isLoading" @refresh="onRefresh")
							van-list(
								v-model="loading"
								:finished="finished"
								finished-text="我是有底线的"
								:immediate-check="false"
								@load="onLoad"
							)
								.cell(
									v-for="(item, index) in list"
									:key="index"
								)
									.info
										div
											span.name 霍元甲
											span.time 2019-09-12 12:05
										.car 试驾车型：2018款博越运动款运动款...
									.operation
										div
											van-icon(name="phone-o" :color="companyBlue")
											span 电话
										div
											van-icon(name="comment-o" :color="companyBlue")
											span 短信
										div(@click="cancel")
											van-icon(name="close" color="red")
											span 取消
										div(@click="goToDetail")
											van-icon(name="logistics" :color="companyBlue" )
											span 试驾
									.status 待
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
				finished: false,
				list: [],
				isLoading: false,
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
        	goToDetail() {
        		this.$router.push('try-car/detail/edit/detailId/-1');
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
			},
			cancel() {
				Dialog.confirm({
					message: '确定取消试驾单吗？'
				}).then(() => {
					// on confirm
				}).catch(() => {
					// on cancel
				});
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
							padding-left: 2px;
						}
						&:last-child {
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
</style>
