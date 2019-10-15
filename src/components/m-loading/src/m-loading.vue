<template lang="pug">
	.my-overlay(:class="{ 'no-mask': !mask }")(v-if="show")
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
			},
			mask: {
        		default: true
			}
		}
    }
</script>

<style lang="scss" scoped>
	.my-overlay {
		z-index: 9999;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0,0,0,.7);
		display: flex;
		align-items: center;
		justify-content: center;
		&.no-mask {
			background-color: transparent;
		}
	}
</style>
