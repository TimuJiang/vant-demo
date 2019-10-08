export default {
	path: 'delivery/:orderId',
	component: () => import('./delivery'),
	props: true,
	meta: {
		name: '交车'
	}
}
