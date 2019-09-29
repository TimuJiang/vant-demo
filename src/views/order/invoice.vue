<template lang="pug">
	m-page(right-text="提交" @click-right="submit").order-invoice
		.container
			.cell
				van-cell-group
					van-field(v-model="name" readonly label="客户名称")
					van-field(v-model="phone" readonly label="客户电话")
					van-field(v-model="carNum" readonly label="底盘号")
			.cell
				van-cell-group
					van-field(v-model="invoiceType" readonly label="发票类型" placeholder="请选择" right-icon="arrow" @click-right-icon="() => { this.actionSheetShow = true }")
					van-field(label="发票号码" placeholder="请输入")
					van-field(v-model="invoiceName" label="开票金额(元)" readonly)
					van-field(v-model="invoicePrice" label="开票人员" readonly)
					m-time-select(v-model="invoiceTime" label="开票日期" placeholder="请选择")
		van-action-sheet(
			v-model="actionSheetShow"
			:actions="items"
			@select="selectItem"
		)

</template>
<script>
    export default {
        name: 'invoice',
		data() {
        	return {
				name: '吴彦祖',
				phone: '13777887777',
				carNum: 'DCSFEJ900990',
				invoiceName: '张三',
				invoicePrice: '200000',
				invoiceType: '',
				invoiceTime: '',
				actionSheetShow: false,
				items: [
					{ name: '机动车发票' },
					{ name: '增值税专用发票' },
					{ name: '增值税普通发票' }
				]
        	}
		},
		computed: {
		},
		methods: {
        	selectItem(item) {
        		this.invoiceType = item.name;
        		this.actionSheetShow = false;
			},
			submit() {
        		this.$dialog.alert({
					message: '提交成功'
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
