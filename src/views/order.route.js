import List from './order/list.route'

export default {
	path: '/order',
	component: { template: '<router-view></router-view>' },
	children: [
		List
	]
}
