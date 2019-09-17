export default {
	path: '/potential-customer/:type?',
	component: () => import('./potential-customer'),
	meta: {
		name: 'potential-customer'
		// auth: ['user']
	},
	children: [
	]
}
