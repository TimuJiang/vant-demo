<template lang='pug'>
	m-page.setting
		van-cell(title="姓名" :value="user.name")
		van-cell(title="岗位" :value="user.title")
		van-cell(title="角色" :value="user.role" :is-link="true" @click="showRoleAction")
		van-cell(title="状态" :value="user.status" :is-link="true"  @click="showStatusAction")
		van-cell(title="关于我们" :is-link="true")
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
				{ name: '销售顾问' },
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
			onRoleSelect () {
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
		.logout-button {
			margin-top: 40px;
		}
	}
</style>
