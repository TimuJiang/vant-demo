<template lang="pug">
	.customer-common-search
		.search
			.search-point-container
				.search-point(@click="clickSearchPoint")
			van-search(
				v-model="searchValue"
				placeholder="输入手机号/客户姓名"
				shape="round"
				left-icon=""
				right-icon="search"
				@input="changeInputValue"
				@clear="() => { $emit('change-param', {}) }"
			)
</template>

<script>
	import Vue from 'vue'
	import { Search } from 'vant'
	Vue.use(Search)
    export default {
        name: 'common-search',
		data() {
        	return {
				searchValue: '',
				searchInfo: {
					type: '',
					value: ''
				}
			}
		},
		methods: {
			clickSearchPoint() {
				let { type ,value } = this.searchInfo
				if (type) {
					this.$emit('change-param', {key: type, value})
				} else {
					this.$emit('change-param', {})
				}
			},
			changeInputValue(value) {
				let trimValue = value.trim()
				if (trimValue) {
					if (!isNaN(trimValue) || trimValue === '0') {
						this.searchInfo = {
							type: 'mobileNo',
							value: trimValue
						}
						// this.changeParam('mobileNo', trimValue)
					} else {
						this.searchInfo = {
							type: 'pCustomerName',
							value: trimValue
						}
						// this.changeParam('pCustomerName', trimValue)
					}
				} else {
					this.searchInfo = {
						type: '',
						value: 'trimValue'
					}
					// this.changeParam()
				}
			}
		}
    }
</script>

<style lang="scss" scoped>
	.customer-common-search {
		.search {
			height: 40px;
			background-color: #fff;
			display: flex;
			align-items: center;
			justify-content: center;
			.search-point-container {
				position: absolute;
				width: 70%;
				height: 30px;
				.search-point {
					position: absolute;
					width: 24px;
					height: 100%;
					right: 0;
					z-index: 1;
				}
			}
		}
	}
</style>

<style lang="scss">
	.customer-common-search {
		.van-search {
			padding: 0!important;
			width: 70%;
			.van-cell {
				padding: 3px 8px 3px 0!important;
			}
			.van-search__content {
				padding-left: 20px;
				.van-field__control {
					font-size: 12px;
				}
			}
		}
	}
</style>
