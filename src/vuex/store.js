import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		user: null,
		enums: {},
		dicts: [],
		dicMap: {},
		menu: [],
		homePageData: {},
		collapse: false
	},

	mutations: {
		'user'(state, value) {
			if (!state.user) {
				let roleNames = value.roles.map((item) => {
					return item.name
				})
				value.roleName = roleNames.toString()
			}
			state.user = value
		},
		'menu'(state, value) {
			state.menu = value
		},
		'collapse'(state, value) {
			state.collapse = value
		},
		'enums'(state, value) {
			state.enums = value
		},
		'dicts'(state, value) {
			state.dicts = value
		},
		'dicMap'(state, value) {
			state.dicMap = value
		},
		'homePageData'(state, value) {
			state.homePageData = value
		}
	},
	getters: {
		'user'(state) {
			return state.user
		},
		'menu'(state) {
			return state.menu
		},
		'collapse'(state) {
			return state.collapse
		},
		'enums'(state) {
			return state.enums
		},
		'Gender'(state) {
			return state.enums.Gender
		},
		'isManager'(state) {
			return state.user.roleName === '数字营销经理'
		}
	}
})
