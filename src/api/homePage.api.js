/* 首页相关接口 */
import { post } from './base'
import { basePath } from './basePath'

// 获取首页的整合数据
export function getHomePageData() {
	return post(`${basePath}/homePage/getHomePageData`)
}
