<template lang='pug'>
	m-page.detail
		van-tabs(
			v-model="active"
			color="#1B40D6"
			title-active-color="#1B40D6"
		)
			van-tab(title="跟进记录")
			van-tab(title="客户详情")
		follow-record(v-if="active==0")
		customer-detail(v-else)
</template>

<script>
	import FollowRecord from './detail/follow-record'
	import CustomerDetail from './detail/customer-detail'
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
	.detail {
		height: 100vh;
		.van-ellipsis {
			font-size: 16px;
			color: #333333;
		}
	}
</style>
