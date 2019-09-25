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
				default: ''
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
			background: transparent;
			.van-nav-bar__title {
				font-size: 18px;
				color: #333333;
				font-weight: 600;
			}
			.van-nav-bar__left {
				font-size: 16px;
			}
			.van-nav-bar__arrow {
				color: #1B40D6;
			}
			.van-nav-bar__text {
				color: #1B40D6;
			}
		}
	}
</style>
