const routes = []
const context = require.context('../views', false, /\.(route.js)$/)

context.keys().forEach(name => {
	routes.push(context(name).default)
})

console.log(routes)

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
