import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		user: null,
		enums: {},
		menu: [],
		collapse: false
	},

	mutations: {
		'user'(state, value) {
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
		}
	}
})
