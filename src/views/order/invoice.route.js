export default {
	path: 'invoice/:orderId',
	component: () => import('./invoice'),
	props: true,
	meta: {
		name: '开票'
	}
}
