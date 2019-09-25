export default {
	path: 'order-detail/:orderId/t/:t/someId/:someId',
	props: true,
	component: () => import('./order-detail'),
	meta: {
	}
}
