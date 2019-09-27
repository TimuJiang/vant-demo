<template lang='pug'>
	.m-area-select
		van-field(v-model="value" label="所在地区" readonly placeholder="选择省/市/区" @click="showArea"
			label-width="110"
			:border="false")
		van-popup(
			v-model="show"
			position="bottom"
			:style="{ height: '40%' }"
			@sure="onOk"
		)
			van-area(:area-list="_areaList"  title="所在地区")
</template>

<script>
	import Vue from 'vue'
	import {Field, Area, Popup} from 'vant'
	import AreaList from './area'
	Vue.use(Field)
		.use(Area)
		.use(Popup)
	export default {
		name: 'm-area-select',
		props: {

		},
		data() {
			return {
				show: false,
				value: ''
			}
		},
		beforeCreate() {
			this._areaList = AreaList
		},
		methods: {
			showArea() {
				this.show = true
			},
			onOk () {
				this.$emit('ok', this.value)
			}
		}
	}
</script>
<style lang="scss" scoped>
	.m-area-select {
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
