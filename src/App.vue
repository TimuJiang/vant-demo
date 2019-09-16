<template lang="pug">
	#app
		.group-top
			.group-top__title 本日业绩
			van-row
				van-col(span="8")
					.number-cell 67
					.name-cell 终端数
				van-col.van-hairline--left(span="8")
					.number-cell 67
					.name-cell 终端数
				van-col.van-hairline--left(span="8")
					.number-cell 67
					.name-cell 终端数
		.group-center
			.group-title 商机中心
			van-grid
				van-grid-item(icon="photo-o" text="H")
				van-grid-item(icon="photo-o" text="A")
				van-grid-item(icon="photo-o" text="B")
				van-grid-item(icon="photo-o" text="C")
				van-grid-item(icon="photo-o" text="N")
				van-grid-item(icon="photo-o" text="F")
				van-grid-item(icon="photo-o" text="O")
		.group-center
			.group-title 商机跟进
			van-grid
				van-grid-item(icon="photo-o" text="H")
				van-grid-item(icon="photo-o" text="A")
				van-grid-item(icon="photo-o" text="B")
		.group-center
			.group-title 应用中心
			van-grid
				van-grid-item(v-for="i in 30" :key="i" icon="photo-o" text="H")
				van-grid-item(icon="photo-o" text="A")
				van-grid-item(icon="photo-o" text="B")
		van-tabbar(v-model="active")
			van-tabbar-item(icon="wap-home-o") 首页
			van-tabbar-item(icon="volume-o") 提醒
			van-tabbar-item(icon="user-o") 我的
</template>

<script>
	export default {
		name: 'app',
		components: {},
		data() {
			return {
				active: ''
			}
		}
	}
</script>

<style lang="scss" scoped>
	#app {
		font-family: "Avenir", Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
	}
	.group-top {
		background: #1b63ff;
		color: #ffffff;
		overflow: hidden;
		padding: 40px 0;
		text-align: center;
		&__title {
			margin-bottom: 20px;
		}
	}
	.group-center {
		.group-title {
			padding: 10px 20px;
		}
	}
</style>
