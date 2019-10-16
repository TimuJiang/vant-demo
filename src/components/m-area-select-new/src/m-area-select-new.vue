<template lang="pug">
	.m-area-select-new
		van-field(readonly v-model="text" label="所在地区" placeholder="请选择" required :right-icon="rightIcon" @click="openSelect()")
		van-popup(
			v-model="show"
			position="bottom"
		)
			van-picker(
				ref="picker"
				show-toolbar
				:columns="columns"
				@cancel="onCancel"
				@confirm="onConfirm"
				@change="onChange"
			)
</template>

<script>
	import area from './area'
    export default {
        name: 'm-area-select-new',
		model: {
			prop: 'page',
			event: 'change'
		},
		props: {
        	rightIcon: {
        		default: 'arrow'
			},
			disabled: {
        		default: false
			},
			page: Object
		},
		created() {
        	this.$api.area.query().then((data) => {
				// this.renderData(data)
			})
		},
		data() {
        	return {
				text: '',
        		show: false,
				lastAreaPick: [area.province[0], area.city[area.province[0].regionId][0], area.county[area.city[area.province[0].regionId][0].regionId][0]],
				columns: [
					{
						values: area.province,
						className: 'column1'
					},
					{
						values: area.city[area.province[0].regionId],
						className: 'column2'
					},
					{
						values: area.county[area.city[area.province[0].regionId][0].regionId],
						className: 'column3'
					}
				],
			}
		},
		watch: {
        	defaultPick(newVal, oldVal) {
        		if (newVal && !oldVal) {
        			console.log('变更了')
        			let { pick, columns } = newVal
        			this.lastAreaPick = [...pick]
					this.columns = [...columns]
					this.renderText()
				}
			}
		},
		computed: {
			defaultPick() {
				let { province, city, county } = this.page
				if (province && city && county) {
					let pick = [
						this.getAreaById(area.province, province),
						this.getAreaById(area.city[province], city),
						this.getAreaById(area.county[city], county)
					]
					let columns = [
						{
							values: area.province,
							className: 'column1',
							defaultIndex: pick[0].index
						},
						{
							values: area.city[province],
							className: 'column2',
							defaultIndex: pick[1].index
						},
						{
							values: area.county[city],
							className: 'column3',
							defaultIndex: pick[2].index
						}
					]
					return {
						pick,
						columns
					}
				} else {
					return null
				}
			}
		},
		methods: {
        	renderText() {
        		let text = ''
        		this.lastAreaPick.forEach((item, index) => {
        			text += index === 0 ? item.regionName : ` ${item.regionName}`
				})
				this.text = text
			},
        	openSelect() {
        		if (this.disabled) {
        			return false
				}
        		if (this.$refs.picker) {
					this.defaultPick.columns.forEach((item, index) => {
						this.$refs.picker.setColumnValues(index, item.values)
						this.$refs.picker.setColumnIndex(index, item.defaultIndex)
					})


				}


        		// console.log('this.defaultPick.columns', this.defaultPick.columns)
				this.show = true
			},
			onConfirm(value) {
				let area = {
        			province: value[0].regionId,
					city: value[1].regionId,
					county: value[2].regionId
				}
				let newPage = Object.assign({}, this.page, area)
				this.renderText()
				this.$emit('change', newPage)
				this.show = false
			},
			onCancel() {
        		// console.log(arguments)
				this.show = false
			},
			onChange(picker, values) {
        		// console.log('p', picker)
				// console.log('picker', values)
				if (this.lastAreaPick.length > 0) {
					if (this.lastAreaPick[0].regionId !== values[0].regionId) {
						picker.setColumnValues(1, area.city[values[0].regionId])
						picker.setColumnValues(2, area.county[area.city[values[0].regionId][0].regionId])
						this.lastAreaPick = [
							values[0],
							area.city[values[0].regionId][0],
							area.county[area.city[values[0].regionId][0].regionId][0]
						]
					} else if (this.lastAreaPick[1].regionId !== values[1].regionId) {
						picker.setColumnValues(2, area.county[values[1].regionId])
						this.lastAreaPick = [
							values[0],
							values[1],
							area.county[values[1].regionId][0]
						]
					} else {
						this.lastAreaPick = values
					}
				}

			},
			getAreaById(list, id) {
        		let item = null
				for (let i = 0; i < list.length; i++) {
					if (Number(id) === Number(list[i].regionId)) {
						item = {
							...list[i],
							index: i
						}
						break
					}
				}
				return item
			},
			renderData(data) {
        		let area = {
        			province: [],
					city: {

					},
					county: {

					}
				}
				data.forEach((item) => {
					if (item.parentRegionId === '10045') {
						item.text = item.regionName
						area.province.push(item)
					}
				})

				area.province.forEach((province) => {
					data.forEach((item) => {
						if (item.parentRegionId === province.regionId) {
							if (!area.city[province.regionId]) {
								area.city[province.regionId] = []
							}
							item.text = item.regionName
							area.city[province.regionId].push(item)
						}
					})
				})

				for (let provinceId in area.city) {
					area.city[provinceId].forEach((city) => {
						data.forEach((item) => {
							if (item.parentRegionId === city.regionId) {
								if (!area.county[city.regionId]) {
									area.county[city.regionId] = []
								}
								item.text = item.regionName
								area.county[city.regionId].push(item)
							}
						})
					})
				}
				sessionStorage.setItem('area', JSON.stringify(area))
				console.log('area', area)

			}
		}
    }
</script>

<style lang="scss">
	.m-area-select-new .van-cell {
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
	.m-area-select-new:last-child .van-cell:last-child {
		border-bottom-width: 0;
	}
</style>
