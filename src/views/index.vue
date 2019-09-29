<template lang='pug'>
	.index
		manager-summary-part(:is-manager="isManager")
		.scroll
			track-part(:is-manager="isManager")
			follow-part(v-if="user.role !== '数字营销经理'")
			app-center(:is-manager="isManager")
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
			]),
			isManager() {
				return this.user.role === '数字营销经理';
			}
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
		.scroll {
			width: 100%;
			position: absolute;
			top: 100px;
			bottom: 50px;
			overflow: scroll;
		}
	}
</style>
