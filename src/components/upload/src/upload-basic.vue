<template lang="pug">
	.upload-basic
		.head
			.left(@click="clickLeft")
				m-icon(icon-class="icon-back")
			.title {{title}}上传
			.right(@click="save" v-if="operation !== 'show'") 保存
		.container
			div(v-if="!isMultiple")
				.cell
					.pic-container(@click="() => { showPic(0) }")
						div
							img(:src="base[0]" ref="file")
							|示例
					.tip {{tip1Text}}
					.upload-btn(v-if="operation !== 'show'")
						input(type="file" accept="image/*" :multiple="false" @change="(e) => { getImgBase(e, 0) }")
						|{{btn1Text}}上传
				.cell(v-if="type === 'id' || type === 'dl'")
					.pic-container(@click="() => { showPic(1) }")
						div
							img(:src="base[1]" ref="file")
							|示例
					.tip {{tip2Text}}
					.upload-btn(v-if="operation !== 'show'")
						input(type="file" accept="image/*" :multiple="false"  @change="(e) => { getImgBase(e, 1) }")
						|{{btn2Text}}上传
			.cell(v-if="isMultiple")
				.multi-pic-container
					div(v-for="(item, index) in base" :key="index")
						.pic(@click="() => { showPic(index) }")
							img(:src="item" ref="file")
						.delete-icon(v-if="operation !== 'show'" @click="() => { deletePic(index) }")
							van-icon(name="cross")
				.tip {{tip1Text}}
				.upload-btn(v-if="operation !== 'show'")
					input(type="file" accept="image/*" multiple @change="addPic")
					|{{btn1Text}}上传
		m-loading(:show="show" :text="text")
		van-dialog.dialogShow(
			v-model="dialogShow"
			:showConfirmButton="false"
			:closeOnClickOverlay="true"
		)
			img(:src="dialogSrc" :style="{ width: '100%', height: 'auto' }" @click="() => { this.dialogShow = false }")
</template>

<script>
    export default {
        name: 'upload-basic',
		data() {
        	return {
        		dialogShow: false,
				dialogSrc: '',
				base: [],
				param: [],
				show: false,
				text: ''
			}
		},
		props: {
        	title: {
        		default: '图片'
			},
			type: String,
			operation: String,
			isMultiple: {
        		default: false
			},
			ids: String, // 已上传图片的ID
			paths: Array
		},
		watch: {
			ids: {
				handler: function(newVal, oldVal) {
					if (newVal && !oldVal) {
						this.getPicFromServer(newVal.split(','))
					}
				},
				immediate: true
			}
		},
		computed: {
        	uploadedPicPaths() {
        		return this.paths
			},
			btn1Text() {
				let text = ''
				switch (this.type) {
					case 'id':
						text = `${this.title}正面`
						break
					case 'dl':
						text = `${this.title}正本`
						break
					default:
						text = this.title
						break
				}
				return text
			},
			btn2Text() {
				let text = ''
				switch (this.type) {
					case 'id':
						text = `${this.title}背面`
						break
					case 'dl':
						text = `${this.title}副本`
						break
					default:
						text = this.title
						break
				}
				return text
			},
			tip1Text() {
				return this.operation === 'show' ? `${this.btn1Text}预览` : '支持png、jpeg、jpg格式'
			},
			tip2Text() {
				return this.operation === 'show' ? `${this.btn2Text}预览` : '支持png、jpeg、jpg格式'
			},
			api() {
				return this.$api.fileMeta;
			}
		},
		methods: {
        	deletePic(index) {
				this.base.splice(index, 1)
				this.param.splice(index, 1)
			},
        	addPic(e) {
        		// console.log(e.target.files.length);
        		let baseLength = this.base.length
        		let targetLength = e.target.files.length
        		if (baseLength > 0) {
        			if ((baseLength + targetLength) > 5) {
						this.$dialog({
							message: 5 - baseLength === 0 ? '最多上传五张图片' : `最多上传五张图片，还能上传${5 - baseLength}张`
						})
						return false
					} else {
        				for (let i = 0; i < targetLength; i++) {
							this.getImgBase(e.target.files[i], baseLength + i)
						}
					}
				} else {
					if (e.target.files.length > 5) {
						this.$dialog({
							message: '最多上传五张图片'
						})
						return false
					} else {
						for (let i = 0; i < targetLength; i++) {
							this.getImgBase(e.target.files[i], i)
						}
					}
				}
			},
        	showPic(index) { // 点击时放大预览图片
        		if (this.base[index]) {
					this.dialogSrc = this.base[index]
					this.dialogShow = true
				}
			},
			// 获取图片base64实现预览
			getImgBase(e, index){
				let _this = this;
				let file = e.target ? e.target.files[0] : e
				this.param[index] = file // 赋值文件对象 最终传到后台
				let reader = new FileReader();
				if (!e || !window.FileReader) {
					this.$dialog.alert({
						message: '当前环境暂不支持图片预览'
					})
					return false;
				} // 看支持不支持FileReader
				// 转base64
				reader.readAsDataURL(file);
				reader.onload = function() {
					_this.$set(_this.base, index, this.result)
				}

			},
        	save() {
        		if (this.base.length === 0) {
        			this.$dialog.alert({
						message: '请先选择图片！'
					})
					return false
				}
				let that = this;
				async function queue(paramObj, api) {
					let res = []
					for (let item of paramObj) {
						if (item) {
							let formData = new FormData()
							formData.append('file', item)
							let data = await api.upload(formData)
							res.push(data.message)
						} else {
							res.push(null)
						}

					}
					return res
				}
				this.showLoading('照片上传中')
				queue(this.param, this.api).then((data) => {
					// console.log('imginfo', data.toString())
					that.$emit('do-upload', this.mergePaths(data))
				}).catch((data) => {
					console.log('data', data)
					this.$dialog.alert({
						message: '图片上传失败，请重试！'
					})
				}).finally(() => {
					this.hideLoading()
				})
			},
			getPicFromServer(ids) {
				async function queue(ids, api, base, param, blobToBase64) {
					for (let id of ids) {
						let data = await api.getImg(id)
						let base64 = await blobToBase64(data)
						base.push(base64)
						param.push(null)
					}
				}
				this.showLoading('加载中')

				queue(ids, this.api, this.base, this.param, this.blobToBase64).catch(() => {
					this.$dialog.alert({
						message: '文件预览失败'
					})
				}).finally(() => {
					this.hideLoading()
				})

			},
			mergePaths(newPaths) {
				if (this.uploadedPicPaths.length === 0) {
					return newPaths
				} else {
					let mergedPaths = [];
					for (let i = 0; i < newPaths.length; i++) {
						if (newPaths[i]) {
							mergedPaths.push(newPaths[i])
						} else {
							mergedPaths.push(this.uploadedPicPaths[i])
						}
					}
					return mergedPaths
				}
			},
			blobToBase64(blob) {
				return new Promise((resolve, reject) => {
					const fileReader = new FileReader();
					if (!window.FileReader) {
						reject(new Error('不支持文件预览'));
					} // 看支持不支持FileReader
					fileReader.onload = (e) => {
						resolve(e.target.result);
					};
					// readAsDataURL
					fileReader.readAsDataURL(blob);
					fileReader.onerror = () => {
						reject(new Error('文件流异常'));
					};
				});
			},
			clickLeft() {
				this.$emit('click-left')
			},
			showLoading(text) {
				this.text = text
				this.show = true
			},
			hideLoading() {
        		this.show = false
			}
		}
    }
