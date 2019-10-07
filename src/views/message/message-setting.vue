<template lang="pug">
	m-page.message-setting
		.container
			.cell
				m-time-select(v-model="startTime" placeholder="" label="免打扰开始时间" date-type="datetime" right-icon="arrow")
				m-time-select(v-model="endTime" placeholder="" label="免打扰结束时间" date-type="datetime" right-icon="arrow")
			.cell
				van-cell.special
					template(slot="title")
						span 线索待分配
						van-switch(v-model="checked1" active-color="#07c160")
				van-cell.special
					template(slot="title")
						span 商机超时未跟进
						van-switch(v-model="checked2" active-color="#07c160")


</template>

<script>
	import Vue from 'vue';
	import { Switch } from 'vant';

	Vue.use(Switch);
    export default {
        name: 'message-setting',
		data() {
        	return {
        		startTime: '',
				endTime: '',
				checked1: true,
				checked2: true
			}
		}
    }
</script>

<style lang="scss" scoped>
	.container {
		position: absolute;
		top: 46px;
		bottom: 0;
		width: 100%;
		overflow: scroll;
		background-color: #efeff4;
		.cell {
			margin-bottom: 10px;
			&:last-child {
				margin-bottom: 0;
			}
		}
	}
</style>
<style>
	.message-setting .van-cell{
		font-size: 16px;
		font-weight: 600;
		color: #333;
		line-height: 30px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	}
	.message-setting .m-time-select .van-field__label {
		width: 120px!important;
	}
	.message-setting .special .van-cell__title{
		display: flex;
		justify-content: space-between;
	}
	.message-setting .special:last-child {
		border-bottom: unset;
	}
</style>
