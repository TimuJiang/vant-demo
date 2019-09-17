export default {
	path: '/message',
	component: () => import('./message'),
	meta: {
		name: 'message',
		showTabbar: true
		// auth: ['user']
	},
	children: []
}
