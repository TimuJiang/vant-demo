import DemoRoute from './setting/demo.route'
export default {
	path: '/setting',
	component: () => import('./setting'),
	meta: {
		name: 'setting'
		// auth: ['user']
	},
	children: [
		DemoRoute
	]
}
