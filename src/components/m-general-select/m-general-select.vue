<template lang='pug'>
	.m-general-select
		van-field(v-model="value" required :label="label" readonly placeholder="选择省/市/区" @click="onclick" right-icon="arrow")
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
<style lang="scss" scoped>
	.m-general-select {

	}
</style>
