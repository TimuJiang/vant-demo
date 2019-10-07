<template lang="pug">
	m-page(right-text="提醒设置" @click-right="goToSet").message-index
		.list-item(@click="() => { this.$router.push('/clue-assign') }")
			van-icon(name="cluster-o" size="25px" color="#1B40D6")
			.text
				|线索待分配信息
				span
					van-tag(round type="danger") 30
		.list-item(@click="() => { this.$router.push('/niche-follow/4') }")
			van-icon(name="clock-o" size="25px" color="#1B40D6")
			.text
				|商机超时未跟进
				span
					van-tag(round type="danger") 25


</template>

<script>
	import Vue from 'vue';
	import { Tag } from 'vant';

	Vue.use(Tag);
    export default {
        name: 'index',
		methods: {
        	goToSet() {
        		this.$router.push('/message/message-setting')
			}
		}
    }
</script>

<style lang="scss" scoped>
	.list-item {
		height: 50px;
		padding-left: 15px;
		display: flex;
		align-items: center;
		.text {
			flex-grow: 1;
			height: 100%;
			margin-left: 15px;
			font-size: 16px;
			padding-right: 15px;
			box-sizing: border-box;
			border-bottom: 1px solid #efeff4;
			display: flex;
			align-items: center;
			justify-content: space-between;
			align-self: flex-end;
		}
	}
</style>
