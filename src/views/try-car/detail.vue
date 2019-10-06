<template lang="pug">
	m-page(:head-title="title").try-car-detail
		.container(:class="{ noButton: routeType === noEdit }")
			.cell
				van-cell-group
					van-field(v-model="page.pcustomerName" label="客户名称" required)
					van-field(v-model="page.mobileNo" label="客户电话" required)
					van-field(v-model="page.realSeries" readonly label="试驾车系" placeholder="请选择" required :right-icon="rightIcon" @click="() => { openSelect('realSeries') }")
					van-field(v-model="page.realModel" readonly label="试驾车型" placeholder="请选择" required :right-icon="rightIcon" @click="() => { openSelect('realModel') }")
					m-time-select(v-model="page.driveDate" label="试驾时间" date-type="datetime" required :right-icon="rightIcon")
			.cell
				van-cell-group
					m-img-upload(type="id" :operation="uploadOperation" ids="" title="身份证" label="身份证照片" @do-upload="(data) => { afterUpload('id', data) }")
					van-field(v-model="page.driverCertificateNo" label="身份证号" placeholder="请输入" required)
					van-field(v-model="page.sex" readonly label="性别")
					van-field(v-model="page.driverBirthday" readonly label="出生日期")
					van-field(v-model="page.driverAddr" label="住址" placeholder="请输入" required)
			.cell
				van-cell-group
					m-img-upload(type="dl" :operation="uploadOperation" ids="" title="驾照" label="驾照照片" @do-upload="(data) => { afterUpload('dl', data) }")
					m-time-select(v-model="page.driverLicenseEffective" label="生效日期" placeholder="请选择" required :right-icon="rightIcon")
					m-time-select(v-model="page.driverLicenseInvalid" label="截止日期" placeholder="请选择" required :right-icon="rightIcon")
			.cell
				van-cell-group
					m-img-upload(type="dp" :is-multiple="true" :operation="uploadOperation" ids="" title="驾驶协议" label="驾驶协议" @do-upload="(data) => { afterUpload('dp', data) }")
					van-field(v-model="page.driverName" readonly label="试驾人员" placeholder="请选择" required :right-icon="rightIcon"  @click="() => { openSelect('driverName') }")
		.bottom-button(v-if="routeType !== noEdit" @click="doTryCar") {{routeType === 'TEST_DRIVE' ? '立即试驾' : '结束试驾'}}
		van-action-sheet(
			v-model="select.selectShow"
			:actions="actionItems"
			@select="selectItem"
		)
</template>

<script>
	import { Dialog } from 'vant'
	export default {
		name: 'detail',
		created() {
		},
		data() {
			return {
				noEdit: 'FINISH',
				page: {
					pcustomerName: '胡歌',
					mobileNo: '123456',
					realSeries: '',
					realModel: '',
					driverCertificateNo: '',
					sex: '男',
					driverBirthday: '1988-12',
					driverAddr: '',
					protocol: '', // 试驾协议
					driverName: '', // 试驾人员
					driveDate: '',
					driverLicenseEffective: '',
					driverLicenseInvalid: ''
				},
				select: {
					selectShow: false,
					currentSelectType: '',
					items: {
						realSeries: [
							{ name: 'g' },
							{ name: 'l' }
						],
						realModel: [
							{ name: '博越' },
							{ name: '星越' },
							{ name: '缤越' }
						],
						driverName: [
							{ name: '胡彦祖' },
							{ name: '吴彦兵' },
							{ name: '胡京' }
						]
					}
				},
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
			uploadOperation() {
				return this.routeType === this.noEdit ? 'show' : 'edit'
			},
			title() {
				// console.log(this.detailId)
				return this.routeType === this.noEdit ? '试乘试驾详情' : '确认试乘试驾';
			},
			rightIcon() {
				return this.routeType !== this.noEdit ? 'arrow' : ''
			},
			actionItems() {
				return this.select.items[this.select.currentSelectType];
			}
		},
		methods: {
			afterUpload(type, data) {
				console.log(type, data)
			},
			renderUploadParam(type) {
				return {
					uploadType: type,
					operationType: this.routeType === this.noEdit ? 'show' : 'edit'
				}
			},
			goToUpload(type) {
				this.$router.push(`/upload/${type}/operateType/${this.routeType === this.noEdit ? 'show' : 'edit'}/fromRoute/tryCar`);
			},
			toBeContinued() {
				Dialog.alert({
					message: '→ To Be Continued...'
				})
			},
			/* 类型选择-start */
			openSelect(type) {
				if (type === 'realModel' && this.page.realSeries === '') {
					this.$dialog.alert({
						message: '请先选择车系'
					})
					return false;
				}
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
