<template lang='pug'>
	.app-center
		.group-title 应用中心
		.app-container
			van-grid(:column-num="3")
				van-grid-item.app-item(v-for="item in _apps" v-if="renderAppItem(item.name)" :key="item.name" :to="(item.name === '客户查询' && isManager) ? item.path2 : item.path" :icon="item.icon" :text="item.name")
					img(:src="icon[item.icon]")
					.icon-text {{item.name}}
</template>

<script>
	import { APP_CENTER } from 'config/types.config'
	export default {
		name: 'app-center',
		data() {
			return {
				icon: {
					'customersearch': `${require(`../../assets/home/home_icon_customersearch.png`)}`,
					'distribution': `${require(`../../assets/home/home_icon_distribution.png`)}`,
					'fail': `${require(`../../assets/home/home_icon_fail.png`)}`,
					'ordermanage': `${require(`../../assets/home/home_icon_ordermanage.png`)}`,
					'testdrive': `${require(`../../assets/home/home_icon_testdrive.png`)}`
				}
			}
		},
		props: {
			isManager: Boolean
		},
		methods: {
			renderAppItem(name) {
				if (this.isManager) {
					return true
				} else {
					if (this.$store.getters.isPhoneSpecialist) {
						return name === '客户查询'
					} else {
						return !(name === '线索分配' || name === '战败审核')
					}
				}
			}
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
	.app-item {
		img {
			width: 38px;
			height: 38px;
		}
		.icon-text {
			color: #333;
			font-size: 14px;
			margin-top: 8px;
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
