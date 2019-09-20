<template lang="pug">
	m-page.list
		.container
			.head
				.cell
					span 顾问姓名
					span 本月战败数
					span 待审
			.body
				van-list(
					v-model="loading"
					:finished="finished"
					finished-text="没有更多了"
					@load="onLoad"
				)
					.cell(
						v-for="item in list"
						:key="item.id"
						class="small"
					)
						span {{item.name}}
						span {{item.fail}}
						router-link(:to="`/defeat-verify/verify-detail/${item.id}/param2/testtest`")
							span(class="red") {{item.pending}}

</template>

<script>
    export default {
        name: 'list',
		data() {
			return {
				loading: false,
				finished: false,
				list: [
					{
						id: 1,
						name: '李相赫',
						fail: 12,
						pending: 4
					},
					{
						id: 2,
						name: '简自豪',
						fail: 22,
						pending: 5
					},
					{
						id: 3,
						name: '喻文波',
						fail: 34,
						pending: 6
					}
				]
			}
		},
		computed: {
		},
		methods: {
			onLoad() {
				// 异步更新数据
				setTimeout(() => {
					this.list.push({
						id: 4,
						name: '卢姥爷',
						fail: 2,
						pending: 1
					})
					// 加载状态结束
					this.loading = false;

					// 数据全部加载完成
					this.finished = true;
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
		top: 51px;
		bottom: 0;
		overflow: scroll;
	}
</style>
