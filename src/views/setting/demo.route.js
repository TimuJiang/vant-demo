export default {
	path: 'demo',
	component: () => import('./demo'),
	meta: {
		name: 'demo'
		// auth: ['user']
	},
	children: []
}
