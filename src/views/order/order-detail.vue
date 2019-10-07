<template lang="pug">
	m-page(:class="containerClass" @click-right="submit" :head-title="title" :right-text="t === 'show' ? '' : '提交'")
		.container
			.cell
				van-cell-group
					van-field(v-model="page.pcustomerName" label="客户名称" )
					van-field(v-model="page.mobileNo" label="客户电话" required)
					van-field(v-model="page.purposeType" readonly label="意向类型" required :right-icon="rightIcon" @click="() => { openSelect('purposeType') }")
					van-field(v-model="page.certificatesType" readonly placeholder="请选择"  label="证件类型" required :right-icon="rightIcon" @click="() => { openSelect('certificatesType') }")
					van-field(v-model="page.certificateNo" placeholder="请输入" label="证件号码" required)
					van-field(v-model="page.issuingOrg" placeholder="请输入" label="证件签发机关" required)
					m-time-select(v-model="page.effective" placeholder="请选择" label="证件有效期" date-type="date" required :is-current-date="false" :right-icon="rightIcon" @date-confirm="")

			.cell
				van-cell-group
					van-field(v-model="page.linkmanName" placeholder="请输入" label="联系人" required)
					van-field(v-model="page.linkmanMobile" placeholder="请输入" label="联系电话" required)
					van-field(v-model="page.areaName" readonly placeholder="请选择" label="所在地区" required :right-icon="rightIcon" @click="() => { openSelect('area') }")
					van-field(v-model="page.address" placeholder="请输入" label="详细地址" required)
			.cell
				van-cell-group
					m-time-select(v-model="page.contractDate" placeholder="请选择" label="签约日期" :right-icon="rightIcon" required :is-current-date="true")
					m-time-select(v-model="page.commitmentDate" placeholder="请选择" label="承诺交车日期" :right-icon="rightIcon" required)
					van-field(v-model="page.distribution" readonly placeholder="请选择" label="是否分网销" required :right-icon="rightIcon" @click="() => { openSelect('distribution') }")
			.cell
				van-cell-group
					van-field(v-model="page.buyType" readonly placeholder="请选择" label="购车类型" required :right-icon="rightIcon" @click="() => { openSelect('buyType') }")
					van-field(v-model="page.chassisNumber" placeholder="请输入" label="底盘号" required)
					van-field(v-model="page.paymentMethod" readonly placeholder="请选择" label="付款方式" required :right-icon="rightIcon" @click="() => { openSelect('paymentMethod') }")
					van-field(v-model="page.payment" placeholder="请输入" label="车款(元)" required)
					van-field(v-model="page.coupon" readonly placeholder="请添加" label="电子优惠券" right-icon="arrow" @click="() => { openSelect('coupon') }")
		van-action-sheet(
			v-model="select.selectShow"
			:actions="actionItems"
			@select="selectItem"
		)
			van-area(
				:area-list="_areaList"
				v-if="select.currentSelectType === 'area'"
				:value="page.areaId"
				@confirm="areaConfirm"
				@cancel="() => { select.selectShow = false }"
			)
			.coupon-container(v-if="select.currentSelectType === 'coupon'")
				.title 电子优惠券
				van-cell-group
					van-field(v-model="page.coupon" label="电子券券号" placeholder="请输入" required)
					van-field(label="验证码" placeholder="请输入" required)
				.buttons
					div(@click="verifyCoupon") 验证
</template>

