<template lang="pug">
	.container
		.picContainer
			.title 商机管理系统
		.login
			.input-container
				span 编码
				.input
					input
			.input-container
				span 账号
				.input
					input(v-model="loginName")
			.input-container
				span 密码
				.input
					input(v-model="password")
			.button(@click="login") 登录

</template>

<script>
	export default {
		name: 'login',
		data() {
			return {
				loginName: '',
				password: ''
			}
		},
		methods: {
			login() {
				this.$api.sso.login(this.loginName, this.password)
				this.$router.push('/')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		position: absolute;
		width: 100%;
		top: 0;
		bottom: 0;

		.picContainer {
			position: relative;
			padding-bottom: 100%;
			background: url("~assets/login_bg.png") no-repeat;
			background-size: 100%;

			.title {
				position: absolute;
				width: 100%;
				top: 20%;
				height: 33px;
				line-height: 33px;
				color: #fff;
				font-size: 24px;
				font-weight: bold;
				text-align: center;
			}
		}

		.login {
			width: 65%;
			margin: 0 auto;
			padding-top: 15px;

			.input-container {
				display: flex;
				justify-content: center;
				border-bottom: 1px solid #efeff4;
				margin-bottom: 12px;

				span {
					line-height: 34px;
				}

				.input {
					flex: 1;
					padding-left: 15px;

					input {
						height: 34px;
						line-height: 34px;
						box-sizing: border-box;
						font-size: 16px;
						border-width: 0;
						padding: 0;
					}
				}
			}

			.button {
				margin-top: 30px;
				height: 45px;
				line-height: 45px;
				text-align: center;
				background-color: #1B40D6;
				border-radius: 5px;
				color: #fff;
				box-shadow: 0 9px 5px -3px #c5d0f3
			}
		}

	}

</style>
