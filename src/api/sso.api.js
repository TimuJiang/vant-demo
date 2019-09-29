import {post} from './base'

export function user() {
	return post('/bomt-admin/sso/user')
}