<script>
	import moment from 'moment'
	import Vue from 'vue';
	import { Area } from 'vant';
	import areaList from '../../components/m-area-select/area.js';
	Vue.use(Area)
    export default {
        name: 'order-detail',
		props: ['orderId', 't', 'customerId'], // orderId: 订单ID 转订单时为-1 t: 编辑或者查看（经理只能查看） someId: 备用参数
		created() {
        	this._areaList = areaList
			console.log('enums', this.$store.state.enums)

			this.initPageData()
		},
		data() {
        	return {
				page: {
					pcustomerName: '',
					mobileNo: '',
					linkmanName: '',
					linkmanMobile: '',
					purposeType: '个人',
					distribution: '否', // 是否分网销
					certificatesType: '',
					certificateNo: '',// 证件号码
					issuingOrg: '', // 证件签发机关
					address: '', // 详细地址
					buyType: '', // 购车类型
					paymentMethod: '', // 付款方式
					county: '',
					city: '',
					province: '',
					effective: '', // 证件有效期
					coupon: '', // 优惠券
					contractDate: '',
					commitmentDate: '',
					chassisNumber: '', // 底盘号
					payment: '' // 车款
				},
				select: {
					selectShow: false, // 控制上弹选项的显示隐藏
					currentSelectType: '', // 当前选择的是哪种上弹类型
					items: {
						certificatesType: [
							{ name: '居民身份证' },
							{ name: '护照' },
							{ name: '军官证' }
						],
						purposeType: [
							{ name: '个人' },
							{ name: '单位' }
						],
						distribution: [
							{ name: '是' },
							{ name: '否' }
						],
						buyType: [
							{ name: '现车' },
							{ name: '订车' }
						],
						paymentMethod: [
							{ name: '全款' },
							{ name: '按揭' }
						]
					}
				}
			}
		},
		computed: {
        	containerClass() {
        		return {
        			'order-detail': true,
					'trans-back': this.select.currentSelectType === 'coupon' // 当选择优惠券时action-sheet背景透明
				}
			},
			rightIcon() {
				return this.t === 'show' ? '' : 'arrow'
			},
			disabled() {
        		return this.t === 'show'
			},
        	title() {
        		if (this.orderId === '-1') {
        			return '转订单'
				} else {
        			if (this.t === 'edit') {
        				return '订单修改'
					} else {
        				return '订单详情'
					}
        		}
        	},
			actionItems() {
				return this.select.items[this.select.currentSelectType]
			},
			customerApi() {
				return this.$api.clueCustomer
			},
			orderApi() {
        		return this.$api.order
			}
		},
		methods: {
        	initPageData() {
        		let api = null
				let id
				// 初始化数据
				if (this.orderId === '-1') { // 转订单
					api = this.customerApi
					id = this.customerId
				} else { // 订单查看编辑
					// 根据orderId查询对应的数据，更新page的信息
					api = this.orderApi
					id = this.orderId
				}
				api.get(id).then((data) => {
					console.log('data', data)
					this.page = Object.assign({}, this.page, data)
				})
			},
			/* 类型选择-start */
			openSelect(type) {
				this.select.currentSelectType = type
				this.select.selectShow = true;
			},
			selectItem(item) { // 选择车型
				this.select.selectShow = false;
				this.page[this.select.currentSelectType] = item.name;
			},
			/* 类型选择-end */
			areaConfirm(data) { // 地区选择确认
				let areaName = ''
				for (let item of data) {
					areaName += `${item.name} `
				}
				this.page.areaName = areaName;
				this.page.county = data[data.length - 1].code
				this.page.city = data[1].code
				this.page.province = data[0].code
				this.select.selectShow = false
			},
			verifyCoupon() { // 验证优惠券
				this.select.selectShow = false;
			},
			submit() {
				if (this.orderId === '-1') {
					this.orderApi.save(this.page).then((data) => {
						console.log('data', data)
					}).catch((error) => {
						this.$dialog.alert({
							message: error.message || '操作失败'
						})
					})
				} else {

				}
			}
		}
    }
</script>

<style lang="scss" scoped>
	$company-blue: #1B40D6;
	.container {
		position: absolute;
		top: 46px;
		bottom: 0;
		width: 100%;
		overflow: scroll;
		background-color: #efeff4;
		.cell {
			margin-bottom: 10px;
			&:last-child {
				margin-bottom: 0;
			}
		}
	}
	.coupon-container {
		background-color: rgba(255,255,255,0.82);
		.title {
			height: 44px;
			line-height: 44px;
			text-align: center;
			background-color: rgba(255,255,255,0.82);
		}
		.buttons {
			> div {
				line-height: 50px;
				height: 50px;
				text-align: center;
				// margin-top: 10px;
				// border-radius: 6px;
				color: #fff;
				background-color: $company-blue;
			}
		}
	}
</style>

<style>
	.order-detail .van-cell {
		font-size: 16px;
		font-weight: 600;
		color: #333;
		line-height: 30px;
	}
	.order-detail .van-cell:not(:last-child) {
		border-bottom: 1px solid rgba(0,0,0,0.1);
	}
	.order-detail .van-hairline--top-bottom::after {
		display: none;
	}
	.order-detail .van-cell::after {
		display: none;
	}
	.order-detail .container .cell .van-cell__title {
		width: 110px;
	}
	.order-detail .coupon-container .van-cell__title {
		width: 110px;
	}
	.order-detail.trans-back .van-action-sheet {
		background-color: transparent;
	}
</style>
