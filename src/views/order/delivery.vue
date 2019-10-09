<template lang="pug">
	m-page(right-text="提交" @click-right="submit").order-delivery
		.container
			.cell
				van-cell-group
					van-field(v-model="orderId" readonly label="销售订单号")
					van-field(v-model="name" readonly label="客户名称")
					van-field(v-model="carType" readonly label="销售车型")
			.cell
				van-cell-group
					m-img-upload(:value="ifUploaded.id"  type="id" operation="edit" :ids="page.certificateNoIds" :paths="page.certificateNoPaths" title="身份证" label="身份证照片" @do-upload="(data) => { afterUpload('certificateNoPaths', data) }")
					m-img-upload(:value="ifUploaded.chassisNumber"  type="chassisNumber" operation="edit" :ids="page.chassisNumberIds" :paths="page.chassisNumberPaths" title="车架号" label="车架号上传" @do-upload="(data) => { afterUpload('chassisNumberPaths', data) }")
					m-img-upload(:value="ifUploaded.transaction"  type="transaction" operation="edit" :is-multiple="true" :ids="page.transactionIds" :paths="page.transactionPaths" title="交车照片" label="交车照片" @do-upload="(data) => { afterUpload('transactionPaths', data) }")
					m-img-upload(:value="ifUploaded.invoice"  type="invoice" operation="edit" :ids="page.invoiceIds" :paths="page.invoicePaths" title="发票" label="发票上传" @do-upload="(data) => { afterUpload('invoicePaths', data) }")

			m-loading(:show="show" text="提交中")

</template>

<script>
    export default {
        name: 'delivery',
		props: ['orderId'],
		created() {
			this.initPageData()
		},
		data() {
        	return {
				show: false,
				name: '',
				carType: '',
				page: {
					orderId: this.orderId,
					saleModel: '',
					saleSeries: '',
					chassisNumberPaths: [],
					certificateNoPaths: [],
					transactionPaths: [],
					invoicePaths: []
				}
			}
		},
		computed: {
			disabled() {
				return this.operation === 'show'
			},
			api() {
				return this.$api.order
			},
			ifUploaded() {
				return {
					id: this.page.certificateNoPaths.length > 0 ? '已上传' : '',
					chassisNumber: this.page.chassisNumberPaths.length > 0 ? '已上传' : '',
					transaction: this.page.transactionPaths.length > 0 ? '已上传' : '',
					invoice: this.page.invoicePaths.length > 0 ? '已上传' : ''

				}
			}
		},
		methods: {

			afterUpload(type, data) {
				console.log(data);
        		this.page[type] = data
			},
			submit() {
				let verifyNull = ['certificateNoPaths', 'chassisNumberPaths', 'transactionPaths', 'invoicePaths']
				for (let item of verifyNull) {
					if (this.page[item].length === 0) {
						this.$dialog.alert({
							message: '请上传完成所有照片信息'
						})
						return false
					}
				}
				console.log('this.page', this.page)
				this.show = true
				this.$api.order.saveTransactionCar(this.page).then(() => {
					this.$dialog.alert({
						message: '提交成功'
					})
				}).catch((error) => {
					this.$dialog.alert({
						message: error.message || '提交失败'
					})
				}).finally(() => {
					this.show = false
				})

			},
			initPageData() {
				this.api.get(this.orderId).then((data) => {
					this.name = data.pCustomerName
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
	.order-delivery .van-cell {
		font-size: 16px;
		font-weight: 600;
		color: #333;
		line-height: 30px;
	}
	.order-delivery .van-cell:not(:last-child) {
		border-bottom: 1px solid rgba(0,0,0,0.1);
	}
	.order-delivery .van-hairline--top-bottom::after {
		display: none;
	}
	.order-delivery .van-cell::after {
		display: none;
	}
	.order-delivery .container .cell .van-cell__title {
		width: 110px;
	}
</style>
