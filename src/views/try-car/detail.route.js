export default {
	path: 'detail/:routeType/detailId/:detailId',
	props: true,
	component: () => import('./detail'),
	meta: {
	},
	children: [
	]
}
