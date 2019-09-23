import Detail from './verify-detail/detail.route'
import VerifyOperation from './verify-detail/verify-operation.route'

export default {
	path: 'verify-detail/:id',
	component: { template: '<router-view></router-view>' },
	meta: {
	},
	children: [
		Detail,
		VerifyOperation
	]
}
