<template lang='pug'>
	m-page.edit
		.edit-warp
		van-cell-group
			van-field(required label="客户姓名"  v-model="username" label-width="110")
			m-general-select(label="性别" :actions="Gender" v-model="gender")
			m-general-select(label="意向等级")
			m-general-select(label="意向车系")
			m-general-select(label="意向车型")
			m-general-select(label="车辆颜色")
			m-general-select(label="跟进方式")
			m-time-select(label="下次跟进日期")
			m-area-select()
			van-field(label="详细地址"  v-model="address" label-width="110"
			)
		van-cell-group.event-row
			m-general-select(label="发生事件")
			van-field(
				v-model="record"
				type="textarea"
				placeholder="请输入跟进记录"
				:autosize="{ maxHeight: 100, minHeight: 100}"
				)
		van-button.save-button(size="large" color="#FF3B30") 保存
</template>

<script>
	import { mapGetters } from 'vuex'
	import Vue from 'vue'
	import {Cell, Field} from 'vant'

	Vue.use(Cell)
		.use(Field)
	export default {
		name: 'edit',
		components: {
			MGeneralSelect: () => import('components/m-general-select/m-general-select.vue'),
			MAreaSelect: () => import('components/m-area-select/m-area-select.vue')
		},
		data() {
			return {
				username: '路人甲',
				gender: 'vb',
				address: '',
				record: ''
			}
		},
		computed: {
			...mapGetters([
				'Gender'
			])
		}
	}
</script>
<style lang="scss" scoped>
	.edit {
		background: #f2f2f2;
		padding-bottom: 49px;
		.event-row {
			margin-top: 40px;
		}
		.save-button {
			height: 49px;
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
		}
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
