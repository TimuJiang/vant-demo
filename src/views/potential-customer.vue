<template lang='pug'>
	m-page.potential-customer
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
					this.changeParam(this.$route.params.type)
				})
			},
			changeParam(type) {

				let newParam = {
					...this.defaultParam
				}
				if (type !== 'cancelled') {
					if (type !== 'all') {
						newParam.pCustomerLevel = Number(this.levelData[type])
					}
				} else {
					newParam.pCustomerStatus = [this.cancelledStatus]
				}
				this.param = newParam
			},
			clickTab(name) {
				this.changeParam(name)
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
	}
</style>
