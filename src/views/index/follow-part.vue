<template lang='pug'>
	.follow-part
		.group-title 商机跟进
		van-grid
			van-grid-item( v-for="item in _customer" :key="item.type" :to="`/potential-customer/${item.type}`" :icon="item.icon" :text="item.type")
</template>

<script>
	import { POTENTIAL_CUSTOMER } from 'config/types.config'
	export default {
		name: 'follow-part',
		created() {
			this._customer = POTENTIAL_CUSTOMER
		}
	}
</script>
<style lang="scss" scoped>
	.follow-part {
		.group-title {
			padding: 10px 20px;
		}
	}
</style>
