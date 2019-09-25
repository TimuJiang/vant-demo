export default {
	path: 'invoice/:orderId',
	component: () => import('./invoice'),
	meta: {
		name: '开票'
	}
}
