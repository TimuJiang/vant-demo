<template lang='pug'>
	.m-area-select
		van-field(v-model="value" label="所在地区" disabled placeholder="选择省/市/区" @click="showArea")
		van-popup(
			v-model="show"
			position="bottom"
			:style="{ height: '40%' }"
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
			}
		}
	}
</script>
<style lang="scss" scoped>

</style>
