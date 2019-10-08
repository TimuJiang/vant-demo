<template lang="pug">
	m-page(right-text="提交" @click-right="submit").order-invoice
		.container
			.cell
				van-cell-group
					van-field(v-model="order.pCustomerName" readonly label="客户名称")
					van-field(v-model="order.mobileNo" readonly label="客户电话")
					van-field(v-model="order.chassisNumber" readonly label="底盘号")
			.cell
				van-cell-group
					van-field(v-model="pageShow.invoiceType" readonly label="发票类型" placeholder="请选择" right-icon="arrow" @click="() => { this.actionSheetShow = true }")
					van-field(v-model="page.invoiceNum" label="发票号码" placeholder="请输入")
					van-field(v-model="page.money" label="开票金额(元)" placeholder="请输入")
					van-field(v-model="page.invoiceUser" label="开票人员" placeholder="请输入")
					m-time-select(v-model="page.invoiceDate" :is-current-date="true" label="开票日期" placeholder="请选择")
		van-action-sheet(
			v-model="actionSheetShow"
			:actions="selectItems.invoiceType"
			@select="selectItem"
		)

		m-loading(:show="show" text="提交中")

</template>
<script>
    export default {
        name: 'invoice',
		props: ['orderId'],
		created() {
        	this.initPageData()
		},
		data() {
        	return {
        		show: false,
        		order: {

				},
				page: {
        			orderId: this.orderId,
					invoiceType: '',
					invoiceNum: '',
					money: '',
					invoiceUser: '',
					invoiceDate: ''
				},
				pageShow: {
					invoiceType: ''
				},
				actionSheetShow: false
        	}
		},
		computed: {
        	disabled() {
        		return this.operation === 'show'
			},
			api() {
        		return this.$api.order
			},
			selectItems() {
				let { InvoiceTypeEnum } = this.$store.state.enums
				console.log(this.$store.state.enums)
				return this.renderSelectItems({
					invoiceType: InvoiceTypeEnum
				})
			}
		},
		methods: {
			renderSelectItems(items) {
				for (let key in items) {
					items[key] = items[key].map((item) => {
						let newItem = {
							name: item.disName,
							value: item.name
						}
						return newItem
					})
				}
				// console.log('selectItems' ,items)
				return items
			},
        	selectItem(item) {
        		this.page.invoiceType = item.value;
				this.pageShow.invoiceType = item.name;
        		this.actionSheetShow = false;
			},
			submit() {
				this.show = true
        		this.api.saveInvoice(this.page).then(() => {
					this.$dialog.alert({
						message: '提交成功'
					})
				}).catch((error) => {
					this.$dialog.alert({
						message: error.message || '提交'
					})
				}).finally(() => {
					this.show = false
				})
			},
			initPageData() {
        		this.api.get(this.orderId).then((data) => {
        			this.order = data
					this.page.chassisNumber = data.chassisNumber
				})
			}
		}
    }
</script>

<style lang="scss" scoped>
	.container {
		position: absolute;
		top: 46px;
		bottom: 0;
		width: 100%;
		overflow: scroll;
		background-color: #efeff4;
		.cell {
			margin-bottom: 10px;
		}
	}
</style>

<style>
	.order-invoice .van-cell {
		font-size: 16px;
		font-weight: 600;
		color: #333;
		line-height: 30px;
	}
	.order-invoice .van-cell:not(:last-child) {
		border-bottom: 1px solid rgba(0,0,0,0.1);
	}
	.order-invoice .van-hairline--top-bottom::after {
		display: none;
	}
	.order-invoice .van-cell::after {
		display: none;
	}
	.order-invoice .container .cell .van-cell__title {
		width: 110px;
	}
</style>
