<template lang='pug'>
	m-page.potential-customer
		van-tabs(v-model="active")
			van-tab(title="全部")
			van-tab(v-for="item in _customer" :key="item.type" :title="item.type")
		van-index-bar
			van-index-anchor(index="A")
			van-cell(title="文本" v-for="i in 8" :key="i+'a'")
			van-index-anchor(index="B")
			van-cell(title="文本" v-for="i in 8" :key="i+'b'")
			van-index-anchor(index="C")
			van-cell(title="文本" v-for="i in 8" :key="i+'c'")

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

</style>
