<template lang='pug'>
	m-page.edit
		.edit-wrap
			van-cell-group
				van-field(required label="客户姓名" v-model="page.pCustomerName" placeholder="请输入" label-width="110")
				m-general-select(label="性别" :actions="DictGender" v-model="select.gender" @select="(item) => { changeDict('gender', item) }")
				m-general-select(label="意向等级" :actions="DictLevel" v-model="select.pCustomerLevel" @select="(item) => { changeDict('pCustomerLevel', item) }")
				m-car-seriesmodel(v-model="page" label="意向" series-key="purposeSeries" model-key="purposeModel")
				m-general-select(label="车辆颜色" v-model="select.purposeColor")
				m-general-select(label="跟进方式"  :actions="DictFollowType" v-model="select.foType" @select="(item) => { changeDict('foType', item) }")
				m-time-select(label="下次跟进日期" v-model="page.nextFoDate")
				m-area-select-new(v-model="page")
				van-field(label="详细地址"  v-model="page.address" label-width="110" placeholder="请输入")
			van-cell-group.event-row
				.tag-list
					.container
						.item(v-for="item in incident" :key="item.value" v-if="!(item.name === '转订单' && orderDisabled)")
							span(:class="{'selected': !!item.selected}" @click="() => { clickIncident(item.value) }") {{item.name}}
					van-field(required readonly label="发生事件")
				van-field(
					v-model="page.remark"
					type="textarea"
					label-width="110"
					placeholder="请输入跟进记录"
					:autosize="{ maxHeight: 100, minHeight: 100}"
					)
		van-button.save-button(size="large" color="#FF3B30" @click="save") 保存
		m-loading(:show="loadingShow" text="保存中")
</template>

<script>
	import { mapGetters } from 'vuex'
	import Vue from 'vue'
	import {Cell, Field} from 'vant'

	Vue.use(Cell)
		.use(Field)
	export default {
		name: 'edit',
		components: {
			MGeneralSelect: () => import('components/m-general-select/m-general-select.vue'),
			MAreaSelect: () => import('components/m-area-select/m-area-select.vue')
		},
		created() {
			this.page.pCustomerId = this.$route.params.id
			this.getCustomerInfo()
		},
		data() {
			return {
				loadingShow: false,
				orderDisabledList: ['51080010', '51080025'], // 已转订单 已报终端的潜客转订单按钮置灰
				page: {
					pCustomerName: '',
					gender: '',
					pCustomerLevel: '',
					purposeModel: '',
					purposeSeries: '',
					foType: '',
					purposeColor: '',
					nextFoDate: '',
					province: '',
					county: '',
					city: '',
					incident: '',
					address: '',
					remark: ''
				},
				select: {
					gender: '',
					pCustomerLevel: '',
					purposeModelName: '',
					purposeSeriesName: '',
					foType: '',
					purposeColor: '',
					area: ''
				},
				incident: [
					{
						name: '电话邀约',
						value: 'TELEPHONE_INVITATION'
					},
					{
						name: '到店接待',
						value: 'SHOP_RECEPTION'
					},
					{
						name: '试乘试驾',
						value: 'RESERVE_TEST_DRIVE'
					},
					{
						name: '转订单',
						value: 'LOWER_ORDER'
					},
					{
						name: '议价谈判',
						value: 'BARGAINING_NEGOTIATION'
					},
					{
						name: '其他',
						value: 'OTHER'
					}
				]
			}
		},
		methods: {
			getCustomerInfo() {
				this.api.get(this.$route.params.id).then((data) => {
					this.page = Object.assign({}, this.page, data)
					this.initDict(['gender', 'pCustomerLevel'], data)
				})
			},
			clickIncident(value) {
				this.incident = this.incident.map((item) => {
					delete item.selected
					if (item.value === value) {
						item.selected = true
						this.page.incident = value
					}
					return item
				})
			},
			initDict(dictTypes, customer) {
				dictTypes.forEach((item) => {
					if (customer[item]) {
						this.select[item] = this.dicMap[customer[item]].dictValue
					}
				})
			},
			changeDict(key, item) {
				this.page[key] = Number(item.dictKey)
			},
			save() {
				this.loadingShow = true
				this.api.saveFollow(this.page).then(() => {
					this.$toast('保存成功')
					this.$router.back()
				}).catch(({ message }) => {
					this.$dialog.alert({
						message: message || '保存失败'
					})
				}).finally(() => {
					this.loadingShow = false
				})
			}
		},
		computed: {
			api() {
				return this.$api.clueCustomer
			},
			orderDisabled() {
				return (this.orderDisabledList.indexOf(this.page.pCustomerStatus) !== -1)
			},
			...mapGetters([
				'DictGender',
				'DictLevel',
				'DictFollowType',
				'dicMap'
			])
		}
	}
</script>
<style lang="scss" scoped>
	.tag-list {
		position: relative;
		height: 70px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		padding-bottom: 8px;
		.container {
			height: 60px;
			position: absolute;
			left: 120px;
			top: 10px;
			z-index: 1;
			display: flex;
			flex-wrap: wrap;
			.item {
				height: 50%;
				max-width: 33.33%;
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 0 5px;
				box-sizing: border-box;
				span {
					font-size: 12px;
					display: inline-block;
					line-height: 20px;
					height: 20px;
					text-align: center;
					padding: 0 10px;
					border: 1px solid #1B40D6;
					border-radius: 10px;
					color: #1B40D6;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					&.selected {
						background-color: #1B40D6;
						color: #fff;
						border-color: #1B40D6;
					}
				}
			}
		}
	}
	.edit {
		background: #f2f2f2;
		.edit-wrap {
			position: absolute;
			top: 46px;
			width: 100%;
			bottom: 49px;
			overflow: scroll;
		}
		.event-row {
			margin-top: 40px;
		}
		.save-button {
			height: 49px;
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 1;
		}
		.van-field {
			line-height: 30px;
			font-size: 16px;
			font-weight: 600;
			color: #333333;
			.van-field__label, van-cell__title {
				line-height: 30px;
			}
		}
	}
</style>
