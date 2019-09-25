import List from './order/list.route'
import Invoice from './order/invoice.route'
import Delivery from './order/delivery.route'
import OrderDetail from './order/order-detail.route'

export default {
	path: '/order',
	component: { template: '<router-view></router-view>' },
	children: [
		List,
		Invoice,
		Delivery,
		OrderDetail
	]
}
