<template lang="pug">
	m-page(:head-title="title").try-car-detail
		.container(:class="{ noButton: currentDriveStatus === noEdit || isManager }")
			.cell
				van-cell-group
					van-field(v-model="page.pCustomerName" label="客户名称" required :readonly="disabled")
					van-field(v-model="page.mobileNo" placeholder="请输入" label="客户电话" required :readonly="disabled")
					van-field(v-model="page.realSeriesName" readonly label="试驾车系" placeholder="请选择" required :right-icon="rightIcon" @click="disabled ? null : () => { openSelect('realSeriesName') }")
					van-field(v-model="page.realModelName" readonly label="试驾车型" placeholder="请选择" required :right-icon="rightIcon" @click="disabled ? null : () => { openSelect('realModelName') }")
					m-time-select(v-model="page.driveDate" :disabled="disabled" label="试驾时间" :is-current-date="true" date-type="datetime" required :right-icon="rightIcon")
			.cell
				van-cell-group
					m-img-upload(:value="uploadCertificateNoName"  type="id" :operation="uploadOperation" :ids="page.certificateNoIds" :paths="page.certificateNoPaths" title="身份证" label="身份证照片" @do-upload="(data) => { afterUpload('id', data) }")
					van-field(v-model="page.driverCertificateNo" label="身份证号" placeholder="请输入" required :readonly="disabled")
					van-field(v-model="page.sex" readonly label="性别")
					van-field(v-model="page.driverBirthday" readonly label="出生日期")
					van-field(v-model="page.driverAddr" label="住址" placeholder="请输入" required :readonly="disabled")
			.cell
				van-cell-group
					m-img-upload(:value="uploadDriverLicenseName" type="dl" :operation="uploadOperation" :ids="page.driverLicenseIds" :paths="page.driverLicensePaths" title="驾照" label="驾照照片" @do-upload="(data) => { afterUpload('dl', data) }")
					m-time-select(v-model="page.driverLicenseEffective" :disabled="disabled"  label="生效日期" placeholder="请选择" required :right-icon="rightIcon")
					m-time-select(v-model="page.driverLicenseInvalid" :disabled="disabled"   label="截止日期" placeholder="请选择" required :right-icon="rightIcon")
			.cell
				van-cell-group
					m-img-upload(:value="uploadAgreementName" type="dp" :is-multiple="true" :operation="uploadOperation" :ids="page.agreementIds" :paths="page.agreementPaths" title="驾驶协议" label="驾驶协议" @do-upload="(data) => { afterUpload('dp', data) }")
					van-field(v-model="page.driverName" readonly label="试驾人员" placeholder="请选择" required :right-icon="rightIcon"  @click="disabled ? null : () => { openSelect('driverName') }")
		.bottom-button(v-if="!(currentDriveStatus === noEdit  || isManager)" @click="doTryCar") {{currentDriveStatus === 'TEST_DRIVER' ? '立即试驾' : '结束试驾'}}
		van-action-sheet(
			v-model="select.selectShow"
			:actions="actionItems"
			@select="selectItem"
		)
		m-loading(:show="loading")
</template>

<script>
	import { Dialog } from 'vant'
	export default {
		name: 'detail',
		created() {
			this.initPageData()
		},
		data() {
			return {
				noEdit: 'FINISH',
				loading: false,
				currentDriveStatus: '',
				page: {
					pCustomerName: '',
					mobileNo: '',
					realSeries: '',
					realModel: '',
					realSeriesName: '',
					realModelName: '',
					driverCertificateNo: '',
					sex: '男',
					driverBirthday: '',
					driverAddr: '',
					protocol: '', // 试驾协议
					driverName: '', // 试驾人员
					driveDate: '',
					driverLicenseEffective: '',
					driverLicenseInvalid: '',
					uploadAgreement: '0',
					uploadCertificateNo: '0',
					uploadDriverLicense: '0'
				},
				select: {
					selectShow: false,
					currentSelectType: '',
					items: {
						realSeriesName: [
							{ name: 'g' },
							{ name: 'l' }
						],
						realModelName: [
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
			detailId: {
				default: ''
			}
		},
		computed: {
			isManager() {
				console.log('this.$store.getters.isManager', this.$store.getters.isManager)
				return this.$store.getters.isManager
			},
			uploadAgreementName() {
				if (this.page.uploadAgreement === '1') {
					return '已上传'
				}
				return ''
			},
			uploadCertificateNoName() {
				if (this.page.uploadCertificateNo === '1') {
					return '已上传'
				}
				return ''
			},
			uploadDriverLicenseName() {
				if (this.page.uploadDriverLicense === '1') {
					return '已上传'
				}
				return ''
			},
			enums() {
				return this.$store.state.enums
			},
			uploadOperation() {
				return this.currentDriveStatus === this.noEdit || this.isManager ? 'show' : 'edit'
			},
			title() {
				// console.log(this.detailId)
				switch (this.currentDriveStatus) {
					case 'TEST_DRIVER':
						return '确认试乘试驾'
					case 'DRIVERING':
						return '结束试乘试驾'
					case 'FINISH':
						return '试乘试驾详情'
					default:
						return ''
				}
			},
			rightIcon() {
				return (this.currentDriveStatus === this.noEdit || this.isManager) ? '' : 'arrow'
			},
			disabled() {
				return (this.currentDriveStatus === this.noEdit || this.isManager)
			},
			actionItems() {
				return this.select.items[this.select.currentSelectType];
			},
			api() {
				return this.$api.testDrive
			}
		},
		methods: {
			afterUpload(type, data) {
				console.log(type, data)
				switch (type) {
					case 'id':
						this.page.certificateNoPaths = data
						this.page.uploadCertificateNo = '1'
						break
					case 'dl':
						this.page.driverLicensePaths = data
						this.page.uploadDriverLicense = '1'
						break
					case 'dp':
						this.page.agreementPaths = data
						this.page.uploadAgreement = '1'
						break
					default:
						break
				}
			},
			initPageData() {
				if (this.detailId) {
					this.api.get(this.detailId).then((data) => {
						console.log('data', data)
						this.currentDriveStatus = data.driveStatus.name
						this.page = Object.assign({}, this.page, data);
						this.page.realSeries = this.page.purposeSeries || ''
						this.page.realModel = this.page.purposeModel || ''
						this.page.realSeriesName = this.page.purposeSeriesName || ''
						this.page.realModelName = this.page.purposeModelName || ''
					}).catch((error) => {

					})
				}
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
				if (this.currentDriveStatus === 'TEST_DRIVER') {
					this.page.driveStatus = 'DRIVERING'
				} else if (this.currentDriveStatus === 'DRIVERING') {
					this.page.driveStatus = 'FINISH'
				}
				this.loading = true
				this.api.update(this.page).then((data) => {
					this.$dialog.alert({
						message: '成功'
					})
				}).catch((error) => {
					this.$dialog.alert({
						message: error.message
					})
				}).finally(() => {
					this.loading = false
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
