export default {
	path: '/sub',
	component: () => import('./sub.layout'),
	meta: {
		name: 'sub'
		// auth: ['user']
	},
	children: []
}
