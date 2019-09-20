<template lang="pug">
	m-page(:head-title="title").try-car-detail
		.container
			.cell
				van-cell-group
					van-field(v-model="name" readonly label="客户名称" required)
					van-field(v-model="phone" readonly label="客户电话" required right-icon="arrow" @click-right-icon="toBeContinued")
					van-field(readonly label="车牌车型号" placeholder="请选择" required right-icon="arrow"  @click-right-icon="toBeContinued")
					van-field(v-model="tryTimeStr" readonly label="试驾时间" required right-icon="arrow" @click-right-icon="showPopup")
			.cell
				van-cell-group
					van-field(readonly label="身份证照片" placeholder="请上传" required right-icon="arrow"  @click-right-icon="toBeContinued")
					van-field(v-model="id" label="身份证号" placeholder="请输入" required)
					van-field(v-model="sex" readonly label="性别")
					van-field(v-model="birth" readonly label="出生日期")
					van-field(v-model="address" label="住址" placeholder="请输入" required)
			.cell
				van-cell-group
					van-field(readonly label="驾照照片" placeholder="请上传" required right-icon="arrow"  @click-right-icon="toBeContinued")
					van-field(v-model="startTime" readonly label="生效日期" placeholder="请选择" required right-icon="arrow"  @click-right-icon="toBeContinued")
					van-field(v-model="endTime" readonly label="截止日期" placeholder="请选择" required right-icon="arrow"  @click-right-icon="toBeContinued")
			.cell
				van-cell-group
					van-field(v-model="protocol" readonly label="试驾协议" required right-icon="arrow"  @click-right-icon="toBeContinued")
					van-field(v-model="people" readonly label="试驾人员" placeholder="请选择" required right-icon="arrow"  @click-right-icon="toBeContinued")
		.bottom-button 立即试驾
		van-popup(
			v-model="show"
			position="bottom"
		)
			van-datetime-picker(
			v-model="popupTimeSelect"
			type="datetime"
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
				id: '',
				sex: '男',
				birth: '1988-12',
				address: '',
				startTime: '', // 生效日期
				endTime: '', // 截止日期
				protocol: '已上传', // 试驾协议
				people: '', // 试驾人员

				currentOperateTimeType: '',
				popupTimeSelect: new Date(),
				tryTimeSelect: new Date(),
				tryTimeHistory: new Date(),
				show: false
			}
		},
		props: {
			routeType: {
				default: ''
			}
		},
		computed: {
        	title() {
        		return this.routeType === 'show' ? '试乘试驾详情' : '确认试乘试驾';
			},
			tryTimeStr() {
        		return '2019-09-20 12:34';
			}
		},
		methods: {
			showPopup() {
				this.show = true;
			},
			toBeContinued() {
				Dialog.alert({
					message: '→ To Be Continued...'
				})
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
