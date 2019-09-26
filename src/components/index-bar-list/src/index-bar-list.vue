<template lang="pug">
	.index-bar-list
		van-index-bar(:sticky="false")
			template(
				v-for="(value, name) in list"
				:index="name"
			)
				van-index-anchor(
					:index="name"
					:key="name"
				)
				van-cell(
					v-for="item in value"
					key="item.id"
					:title="item.title"
					:label="item.label"
					@click="() => { clickCell(item.id) }")
</template>

<script>
	import Vue from 'vue';
	import { IndexBar, IndexAnchor } from 'vant';

	Vue.use(IndexBar).use(IndexAnchor);
    export default {
        name: 'index-bar-list',
		props: {
        	'list': {
        		default: {}
			}
		},
		methods: {
        	clickCell(id) {
        		this.$emit('click-cell', id);
			}
		}
    }
</script>

<style scoped>

</style>
<style>
	.index-bar-list .van-index-bar {
		position: relative;
	}
	.index-bar-list .van-index-bar__sidebar {
		padding-top: 8px;
		background-color: #fff;
	}
	.index-bar-list .van-index-bar__sidebar .van-index-bar__index {
		padding: 0 2px;
		color: #666;
		font-size: 16px;
		transform: scale(0.6);
	}
</style>
