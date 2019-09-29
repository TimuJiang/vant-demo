import {post} from './base'

export function queryEnums() {
	return post('/bomt-admin/general/queryEnums')
}

export function queryEnumsByKey(key) {
	return post('/bomt-admin/general/queryEnumsByKey', {key})
}
