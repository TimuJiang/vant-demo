<template lang="pug">
	m-page.detail
		.container
			div
				van-pull-refresh(v-model="isLoading" @refresh="onRefresh")
					van-list(
						v-model="loading"
						:finished="finished"
						finished-text="没有更多了"
						:immediate-check="false"
						@load="onLoad"
					)
						div
							.cell(
								v-for="(item, index) in list"
								:key="index"
							)
								.customer
									span {{item.customer}}
									span A
									span {{item.time}}
								.car {{item.car}}
								.reseon {{item.reason}}
								.operation
									.operation-button(@click="() => { goToOperation('reject') }") 驳回
									.operation-button(@click="() => { goToOperation('pass') }") 通过
									.operation-button(@click="() => { goToOperation('assign') }") 分配
</template>

<script>
    export default {
        name: 'detail',
		mounted() {
        	this.triggerLoad();
		},
		data() {
			return {
				loading: false,
				finished: false,
				list: [],
				tempData: {
					customer: '吴彦祖（H）',
					car: '意向车型：博瑞1.8T+6AT(国五)豪华型（博瑞）',
					reason: '吴彦祖对价格不太满意。。。',
					time: '一小时前'
				},
				isLoading: false
			}
		},
		methods: {
        	goToOperation(type) {
        		this.$router.push(`${this.$route.params.id}/verify-operation/${type}`);
			},
			triggerLoad() {
				this.loading = true;
				this.onLoad()
			},
			onLoad() {
				// 异步更新数据
				setTimeout(() => {
					for (let i = 0; i < 5; i++) {
						this.list.push(this.tempData);
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
