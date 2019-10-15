import { post } from './base'

// 修改状态
export function updateWorkStatus(param) {
	return post('/bomt-admin/my/updateWorkStatus', param)
}
