<template lang="pug">
	m-page(:head-title="title").customer-search
		.container
			common-search(@change-param="changeParam")
			.cell-container(v-if="type === 'all'")
				van-cell(
					v-for="(item,index) in customerTypes"
					:title="`${customerTypesMap[item.type]}（${customerCount[`${item.type}Count`] === undefined ? '--' : customerCount[`${item.type}Count`]}）`"
					:key="index"
					:is-link="true"
					@click="() => { jump(item.type, item.pCustomerStatus) }"
				)
					template(slot="title")
						img(:src="icon[index]")
						span {{`${customerTypesMap[item.type]}（${customerCount[`${item.type}Count`] === undefined ? '--' : customerCount[`${item.type}Count`]}）`}}
			div(:class="listClass")
				index-bar-list(:outer-param="param")

</template>

<script>
	import CommonSearch from './customer/common-search'
	export default {
        name: 'customer-search',
		props: ['loginName', 'type'],
		beforeRouteUpdate (to, from, next) {
			// 在当前路由改变，但是该组件被复用时调用
			// 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
			// 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
			// 可以访问组件实例 `this`
			this.changeCustomerStatus(to.params.type)
			next()
		},
		components: {
        	'common-search': CommonSearch
		},
		created() {
        	if (this.loginName !== '-1') {
        		this.defaultParam.salesConsultant = this.loginName
			}
			this.changeCustomerStatus(this.type)
			this.initCount()
		},
		data() {
        	return {
        		icon: {
        			0: `${require('../assets/customer/sjcustomer.png')}`,
					1: `${require('../assets/customer/ddcustomer.png')}`,
					2: `${require('../assets/customer/bycustomer.png')}`,
					3: `${require('../assets/customer/zbcustomer.png')}`,
					4: `${require('../assets/customer/shcustomer.png')}`
				},
				param: null,
				defaultParam: {
					mobileNo: '',
					pCustomerName: '',
					pageNum: 1,
					pageSize: 10
				},
				customerTypesMap: {
        			'bussCustomer': '商机客户',
					'orderCustomer': '订单客户',
					'tenureCustomer': '保有客户',
					'defeatThisYearCustomer': '本年战败客户',
					'defeatNotAuditCustomer': '战败待审客户'
				},
				customerCount: {},
				customerTypes: [
					{
						number: 821,
						type: 'bussCustomer',
						pCustomerStatus: [51080003, 52080005]
					},
					{
						number: 351,
						type: 'orderCustomer',
						pCustomerStatus: [51080010]
					},
					{
						number: 49,
						type: 'tenureCustomer',
						pCustomerStatus: [51080025]
					},
					{
						number: 49,
						type: 'defeatThisYearCustomer',
						pCustomerStatus: [51080015]
					},
					{
						number: 5,
						type: 'defeatNotAuditCustomer',
						pCustomerStatus: [51080007]
					}
				]
			}
		},
		computed: {
        	title() {
        		switch (this.type) {
					case 'all':
						return '客户查询'
					case 'defeatThisYearCustomer':
						return '战败客户'
					default:
						return this.customerTypesMap[this.type]
				}
			},
			listClass() {
        		return {
        			'list': true,
					'closer-to-top': this.type !== 'all'
				}
			},
			api() {
				return this.$api.clueCustomer
			}
		},
		methods: {
        	initCount() {
        		let param = {}
        		if (this.loginName !== '-1') {
        			// 当前登录的是客户经理，查询时需要传对应的销售顾问ID到后台
					param.salesConsultant = this.loginName
				}
        		this.api.getCustomerCount(param).then((data) => {
        			this.customerCount = data
				})
			},
        	jump(type) {
        		if (type === 'bussCustomer') {
					this.$router.push(`/potential-customer/all/saleLoginName/${this.loginName}`)
				} else {
        			this.$router.push(`/customer-search/${this.loginName}/type/${type}`)
				}
			},
			clickSearchPoint() {
				let { type ,value } = this.searchInfo
				if (type) {
					this.changeParam({key: type, value})
				} else {
					this.changeParam({})
				}
			},
			changeCustomerStatus(type) {
        		if (type === 'all') {
					this.changeParam({key: 'pCustomerStatus', value: null})
				} else {
					for (let i = 0; i < this.customerTypes.length; i++) {
						if (type === this.customerTypes[i].type) {
							this.changeParam({key: 'pCustomerStatus', value: this.customerTypes[i].pCustomerStatus})
							break
						}
					}
				}
			},
			changeInputValue(value) {
				let trimValue = value.trim()
				if (trimValue) {
					if (!isNaN(trimValue) || trimValue === '0') {
						this.searchInfo = {
							type: 'mobileNo',
							value: trimValue
						}
						// this.changeParam('mobileNo', trimValue)
					} else {
						this.searchInfo = {
							type: 'pCustomerName',
							value: trimValue
						}
						// this.changeParam('pCustomerName', trimValue)
					}
				} else {
					this.searchInfo = {
						type: '',
						value: 'trimValue'
					}
					// this.changeParam()
				}
			},
			changeParam({key, value}) {
        		let newParam = {
        			...this.defaultParam
				}
				if (key === 'pCustomerStatus' && this.param) {
					this.searchValue = ''
					delete this.param.pCustomerStatus
				}
        		if (value) {
					newParam[key] = value
				}
				this.param = Object.assign({}, this.param || {}, newParam)
			}
		}
    }
</script>

<style lang="scss" scoped>
	$company-blue: #1B40D6;
	$common-grey: #efeff4;
	.container {
		position: absolute;
		top: 46px;
		bottom: 0;
		width: 100%;
		background-color: $common-grey;
		.cell-container {
			img {
				width: 30px;
				height: 30px;
				margin-right: 10px;
			}
		}
		.list {
			position: absolute;
			top: 290px;
			bottom: 0;
			width: 100%;
			overflow: scroll;
			&.closer-to-top {
				top: 40px;
			}
		}
	}
</style>

<style lang="scss">
	.customer-search  {
		.cell-container .van-cell__title {
			display: flex;
			align-items: center;
		}
	}
</style>
