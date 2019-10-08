<template lang="pug">
	.my-overlay(v-if="show")
		van-loading(vertical) {{text}}
</template>

<script>
	import Vue from 'vue';
	import { Loading } from 'vant'
	Vue.use(Loading)
    export default {
        name: 'm-loading',
		props: {
        	show: {
        		default: false
			},
			text: {
				default: '操作进行中'
			}
		}
    }
</script>

<style lang="scss" scoped>
	.my-overlay {
		z-index: 999;
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
