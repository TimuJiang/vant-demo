<template lang="pug">
	m-page.niche-follow
		.head(:class="{ 'isOvertime': active === 3}")
			van-tabs(v-model="active" title-active-color="#1B40D6" title-inactive-color="#333")
				van-tab(title="今日(332)")
				van-tab(title="明日(34)")
				van-tab(title="更多(14)")
				van-tab(title="超时(12)" class="red")
		.container
			div(style="height: 100%")
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
							.customer
								span 张学友
								span A
								span 1小时前
							.car 意向车型：博瑞1.8T+6AT(国五)豪华型（博瑞）
							.latest-follow 最新跟进：2019/08/29 电话沟通
							.operation
								.operation-button(@click="goToCustomer") 记录
								.operation-button 短信
								.operation-button 电话
</template>

<script>
	import { Dialog } from 'vant'
    export default {
        name: 'niche-follow',
		props: {
        	type: {
        		default: ''
			}
		},
		mounted() {
        	this.active = parseInt(this.type) - 1;
			this.triggerLoad();
		},
		data() {
			return {
				active: 0,
				list: [],
				loading: false,
				isLoading: false,
				finished: false
			}
		},
		methods: {
			onLoad() {
				// 异步更新数据
				setTimeout(() => {
					for (let i = 0; i < 5; i++) {
						this.list.push(this.list.length + 1);
					}
					// 加载状态结束
					this.loading = false;

					// 数据全部加载完成
					if (this.list.length >= 15) {
						this.finished = true;
					}
				}, 500);
			},
			triggerLoad() {
				this.loading = true;
				this.onLoad()
			},
			goToCustomer() {
				Dialog.alert({
					message: '→ To be continued'
				})
			},
			onRefresh() {
				setTimeout(() => {
					this.$toast('刷新成功');
					this.isLoading = false;
				}, 500);
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
