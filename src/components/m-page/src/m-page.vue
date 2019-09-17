<template lang='pug'>
	.m-page
		van-nav-bar.m-page__nav-bar(
			:fixed="true"
			:title="title"
			:left-arrow = "back"
			@click-left="onClickLeft")
		.m-page__content
			slot
</template>

<script>
	export default {
		name: 'm-page',
		props: {
			back: {
				default: true
			}
		},
		methods: {
			onClickLeft() {
				this.$router.back()
			}
		},
		computed: {
			title () {
				return this.$route.meta.name
			}
		}
	}
</script>
<style lang="scss" scoped>
	.m-page {
		&__content {
			margin-top: 46px;
		}
		&__nav-bar {
		}
	}
</style>
