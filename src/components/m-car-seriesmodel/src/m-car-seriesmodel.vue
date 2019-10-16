<template lang="pug">
	.m-car-seriesmodel
		van-field(v-model="page[`${seriesKey}Name`]" readonly :label="`${label}车系`" placeholder="请选择" required :right-icon="rightIcon" @click="openSelect('series')")
		van-field(v-model="page[`${modelKey}Name`]" readonly :label="`${label}车型`" placeholder="请选择" required :right-icon="rightIcon" @click="openSelect('model')")
		van-action-sheet.car-select(
			v-model="modelShow"
			:actions="models"
			@select="selectModel"
		)
		van-action-sheet.car-select(
			v-model="seriesShow"
			:actions="carSeries"
			@select="selectSeries"
		)
</template>

<script>
    export default {
        name: 'm-car-seriesmodel',
		created() {

			// console.log('this.page', this.page)
		},
		model: {
			prop: 'page',
			event: 'change'
		},
		data() {
        	return {
        		modelShow: false,
				seriesShow: false,
				currentSeries: ''
			}
		},
		watch: {
        	page(newVal, oldVal) {
        		if (oldVal[this.seriesKey] !== newVal[this.seriesKey]) {
        			// console.log('newVal', newVal)
        			this.currentSeries = newVal[this.seriesKey]
				}
			}
		},
		computed: {
        	api() {
        		return this.$api.carModel
			},
			carSeries() {
        		return this.$store.state.carModel
			},
			models() {
        		let models = []
				if (this.currentSeries) {
					models = this.getModelsBySeries(this.currentSeries)
				}
        		return models
			}
		},
		props: {
        	page: Object,
			rightIcon: {
        		default: 'arrow'
			},
			seriesKey: {
        		default: ''
			},
			modelKey: {
				default: ''
			},
			disabled: {
        		default: false
			},
			label: {
        		default: ''
			}
		},
		methods: {
        	getModelsBySeries(series) {
				for (let i = 0; i < this.carSeries.length; i++) {
					if (this.carSeries[i].carCode === series) {
						return this.carSeries[i].children
					}
				}
				return []
			},
			selectSeries(item) {
        		let models = this.getModelsBySeries(item.carCode)
				if (models.length === 0) {
					this.$toast({
						message: '当前车系下暂无车型，请重新选择'
					})
					return false
				}
				this.currentSeries = item.carCode
				console.log('models', this.models)
				let obj = {
					[`${this.seriesKey}Name`]: item.name,
					[`${this.seriesKey}`]: item.carCode,
					[`${this.modelKey}Name`]: this.models[0] ? this.models[0].name : '',
					[`${this.modelKey}`]: this.models[0] ? this.models[0].carCode : ''
				}
				this.updateModel(obj)
				this.seriesShow = false
			},
			selectModel(item) {
				let obj = {
					[`${this.modelKey}Name`]: item.name,
					[`${this.modelKey}`]: item.carCode
				}
				this.updateModel(obj)
				this.modelShow = false
			},
			openSelect(type) {
				if (this.disabled) {
					return false
				}
				if (type === 'model') {
					if (!this.currentSeries) {
						this.$toast({
							message: '请先选择车系'
						})
						return false
					}
					if (this.models.length === 0) {
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

<style lang="scss" >
	.m-car-seriesmodel .van-cell {
		font-size: 16px;
		font-weight: 600;
		color: #333;
		line-height: 30px;
		border-bottom: 1px solid rgba(0,0,0,0.1);
		.van-cell__title {
			width: 110px;
		}
		.van-field__control {
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
	}
	.m-car-seriesmodel:last-child .van-cell:last-child {
		border-bottom-width: 0;
	}
	.m-car-seriesmodel .car-select {
		max-height: 300px!important;
	}
</style>
