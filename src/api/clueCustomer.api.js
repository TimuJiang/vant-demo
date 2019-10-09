/* 客户管理相关接口 */
import { post } from './base'
import { basePath } from './basePath'

// 查询详情(包含跟进记录列表)
export function get(id) {
	return post(`${basePath}/clueCustomer/get`, { id })
}

// 查询销售顾问的客户列表
export function queryForAddressBook(param) {
	return post(`${basePath}/clueCustomer/queryForAddressBook`, param)
}

// 查询销售顾问的客户分类的数量
export function getCustomerCount(param) {
	return post(`${basePath}/clueCustomer/getCustomerCount`, param)
}
