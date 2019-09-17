<template lang='pug'>
	m-page.customer
		van-tabs(v-model="active")
			van-tab(title="跟进记录")
				follow-record
			van-tab(title="客户详情")
				customer-detail
</template>

<script>
	import FollowRecord from './customer/follow-record'
	import CustomerDetail from './customer/customer-detail'
	export default {
		name: 'customer',
		components: { FollowRecord, CustomerDetail },
		data() {
			return {
				active: ''
			}
		}
	}
</script>
<style lang="scss" scoped>

</style>
