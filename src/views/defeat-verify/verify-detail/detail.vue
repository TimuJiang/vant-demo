<template lang="pug">
	m-page.detail
		.container
			van-list(
				v-model="loading"
				:finished="finished"
				finished-text="没有更多了"
				@load="onLoad"
			)
				.cell(
					v-for="(item, index) in list"
					:key="index"
				)
					.customer.text
						span {{item.customer}}
						span {{item.time}}
					.car-info.text {{item.car}}
					.reseon.text {{item.reason}}
					.operation
						van-button(plain round type="info" size="small" to="/defeat-verify/verify-detail/verify-operation/assign") 分配
						van-button(plain round type="info" size="small" to="/defeat-verify/verify-detail/verify-operation/pass") 通过
						van-button(plain round type="info" size="small" to="/defeat-verify/verify-detail/verify-operation/reject") 驳回
						van-button(plain round type="info" size="small") 电话
</template>

<script>
    export default {
        name: 'detail',
		created() {
        	console.log('detail-params', `${this.$route.params.id}:::${this.$route.params.param2}`);
		},
		data() {
			return {
				loading: false,
				finished: false,
				list: [
					{
						customer: '吴彦祖（H）',
						car: '意向车型：博瑞1.8T+6AT(国五)豪华型（博瑞）',
						reason: '吴彦祖对价格不太满意。。。'
					}
				]
			}
		},
		methods: {
			onLoad() {
				// 异步更新数据
				setTimeout(() => {
					let temp = {
						customer: '吴彦祖（H）',
						car: '意向车型：博瑞1.8T+6AT(国五)豪华型（博瑞）',
						reason: '吴彦祖对价格不太满意。。。'
					};
					for (let i = 1; i < 10; i++) {
						this.list.push(temp);
					}
					// 加载状态结束
					this.loading = false;

					// 数据全部加载完成
					if (this.list.length >= 20) {
						this.finished = true;
					}
				}, 500);
			}
		}
    }
</script>

<style lang="scss" scoped>
	.container {
		position: absolute;
		top: 46px;
		bottom: 0;
		width: 100%;
		overflow: scroll;
	}
	.cell {
		font-size: 14px;
		padding: 20px 0 15px;
		border-bottom: 1px solid #efeff4;
		.customer {
			span:last-child {
				float: right;
			}
		}
		.operation {
			display: flex;
			height: 50px;
			align-items: center;
			justify-content: space-around;
		}
		.text {
			padding: 0 10%
		}
	}
</style>
