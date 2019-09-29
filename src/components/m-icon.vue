<template lang='pug'>
	svg.m-icon(aria-hidden="true")
		use(:xlink:href="`#${iconClass}`")
</template>

<script>
	export default {
		name: 'm-icon',
		props: {
			iconClass: {
				type: String,
				default: ''
			}
		}
	}
</script>
<style lang="scss" scoped>
	.m-icon {
		width: 1em; height: 1em;
		vertical-align: -0.15em;
		fill: currentColor;
		overflow: hidden;
	}
</style>
