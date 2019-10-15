/* 车型车系配置相关接口 */
import { post } from './base'
import { basePath } from './basePath'

// 获取树状结构的车型车系列表
export function queryForTree() {
	return post(`${basePath}/carModel/queryForTree`, {})
}
