<template lang='pug'>
	.sub-layout
		van-nav-bar(
			title="标题"
			left-text="返回"
			right-text="按钮"
			left-arrow
			@click-left="onClickLeft"
			@click-right="onClickRight")
		router-view
</template>

<script>
	export default {
		name: 'sub-layout',
		methods: {
			onClickLeft() {},
			onClickRight() {}
		}
	}
</script>
<style lang="scss" scoped>
	.sub-layout {

	}
</style>
