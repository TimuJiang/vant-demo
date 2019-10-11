export default {
	path: '/potential-customer/:type/saleLoginName/:saleLoginName',
	component: () => import('./potential-customer'),
	meta: {
		name: '商机客户'
	},
	children: [
	]
}
