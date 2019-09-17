export default {
	path: '/message',
	component: () => import('./message'),
	meta: {
		name: 'message'
		// auth: ['user']
	},
	children: []
}
