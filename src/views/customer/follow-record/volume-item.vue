<template lang='pug'>
	.volume-item
		van-icon(name="volume-o" color="#f2f2f2")
</template>

<script>
	export default {
		name: 'volume-item'
	}
</script>
<style lang="scss" scoped>
	.volume-item {
		display: flex;
		align-items: center;
		width: 140px;
		border-radius: 5px;
		height: 32px;
		padding-left: 10px;
		background: linear-gradient(to right, #007fff, #1144ff);
		box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.3);
	}
</style>
