<template lang='pug'>
	.follow-part
		.group-title(@click="() => { goToNicheFollow() }")
			van-icon(name="arrow" style="float: right" color="#c4c4cc")
			| 商机跟进
		.follow-part__content
			.cell__type( v-for="item in _customer" :key="item.type"  @click="goToNicheFollow(item)" :class="`type-${item.type}`") {{item.name}} ({{homePageData[item.key]}})
</template>

<script>
	import { FOLLOW_TYPE } from 'config/types.config'
	export default {
		name: 'follow-part',
		created() {
			this._customer = FOLLOW_TYPE
		},
		computed: {
			homePageData() {
				return this.$store.state.homePageData
			}
		},
		methods: {
			onClick (item) {
				this.$router.push(`/potential-customer/${item.type}`)
			},
			goToNicheFollow(item) {
				if (item) {
					this.$router.push(`/niche-follow/${item.type}`)
				} else {
					this.$router.push('/niche-follow/1')
				}

			}
		}
	}
</script>
<style lang="scss" scoped>
	.follow-part {
		padding-top: 10px;
		background-color: #efeff4;
		.group-title {
			padding: 10px 20px;
			background-color: #fff;
			font-weight: bold;
		}
		&__content {
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #fff;
		}
		.cell__type {
			width: 76px;
			height: 26px;
			text-align: center;
			border: 1px solid #1B40D6;
			border-radius: 4px;
			font-size: 14px;
			color: #1B40D6;
			line-height: 26px;
			margin: 16px 5px;
			font-weight: 500;
		}
		.type-4 {
			color: #FF3B30;
			border: 1px solid #FF3B30;
		}
	}
</style>
