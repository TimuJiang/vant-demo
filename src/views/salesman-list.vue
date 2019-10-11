<template lang="pug">
	m-page.salesman-list
		.container
			.title 共有{{salesman.length}}位销售顾问
			.list
				van-cell(
					v-for="(item, index) in salesman"
					:key="index"
					:title="item.name"
					title-class="a"
					:is-link="true"
					@click="() => { goToCustomerSearch(item.loginName) }"
				)
</template>

<script>
    export default {
        name: 'salesman-list',
		created() {
        	this.initSaleManList()
		},
		data() {
        	return {
        		salesman: []
			}
		},
		methods: {
        	goToCustomerSearch(id) {
        		this.$router.push(`customer-search/${id}/type/all`)
			},
			initSaleManList() {
        		this.$api.clueCustomer.queryUserList().then((data) => {
        			this.salesman = data
				}).catch((error) => {
					this.$dialog.alert({
						message: error.message
					})
				})
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
		.title {
			font-size: 14px;
			height: 40px;
			line-height: 40px;
			background-color: #fff;
			text-align: center;
			color: $company-blue;
		}
		.list {
			margin-top: 10px;
		}
		.a {
			font-weight: bold;
		}

	}
</style>
