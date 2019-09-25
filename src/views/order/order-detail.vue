<template lang="pug">
	m-page(:head-title="title" :right-text="(orderId !== '-1' && t === 'show') ? '' : '提交'").order-detail
		.container
			.cell
				van-cell-group
					van-field(v-model="page.name" readonly label="客户名称" )
					van-field(v-model="page.phone" readonly label="客户电话" required)
					van-field(v-model="page.willing" readonly label="意向类型" required)
					van-field(readonly placeholder="请选择"  label="证件类型" required :right-icon="rightIcon")
					van-field(placeholder="请输入" label="证件号码" required)
					van-field(placeholder="请输入" label="证件签发机关" required)
					van-field(v-model="page.availableTime" placeholder="请选择" label="证件有效期" :right-icon="rightIcon" required @click-right-icon="() => {showPopup('availableTime')}")
			.cell
				van-cell-group
					van-field(placeholder="请输入" label="联系人" required)
					van-field(placeholder="请输入" label="联系电话" required)
					van-field(readonly placeholder="请选择" label="所在地区" required :right-icon="rightIcon")
					van-field(placeholder="请输入" label="详细地址" required)
			.cell
				van-cell-group
					van-field(v-model="page.signTime" placeholder="请选择" label="签约日期" :right-icon="rightIcon" required @click-right-icon="() => {showPopup('signTime')}")
					van-field(v-model="page.deliveryTime" placeholder="请选择" label="承诺交车日期" :right-icon="rightIcon" required @click-right-icon="() => {showPopup('deliveryTime')}")
					van-field(readonly placeholder="请选择" label="是否分网销" required :right-icon="rightIcon")
			.cell
				van-cell-group
					van-field(readonly placeholder="请选择" label="购车类型" required :right-icon="rightIcon")
					van-field(placeholder="请输入" label="底盘号" required)
					van-field(readonly placeholder="请选择" label="付款方式" required :right-icon="rightIcon")
					van-field(placeholder="请输入" label="车款(元)" required)
					van-field(readonly placeholder="请添加" label="电子优惠券" required :right-icon="rightIcon")



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
</template>

<script>
	import moment from 'moment'
    export default {
        name: 'order-detail',
		props: ['orderId', 't', 'someId'], // orderId: 订单ID 转订单时为-1 t: 编辑或者查看（经理只能查看） someId: 备用参数
		created() {
			this.setDefaultTime();
		},
		data() {
        	return {
				page: {
					name: '吴彦祖',
					phone: '18888888888',
					willing: '博越',
					credentialType: '',
					availableTime: '',
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
					popupTimeSelect: new Date(),
				},
				select: {
					selectShow: false, // 控制上弹选项的显示隐藏
					currentSelectType: '', // 当前选择的是哪种上弹类型
					items: {
						credentialType: [
							{ name: '博越' },
							{ name: '星越' },
							{ name: '缤越' }
						],
						people: [
							{ name: '胡彦祖' },
							{ name: '吴彦兵' },
							{ name: '胡京' }
						]
					}
				}
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
