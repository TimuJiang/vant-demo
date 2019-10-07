<template lang="pug">
	m-page(@click-left="$router.push('/')" :has-click-left="true").not-found
		.container
			div
				.imgContainer
				.text 您访问的内容不存在
</template>

<script>
    export default {
        name: 'not-found'
    }
</script>

<style lang="scss" scoped>
		.container {
			position: absolute;
			width: 100%;
			top: 46px;
			bottom: 0;
			background-color: #efeff4;
			display: flex;
			align-items: center;
			justify-content: center;
			.imgContainer {
				width: 125px;
				height: 125px;
				background: url("~assets/default_nocontent.png") no-repeat;
				background-size: 100%;
				margin-bottom: 15px;
			}
			.text {
				font-size: 14px;
				color: #999;
			}
		}
</style>
