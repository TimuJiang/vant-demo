<template lang="pug">
	m-page(
		:head-title="title"
		right-text="保存"
		@click-right="save"
		).try-car-upload
		.container
			.cell
				.pic-container
					div 示例
				.tip {{tip1Text}}
				.upload-btn(@click="() => { this.upload(0) }" v-if="this.operateType !== 'show'") {{btn1Text}}上传
			.cell
				.pic-container
					div 示例
				.tip {{tip2Text}}
				.upload-btn(@click="() => { this.upload(1) }" v-if="this.operateType !== 'show'") {{btn2Text}}上传
</template>

<script>
	import { Dialog } from 'vant';
    export default {
        name: 'upload',
		props: {
        	uploadType: {
        		default: ''
			},
			operateType: {
        		default: ''
			},
			detailId: {
        		default: ''
			}
		},
		computed: {
			title() {
				return this.uploadType === 'id' ? '身份证上传' : '驾照上传';
			},
			btn1Text() {
				return this.uploadType === 'id' ? '身份证正面' : '驾照正本';
			},
			btn2Text() {
				return this.uploadType === 'id' ? '身份证背面' : '驾照副本';
			},
			tip1Text() {
				return this.operateType === 'show' ? `${this.btn1Text}预览` : '支持png、jpeg、jpg格式'
			},
			tip2Text() {
				return this.operateType === 'show' ? `${this.btn2Text}预览` : '支持png、jpeg、jpg格式'
			},
		},
		methods: {
        	save() {
        		Dialog.alert({
					message: '保存成功'
				})
			},
			upload(side) {
        		Dialog.alert({
					message: '→ To be continued'
				})
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
		padding: 20px 30px 0;
		box-sizing: border-box;
		overflow: scroll;
		.cell {
			margin-bottom: 20px;
			.pic-container {
				padding-bottom: 62%;
				position: relative;
				> div {
					display: flex;
					position: absolute;
					width: 100%;
					bottom: 0;
					top: 0;
					background-color: #d8d8d8;
					font-size: 18px;
					color: #fff;
					align-items: center;
					justify-content: center;
				}
			}
			.tip {
				height: 40px;
				line-height: 40px;
				text-align: center;
				color: #666;
				font-size: 12px;
			}
			.upload-btn {
				height: 40px;
				line-height: 40px;
				text-align: center;
				background-color: #1B40D6;
				color: #fff;
				border-radius: 5px;
				font-size: 14px;
			}
		}

	}
</style>
