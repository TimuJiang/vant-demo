export default {
	path: '/customer/:id?',
	component: () => import('./customer'),
	meta: {
		name: 'customer'
		// auth: ['user']
	},
	children: [
	]
}
