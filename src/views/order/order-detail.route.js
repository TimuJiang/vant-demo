export default {
	path: 'order-detail/:orderId/t/:t/customerId/:customerId',
	props: true,
	component: () => import('./order-detail'),
	meta: {
	}
}
