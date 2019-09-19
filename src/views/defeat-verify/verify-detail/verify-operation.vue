<template lang="pug">
	m-page(
		:head-title="change.title"
		:right-text="change.rightText"
		@click-right="change.rightClick"
		).verify-operation
		.container
			van-cell(v-if="this.$route.params.type === 'assign'" title="*销售顾问" is-link value="个人")
			.text-title {{`${this.$route.params.type === 'assign' ? '' : '*'}${change.title}`}}
			textarea.text(placeholder="请输入")

</template>

<script>
	import { Dialog } from 'vant'
    export default {
        name: 'verify-operation',
		computed: {
        	change() {
				switch (this.$route.params.type) {
					case 'assign':
						return {
							title: '分配意见',
							rightText: '分配',
							rightClick: this.assign
						};
					case 'pass':
						return {
							title: '通过意见',
							rightText: '通过',
							rightClick: this.pass
						};
					case 'reject':
						return {
							title: '驳回原因',
							rightText: '驳回',
							rightClick: this.reject
						};
					default:
						return {
							title: '',
							rightText: '',
							rightClick: null
						};
				}
			},
		},
		methods: {
        	assign() {
				Dialog.alert({
					message: '分配成功'
				})
			},
			pass() {
				Dialog.alert({
					message: '已通过'
				})
			},
			reject() {
				Dialog.alert({
					message: '驳回成功'
				})
			},
		}
    }
</script>

<style lang="scss" scoped>
	.container {
		position: absolute;
		width: 100%;
		top: 46px;
		bottom: 0;
		background-color: #efeff4;
	}
	.text {
		width: 100%;
		height: 160px;
		box-sizing: border-box;
		padding: 0 15px;
		font-size: 14px;
		resize:none;
	}
	.text-title {
		background-color: #fff;
		padding: 10px 15px 15px;
		font-size: 14px;
	}
</style>
