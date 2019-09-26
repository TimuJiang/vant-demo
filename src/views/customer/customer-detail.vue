<template lang='pug'>
	.customer-detail
		.customer-detail__warp
			.base--card
				.base--card__title
					span 客户甲
					span A
					span 男
				.base--card__sub
					.mobile 1361361336（浙江）
					.create-time 创建:2019/08/22  |  来源：网络
		van-cell-group
			van-cell(title="意向车系" value="博瑞")
			van-cell(title="意向车型" value="博瑞1.8T+6AT（国五）")
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
		van-button(color="#1B40D6" type="primary" size="large") 编辑
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
		&__warp {
			padding: 15px;
			.base--card {
				color: #FFFFFF;
				background-image: linear-gradient(135deg, #1B40D6 0%, #2273EF 100%);
				border-radius: 6px;
				box-shadow: 0 3px 4px 0 rgba(0, 110, 255, 0.2);
				&__title {
					padding: 0 15px;
					font-size: 18px;
					line-height: 45px;
					height: 45px;
					border-bottom: 1px solid rgba(255,255,255, 0.15);
				}
				&__sub {
					padding: 10px 15px;
					font-size: 14px;
					line-height: 22px;
				}
			}
		}

	}
</style>
