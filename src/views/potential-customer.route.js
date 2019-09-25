export default {
	path: '/potential-customer/:type?',
	component: () => import('./potential-customer'),
	meta: {
		name: '商机客户'
	},
	children: [
	]
}
