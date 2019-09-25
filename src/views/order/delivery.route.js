export default {
	path: 'delivery/:orderId',
	component: () => import('./delivery'),
	meta: {
		name: '交车'
	}
}
