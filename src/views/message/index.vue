<template lang="pug">
	m-page(right-text="提醒设置" @click-right="goToSet").message-index
		.list-item(@click="() => { this.$router.push('/clue-assign') }")
			img(:src="icon.deliver")
			.text
				|线索待分配信息
				span
					van-tag(round type="danger") 30
		.list-item(@click="() => { this.$router.push('/niche-follow/4') }")
			img(:src="icon.unfollow")
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
		data() {
        	return {
        		icon: {
        			deliver: `${require('../../assets/remind/remind_icon_deliver.png')}`,
					unfollow: `${require('../../assets/remind/remind_icon_unfollow.png')}`
				}
			}
		},
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
		img {
			width: 40px;
			height: 40px;
		}
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
