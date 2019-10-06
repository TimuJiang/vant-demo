<template lang="pug">
	m-page.defeat-verify-list
		.container
			.head
				.cell
					span 顾问姓名
					span 本月战败数
					span 待审核数
			.body
				div(style="height: 100%")
					van-pull-refresh(v-model="isLoading" @refresh="onRefresh")
						van-list(
							v-model="loading"
							:finished="finished"
							finished-text="没有更多了"
							:immediate-check="false"
							@load="onLoad"
						)
							.cell(
								v-for="(item, index) in list"
								:key="index"
								class="small"
							)
								span {{item.name}}
								span {{item.fail}}
								router-link(:to="`/defeat-verify/verify-detail/${item.id}`")
									span(class="red") {{item.pending}}

</template>

<script>
    export default {
        name: 'list',
		data() {
			return {
				loading: false,
				finished: false,
				tempData: {
					id: 1,
					name: '顾问1',
					fail: 12,
					pending: 4
				},
				list: [
				],
				isLoading: false
			}
		},
		mounted() {
        	this.triggerLoad();
		},
		computed: {
		},
		methods: {
			onLoad() {
				// 异步更新数据
				setTimeout(() => {
					for (let i = 0; i < 5; i++) {
						let obj = {
							id: 1,
							name: `顾问${parseInt(Math.random() * 100)}`,
							fail: parseInt(Math.random() * 10),
							pending: parseInt(Math.random() * 15)
						}
						this.list.push(obj);
					}
					// 加载状态结束
					this.loading = false;

					// 数据全部加载完成
					if (this.list.length >= 6) {
						this.finished = true;
					}
				}, 500);
			},
			triggerLoad() {
				this.loading = true;
				this.onLoad()
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
	$common-grey: #efeff4;
	.container {
		position: absolute;
		width: 100%;
		top: 46px;
		bottom: 0;
		background-color: $common-grey;
	}
	.cell {
		height: 50px;
		border-bottom: 1px solid $common-grey;
		background-color: #fff;
		span {
			display: inline-block;
			width: 33.3%;
			line-height: 50px;
			text-align: center;
			overflow:hidden;
			text-overflow:ellipsis;
			white-space:nowrap;
			box-sizing: border-box;
			&:first-child {
				text-align: left;
				padding-left: 15px;
			}
			&:last-child {
				text-align: right;
				padding-right: 15px;
			}
		}
		.red {
			color: red;
			text-decoration: underline;
		}
		&.small {
			font-size: 14px;
		}
	}
	.body {
		position: absolute;
		width: 100%;
		top: 61px;
		bottom: 0;
		overflow: scroll;
	}
</style>

<style>
	.defeat-verify-list .van-pull-refresh {
		min-height: 100%;
	}
</style>
