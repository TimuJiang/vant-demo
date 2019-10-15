<template lang="pug">
	m-page(
		:head-title="change.title"
		:right-text="change.rightText"
		@click-right="() => { submit(change.rightClick) }"
		).verify-operation
		.container
			van-cell(v-if="this.$route.params.type === 'assign'" title="*销售顾问" is-link :value="salesman" @click="() => { this.actionShow = true }")
			.text-title {{`${this.$route.params.type === 'assign' ? '' : '*'}${change.title}`}}
			textarea.text(placeholder="请输入" v-model="param.reason")
		van-action-sheet(v-model="actionShow" :actions="salesmanList" @select="selectSaleMan")
		m-loading(:show="loading" text="请稍后")

</template>

<script>
    export default {
        name: 'verify-operation',
		created() {
			this.param.id = this.$route.params.id
			if (this.$route.params.type === 'assign') {
				this.initSalesmanList()
			}
		},
		data() {
        	return {
        		param: {
        			id: '',
					reason: ''
				},
				salesman: '',
				salesmanList: [],
				actionShow: false,
				loading: false
			}
		},
		computed: {
        	api() {
				return this.$api.clueCustomer
			},
        	change() {
				switch (this.$route.params.type) {
					case 'assign':
						return {
							title: '分配意见',
							rightText: '分配',
							rightClick: this.api.redistributionCustomer
						};
					case 'pass':
						return {
							title: '通过意见',
							rightText: '通过',
							rightClick: this.api.passDefeatAudit
						};
					case 'reject':
						return {
							title: '驳回原因',
							rightText: '驳回',
							rightClick: this.api.notPassDefeatAudit
						};
					case 'defeat':
						return {
							title: '战败申请',
							rightText: '提交',
							rightClick: this.api.saveDefeatAudit
						};
					default:
						return {
							title: '',
							rightText: '',
							rightClick: null
						}
				}
			},
		},
		methods: {
        	selectSaleMan({ name }) {
        		this.salesman = name
				this.param.salesConsultant = name
				this.actionShow = false
			},
			initSalesmanList() {
        		this.api.queryUserList().then((data) => {
        			data.map((item) => {
						item.name = item.loginName
					})
        			this.salesmanList = data
				})
			},
        	assign() {
        		console.log('param', this.param)
				this.$dialog.alert({
					message: '分配成功'
				})
			},
			pass() {
				this.$dialog.alert({
					message: '已通过'
				})
			},
			reject() {
				this.$dialog.alert({
					message: '驳回成功'
				})
			},
			submit(action) {
        		this.loading = true
        		action(this.param).then(() => {
					this.$router.back()
				}).catch(({ message }) => {
					this.$dialog.alert({
						message: message || '操作失败'
					})
				}).finally(() => {
					this.loading = false
				})
			}
		}
    }
</script>

<style lang="scss" scoped>
	.container {
		position: absolute;
		width: 100%;
		top: 46px;
		bottom: 0;
		background-color: #efeff4;
	}
	.text {
		width: 100%;
		height: 160px;
		box-sizing: border-box;
		padding: 0 15px;
		font-size: 14px;
		resize:none;
		border-width: 0;
	}
	.text-title {
		background-color: #fff;
		padding: 10px 15px 15px;
		font-size: 14px;
	}
</style>
