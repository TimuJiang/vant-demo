import List from './try-car/list.route'
import Detail from './try-car/detail.route'
import Upload from './try-car/upload.route'

export default {
	path: '/try-car',
	component: { template: '<router-view></router-view>' },
	meta: {
		name: '试乘试驾'
		// auth: ['user']
	},
	children: [
		List,
		Detail,
		Upload
	]
}
