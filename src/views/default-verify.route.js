export default {
	path: '/default-verify',
	component: () => import('./defeat-verify'),
	meta: {
		name: '战败审核'
		// auth: ['user']
	},
	children: [
	]
}
