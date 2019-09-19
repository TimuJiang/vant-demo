import VerifyOperation from './verify-detail/verify-operation.route';

export default {
	path: 'verify-detail',
	component: () => import('./verify-detail'),
	meta: {
		name: '战败审核',
		level: 2
	},
	children: [VerifyOperation]
}
