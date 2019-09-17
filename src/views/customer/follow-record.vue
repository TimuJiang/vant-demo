<template lang='pug'>
	.follow-record
		van-steps(direction="vertical" :active="0")
			van-step
				p.dateTime 2019-07-12 12:40  跟进人
				p.content 跟进内容什么的
			van-step
				p.dateTime 2019-07-12 12:40  跟进人
				p.content 跟进内容什么的
				volume-item
			van-step
				p.dateTime 2019-07-12 12:40  跟进人
				p.content 跟进内容什么的
			van-step
				p.dateTime 2019-07-12 12:40  跟进人
				p.content 跟进内容什么的
			van-step
				p.dateTime 2019-07-12 12:40  跟进人
				p.content 跟进内容什么的
</template>

<script>
	import Vue from 'vue'
	import VolumeItem from './follow-record/volume-item'
	import { Step, Steps } from 'vant'

	Vue.use(Step).use(Steps)
	export default {
		name: 'follow-record',
		components: { VolumeItem }
	}
</script>
<style lang="scss" scoped>
	.follow-record {
		padding-left: 20px;
		padding-top: 20px;
		.dateTime {
			font-size: 14px;
			margin: 0;
		}
	}
</style>
