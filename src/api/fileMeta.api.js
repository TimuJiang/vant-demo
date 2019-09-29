/* 文件相关接口 */
import { post } from './base'
import { basePath } from './basePath'

// 上传文件
export function upload(id) {
	return post(`${basePath}/fileMeta/upload`, { id })
}

// 获取图片流
export function getImg(params) {
	return post(`${basePath}/fileMeta/getImg`, params)
}

// 立即试驾
export function deleteFile(params) {
	return post(`${basePath}/fileMeta/deleteFile`, params)
}