</script>

<style lang="scss" scoped>
	.upload-basic {
		height: 100%;
	}
	.head {
		position: relative;
		height: 46px;
		line-height: 46px;
		text-align: center;
		user-select: none;
		font-size: 14px;
		.left {
			position: absolute;
			bottom: 0;
			left: 16px;
		}
		.right {
			position: absolute;
			bottom: 0;
			right: 16px;
			color: #1B40D6;
		}
		.title {
			font-size: 18px;
			color: #333333;
			font-weight: 600;
			max-width: 60%;
			margin: 0 auto;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
	}

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
					overflow: hidden;
					> img {
						position: absolute;
						width: 100%;
						height: auto;
						opacity: 1;
					}
				}
			}
			.multi-pic-container {
				> div {
					width: 49%;
					padding-bottom: 49%;
					position: relative;
					background-color: #d8d8d8;
					display: inline-block;
					&:nth-child(odd) {
						margin-right: 2%;
					}
					.pic {
						display: flex;
						position: absolute;
						left: 5px;
						right: 5px;
						bottom: 5px;
						top: 5px;
						background-color: #fff;
						align-items: center;
						justify-content: center;
						overflow: hidden;
						> img {
							width: 100%;
							height: auto;
							opacity: 1;
						}
					}
					.delete-icon {
						position: absolute;
						height: 25px;
						width: 25px;
						right: 0;
						background-color: rgba(0, 0, 0, 0.4);
						display: flex;
						justify-content: center;
						align-items: center;
						color: #fff;
					}

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
				position: relative;
				height: 40px;
				line-height: 40px;
				text-align: center;
				background-color: #1B40D6;
				color: #fff;
				border-radius: 5px;
				font-size: 14px;
				> input {
					position: absolute;
					width: 100%;
					height: 100%;
					opacity: 0;
				}
			}
		}

	}
	.upload-basic .van-dialog.dialogShow {
		background-color: transparent;
		border-radius: unset;
		transform: translate3d(-50%,-45%,0);
		max-height: 100%;
		overflow: scroll;
	}
</style>
