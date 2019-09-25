<template lang="pug">
	m-page(:head-title="title").try-car-detail
		.container(:class="{ noButton: routeType === 'show' }")
			.cell
				van-cell-group
					van-field(v-model="page.name" readonly label="客户名称" required)
					van-field(v-model="page.phone" readonly label="客户电话" required :right-icon="rightIcon" @click-right-icon="toBeContinued")
					van-field(v-model="page.car" readonly label="车牌车型号" placeholder="请选择" required :right-icon="rightIcon" @click-right-icon="() => { openSelect('car') }")
					van-field(v-model="page.tryTime" readonly label="试驾时间" required :right-icon="rightIcon" @click-right-icon="() => {showPopup('tryTime')} ")
			.cell
				van-cell-group
					van-field(v-model="hasUploaded" readonly label="身份证照片" placeholder="请上传" required right-icon="arrow"  @click-right-icon="() => { goToUpload('id') }")
					van-field(v-model="page.id" label="身份证号" placeholder="请输入" required)
					van-field(v-model="page.sex" readonly label="性别")
					van-field(v-model="page.birth" readonly label="出生日期")
					van-field(v-model="page.address" label="住址" placeholder="请输入" required)
			.cell
				van-cell-group
					van-field(v-model="hasUploaded" readonly label="驾照照片" placeholder="请上传" required right-icon="arrow"  @click-right-icon="() => { goToUpload('dl') }")
					van-field(v-model="page.startTime" readonly label="生效日期" placeholder="请选择" required :right-icon="rightIcon"  @click-right-icon="() => {showPopup('startTime')} ")
					van-field(v-model="page.endTime" readonly label="截止日期" placeholder="请选择" required :right-icon="rightIcon"  @click-right-icon="() => {showPopup('endTime')} ")
			.cell
				van-cell-group
					van-field(v-model="page.protocol" readonly label="试驾协议" required right-icon="arrow"  @click-right-icon="toBeContinued")
					van-field(v-model="page.people" readonly label="试驾人员" placeholder="请选择" required :right-icon="rightIcon"  @click-right-icon="() => { openSelect('people') }")
		.bottom-button(v-if="routeType !== 'show'" @click="doTryCar") 立即试驾
		van-popup(
			v-model="date.show"
			position="bottom"
		)
			van-datetime-picker(
				v-model="date.popupTimeSelect"
				:type="timeSelectType"
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
	import { Dialog } from 'vant';
	import moment from 'moment'
	export default {
		name: 'detail',
		created() {
			this.setDefaultTime();
		},
		data() {
			return {
				page: {
					name: '胡歌',
					phone: '123456',
					car: '',
					id: '',
					sex: '男',
					birth: '1988-12',
					address: '',
					protocol: '已上传', // 试驾协议
					people: '', // 试驾人员
					tryTime: '',
					startTime: '',
					endTime: ''
				},
				date: {
					timeFormatRule: {
						datetime: 'YYYY-MM-DD HH:mm',
						date: 'YYYY-MM-DD'
					},
					currentOperateTimeType: '',
					show: false,
					popupTimeSelect: new Date()
				},
				select: {
					selectShow: false,
					currentSelectType: '',
					items: {
						car: [
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
		props: {
			routeType: {
				default: ''
			},
			detailId: {
				default: ''
			}
		},
		computed: {
			title() {
				// console.log(this.detailId)
				return this.routeType === 'show' ? '试乘试驾详情' : '确认试乘试驾';
			},
			rightIcon() {
				return this.routeType !== 'show' ? 'arrow' : ''
			},
			hasUploaded() {
				return this.routeType === 'show' ? '已上传' : ''
			},
			actionItems() {
				return this.select.items[this.select.currentSelectType];
			},
			timeSelectType() {
				if (this.date.currentOperateTimeType === 'tryTime') {
					return 'datetime';
				} else {
					return 'date';
				}
			},
			rule() {
				return this.date.timeFormatRule[this.timeSelectType];
			}
		},
		methods: {
			goToUpload(type) {
				this.$router.push(`/upload/${type}/operateType/${this.routeType}/detailId/${this.detailId}`);
			},
			toBeContinued() {
				Dialog.alert({
					message: '→ To Be Continued...'
				})
			},
			/* 时间选择相关-start */
			showPopup(type) { // 显示时间选择框
				this.date.currentOperateTimeType = type;
				this.date.popupTimeSelect = this.timeFormat(this.page[type], this.rule);
				this.date.show = true;
			},
			dateConfirm(value) { // 确认时间选择
				this.page[this.date.currentOperateTimeType] = this.timeFormat(value, this.rule);
				this.dateCancel()
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
				this.page.tryTime = this.getCurrentDateStr(this.date.timeFormatRule.datetime); // 试驾时间默认为当天
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
			doTryCar() { // 立即试驾
				this.toBeContinued();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		position: absolute;
		top: 46px;
		bottom: 49px;
		width: 100%;
		overflow: scroll;
		background-color: #efeff4;
		.cell {
			margin-bottom: 10px;
		}
		&.noButton {
			bottom: 0
		}
	}
	.bottom-button {
		position: fixed;
		height: 49px;
		line-height: 49px;
		text-align: center;
		bottom: 0;
		background-color: #1B40D6;
		color: #fff;
		width: 100%;
	}
</style>

<style>
	.try-car-detail .van-cell {
		font-size: 14px;
	}
	.try-car-detail .container .cell .van-cell__title {
		width: 100px;
	}
</style>
