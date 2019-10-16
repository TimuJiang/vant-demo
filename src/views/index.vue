<template lang='pug'>
	.index(:class="{'from-android': fromAndroid}")
		manager-summary-part(:is-manager="isManager")
		.scroll
			track-part(:is-manager="isManager")
			follow-part(v-if="!isManager")
			app-center(:is-manager="isManager")
		m-loading(:show="show" text="" :mask="false")
</template>

<script>
	import TrackPart from './index/track-part'
	import FollowPart from './index/follow-part'
	import AppCenter from './index/app-center'
	import ManagerSummaryPart from './index/manager-summary-part'
	export default {
		name: 'index',
		created() {
			if (sessionStorage.getItem('from-android') === '1') {
				this.fromAndroid = true
			}
			this.initPageData()
		},
		mounted() {
			this.bottom = true
		},
		data() {
			return {
				show: true,
				fromAndroid: false
			}
		},
		components: {
			ManagerSummaryPart,
			TrackPart,
			FollowPart,
			AppCenter
		},
		computed: {
			isManager() {
				return this.$store.getters.isManager
			}
		},
		methods: {
			onClickLeft() {
				this.$router.back()
			},
			initPageData() {
				this.$api.homePage.getHomePageData().then((data) => {
						// console.log('homePage', data)
					this.$store.commit('homePageData', data)
				}).catch((error) => {
					this.$toast('服务异常')
				}).finally(() => {
					this.show = false
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.index {
		position: absolute;
		width: 100%;
		top: 0;
		bottom: 0;
		.scroll {
			width: 100%;
			position: absolute;
			top: 100px;
			bottom: 50px;
			overflow: scroll;
			background-color: #efeff4;
		}
		&.from-android {
			z-index: 9999;
			.scroll {
				bottom: 0;
			}
		}
	}
</style>
