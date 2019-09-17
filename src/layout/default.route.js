const routes = []
const context = require.context('../views', true, /\.(route.js)$/)

context.keys().forEach(name => {
	routes.push(context(name).default)
})

export default {
	path: '/',
	component: () => import('./default.layout'),
	meta: {
		auth: ['user']
	},
	children: [
		...routes
	]
}
