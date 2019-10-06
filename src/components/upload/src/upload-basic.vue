<template lang="pug">
	.upload-basic
		.head
			.left(@click="clickLeft")
				m-icon(icon-class="icon-back")
			.title {{title}}上传
			.right(@click="save") 保存
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
				.cell(v-if="type === 'id' || type === 'dl'" @click="() => { showPic(1) }")
					.pic-container
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
				param: []
			}
		},
		props: {
        	title: {
        		default: '图片'
			},
			type: String,
			operation: String,
			ids: String,
			isMultiple: {
        		default: false
			}
		},
		computed: {
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
				let that = this;
				async function queue(paramObj, api) {
					let res = []
					for (let item of paramObj) {
						let formData = new FormData()
						formData.append('file', item)
						let data = await api.upload(formData)
						res.push(data.message)
					}
					return res
				}
				queue(this.param, this.api).then((data) => {
					// console.log('imginfo', data.toString())
					that.$emit('do-upload', data.toString())
				}).catch((data) => {
					this.$dialog.alert({
						message: '图片上传失败，请重试！'
					})
				})
			},
			clickLeft() {
				this.$emit('click-left')
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
