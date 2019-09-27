<template lang='pug'>
	m-page.edit
		.edit-warp
			van-cell-group
				van-field(required label="客户姓名"  v-model="username")
				m-general-select()
				van-field(required label="意向等级"  v-model="username")
				van-field(required label="意向车系"  v-model="username")
				van-field(required label="意向车型"  v-model="username")
				van-field(required label="车辆颜色"  v-model="username")
				van-field(required label="跟进方式"  v-model="username")
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
