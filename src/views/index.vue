<template lang='pug'>
	.index
		manager-summary-part
		track-part(v-if="user.role=='销售顾问'")
		follow-part(v-else)
		.group-center
			.group-title 应用中心
			van-grid
				van-grid-item(v-for="item in _apps" :key="item.name" icon="photo-o" :to="item.path" :text="item.name")

</template>

<script>
	import { mapGetters } from 'vuex'
	import { POTENTIAL_CUSTOMER, APP_CENTER } from 'config/types.config'
	import TrackPart from './index/track-part'
	import FollowPart from './index/follow-part'
	import ManagerSummaryPart from './index/manager-summary-part'
	export default {
		name: 'index',
		components: {
			ManagerSummaryPart,
			TrackPart,
			FollowPart
		},
		computed: {
			...mapGetters([
				'user'
			])
		},
		beforeCreate() {
			this._customer = POTENTIAL_CUSTOMER
			this._apps = APP_CENTER
		},
		methods: {
			onClickLeft() {
				this.$router.back()
			}
		}
	}
</script>
<style lang="scss" scoped>
	.index {

	}
</style>
