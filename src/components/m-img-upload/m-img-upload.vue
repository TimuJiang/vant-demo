<template lang="pug">
	.m-img-upload
		van-field(v-model="value" label-width="110" readonly placeholder="请上传" :label="label" right-icon="arrow" :required="true" @click="() => { popupShow(true) }")
		van-action-sheet.imgShow(
			v-model="show"
		)
			upload-basic(:type="type" :operation="operation" :is-multiple="isMultiple" :title="title" :ids="ids" @do-upload="(data) => { $emit('do-upload', data) }" @click-left="() => { popupShow(false) }")
</template>

<script>
	import { UploadBasic } from '../upload'
    export default {
        name: 'm-img-upload',
		components: {
        	'upload-basic': UploadBasic
		},
		data() {
        	return {
        		value: '',
				show: false
			}
		},
		props: {
        	title: String,
        	type: String,
			operation: String,
			ids: String,
			label: String,
			isMultiple: Boolean
		},
		methods: {
        	popupShow(flag) {
        		this.show = flag
			}
		}
    }
</script>

<style lang="scss" scoped>
	.m-img-upload .van-cell {
		font-size: 16px;
		font-weight: 600;
		color: #333;
		line-height: 30px;
		border-bottom: 1px solid rgba(0,0,0,0.1);
	}
	.m-img-upload:last-child .van-cell {
		border-bottom-width: 0;
	}

	.m-img-upload {
		.van-action-sheet.imgShow {
			height: 100%;
			max-height: 100%;
			.van-action-sheet__content {
				height: 100%;
			}
		}

	}
</style>
