<template lang='pug'>
	.default-layout
		van-nav-bar(
			title="标题"
			left-text="返回"
			right-text="按钮"
			left-arrow
			@click-left="onClickLeft"
			@click-right="onClickRight")
		transition(name="van-slide-left")
			router-view
		van-tabbar(v-model="active" :safe-area-inset-bottom="true" :route="true")
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
		},
		methods: {
			onClickLeft() {
			},
			onClickRight() {
			}
		}
	}
</script>
<style lang="scss" scoped>
	.default-layout {

	}
</style>
