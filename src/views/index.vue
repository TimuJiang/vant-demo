<template lang='pug'>
	.index
		manager-summary-part
		track-part
		follow-part(v-if="user.role !== '数字营销经理'")
		app-center
</template>

<script>
	import { mapGetters } from 'vuex'
	import TrackPart from './index/track-part'
	import FollowPart from './index/follow-part'
	import AppCenter from './index/app-center'
	import ManagerSummaryPart from './index/manager-summary-part'
	export default {
		name: 'index',
		components: {
			ManagerSummaryPart,
			TrackPart,
			FollowPart,
			AppCenter
		},
		computed: {
			...mapGetters([
				'user'
			])
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
