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
					van-field(readonly required label="身份证照片" placeholder="请上传" right-icon="arrow" @click-right-icon="() => { toToUpload('id') }")
					van-field(readonly required label="车架号上传" placeholder="请上传" right-icon="arrow" @click-right-icon="() => {}")
					van-field(readonly required label="交车照片" placeholder="请上传" right-icon="arrow" @click-right-icon="() => {}")
					van-field(readonly required label="发票上传" placeholder="请上传" right-icon="arrow" @click-right-icon="() => {}")




</template>

<script>
    export default {
        name: 'delivery',
		data() {
        	return {
        		orderId: 'DS190900013',
				name: '吴彦祖',
				carType: '博越1.8TD-6AT四驱'
			}
		},
		methods: {
        	toToUpload(type) {
        		this.$router.push(`/upload/${type}/operateType/edit/detailId/${this.$route.params.orderId}`);
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
	.order-delivery .van-cell {
		font-size: 14px;
	}
	.order-delivery .container .cell .van-cell__title {
		width: 100px;
	}
</style>
