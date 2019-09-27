<template lang='pug'>
	m-page.edit
		.edit-warp
			van-cell-group
				van-field(required label="客户姓名"  v-model="username")
				m-general-select(label="性别")
				m-general-select(label="意向等级")
				m-general-select(label="意向车系")
				m-general-select(label="意向车型")
				m-general-select(label="车辆颜色")
				m-general-select(label="跟进方式")
</template>

<script>
	import Vue from 'vue'
	import {Cell, Field} from 'vant'

	Vue.use(Cell)
		.use(Field)
	export default {
		name: 'edit',
		components: {
			MGeneralSelect: () => import('components/m-general-select/m-general-select.vue')
		},
		data() {
			return {
				username: '路人甲'
			}
		}
	}
</script>
<style lang="scss" scoped>
	.edit {
		.edit-warp {
			padding: 0 15px;
		}
	}
</style>
