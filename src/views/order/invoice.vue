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
					van-field(v-model="invoiceTime" label="开票日期" readonly placeholder="请选择" right-icon="arrow" @click-right-icon="() => { this.selectTimeShow = true }")
		van-action-sheet(
			v-model="actionSheetShow"
			:actions="items"
			@select="selectItem"
		)
		van-popup(
			v-model="selectTimeShow"
			position="bottom"
		)
			van-datetime-picker(
				v-model="timeSelect"
				type="date"
				@confirm="dateConfirm"
				@cancel="() => { this.selectTimeShow = false }"
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
				invoiceTimeConfirm: new Date(), // 开发票时间日期对象，格式化后的字符串值在计算属性中

				actionSheetShow: false,
				items: [
					{ name: '机动车发票' },
					{ name: '增值税专用发票' },
					{ name: '增值税普通发票' }
				],
				selectTimeShow: false,
				timeSelect: new Date()
        	}
		},
		computed: {
			invoiceTime() {
				let date = this.invoiceTimeConfirm;
				let str = '';
				let dateObj = {
					year: date.getFullYear(),
					month: date.getMonth() + 1,
					day: date.getDate(),
				};
				const { year, month, day } = dateObj;
				const monthFormat = this.numberFormat(month);
				const dayFormat = this.numberFormat(day);

				str = `${year}-${monthFormat}-${dayFormat}`;
				return str
			}
		},
		methods: {
        	selectItem(item) {
        		this.invoiceType = item.name;
        		this.actionSheetShow = false;
			},
			numberFormat(number) {
				return number < 10 ? `0${number}` : number;
			},
			dateConfirm(value) { // 确认时间选择
				this.invoiceTimeConfirm = value;
				this.selectTimeShow = false;
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
		font-size: 14px;
	}
	.order-invoice .container .cell .van-cell__title {
		width: 100px;
	}
</style>
