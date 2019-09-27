<template lang="pug">
	.m-time-select
		van-field(v-model="value" label-width="110" readonly :placeholder="placeholder" :label="label" :right-icon="rightIcon" :required="required" @click="showPopUp")
		van-popup(
			v-model="show"
			position="bottom"
		)
			van-datetime-picker(
				v-model="popupTimeSelect"
				:type="dateType"
				@confirm="dateConfirm"
				@cancel="dateCancel"
		)
</template>

<script>
	import moment from 'moment'
    export default {
        name: 'm-time-select',
		created() {
        	this.initDateValue();
		},
		model: {
			prop: 'valueFromParent',
			event: 'changeParentValue'
		},
		props: {
        	placeholder: {
        		default: '请选择'
			},
			label: String,
			rightIcon: {
        		default: 'arrow'
			},
			valueFromParent: String,
			isCurrentDate: { // 是否默认展示当前日期
        		default: false
			},
			dateType: { // 日期格式（默认年月日）
        		default: 'date'
			},
			required: {
        		default: false
			}
		},
		data() {
        	return {
				timeFormatRule: {
					datetime: 'YYYY-MM-DD HH:mm',
					date: 'YYYY-MM-DD'
				},
        		value: '',
				show: false,
				popupTimeSelect: null
			}
		},
		computed: {
			rule() {
				return this.timeFormatRule[this.dateType];
			}
		},
		methods: {
        	initDateValue() { // 初始化默认时间
				let initDateValue = '';
				if (this.isCurrentDate) {
					initDateValue = this.getCurrentDateStr(this.rule)
				} else {
					initDateValue = this.valueFromParent;
				}
				this.value = initDateValue;
			},
			updateModel(value) {
				this.$emit('changeParentValue', value)
			},
			showPopUp() {
        		this.popupTimeSelect = this.timeFormat(this.value, this.rule);
        		this.show = true;
			},
			dateConfirm(value) { // 确认时间选择
				this.value = this.timeFormat(value, this.timeFormatRule[this.dateType]);
				this.updateModel(this.value) // 每次确认选择时间之后就同步更新父组件v-model绑定的值
				this.show = false;

				// 父组件可以绑定date-confirm事件，默认传入当前选择的时间字符串
				this.$emit('date-confirm', this.value);
			},
			dateCancel() { // 取消时间选择
				this.show = false;
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
			getCurrentDateStr(rule) { // 获取当前日期字符串，同时更新父组件v-model绑定的值
				let value = moment(new Date()).format(rule)
				this.updateModel(value);
				return value;
			},
		}
    }
</script>

<style lang="scss" scoped>
	.m-time-select .van-cell {
		font-size: 16px;
		font-weight: 600;
		color: #333;
		line-height: 30px;
	}
</style>
