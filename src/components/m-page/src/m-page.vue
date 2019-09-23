<template lang='pug'>
	.m-page
		van-nav-bar.m-page__nav-bar(
			:fixed="true"
			:title="title"
			:left-text="leftText"
			:right-text="rightText"
			:left-arrow = "back"
			@click-left="onClickLeft"
			@click-right="onClickRight")
		.m-page__content
			slot
</template>

<script>
	export default {
		name: 'm-page',
		props: {
			back: {
				default: true
			},
			leftText: {
				default: '返回'
			},
			rightText: {
				default: ''
			},
			headTitle: {
				default: ''
			},
			hasClickLeft: {
				default: false
			}
		},
		methods: {
			onClickLeft() {
				if (this.hasClickLeft) {
					this.$emit('click-left')
				} else {
					this.$router.back()
				}
			},
			onClickRight() {
				this.$emit('click-right')
			}
		},
		computed: {
			title () {
				return this.$route.meta.name || this.headTitle
			}
		}
	}
</script>
<style lang="scss" scoped>
	.m-page {
		width: 100vw;
		&__content {
			margin-top: 46px;
		}
		&__nav-bar {
			background: #195DFF;
			.van-nav-bar__title {
				font-size: 18px;
				color: #FFFFFF;
			}
		}
	}
</style>
