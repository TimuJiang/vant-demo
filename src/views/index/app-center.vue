<template lang='pug'>
	.app-center
		.group-title 应用中心
		van-grid
			van-grid-item.app-item(v-for="item in _apps" :key="item.name" :to="(item.name === '客户查询' && user.role === '数字营销经理') ? item.path2 : item.path" :icon="item.icon" :text="item.name")
</template>

<script>
	import { mapGetters } from 'vuex'
	import { APP_CENTER } from 'config/types.config'
	export default {
		name: 'app-center',
		computed: {
			...mapGetters([
				'user'
			])
		},
		beforeCreate() {
			this._apps = APP_CENTER
		}
	}
</script>
<style lang="scss" scoped>
	.app-center {
		.group-title {
			padding: 10px 20px;
		}
		.app-item .van-icon {
			color: #1B40D6 !important;
		}
	}
</style>
