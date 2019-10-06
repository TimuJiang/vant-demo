<template lang='pug'>
	m-page.setting(:showNavBar="false")
		.user-info-row
			.user-info-row__title 我的
			.user-info-row__content
				.left-part
					van-image(
						round
						width="60"
						height="60"
						src="https://img.yzcdn.cn/vant/cat.jpeg"
					)
					.state
				.right-part
					.user-row
						.user-name {{user.loginName}}
						.user-title {{user.name}}
					.address
						| 杭州xxxx吉利4s店
		van-cell(title="姓名" :value="user.loginName")
		van-cell(title="岗位" :value="user.name")
		van-cell(title="角色" :value="user.roles[0].name" :is-link="true" @click="showRoleAction")
		van-cell(title="状态" :value="user.status.disName" :is-link="true"  @click="showStatusAction")
		van-cell(title="关于我们" :is-link="true")
		.logout-button-warp
			van-button.logout-button(type="primary" size="large") 退出登录
		van-action-sheet(key="role" v-model="show" :actions="_roleTypes" @select="onRoleSelect")
		van-action-sheet(key="status" v-model="showStatus" :actions="_roleStatus" @select="onStatusSelect")

</template>

<script>
	import { mapGetters } from 'vuex'
	import Vue from 'vue'
	import { ActionSheet } from 'vant'

	Vue.use(ActionSheet)
	export default {
		name: 'setting',
		data() {
			return {
				show: false,
				showStatus: false
			}
		},
		computed: {
			...mapGetters([
				'user'
			])
		},
		beforeCreate() {
			this._roleTypes = [
				{ name: '数字营销经理' },
				{ name: '电话专员' },
				{ name: '网销专员', subname: '描述信息' }
			]
			this._roleStatus = [
				{ name: '空闲' },
				{ name: '忙碌', subname: '不在接受线索' }
			]
		},
		methods: {
			showRoleAction () {
				this.show = true
			},
			showStatusAction () {
				this.showStatus = true
			},
			onRoleSelect (value) {
				console.log(value)
				this.$store.state.user.roles[0].name = value.name
				this.show = false
			},
			onStatusSelect () {
				this.showStatus = false
			}
		}
	}
</script>
<style lang="scss" scoped>
	.setting {
		.van-cell {
			font-size: 16px;
			color: #333333;
			&__title {
				height: 30px;
				line-height: 30px;
			}
			&__value {
				height: 30px;
				line-height: 30px;
				color: #333333;
			}
		}
		.user-info-row {
			background: url("~assets/setting-top-bg.png") no-repeat center;
			width: 100%;
			height: 154px;
			background-size: cover;
			&__title {
				font-size: 18px;
				color: #FFFFFF;
				text-align: center;
				height: 44px;
				line-height: 44px;
			}
			&__content {
				display: flex;
				padding: 0 16px;
				align-items: center;
				.left-part {
					flex: none;
					position: relative;
				}
				.right-part {
					margin-left: 30px;
					color: #FFFFFF;
					.user-row {
						font-size: 0;
						.user-name {
							display: inline-block;
							font-size: 18px;
						}
						.user-title {
							display: inline-block;
							font-size: 12px;
							color: #FFFFFF;
							background: #2279EB;
							border-radius: 10px;
							margin-left: 5px;
							padding: 3px 8px;
						}
					}
					.address {
						font-size: 12px;
						margin-top: 10px;
					}

				}
				.state {
					position: absolute;
					bottom: 0px;
					right: 0px;
					width: 20px;
					height: 20px;
					border-radius: 20px;
					background-image: linear-gradient(-45deg, #FF3B30 0%, #FF5E55 100%);
					box-shadow: 0 1px 0 0 rgba(0,0,0,0.20);
				}
			}
		}
		.logout-button-warp {
			margin: 50px 15px 0 15px;
		}
		.logout-button {
			background: #1B40D6;
			border: none;
			border-radius: 5px;
		}
	}
</style>
