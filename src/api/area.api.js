/* 行政区划相关接口 */
import { post } from './base'
import { basePath } from './basePath'

export function query(param) {
	return post(`${basePath}/area/query`, param || {})
}
