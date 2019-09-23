export default {
	path: '/upload/:uploadType/operateType/:operateType/detailId/:detailId',
	props: true,
	component: () => import('./upload'),
	meta: {
	},
	children: [
	]
}
