import Detail from './verify-detail/detail.route'

export default {
	path: 'verify-detail/:id',
	component: { template: '<router-view></router-view>' },
	meta: {
	},
	children: [
		Detail
	]
}
