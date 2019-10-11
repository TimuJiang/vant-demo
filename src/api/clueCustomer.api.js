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

// 查询可分配的销售人员
export function queryUserList() {
	return post(`${basePath}/clueCustomer/queryUserList`, {})
}

// 查询商机跟进列表
export function query(param) {
	return post(`${basePath}/clueCustomer/query`, param)
}

// 经理端获取战败的整合数据
export function getDefeatCount() {
	return post(`${basePath}/clueCustomer/getDefeatCount`, {})
}
