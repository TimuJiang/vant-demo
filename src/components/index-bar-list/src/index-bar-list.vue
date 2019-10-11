<template lang="pug">
	.index-bar-list
		van-list(
			v-model="loading"
			:finished="finished"
			:finished-text="listArr.length === 0 ? '-暂无数据-' : '-加载完毕-'"
			:immediate-check="false"
			@load="loadData"
		)
			van-index-bar(:sticky="false" :index-list="indexList")
				template(
					v-for="(value, name) in formattedList"
					:index="name"
				)
					van-index-anchor(
						:index="name"
						:key="name"
					)
					van-cell(
						v-for="item in value"
						key="item.pCustomerId"
						:title="item.pCustomerName"
						:label="`意向车型：${item.purposeSeriesName ? `${item.purposeSeriesName} ` : ''}${item.purposeModelName || '暂无信息'}`"
						@click="() => { clickCell(item.pCustomerId) }")
</template>

<script>
	import Vue from 'vue';
	import { IndexBar, IndexAnchor } from 'vant';

	Vue.use(IndexBar).use(IndexAnchor);
    export default {
        name: 'index-bar-list',
		created() {
        	this.init(this.outerParam)
		},
		data() {
        	return {
				anchorDom: null,
				listArr: [],
				innerParam: {},
				loading: false,
				finished: false

			}
		},
		computed: {
        	formattedList() {
				let temp = ''
				let list = {}
				this.listArr.forEach((item) => {
					if (item.pinyin !== temp) {
						list[item.pinyin] = []
						temp = item.pinyin
					}
					list[item.pinyin].push(item)
				})
				return list
			},
			indexList() {
        		let temp = ''
				let indexList = []
				this.listArr.forEach((item) => {
					if (item.pinyin !== temp) {
						indexList.push(item.pinyin)
						temp = item.pinyin
					}
				})
				return indexList
			},
			api() {
				return this.$api.clueCustomer;
			}
		},
		props: ['outerParam'],
		watch: {
			outerParam(newVal, oldVal) {
        		if (newVal !== oldVal) {
        			this.init(newVal)
				}
			}
		},
		methods: {
        	init(outerParam) {
        		if (outerParam) {
					this.innerParam = {
						...outerParam
					}
					this.initData()
				}
			},
        	initData() {
				this.loading = true
				this.finished = false
				this.listArr = []
				this.loadData()
			},
			loadData() {
				this.api.queryForAddressBook(this.innerParam).then((data) => {
					if (data.length > 0) {
						// console.log('data', data)
						for (let item of data) {
							this.listArr.push(item)
						}
						this.innerParam.pageNum++
					} else {
						this.finished = true
					}
				}).catch((error) => {
					this.finished = true
					this.$dialog.alert({
						message: error.message
					})
				}).finally(() => {
					this.loading = false
				})
			},
        	clickCell(id) {
        		// this.$emit('click-cell', id)
				this.$dialog.alert({
					message: `当前点击客户的ID是${id}`
				})
			}
		}
    }
</script>

<style scoped>

</style>
<style>
	.index-bar-list .van-index-bar {
		position: relative;
	}
	.index-bar-list .van-index-bar__sidebar {
		padding-top: 8px;
		background-color: #fff;
	}
	.index-bar-list .van-index-bar__sidebar .van-index-bar__index {
		padding: 0 2px;
		color: #666;
		font-size: 16px;
		transform: scale(0.6);
	}
</style>
