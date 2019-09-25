<template lang="pug">
	m-page(:head-title="title" :right-text="(orderId !== '-1' && t === 'show') ? '' : '提交'").order-detail
		.container
			.cell
				van-cell-group
					van-field(readonly label="客户名称" )
					van-field(readonly label="客户电话" required)
					van-field(readonly label="意向类型" required)
					van-field(readonly label="证件类型" required)
					van-field(placeholder="请输入" label="证件号码" required)
					van-field(placeholder="请输入" label="证件签发机关" required)
					van-field(v-model="availableTimeStr" placeholder="请选择" label="证件有效期" :right-icon="rightIcon" required @click-right-icon="() => {showPopup('availableTime')}")
			.cell
				van-cell-group
					van-field(placeholder="请输入" label="联系人" required)
					van-field(placeholder="请输入" label="联系电话" required)
					van-field(readonly placeholder="请选择" label="所在地区" required :right-icon="rightIcon")
					van-field(placeholder="请输入" label="详细地址" required)
			.cell
				van-cell-group
					van-field(v-model="signTimeStr" placeholder="请选择" label="签约日期" :right-icon="rightIcon" required @click-right-icon="() => {showPopup('signTime')}")
					van-field(v-model="deliveryTimeStr" placeholder="请选择" label="承诺交车日期" :right-icon="rightIcon" required @click-right-icon="() => {showPopup('deliveryTime')}")
					van-field(readonly placeholder="请选择" label="是否分网销" required :right-icon="rightIcon")
			.cell
				van-cell-group
					van-field(readonly placeholder="请选择" label="购车类型" required :right-icon="rightIcon")
					van-field(placeholder="请输入" label="底盘号" required)
					van-field(readonly placeholder="请选择" label="付款方式" required :right-icon="rightIcon")
					van-field(placeholder="请输入" label="车款(元)" required)
					van-field(readonly placeholder="请添加" label="电子优惠券" required :right-icon="rightIcon")



		van-popup(
			v-model="show"
			position="bottom"
		)
			van-datetime-picker(
				v-model="popupTimeSelect"
				type="date"
				@confirm="dateConfirm"
				@cancel="dateCancel"
			)
</template>

<script>
    export default {
        name: 'order-detail',
		props: ['orderId', 't', 'someId'], // orderId: 订单ID 转订单时为-1 t: 编辑或者查看（经理只能查看） someId: 备用参数
		data() {
        	return {
				currentOperateTimeType: '', // 判断是证件有效期 签约日期 承诺交车日期
				popupTimeSelect: new Date(),
				show: false, // 控制时间选择的显示隐藏
				selectShow: false, // 控制上弹选项的显示隐藏
				currentSelectType: '', // 当前选择的是哪种上弹类型
				availableTime: null,
				signTime: new Date(), // 签约日期 默认当天
				deliveryTime: null // 交车日期

			}
		},
		computed: {
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
			availableTimeStr() { // 有效日期字符串
				return this.timeFormat({
					date: this.availableTime,
					value: ''
				})
			},
			signTimeStr() { // 签约日期字符串
				return this.timeFormat({
					date: this.signTime,
					value: ''
				})
			},
			deliveryTimeStr() { // 交车日期字符串
				return this.timeFormat({
					date: this.deliveryTime,
					value: ''
				})
			}
		},
		methods: {
			showPopup(type) { // 显示时间选择框
				this.currentOperateTimeType = type;
				this.popupTimeSelect = this[type];
				this.show = true;
			},
			dateConfirm(value) { // 确认时间选择
				switch (this.currentOperateTimeType) {
					case 'availableTime':
						this.availableTime = value;
						break;
					case 'signTime':
						this.signTime = value;
						break;
					case 'deliveryTime':
						this.deliveryTime = value;
						break;
					default:
						break;
				}
				this.show = false;
			},
			dateCancel() { // 取消时间选择
				this.show = false;
			},
			timeFormat({date, value}) { // Date转str
				if ((this.orderId !== '-1' && this.t === 'show')) { // 判断是编辑页还是详情页
					return value;
				} else {
					if (date !== null) {
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
					} else {
						return '';
					}
				}
			},
			numberFormat(number) {
				return number < 10 ? `0${number}` : number;
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
	.order-detail .van-cell {
		font-size: 14px;
	}
	.order-detail .container .cell .van-cell__title {
		width: 100px;
	}
</style>
