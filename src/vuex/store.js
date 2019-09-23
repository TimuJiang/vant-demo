import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		user: {
			name: '路人甲',
			title: '市场运营专员',
			role: '数字营销经理',
			status: '空闲'
		},
		menu: [],
		collapse: false,
	},

	mutations: {
		'user' (state, value) {
			state.user = value
		},
		'menu' (state, value) {
			state.menu = value
		},
		'collapse' (state, value) {
			state.collapse = value
		}
	},
	getters: {
		'user' (state) {
			return state.user
		},
		'menu' (state) {
			return state.menu
		},
		'collapse' (state) {
			return state.collapse
		}
	}
})
