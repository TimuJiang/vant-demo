import List from './defeat-verify/list.route'
import VerifyDetail from './defeat-verify/verify-detail.route'
import VerifyOperation from './defeat-verify/verify-operation.route'

export default {
	path: '/defeat-verify',
	component: { template: '<router-view></router-view>' },
	meta: {
		// auth: ['user']
	},
	children: [
		List,
		VerifyDetail,
		VerifyOperation
	]
}
