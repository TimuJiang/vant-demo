<template lang='pug'>
	.follow-part
		.group-title(@click="() => { goToNicheFollow() }")
			van-icon(name="arrow" style="float: right" color="#c4c4cc")
			| 商机跟进
		.follow-part__content
			.cell__type( v-for="item in _customer" :key="item.type"  @click="onClick(item)" :class="`type-${item.type}`") {{item.name}} (99+)
</template>

<script>
	import { FOLLOW_TYPE } from 'config/types.config'
	export default {
		name: 'follow-part',
		created() {
			this._customer = FOLLOW_TYPE
		},
		methods: {
			onClick (item) {
				this.$router.push(`/potential-customer/${item.type}`)
			},
			goToNicheFollow(item) {
				if (item) {

				} else {
					this.$router.push('/niche-follow/2')
				}

			}
		}
	}
</script>
<style lang="scss" scoped>
	.follow-part {
		.group-title {
			padding: 10px 20px;
		}
		&__content {
			display: flex;
			align-items: center;
			justify-content: center;
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
		}
		.type-4 {
			color: #FF3B30;
			border: 1px solid #FF3B30;
		}
	}
</style>
