import Detail from './verify-detail/detail.route'
import VerifyOperation from './verify-detail/verify-operation.route';

export default {
	path: 'verify-detail/:id/param2/:param2',
	component: { template: '<router-view></router-view>' },
	meta: {
	},
	children: [
		Detail,
		VerifyOperation
	]
}
