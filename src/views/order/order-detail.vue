<template lang="pug">
	m-page(:class="containerClass" @click-right="submit" :head-title="title" :right-text="(orderId !== '-1' && t === 'show') ? '' : '提交'")
		.container
			.cell
				van-cell-group
					van-field(v-model="page.name" readonly label="客户名称" )
					van-field(v-model="page.phone" readonly label="客户电话" required)
					van-field(v-model="page.willing" readonly label="意向类型" required :right-icon="rightIcon" @click-right-icon="() => { openSelect('willing') }")
					van-field(v-model="page.credentialType" readonly placeholder="请选择"  label="证件类型" required :right-icon="rightIcon" @click-right-icon="() => { openSelect('credentialType') }")
					van-field(placeholder="请输入" label="证件号码" required)
					van-field(placeholder="请输入" label="证件签发机关" required)
					van-field(v-model="page.availableTime" placeholder="请选择" label="证件有效期" :right-icon="rightIcon" required @click-right-icon="() => { showPopup('availableTime') }")
			.cell
				van-cell-group
					van-field(placeholder="请输入" label="联系人" required)
					van-field(placeholder="请输入" label="联系电话" required)
					van-field(v-model="page.area" readonly placeholder="请选择" label="所在地区" required :right-icon="rightIcon" @click-right-icon="() => { openSelect('area') }")
					van-field(placeholder="请输入" label="详细地址" required)
			.cell
				van-cell-group
					van-field(v-model="page.signTime" placeholder="请选择" label="签约日期" :right-icon="rightIcon" required @click-right-icon="() => {showPopup('signTime')}")
					van-field(v-model="page.deliveryTime" placeholder="请选择" label="承诺交车日期" :right-icon="rightIcon" required @click-right-icon="() => {showPopup('deliveryTime')}")
					van-field(v-model="page.isOnlineSale" readonly placeholder="请选择" label="是否分网销" required :right-icon="rightIcon" @click-right-icon="() => { openSelect('isOnlineSale') }")
			.cell
				van-cell-group
					van-field(v-model="page.buyType" readonly placeholder="请选择" label="购车类型" required :right-icon="rightIcon" @click-right-icon="() => { openSelect('buyType') }")
					van-field(placeholder="请输入" label="底盘号" required)
					van-field(v-model="page.payType" readonly placeholder="请选择" label="付款方式" required :right-icon="rightIcon" @click-right-icon="() => { openSelect('payType') }")
					van-field(placeholder="请输入" label="车款(元)" required)
					van-field(v-model="page.coupon" readonly placeholder="请添加" label="电子优惠券" right-icon="arrow" @click-right-icon="() => { openSelect('coupon') }")



		van-popup(
			v-model="date.show"
			position="bottom"
		)
			van-datetime-picker(
				v-model="date.popupTimeSelect"
				type="date"
				@confirm="dateConfirm"
				@cancel="dateCancel"
			)
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
	import areaList from '../../config/area.js';
	Vue.use(Area)
    export default {
        name: 'order-detail',
		props: ['orderId', 't', 'someId'], // orderId: 订单ID 转订单时为-1 t: 编辑或者查看（经理只能查看） someId: 备用参数
		created() {
        	this._areaList = areaList;

        	// 初始化数据
        	if (this.orderId === '-1') { // 转订单
				this.setDefaultTime();
			} else { // 订单查看编辑
        		// 根据orderId查询对应的数据，更新page的信息
			}

		},
		data() {
        	return {
				page: {
					name: '吴彦祖',
					phone: '18888888888',
					willing: '个人',
					isOnlineSale: '否', // 是否分网销
					credentialType: '',
					buyType: '', // 购车类型
					payType: '', // 付款方式
					area: '', // 省市区名称
					areaId: '', // 省市区code
					availableTime: '',
					coupon: '', // 优惠券
					signTime: '',
					deliveryTime: ''
				},
				date: {
					timeFormatRule: {
						datetime: 'YYYY-MM-DD HH:mm',
						date: 'YYYY-MM-DD'
					},
					currentOperateTimeType: '', // 判断是证件有效期 签约日期 承诺交车日期
					show: false, // 控制时间选择的显示隐藏
					popupTimeSelect: new Date()
				},
				select: {
					selectShow: false, // 控制上弹选项的显示隐藏
					currentSelectType: '', // 当前选择的是哪种上弹类型
					items: {
						credentialType: [
							{ name: '居民身份证' },
							{ name: '护照' },
							{ name: '军官证' }
						],
						willing: [
							{ name: '个人' },
							{ name: '单位' }
						],
						isOnlineSale: [
							{ name: '是' },
							{ name: '否' }
						],
						buyType: [
							{ name: '现车' },
							{ name: '订车' }
						],
						payType: [
							{ name: '全款' },
							{ name: '按揭' }
						],
						area: [],
						coupon: [],
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
				return (this.orderId !== '-1' && this.t === 'show') ? '' : 'arrow'
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
				return this.select.items[this.select.currentSelectType];
			},
			rule() {
				return this.date.timeFormatRule.date;
			}
		},
		methods: {
			/* 时间选择相关-start */
			showPopup(type) { // 显示时间选择框
				this.date.currentOperateTimeType = type;
				this.date.popupTimeSelect = this.timeFormat(this.page[type], this.rule);
				this.date.show = true;
			},
			dateConfirm(value) { // 确认时间选择
				this.page[this.date.currentOperateTimeType] = this.timeFormat(value, this.rule);
				this.dateCancel();
			},
			dateCancel() { // 取消时间选择
				this.date.show = false;
			},
			timeFormat(value, rule) {
				if (!value) { // 为空时日期选择弹出来没有默认时间，默认 是默认的最小时间2009年1月1日
					return null;
				} else {
					if (value instanceof Date) { // 如果传进来的是日期对象 根据rule（类似YYYY-MM-DD HH:mm:ss）将其转成
						return moment(value).format(rule);
					} else if (typeof value === 'string') { // 如果是字符串 则转成日期对象
						return new Date(moment(value, rule).valueOf());
					}
				}

			},
			getCurrentDateStr(rule) {
				return moment(new Date()).format(rule);
			},
			setDefaultTime() {
				this.page.signTime = this.getCurrentDateStr(this.rule); // 试驾时间默认为当天
			},
			/* 时间选择相关-end */

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
				let areaName = '';
				for (let item of data) {
					areaName += `${item.name} `
				}
				this.page.area = areaName;
				this.page.areaId = data[data.length - 1].code;
				this.select.selectShow = false;
			},
			verifyCoupon() { // 验证优惠券
				this.select.selectShow = false;
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
		font-size: 14px;
	}
	.order-detail .container .cell .van-cell__title {
		width: 100px;
	}
	.order-detail .coupon-container .van-cell__title {
		width: 100px;
	}
	.order-detail.trans-back .van-action-sheet {
		background-color: transparent;
	}
</style>
