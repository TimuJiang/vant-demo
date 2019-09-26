export default {
	path: '/customer/:id?',
	component: () => import('./customer'),
	meta: {
		name: '客户信息'
		// auth: ['user']
	},
	children: [
	]
}
