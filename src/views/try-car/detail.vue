<template lang="pug">
	m-page(:head-title="title").try-car-detail
		.container(:class="{ noButton: routeType === 'show' }")
			.cell
				van-cell-group
					van-field(v-model="page.name" readonly label="客户名称" required)
					van-field(v-model="page.phone" readonly label="客户电话" required :right-icon="rightIcon" @click-right-icon="toBeContinued")
					van-field(v-model="page.car" readonly label="车牌车型号" placeholder="请选择" required :right-icon="rightIcon" @click-right-icon="() => { openSelect('car') }")
					m-time-select(v-model="page.tryTime" label="试驾时间" :is-current-date="routeType !== 'show'" date-type="datetime" required :right-icon="rightIcon")
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
					m-time-select(v-model="page.startTime" label="生效日期" placeholder="请选择" required :right-icon="rightIcon")
					m-time-select(v-model="page.endTime" label="截止日期" placeholder="请选择" required :right-icon="rightIcon")
			.cell
				van-cell-group
					van-field(v-model="page.protocol" readonly label="试驾协议" required right-icon="arrow"  @click-right-icon="toBeContinued")
					van-field(v-model="page.people" readonly label="试驾人员" placeholder="请选择" required :right-icon="rightIcon"  @click-right-icon="() => { openSelect('people') }")
		.bottom-button(v-if="routeType !== 'show'" @click="doTryCar") 立即试驾
		van-action-sheet(
			v-model="select.selectShow"
			:actions="actionItems"
			@select="selectItem"
		)

</template>

<script>
	import { Dialog } from 'vant';
	export default {
		name: 'detail',
		created() {
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
			&:last-child {
				margin-bottom: 0;
			}
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
		font-size: 16px;
		font-weight: 600;
		color: #333;
		line-height: 30px;
	}
	.try-car-detail .van-cell:not(:last-child) {
		border-bottom: 1px solid rgba(0,0,0,0.1);
	}
	.try-car-detail .van-hairline--top-bottom::after {
		display: none;
	}
	.try-car-detail .van-cell::after {
		display: none;
	}
	.try-car-detail .container .cell .van-cell__title {
		width: 110px;
	}
</style>
