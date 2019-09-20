import List from './try-car/list.route'

export default {
	path: '/try-car',
	component: { template: '<router-view></router-view>' },
	meta: {
		name: '试乘试驾'
		// auth: ['user']
	},
	children: [
		List
	]
}
