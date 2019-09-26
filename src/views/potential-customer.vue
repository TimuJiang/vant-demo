<template lang='pug'>
	m-page.potential-customer
		van-tabs(
			v-model="active"
			color="#1B40D6"
			)
			van-tab(title="全部")
			van-tab(v-for="item in _customer" :key="item.type" :title="item.type+'级'")
		.potential-customer__content
			van-index-bar(
				highlight-color="#1B40D6"
			)
				van-index-anchor(index="A")
				van-cell(title="路人甲" v-for="i in 3" :key="i+'a'" :to="`/customer/${i}`" label="意向车型：博瑞博瑞1.8T+6AT(国五)豪华型")
				van-index-anchor(index="B")
				van-cell(title="路人甲" v-for="i in 11" :key="i+'a'" :to="`/customer/${i}`" label="意向车型：博瑞博瑞1.8T+6AT(国五)豪华型")
				van-index-anchor(index="C")
				van-cell(title="路人甲" v-for="i in 8" :key="i+'a'" :to="`/customer/${i}`" label="意向车型：博瑞博瑞1.8T+6AT(国五)豪华型")
				van-index-anchor(index="J")
				van-cell(title="路人甲" v-for="i in 7" :key="i+'a'" :to="`/customer/${i}`" label="意向车型：博瑞博瑞1.8T+6AT(国五)豪华型")
				van-index-anchor(index="Z")
				van-cell(title="路人甲" v-for="i in 8" :key="i+'a'" :to="`/customer/${i}`" label="意向车型：博瑞博瑞1.8T+6AT(国五)豪华型")

</template>

<script>
	import { POTENTIAL_CUSTOMER } from 'config/types.config'
	import Vue from 'vue';
	import { IndexBar, IndexAnchor, Cell } from 'vant';

	Vue.use(IndexBar).use(IndexAnchor).use(Cell)
	export default {
		name: 'potential-customer',
		data() {
			return {
				active: ''
			}
		},
		beforeCreate() {
			this._customer = POTENTIAL_CUSTOMER
		}
	}
</script>
<style lang="scss" scoped>
	.potential-customer {
		background: #f8f8f8;
		&__content {
			position: absolute;
			left: 0;
			right: 0;
			overflow-y: auto;
			top: 90px;
			bottom: 0
		}
		.van-cell {

		}
	}
</style>
