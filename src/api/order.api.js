/* 订单相关接口 */
import { post } from './base'
import { basePath } from './basePath'

// 查询详情
export function get(id) {
	return post(`${basePath}/order/get`, { id })
}

// 查询列表
export function query(params) {
	return post(`${basePath}/order/query`, params)
}

// 新增
export function save(params) {
	return post(`${basePath}/order/save`, params)
}

// 修改
export function update(params) {
	return post(`${basePath}/order/update`, params)
}

// 修改订单状态
export function updateStatus(params) {
	return post(`${basePath}/order/updateStatus`, params)
}

 // 取消订单审核
export function cancelOrderAuidt({ id, remark }) {
	return post(`${basePath}/order/cancelOrderAuidt`, { id, remark })
}

// 开票
export function saveInvoice(params) {
	return post(`${basePath}/order/saveInvoice`, params)
}

// 交车
export function saveTransactionCar(params) {
	return post(`${basePath}/order/saveTransactionCar`, params)
}
