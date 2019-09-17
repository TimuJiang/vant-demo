<template lang='pug'>
	.default-layout
		transition(name="van-slide-left")
			router-view
		transition(name="van-slide-up")
			van-tabbar(v-if="$route.meta.showTabbar" v-model="active" :safe-area-inset-bottom="true" :route="true")
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

	}
</style>
