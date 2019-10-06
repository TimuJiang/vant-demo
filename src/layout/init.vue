<template lang="pug">
	.my-overlay
		van-loading(vertical) 初始化用户配置
</template>

<script>
	import Vue from 'vue';
	import { Loading } from 'vant'
	Vue.use(Loading)
    export default {
        name: 'init',
		mounted() {
        	Promise.all([this.getEnums()]).then(([enums]) => {
        		console.log('enums', enums)
				this.$store.commit('enums', enums)
				this.$router.push('/')
			}).catch(() => {

			})
		},
		methods: {
        	getEnums() {
				return this.$api.general.queryEnums()
			}
		}
    }
</script>

<style lang="scss" scoped>
	.my-overlay {
		z-index: 1;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,.7);
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
<style>
	.my-overlay .van-loading__text {
		color: #bec0c5
	}
</style>
