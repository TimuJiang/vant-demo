import DemoRoute from './setting/demo.route'
export default {
	path: '/setting',
	component: () => import('./setting'),
	meta: {
		name: 'setting',
		showTabbar: true
		// auth: ['user']
	},
	children: [
		DemoRoute
	]
}
