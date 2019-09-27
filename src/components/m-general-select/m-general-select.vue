<template lang='pug'>
	.m-general-select
		van-field(v-model="value"
			required
			:label="label"
			readonly
			placeholder="选择省/市/区"
			@click="onclick"
			:border="false"
			label-width="110"
			right-icon="arrow" label-class="m-general-select__label")
		van-action-sheet(
			v-model="show"
			:actions="actions"
			cancel-text="取消"
			@select="onSelect"
		)
</template>

<script>
	export default {
		name: 'm-general-select',
		props: {
			label: {
				default: '单元格'
			},
			value: {
				default: '单元格'
			},
			actions: {
				type: Array,
				default: function () {
					return [
						{name: '选项'},
						{name: '选项'},
						{name: '选项', subname: '描述信息'}
					]
				}
			}
		},
		data() {
			return {
				show: false
			}
		},
		methods: {
			onclick() {
				this.show = true
			},
			onSelect(item) {
				this.show = false
			}
		}
	}
</script>
<style>
	.m-general-select__label {
	}
</style>
<style lang="scss" scoped>
	.m-general-select {
		box-sizing: border-box;
		border-bottom: 1px solid rgba(0,0,0,0.1);
		.van-field {
			line-height: 30px;
			font-size: 16px;
			font-weight: 600;
			color: #333333;
			.van-field__label, van-cell__title {
				line-height: 30px;
			}
		}
	}
</style>
