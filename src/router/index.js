import Vue from 'vue'
import Router from 'vue-router'
import store from '@/vuex/store'
Vue.use(Router)

const routes = []
const context = require.context('../layout', false, /\.(route.js)$/)

context.keys().forEach(name => {
	routes.push(context(name).default)
})

function needUser (role) {
	return role === 'user'
}

async function auth (to, from, next) {
	let match
	for (let i = 0; i < to.matched.length; i++) {
		match = to.matched[i]
		if (match.meta.auth) {
			if (match.meta.auth.some(needUser)) {
				await isUser()
				next()
			}
		} else {
			next()
		}
	}
}

async function isUser () {
	if (!store.state.user) {
		let user = await Vue.prototype.$api.sso.getUser()
		store.commit('user', user || null)
		let enums = await Vue.prototype.$api.general.queryEnums()
		store.commit('enums', enums || {})
		let dicMap = await Vue.prototype.$api.dictConfig.queryMap()
		store.commit('dicMap', dicMap || {})
		/* let dicts = await Vue.prototype.$api.dictConfig.queryAll()
		store.commit('dicts', dicts || []) */
	}
	return store.state.user
}

const router = new Router({
	mode: 'history',
	routes: routes
})

router.beforeEach((to, from, next) => {
	// next()
	auth(to, from, next)
})

export default router
