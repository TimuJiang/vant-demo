<template lang='pug'>
	.default-layout
		transition(name="slide-fade")
			router-view
		transition(name="van-slide-up")
			van-tabbar(
				active-color="#1B40D6 "
				inactive-color="#666666"
				v-if="$route.meta.showTabbar"
				v-model="active"
				:safe-area-inset-bottom="true"
				:route="true"
				:z-index="999")
				van-tabbar-item(to="/" name="index" icon="wap-home-o") 首页
				van-tabbar-item(to="/message" name="message" icon="volume-o") 提醒
				van-tabbar-item(to="/setting" name="setting" icon="user-o") 我的

</template>

<script>
	export default {
		name: 'default-layout',
		data() {
			return {
				active: 'index'
			}
		}
	}
</script>
<style lang="scss" scoped>
	.default-layout {
		.van-tabbar {
			// box-shadow: 0 -1px 0 0 rgba(0,0,0,0.15);
		}
	}
	.slide-fade-enter-active {
		position: fixed;
		top: 0;
		transition: all .3s ease;
		transform: translateX(0%);
	}
	.slide-fade-leave-active {
		position: absolute;
		transition: all .3s ease;
		top: 0;
	}
	.slide-fade-enter {
		transform: translateX(100%);
	}
	.slide-fade-leave-to {
		transform: translateX(-100%);
	}
</style>
