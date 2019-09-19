import VerifyDetail from './defeat-verify/verify-detail.route'

export default {
	path: '/defeat-verify',
	component: () => import('./defeat-verify'),
	meta: {
		name: '战败审核',
		level: 1
		// auth: ['user']
	},
	children: [
		VerifyDetail
	]
}
