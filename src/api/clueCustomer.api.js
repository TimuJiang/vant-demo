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

// 查询战败待审核列表
export function queryForDefeatNotAudit(param) {
	return post(`${basePath}/clueCustomer/queryForDefeatNotAudit`, param)
}

// 重新分配线索客户
export function redistributionCustomer(param) {
	return post(`${basePath}/clueCustomer/redistributionCustomer`, param)
}

// 通过战败审核
export function passDefeatAudit(param) {
	return post(`${basePath}/clueCustomer/passDefeatAudit`, param)
}

// 驳回战败审核
export function notPassDefeatAudit(param) {
	return post(`${basePath}/clueCustomer/notPassDefeatAudit`, param)
}

// 查询线索分配的列表
export function queryForDistribution(param) {
	return post(`${basePath}/clueCustomer/queryForDistribution`, param, true)
}

// 填写跟进记录
export function saveFollow(param) {
	return post(`${basePath}/clueCustomer/saveFollow`, param)
}

// 提交战败申请
export function saveDefeatAudit(param) {
	return post(`${basePath}/clueCustomer/saveDefeatAudit`, param)
}

// 线索分配
export function distributionCustomer(param) {
	return post(`${basePath}/clueCustomer/distributionCustomer`, param)
}

// 作废客户
export function cancelCustomer(param) {
	return post(`${basePath}/clueCustomer/cancelCustomer`, param)
}
