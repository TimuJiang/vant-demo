<template lang="pug">
	m-page(:head-title="title").customer-search
		.container
			.search
				van-search(
					v-model="searchValue"
					placeholder="输入手机号/客户姓名"
					shape="round"
					left-icon=""
					right-icon="search"
					@input="changeInputValue"
				)
			.cell-container(v-if="type === 'all'")
				van-cell(
					v-for="(item,index) in customerTypes"
					:title="`${customerTypesMap[item.type]}（${customerCount[`${item.type}Count`] === undefined ? '--' : customerCount[`${item.type}Count`]}）`"
					:key="index"
					:is-link="true"
					icon="like-o"
					@click="() => { jump(item.type, item.pCustomerStatus) }"
				)
			div(:class="listClass")
				index-bar-list(:outer-param="param")

</template>

<script>
	import Vue from 'vue';
	import { Search } from 'vant';

	Vue.use(Search);
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
		created() {
        	if (this.loginName !== '-1') {
        		this.defaultParam.salesConsultant = this.loginName
			}
			this.changeCustomerStatus(this.type)
			this.initCount()
		},
		data() {
        	return {
        		searchValue: '',
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
				],
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
					this.$router.push(`/potential-customer/all`)
				} else {
        			this.$router.push(`/customer-search/${this.loginName}/type/${type}`)
				}
			},
			changeCustomerStatus(type) {
        		if (type === 'all') {
					this.changeParam('pCustomerStatus', null)
				} else {
					for (let i = 0; i < this.customerTypes.length; i++) {
						if (type === this.customerTypes[i].type) {
							this.changeParam('pCustomerStatus', this.customerTypes[i].pCustomerStatus)
							break
						}
					}
				}
			},
			changeInputValue(value) {
				let trimValue = value.trim()
				if (trimValue) {
					if (!isNaN(trimValue) || trimValue === '0') {
						this.changeParam('mobileNo', trimValue)
					} else {
						this.changeParam('pCustomerName', trimValue)
					}
				} else {
					this.changeParam()
				}
			},
			changeParam(key, value) {
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
		.search {
			height: 40px;
			background-color: #fff;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.list {
			position: absolute;
			top: 260px;
			bottom: 0;
			width: 100%;
			overflow: scroll;
			&.closer-to-top {
				top: 40px;
			}
		}
	}
</style>

<style>
	.customer-search .van-search {
		padding: 0!important;
		width: 70%;
	}

	.customer-search .van-search .van-cell {
		padding: 3px 8px 3px 0!important;
	}

	.customer-search .van-search .van-search__content {
		padding-left: 20px;
	}
	.customer-search .van-search .van-search__content .van-field__control {
		font-size: 12px;
	}
</style>
