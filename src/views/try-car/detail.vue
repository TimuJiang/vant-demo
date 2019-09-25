<template lang="pug">
	m-page(:head-title="title").try-car-detail
		.container(:class="{ noButton: this.routeType === 'show' }")
			.cell
				van-cell-group
					van-field(v-model="name" readonly label="客户名称" required)
					van-field(v-model="phone" readonly label="客户电话" required :right-icon="rightIcon" @click-right-icon="toBeContinued")
					van-field(v-model="car" readonly label="车牌车型号" placeholder="请选择" required :right-icon="rightIcon" @click-right-icon="() => { openSelect('car') }")
					van-field(v-model="tryTimeStr" readonly label="试驾时间" required :right-icon="rightIcon" @click-right-icon="() => {showPopup('tryTime')} ")
			.cell
				van-cell-group
					van-field(v-model="hasUploaded" readonly label="身份证照片" placeholder="请上传" required right-icon="arrow"  @click-right-icon="() => { goToUpload('id') }")
					van-field(v-model="id" label="身份证号" placeholder="请输入" required)
					van-field(v-model="sex" readonly label="性别")
					van-field(v-model="birth" readonly label="出生日期")
					van-field(v-model="address" label="住址" placeholder="请输入" required)
			.cell
				van-cell-group
					van-field(v-model="hasUploaded" readonly label="驾照照片" placeholder="请上传" required right-icon="arrow"  @click-right-icon="() => { goToUpload('dl') }")
					van-field(v-model="startTimeStr" readonly label="生效日期" placeholder="请选择" required :right-icon="rightIcon"  @click-right-icon="() => {showPopup('startTime')} ")
					van-field(v-model="endTimeStr" readonly label="截止日期" placeholder="请选择" required :right-icon="rightIcon"  @click-right-icon="() => {showPopup('endTime')} ")
			.cell
				van-cell-group
					van-field(v-model="protocol" readonly label="试驾协议" required right-icon="arrow"  @click-right-icon="toBeContinued")
					van-field(v-model="people" readonly label="试驾人员" placeholder="请选择" required :right-icon="rightIcon"  @click-right-icon="() => { openSelect('people') }")
		.bottom-button(v-if="this.routeType !== 'show'" @click="doTryCar") 立即试驾
		van-popup(
			v-model="show"
			position="bottom"
		)
			van-datetime-picker(
				v-model="popupTimeSelect"
				:type="timeSelectType"
				@confirm="dateConfirm"
				@cancel="dateCancel"
			)
		van-action-sheet(
			v-model="selectShow"
			:actions="actionItems"
			@select="selectItem"
		)

</template>

<script>
	import { Dialog } from 'vant';
	export default {
		name: 'detail',
		data() {
			return {
				name: '胡歌',
				phone: '123456',
				car: '',
				id: '',
				sex: '男',
				birth: '1988-12',
				address: '',
				protocol: '已上传', // 试驾协议
				people: '', // 试驾人员

				currentOperateTimeType: '',
				popupTimeSelect: new Date(),
				tryTimeHistory: new Date(), // 选择时间确认之后的值
				startTimeHistory: new Date(),
				endTimeHistory: new Date(),
				show: false,
				selectShow: false,
				currentSelectType: ''
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
				console.log(this.detailId)
				return this.routeType === 'show' ? '试乘试驾详情' : '确认试乘试驾';
			},
			rightIcon() {
				return this.routeType !== 'show' ? 'arrow' : ''
			},
			tryTimeStr() { // 试驾时间
				return this.timeFormat({
					type: 'datetime',
					date: this.tryTimeHistory,
					routeType: this.routeType,
					value: '2019-09-23 14:15'
				});
			},
			startTimeStr() { // 生效日期
				return this.timeFormat({
					type: 'date',
					date: this.startTimeHistory,
					routeType: this.routeType,
					value: '2012-12'
				});
			},
			endTimeStr() { // 截止日期
				return this.timeFormat({
					type: 'date',
					date: this.endTimeHistory,
					routeType: this.routeType,
					value: '2022-12'
				});
			},
			hasUploaded() {
				return this.routeType === 'show' ? '已上传' : ''
			},
			timeSelectType() {
				if (this.currentOperateTimeType === 'tryTime') {
					return 'datetime';
				} else {
					return 'date';
				}
			},
			actionItems() {
				if (this.currentSelectType === 'car') {
					return [
						{ name: '博越' },
						{ name: '星越' },
						{ name: '缤越' }
					]
				} else {
					return [
						{ name: '胡彦祖' },
						{ name: '吴彦兵' },
						{ name: '胡京' }
					]
				}
			}
		},
		methods: {
			goToUpload(type) {
				this.$router.push(`/upload/${type}/operateType/${this.routeType}/detailId/${this.detailId}`);
			},
			showPopup(type) { // 显示时间选择框
				this.currentOperateTimeType = type;
				switch (type) {
					case 'tryTime':
						this.popupTimeSelect = this.tryTimeHistory;
						break;
					case 'startTime':
						this.popupTimeSelect = this.startTimeHistory;
						break;
					case 'endTime':
						this.popupTimeSelect = this.endTimeHistory;
						break;
					default:
						break;
				}
				this.show = true;
			},
			toBeContinued() {
				Dialog.alert({
					message: '→ To Be Continued...'
				})
			},
			dateConfirm(value) { // 确认时间选择
				switch (this.currentOperateTimeType) {
					case 'tryTime':
						this.tryTimeHistory = value;
						break;
					case 'startTime':
						this.startTimeHistory = value;
						break;
					case 'endTime':
						this.endTimeHistory = value;
						break;
					default:
						break;
				}
				this.show = false;
			},
			dateCancel() { // 取消时间选择
				this.show = false;
			},
			timeFormat({type, date, routeType, value}) { // Date转str
				if (routeType === 'show') { // 判断是编辑页还是详情页
					return value;
				} else {
					if (date !== null) {
						let str = '';
						let dateObj = {
							year: date.getFullYear(),
							month: date.getMonth() + 1,
							day: date.getDate(),
							hour: date.getHours(),
							minute: date.getMinutes()
						};
						const { year, month, day, hour, minute } = dateObj;
						const monthFormat = this.numberFormat(month);
						const dayFormat = this.numberFormat(day);
						const hourFormat = this.numberFormat(hour);
						const minuteFormat = this.numberFormat(minute);
						if (type === 'date') {
							str = `${year}-${monthFormat}-${dayFormat}`;
						} else {
							str = `${year}-${monthFormat}-${dayFormat} ${hourFormat}:${minuteFormat}`
						}
						return str
					} else {
						return '';
					}
				}
			},
			numberFormat(number) {
				return number < 10 ? `0${number}` : number;
			},
			openSelect(type) {
				this.currentSelectType = type
				this.selectShow = true;
			},
			selectItem(item) { // 选择车型
				this.selectShow = false;
				this[this.currentSelectType] = item.name;
			},
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
