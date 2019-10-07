/* 文件相关接口 */
import { post, getFile } from './base'
import { basePath } from './basePath'

// 上传文件
export function upload(param) {
	return post(`${basePath}/fileMeta/upload`, param)
}

// 获取图片流
export function getImg(id) {
	return getFile(`${basePath}/fileMeta/getImg`, { id })
}

// 立即试驾
export function deleteFile(params) {
	return post(`${basePath}/fileMeta/deleteFile`, params)
}
