import Detail from './customer/detail.route'
import Edit from './customer/edit.route'

export default {
	path: '/customer/:id',
	component: { template: '<router-view></router-view>' },
	meta: {
		name: '客户信息'
	},
	children: [
		Detail,
		Edit
	]
}
