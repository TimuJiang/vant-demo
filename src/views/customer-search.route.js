export default {
	path: '/customer-search/:loginName/type/:type',
	props: true,
	component: () => import('./customer-search'),
	meta: {
	},
	children: [
	]
}
