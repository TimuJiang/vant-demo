<template lang='pug'>
	m-page.index(:back="false")
		.group-top
			.group-top__title 本日业绩
			van-row
				van-col(span="8")
					.number-cell 67
					.name-cell 终端数
				van-col.van-hairline--left(span="8")
					.number-cell 67
					.name-cell 订单数
				van-col.van-hairline--left(span="8")
					.number-cell 67
					.name-cell 潜客数
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
	export default {
		name: 'index',
		components: {
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
		.group-top {
			background: #1b63ff;
			color: #ffffff;
			overflow: hidden;
			padding: 40px 0;
			text-align: center;
			&__title {
				margin-bottom: 20px;
			}
		}
		.group-center {
			.group-title {
				padding: 10px 20px;
			}
		}
	}
</style>
