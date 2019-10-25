<template lang='pug'>
	m-page(:right-icon="true" right-icon-type="search").potential-customer
		van-dropdown-menu.search-drop
			van-dropdown-item(ref="search")
				common-search(@change-param="changeParam")
		van-tabs(
			v-model="active"
			color="#1B40D6"
			@change="clickTab"
			)
			van-tab(title="全部" name="all")
			van-tab(v-for="item in _customer" :key="item.type" :name="item.type"  :title="`${item.type}级`" v-if="item.type !== 'cancelled'")
			van-tab(title="已作废" v-if="isManager" name="cancelled")
		.potential-customer__content
			index-bar-list(:outer-param="param")

</template>

<script>
	import { POTENTIAL_CUSTOMER } from 'config/types.config'
	import Vue from 'vue'
	import { IndexBar, IndexAnchor, Cell } from 'vant'
	import CommonSearch from './customer/common-search'

	Vue.use(IndexBar).use(IndexAnchor).use(Cell)
	export default {
		name: 'potential-customer',
		data() {
			return {
				active: 'all',
				levelData: {},
				param: null,
				defaultParam: {
					pCustomerStatus: [51080003, 52080005],
					pageNum: 1,
					pageSize: 20
				},
				cancelledStatus: 51080020
			}
		},
		components: {
			'common-search': CommonSearch
		},
		created() {
			if (this.$route.params.saleLoginName !== '-1') {
				this.defaultParam.salesConsultant = this.$route.params.saleLoginName
			}
			this.active = this.$route.params.type
			this.initLevelList()
		},
		computed: {
			isManager() {
				return this.$store.getters.isManager
			}
		},
		methods: {
			initLevelList() {
				this.$api.dictConfig.query({
					dictNo: 5089
				}).then((data) => {
					let level = {}
					data.forEach((item) => {
						let name = item.dictValue.split('（')[0]
						level[name] = item.dictKey
					})
					this.levelData = level
					this._customer = [...this._customer]
					this.changeParam()
				})
			},
			changeParam(obj) {

				let newParam = {
					...this.defaultParam
				}
				if (obj && obj.key) {
					newParam[obj.key] = obj.value
				}
				if (this.active !== 'cancelled') {
					if (this.active !== 'all') {
						newParam.pCustomerLevel = Number(this.levelData[this.active])
					}
				} else {
					newParam.pCustomerStatus = [this.cancelledStatus]
				}
				if (obj) {
					this.$refs.search.toggle()
				}
				this.param = newParam
			},
			clickTab() {
				this.changeParam()
			}
		},
		beforeCreate() {
			this._customer = POTENTIAL_CUSTOMER
		}
	}
</script>
<style lang="scss" scoped>
	.potential-customer {
		background: #f8f8f8;
		&__content {
			position: absolute;
			left: 0;
			right: 0;
			overflow-y: auto;
			top: 90px;
			bottom: 0
		}
		.van-cell {

		}
		.search-drop {
			position: fixed;
			top: 0;
			right: 16px;
			height: 46px;
			background-color: transparent;
			z-index: 999;
		}
	}
</style>

<style lang="scss">
	.potential-customer {
		.search-drop {
			.van-dropdown-menu__item {
				opacity: 0;
			}
		}
	}
</style>
