<template lang='pug'>
	.m-page
		van-nav-bar.m-page__nav-bar(
			:title="title"
			:left-arrow = "back"
			@click-left="onClickLeft")
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
		&__nav-bar {
			background: #1b63ff;
		}
	}
</style>
