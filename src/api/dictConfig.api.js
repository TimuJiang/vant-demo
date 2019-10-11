/* 字典表配置相关接口 */
import { post } from './base'
import { basePath } from './basePath'

// 查询全部字典值
export function queryAll() {
	return post(`${basePath}/dicConfig/queryAll`)
}

// 查询全部字典值
export function query(param) {
	return post(`${basePath}/dicConfig/query`, param)
}

// 查询字典MAP
export function queryMap() {
	return post(`${basePath}/dicConfig/queryMap`, {})
}
