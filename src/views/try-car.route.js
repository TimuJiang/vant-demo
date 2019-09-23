import List from './try-car/list.route'
import Detail from './try-car/detail.route'

export default {
	path: '/try-car',
	component: { template: '<router-view></router-view>' },
	children: [
		List,
		Detail,
	]
}
