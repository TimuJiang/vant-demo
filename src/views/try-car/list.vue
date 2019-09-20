<template lang="pug">
	m-page.list
			van-tabs(v-model="active" title-active-color="#1B40D6" title-inactive-color="#333")
				van-tab(title="全部")
				van-tab(title="待试驾")
				van-tab(title="试驾中")
				van-tab(title="已完成")
			.container
				.time-choose
					van-dropdown-menu(v-if="false")
						van-dropdown-item(
							title="2019年9月"
							ref="item"
						)
							van-datetime-picker(
								v-model="currentDate"
								type="year-month"
								:formatter="formatter"
							)
					| 2019年9月
				.list-container
					van-list(
						v-model="loading"
						:finished="finished"
						finished-text="我是有底线的"
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
									van-icon(name="phone-o" color="#1B40D6")
									span 电话
								div
									van-icon(name="comment-o" color="#1B40D6")
									span 短信
								div(@click="cancel")
									van-icon(name="close" color="red")
									span 取消
								div
									van-icon(name="logistics" color="#1B40D6")
									span 试驾
							.status 待
</template>

<script>
	import Vue from 'vue'
	import { Tab, Tabs, Dialog, DatetimePicker } from 'vant'
	Vue.use(Tab).use(Tabs).use(DatetimePicker)

    export default {
        name: 'list',
		data() {
			return {
				active: 0,
				loading: false,
				finished: false,
				list: [
					100, 101, 102
				],
				currentDate: new Date()
			}
		},
		methods: {
			formatter(type, value) {
				if (type === 'year') {
					return `${value}年`;
				} else if (type === 'month') {
					return `${value}月`
				}
				return value;
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
			height: 36px;
			display: flex;
			align-items: center;
			font-size: 14px;
			padding-left: 16px;
		}
		.list-container {
			position: absolute;
			width: 100%;
			top: 36px;
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
				}
				.info {
					padding: 20px 20px 20px 15px;
					.name {
						font-weight: bold;
					}
					.time {
						font-size: 14px;
						color: #999;
						float: right;
						padding-right: 20px;
					}
					.car {
						color: #666;
					}
				}
				.operation {
					padding: 10px 0;
					border-top: 1px solid $common-grey;
					display: flex;
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
