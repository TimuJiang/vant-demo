/* 客户管理相关接口 */
import { post } from './base'
import { basePath } from './basePath'

// 查询详情(包含跟进记录列表)
export function get(id) {
	return post(`${basePath}/clueCustomer/get`, { id })
}
