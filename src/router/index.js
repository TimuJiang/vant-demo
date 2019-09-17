import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

const routes = []
const context = require.context('../layout', false, /\.(route.js)$/)

context.keys().forEach(name => {
	routes.push(context(name).default)
})
const router = new Router({
	routes: routes
})


export default router
