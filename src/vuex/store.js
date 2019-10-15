import Vue from 'vue'
import Vuex from 'vuex'
import dictAndEnumKey from '../config/dictAndEnumKey.config.js'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		user: null,
		enums: {},
		dictConfig: {},
		dicMap: {},
		menu: [],
		carModel: [],
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
		'dictConfig'(state, value) {
			state.dictConfig = value
		},
		'dicMap'(state, value) {
			state.dicMap = value
		},
		'homePageData'(state, value) {
			state.homePageData = value
		},
		'carModel'(state, value) {
			state.carModel = value
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
		'dicMap'(state) {
			return state.dicMap
		},
		'DictGender'(state) {
			return getDictList(state, 'gender')
		},
		'DictLevel'(state) {
			return getDictList(state, 'level')
		},
		'DictFollowType'(state) {
			return getDictList(state, 'followType')
		},
		'isManager'(state) {
			return state.user.roleName === '数字营销经理'
		},
		'isPhoneSpecialist'(state) {
			return state.user.roleName === '电话专员'
		}
	}
})

function getDictList(state, type) {
	let list = []
	let dictList = state.dictConfig[dictAndEnumKey[type].dict]
	if (dictList) {
		list = dictList.map((item) => {
			item.name = item.dictValue
			return item
		})
	}
	return list
}
