/* 试乘试驾相关接口 */
import { post } from './base'
import { basePath } from './basePath'

// 查询详情
export function get(id) {
	return post(`${basePath}/testDrive/get`, { id })
}

// 查询列表
export function query(params) {
	return post(`${basePath}/testDrive/query`, params)
}

// 立即试驾
export function update(params) {
	return post(`${basePath}/testDrive/update`, params)
}

// 修改试乘试驾状态（完成试驾和取消试驾）
export function updateStatus({ id, status }) {
	return post(`${basePath}/testDrive/updateStatus`, { id, status })
}
