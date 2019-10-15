<template lang="pug">
	.m-car-seriesmodel
		van-field(v-model="page[`${seriesKey}Name`]" readonly label="试驾车系" placeholder="请选择" required :right-icon="rightIcon" @click="openSelect('model')")
		van-field(v-model="page[`${modelKey}Name`]" readonly label="试驾车型" placeholder="请选择" required :right-icon="rightIcon" @click="openSelect('series')")
		van-action-sheet.car-select(
			v-model="modelShow"
			:actions="carModel"
			@select="selectModel"
		)
		van-action-sheet.car-select(
			v-model="seriesShow"
			:actions="series"
			@select="selectSeries"
		)
</template>

<script>
    export default {
        name: 'm-car-seriesmodel',
		created() {
        	this.currentModel = this.page[this.modelKey]
		},
		model: {
			prop: 'page',
			event: 'change'
		},
		data() {
        	return {
        		modelShow: false,
				seriesShow: false,
				currentModel: ''
			}
		},
		computed: {
        	api() {
        		return this.$api.carModel
			},
			carModel() {
        		return this.$store.state.carModel
			},
			series() {
        		let series = []
				if (this.currentModel) {
					for (let i = 0; i < this.carModel.length; i++) {
						if (this.carModel[i].carCode === this.currentModel) {
							series = this.carModel[i].children
						}
					}
				}
        		return series
			}
		},
		props: {
        	page: Object,
			rightIcon: {
        		default: true
			},
			seriesKey: {
        		default: ''
			},
			modelKey: {
				default: ''
			},
			disabled: {
        		default: false
			}
		},
		methods: {
			selectModel(item) {
				this.currentModel = item.carCode
				console.log('series', this.series)
				let obj = {
					[`${this.seriesKey}Name`]: item.name,
					[`${this.seriesKey}`]: item.carCode,
					[`${this.modelKey}Name`]: this.series[0] ? this.series[0].name : '',
					[`${this.modelKey}`]: this.series[0] ? this.series[0].carCode : ''
				}
				this.updateModel(obj)
				this.modelShow = false
			},
			selectSeries(item) {
				let obj = {
					[`${this.modelKey}Name`]: item.name,
					[`${this.modelKey}`]: item.carCode
				}
				this.updateModel(obj)
				this.seriesShow = false
			},
			openSelect(type) {
				if (this.disabled) {
					return false
				}
				if (type === 'series') {
					if (!this.currentModel) {
						this.$toast({
							message: '请先选择车系'
						})
						return false
					}
					if (this.series.length === 0) {
						this.$toast({
							message: '暂无车型信息'
						})
						return false
					}

				}
				this[`${type}Show`] = true
			},
			updateModel(newInfo) {
				let obj = Object.assign({}, this.page, newInfo)
				this.$emit('change', obj)
			}
		}
    }
</script>

<style lang="scss" scoped>
	.m-car-seriesmodel .van-cell {
		font-size: 16px;
		font-weight: 600;
		color: #333;
		line-height: 30px;
		border-bottom: 1px solid rgba(0,0,0,0.1);
	}
	.m-car-seriesmodel:last-child .van-cell:last-child {
		border-bottom-width: 0;
	}
	.car-select {
		max-height: 300px!important;
	}
</style>
