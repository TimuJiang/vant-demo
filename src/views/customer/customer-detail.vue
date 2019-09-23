<template lang='pug'>
	.customer-detail
		van-cell-group
			van-field(v-model="name" label="客户姓名" placeholder="请输入用户名")
			van-switch-cell(v-model="checked" title="标题" )
			van-cell(title="意向车系" value="博瑞")
			van-cell(title="意向车型" value="博瑞1.8T+6AT（国五）豪华型（博瑞）")
			van-cell(title="车辆颜色" value="红色")
			van-cell(title="网络定金" value="是")
			van-cell(title="网络定单" value="是")
		van-cell-group
			van-cell(title="客户来源" value="XXXX媒体")
			van-cell(title="是否试驾" value="是")
			van-cell(title="是否按揭" value="是")
			van-field(v-model="address" label="所在地区" placeholder="选择省/市/区" @focus="showArea")
			van-field(v-model="address" label="详细地址" placeholder="输入详细地址" )
		van-popup(
			v-model="show"
			position="bottom"
			:style="{ height: '40%' }"
			)
			van-area(:area-list="_areaList"  title="所在地区")
		van-button(type="primary" size="large") 编辑
</template>

<script>
	import Vue from 'vue'
	import {Cell, Field, SwitchCell, Area, Popup} from 'vant'
	import AreaList from 'config/area'
	Vue.use(Cell)
		.use(Field)
		.use(SwitchCell)
		.use(Area)
		.use(Popup)
	export default {
		name: 'customer-detail',
		data() {
			return {
				name: '路人甲',
				checked: false,
				address: '',
				show: false
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
	.customer-detail {

	}
</style>
