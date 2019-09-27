<template lang='pug'>
	.app-center
		.group-title 应用中心
		.app-container
			van-grid(:column-num="3")
				van-grid-item.app-item(v-for="item in _apps" :key="item.name" :to="(item.name === '客户查询' && isManager) ? item.path2 : item.path" :icon="item.icon" :text="item.name")
</template>

<script>
	import { APP_CENTER } from 'config/types.config'
	export default {
		name: 'app-center',
		props: {
			isManager: Boolean
		},
		beforeCreate() {
			this._apps = APP_CENTER
		}
	}
</script>
<style lang="scss" scoped>
	.app-center {
		padding-top: 10px;
		background-color: #efeff4;
		.group-title {
			background-color: #fff;
			font-weight: bold;
			padding: 10px 20px;
		}
		.app-container {
			overflow: scroll;
		}
	}
</style>
<style>
	.app-center .van-grid {
		background-color: #fff;
	}
	.app-center .app-item .van-icon {
		color: #1B40D6 !important;
	}
	.app-center .van-hairline--top::after {
		border-top-width: 0;
	}
	.app-center .app-item .van-grid-item__text {
		color: #333;
		font-size: 14px;
	}
	.app-center .van-grid-item__content::after {
		border-width: 0;
	}
</style>
