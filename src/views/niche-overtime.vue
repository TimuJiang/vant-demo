<template lang="pug">
	m-page.niche-overtime
		.container
			.head
				.cell
					span 顾问姓名
					span 本月战败数
			.body
				div(style="height: 100%")
					van-pull-refresh(v-model="isLoading" @refresh="onRefresh")
						.cell(
							v-for="(item, index) in list"
							:key="index"
							class="small"
						)
							span {{item.name}}
							router-link(:to="`/niche-follow/4`")
								span(class="red") {{item.overtime}}

</template>

<script>
	export default {
		name: 'niche-overtime',
		data() {
			return {
				tempData: {
					id: 1,
					name: '李相赫',
					overtime: 5
				},
				list: [],
				isLoading: false
			}
		},
		mounted() {
			for (let i = 0; i < 5; i++) {
				this.list.push(this.tempData);
			}
		},
		computed: {
		},
		methods: {
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
			width: 50%;
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
	.niche-overtime .van-pull-refresh {
		min-height: 100%;
	}
</style>
